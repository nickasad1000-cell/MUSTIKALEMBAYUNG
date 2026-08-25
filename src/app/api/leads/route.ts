import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,20}$/),
  email: z.string().trim().email().max(150).optional(),
  unitSlug: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
});

export async function POST(request: Request) {
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
      { status: 200 }
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
    console.error("[api/leads] Supabase insert error:", error.message);
    return NextResponse.json(
      { ok: false, reason: "DB_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
