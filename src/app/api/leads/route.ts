import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getUnitBySlug } from "@/lib/units";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,20}$/),
  email: z.string().trim().email().max(150).optional(),
  unitSlug: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
  /** Honeypot anti-bot: field tersembunyi, harus kosong. */
  website: z.string().optional(),
});

/** Rate limit sederhana per-IP (best-effort; state reset saat instance cold-start). */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prev.length >= RATE_LIMIT) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, reason: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  // Honeypot terisi → bot. Balas sukses palsu agar bot tidak mencoba lagi.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, reason: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // unitSlug harus slug unit yang benar-benar ada di katalog
  if (parsed.data.unitSlug && !getUnitBySlug(parsed.data.unitSlug)) {
    return NextResponse.json(
      { ok: false, reason: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, reason: "SUPABASE_NOT_CONFIGURED" },
      { status: 200 }
    );
  }

  const { error } = await supabase
    .from("leads")
    .insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email ?? null,
      unit_slug: parsed.data.unitSlug ?? null,
      message: parsed.data.message ?? null,
    });

  if (error) {
    console.error("[api/leads] Database insert error:", error.message);
    return NextResponse.json({ ok: false, reason: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
