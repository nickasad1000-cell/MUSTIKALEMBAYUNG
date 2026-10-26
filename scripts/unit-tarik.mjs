#!/usr/bin/env node
/**
 * Tarik status, progres, dan foto unit dari aplikasi tracker.
 *
 * Sumber: GET /api/publik/unit (read-only, bearer PUBLIK_UNIT_TOKEN).
 * Hasil: src/data/unit-status.json (berkas generate, jangan diedit manual).
 *
 * Perintah:
 *   npm run unit:tarik
 *
 * Env:
 *   SYAHFALAH_URL       default https://syahfalahgroup.vercel.app
 *   PUBLIK_UNIT_TOKEN   wajib
 *   UNIT_TARIK_OUT      opsional, untuk mengarahkan hasil ke berkas lain
 */

import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const name of [".env.local", ".env"]) {
  const file = join(ROOT, name);
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (!match || process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}
const BASE = (process.env.SYAHFALAH_URL || "https://syahfalahgroup.vercel.app").replace(/\/+$/, "");
const TOKEN = process.env.PUBLIK_UNIT_TOKEN;
const PERUMAHAN = "Mustika Lembayung";
const STATUS_VALID = new Set(["tersedia", "booking", "terjual"]);

const argOut = process.argv.indexOf("--out");
const OUT =
  (argOut >= 0 ? process.argv[argOut + 1] : null) ||
  process.env.UNIT_TARIK_OUT ||
  join(ROOT, "src", "data", "unit-status.json");

function kodeKatalog(kode) {
  return String(kode).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function angka(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.round(Math.max(0, Math.min(100, n)) * 100) / 100;
}

async function main() {
  if (!TOKEN) {
    throw new Error("PUBLIK_UNIT_TOKEN belum diisi");
  }

  const res = await fetch(`${BASE}/api/publik/unit`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GET /api/publik/unit gagal: HTTP ${res.status}`);
  }

  const body = await res.json();
  const rows = Array.isArray(body?.data) ? body.data : [];
  const unit = rows.filter((row) => row?.perumahan === PERUMAHAN);

  if (unit.length === 0) {
    throw new Error(`Tidak ada unit ${PERUMAHAN} di respons tracker`);
  }

  const hasil = {};
  for (const row of unit) {
    const kode = kodeKatalog(row.kode);
    if (!/^[A-Z]\d+$/.test(kode)) {
      throw new Error(`Kode unit tidak dikenal: ${row.kode}`);
    }
    if (!STATUS_VALID.has(row.status)) {
      throw new Error(`${kode}: status "${row.status}" tidak dikenal`);
    }
    if (hasil[kode]) {
      throw new Error(`Kode unit ganda: ${kode}`);
    }
    const foto = typeof row.foto_url === "string" && row.foto_url ? row.foto_url : null;
    hasil[kode] = {
      status: row.status,
      persen: angka(row.persen_real),
      foto,
    };
  }

  const urut = Object.fromEntries(
    Object.entries(hasil).sort(([a], [b]) => a.localeCompare(b, "id", { numeric: true }))
  );
  const tmp = `${OUT}.tmp`;
  writeFileSync(tmp, JSON.stringify(urut, null, 2) + "\n", "utf8");
  renameSync(tmp, OUT);

  const counts = { tersedia: 0, booking: 0, terjual: 0 };
  for (const item of Object.values(urut)) counts[item.status]++;
  console.log(
    `unit-status.json: ${unit.length} unit ${PERUMAHAN} ` +
      `(${counts.tersedia} tersedia, ${counts.booking} booking, ${counts.terjual} terjual)`
  );
}

main().catch((err) => {
  console.error(`unit:tarik gagal: ${err.message}`);
  process.exitCode = 1;
});
