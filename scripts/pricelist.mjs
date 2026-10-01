#!/usr/bin/env node
/**
 * Sumber kebenaran harga: transkripsi "Daftar Harga per Blok" (public/assets/daftar-harga.webp).
 *
 *Aturan repo ini:
 *  1. Angka harga dan luas tanah HANYA boleh diubah di file ini, dan hanya kalau
 *     dokumennya berubah. src/data/pricelist.json DIHASILKAN oleh skrip ini.
 *  2. Status ketersediaan (terjual / tersedia) TIDAK ada di dokumen. Itu data
 *     operasional dan hanya boleh diubah di src/data/unit-status.json.
 *  3. `npm test` membandingkan ulang hasil generate dengan file yang ter-commit,
 *     jadi edit manual pada pricelist.json akan menggagalkan build.
 *
 * Perintah:
 *   node scripts/pricelist.mjs build   # tulis ulang src/data/pricelist.json
 *   node scripts/pricelist.mjs check   # verifikasi data vs dokumen (dipakai npm test)
 *   node scripts/pricelist.mjs show    # cetak ringkasan ke stdout
 *
 * Baris di bawah ditulis mengikuti baris tabel pada dokumen. Baris ber Rentang
 * ("B2-B9") dibiarkan apa adanya supaya tetap cocok dengan dokumen aslinya.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRICELIST_PATH = join(ROOT, "src", "data", "pricelist.json");
const STATUS_PATH = join(ROOT, "src", "data", "unit-status.json");

/** Angka kopral dokumen, bukan perkiraan. */
export const DOKUMEN = {
  sumber: "Daftar Harga per Blok — public/assets/daftar-harga.webp",
  transkripsi: "2026-10-01",
  hargaDasar: 166_000_000,
  tandaJadi: 2_500_000,
  hookTambahan: 5_000_000,
  angsuran: [
    { tenor: 10, bulanan: 1_730_400 },
    { tenor: 15, bulanan: 1_287_300 },
    { tenor: 20, bulanan: 1_072_180 },
  ],
  /**
   * [kode, tipe, luasTanah, peningkatanMutuKualitas, hook]
   * broadened ranges ditulis persis seperti tercetak di dokumen.
   */
  blok: {
    A: [
      ["A1", 36, 70, 22_125_000, true],
      ["A2", 36, 67, 12_370_000, false],
      ["A3", 36, 66, 10_510_000, false],
      ["A4", 36, 67, 11_386_000, false],
      ["A5", 36, 66, 11_197_000, false],
      ["A6", 36, 66, 11_103_000, false],
      ["A7", 36, 65, 9_969_000, false],
      ["A8", 36, 64, 7_921_000, false],
      ["A9", 36, 64, 8_364_000, false],
    ],
    B: [
      ["B1", 36, 65, 15_000_000, true],
      ["B2-B9", 36, 60, 0, false],
      ["B10", 36, 60, 5_000_000, true],
      ["B11", 36, 65, 15_000_000, true],
      ["B12-B19", 36, 60, 0, false],
      ["B20", 36, 60, 5_000_000, true],
    ],
    C: [
      ["C1", 36, 65, 15_000_000, true],
      ["C2-C9", 36, 60, 0, false],
      ["C10", 36, 60, 5_000_000, true],
      ["C11", 36, 60, 5_000_000, true],
      ["C12-C22", 36, 60, 0, false],
    ],
    D: [
      ["D1", 36, 71, 16_920_000, false],
      ["D2", 36, 71, 16_560_000, false],
      ["D3", 36, 71, 16_200_000, false],
      ["D4", 36, 70, 15_930_000, false],
      ["D5", 36, 70, 15_570_000, false],
      ["D6", 36, 70, 15_210_000, false],
      ["D7", 36, 70, 14_940_000, false],
      ["D8", 36, 70, 14_940_000, true],
    ],
    E: [
      ["E10", 36, 74, 29_625_000, true],
      ["E11", 36, 68, 12_078_000, false],
      ["E12", 36, 67, 10_746_000, false],
      ["E13", 36, 66, 9_405_000, false],
      ["E14", 36, 65, 8_010_000, false],
      ["E15", 36, 64, 6_732_000, false],
      ["E16", 36, 63, 5_400_000, false],
      ["E17", 36, 62, 4_068_000, false],
      ["E18", 36, 61, 2_700_000, false],
      ["E19", 36, 60, 5_697_500, true],
    ],
  },
};

/**
 * Unit yang terlihat di siteplan tapi TIDAK ada di pricelist: belum dibuka
 * penjualan dan belum punya harga resmi. Nilai sengaja null - jangan diisi
 * angka tebakan, karena angka itulah yang tadi merusak daftar harga.
 */
export const PRA_PENJUALAN = [
  { kode: "E1", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E2", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E3", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E4", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E5", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E6", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E7", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E8", flag: "terlihat di siteplan; belum ada di pricelist" },
  { kode: "E9", flag: "terlihat di siteplan; belum ada di pricelist" },
];

function expandRanged(kode, tipe, luas, mutu, hook, blok) {
  const match = /^([A-Z])(\d+)-([A-Z])(\d+)$/.exec(kode);
  if (!match) return [{ kode, tipe, luas, mutu, hook }];
  const [, blokFrom, dari, blokTo, sampai] = match;
  if (blokFrom !== blokTo || blokFrom !== blok)
    throw new Error(`Rentang blok tidak cocok: ${kode} di blok ${blok}`);
  const out = [];
  for (let n = Number(dari); n <= Number(sampai); n++) {
    out.push({ kode: `${blok}${n}`, tipe, luas, mutu, hook });
  }
  return out;
}

function readStatus() {
  try {
    return JSON.parse(readFileSync(STATUS_PATH, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return {};
    throw err;
  }
}

/** Bangun pricelist.json dari dokumen + status operasional. */
export function buildPricelist() {
  const status = readStatus();

  const units = [];
  for (const [blok, baris] of Object.entries(DOKUMEN.blok)) {
    for (const [kode, tipe, luas, mutu, hook] of baris) {
      for (const unit of expandRanged(kode, tipe, luas, mutu, hook, blok)) {
        units.push({
          kode: unit.kode,
          blok,
          tipe: String(unit.tipe),
          luasTanah: unit.luas,
          mutuKualitas: unit.mutu,
          hook: unit.hook,
          hargaDasar: DOKUMEN.hargaDasar,
          status: status[unit.kode] ?? null,
        });
      }
    }
  }

  for (const pre of PRA_PENJUALAN) {
    units.push({
      kode: pre.kode,
      blok: pre.kode[0],
      tipe: "36",
      luasTanah: null,
      mutuKualitas: null,
      hook: false,
      hargaDasar: DOKUMEN.hargaDasar,
      status: null,
      flag: pre.flag,
    });
  }

  units.sort((a, b) =>
    a.blok.localeCompare(b.blok) ||
    a.kode.localeCompare(b.kode, "id", { numeric: true })
  );
  return units;
}

function serialize(units) {
  return JSON.stringify(units, null, 2) + "\n";
}

/* ------------------------------- commands ------------------------------- */

function cmdBuild() {
  const units = buildPricelist();
  writeFileSync(PRICELIST_PATH, serialize(units), "utf8");
  console.log(`src/data/pricelist.json ditulis ulang: ${units.length} baris.`);
}

function cmdShow() {
  const units = buildPricelist();
  const jual = units.filter((u) => u.luasTanah !== null);
  const terjual = jual.filter((u) => u.status === "terjual");
  const tersedia = jual.filter((u) => u.status === "tersedia");
  const belum = jual.filter((u) => u.status === null);
  const pre = units.filter((u) => u.luasTanah === null);

  console.log(`Sumber        : ${DOKUMEN.sumber} (transkripsi ${DOKUMEN.transkripsi})`);
  console.log(`Unit di dokumen: ${units.length - pre.length}`);
  console.log(`Pra-penjualan : ${pre.length} (${pre.map((u) => u.kode).join(", ")})`);
  console.log(`Tersedia      : ${tersedia.length}`);
  console.log(`Terjual       : ${terjual.length} (${terjual.map((u) => u.kode).join(", ")})`);
  console.log(`Belum dipastikan: ${belum.length}${belum.length ? ` (${belum.map((u) => u.kode).join(", ")})` : ""}`);
}

function cmdCheck() {
  const errors = [];
  const warnings = [];
  const units = buildPricelist();
  const jual = units.filter((u) => u.luasTanah !== null);

  /* INV-01: file ter-commit harus sama persis dengan hasil generate. */
  let committed;
  try {
    committed = JSON.parse(readFileSync(PRICELIST_PATH, "utf8"));
  } catch {
    errors.push("INV-01 src/data/pricelist.json tidak bisa dibaca / belum ada");
    report(errors, warnings, units);
    return;
  }
  const expected = JSON.stringify(units);
  const actual = JSON.stringify(committed);
  if (expected !== actual) {
    const diff = diffUnit(committed, units);
    errors.push(
      `INV-01 pricelist.json tidak cocok dengan dokumen ` +
        `(harga/luas tidak boleh diedit manual). Jalankan: npm run pricelist` +
        (diff ? `\n         ${diff}` : "")
    );
  }

  /* INV-02: kode unik. */
  const seen = new Map();
  for (const u of units) {
    if (seen.has(u.kode)) errors.push(`INV-02 kode duplikat: ${u.kode}`);
    seen.set(u.kode, u);
  }

  /* INV-03: prefiks kode harus sama dengan blok. */
  for (const u of units) {
    if (u.kode[0] !== u.blok) errors.push(`INV-03 ${u.kode}: blok "${u.blok}" tidak cocok dengan kode`);
  }

  /* INV-04: setiap unit yang dijual wajib punya luas + mutu dari dokumen. */
  for (const u of jual) {
    if (typeof u.luasTanah !== "number" || u.luasTanah < 30 || u.luasTanah > 100)
      errors.push(`INV-04 ${u.kode}: luasTanah tidak masuk akal (${u.luasTanah})`);
    if (typeof u.mutuKualitas !== "number" || u.mutuKualitas < 0)
      errors.push(`INV-04 ${u.kode}: mutuKualitas tidak valid (${u.mutuKualitas})`);
    if (u.mutuKualitas % 500 !== 0)
      errors.push(`INV-04 ${u.kode}: mutuKualitas ${u.mutuKualitas} bukan kelipatan Rp500 - indikasi angka hasil tebakan`);
  }

  /* INV-05: status hanya boleh 'tersedia' | 'terjual' | null. */
  const STATUS_VALID = new Set(["tersedia", "terjual", null]);
  for (const u of units) {
    if (!STATUS_VALID.has(u.status))
      errors.push(`INV-05 ${u.kode}: status "${u.status}" tidak dikenal`);
  }

  /* INV-06: unit tanpa status tidak boleh dihitung sebagai tersedia.
     Peringatan, bukan error: ketiadaan status adalah keputusan owner, bukan
     cacat data, jadi tidak boleh memblokir perbaikan harga yang lain. */
  const tanpaStatus = jual.filter((u) => u.status === null);
  if (tanpaStatus.length > 0) {
    warnings.push(
      `INV-06 ${tanpaStatus.length} unit tanpa status akan tampil sebagai ` +
        `"belum dapat dipastikan": ${tanpaStatus.map((u) => u.kode).join(", ")}. ` +
        `Isi src/data/unit-status.json agar tampil sebagai tersedia atau terjual.`
    );
  }

  /* INV-07: dalam satu blok, luas tanah tidak boleh naik monoton
     (> 1 m2) sementara mutu turun - pola ini yang dulu menyebabkan
     seluruh kolom mutu Blok E bergeser satu baris. */
  for (const blok of Object.keys(DOKUMEN.blok)) {
    const grup = jual.filter((u) => u.blok === blok);
    for (let i = 1; i < grup.length; i++) {
      const prev = grup[i - 1];
      const cur = grup[i];
      if (cur.luasTanah > prev.luasTanah + 1 && cur.mutuKualitas < prev.mutuKualitas) {
        errors.push(
          `INV-07 Blok ${blok}: ${prev.kode} (${prev.luasTanah} m2 / ${prev.mutuKualitas}) ` +
            `diikuti ${cur.kode} (${cur.luasTanah} m2 / ${cur.mutuKualitas}) - ` +
            `luas naik tapi mutu turun`
        );
      }
    }
  }

  report(errors, warnings, units);
}

function diffUnit(committed, expected) {
  const map = new Map(expected.map((u) => [u.kode, u]));
  const bagian = [];
  for (const c of committed) {
    const e = map.get(c.kode);
    if (!e) {
      bagian.push(`${c.kode}: ada di pricelist.json, tidak ada di dokumen`);
      continue;
    }
    for (const field of ["luasTanah", "mutuKualitas", "hook", "status", "tipe"]) {
      if (c[field] !== e[field])
        bagian.push(`${c.kode}.${field}: ${JSON.stringify(c[field])} -> ${JSON.stringify(e[field])}`);
    }
  }
  const ada = new Set(committed.map((u) => u.kode));
  for (const e of expected) if (!ada.has(e.kode)) bagian.push(`${e.kode}: hilang dari pricelist.json`);
  return bagian.slice(0, 12).join("\n         ");
}

function report(errors, warnings, units) {
  const jual = units.filter((u) => u.luasTanah !== null);
  const terjual = jual.filter((u) => u.status === "terjual");
  const tersedia = jual.filter((u) => u.status === "tersedia");
  const belum = jual.filter((u) => u.status === null);

  console.log(`Pricelist   : ${jual.length} unit dijual (${tersedia.length} tersedia, ${terjual.length} terjual, ${belum.length} belum dipastikan)`);
  console.log(`Hook        : ${jual.filter((u) => u.hook).length} unit`);

  for (const w of warnings) console.warn(`\nPERINGATAN:\n  - ${w}`);

  if (errors.length === 0) {
    console.log("\nOK - semua unit cocok dengan pricelist resmi.");
    return;
  }
  console.error(`\n${errors.length} masalah:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exitCode = 1;
}

const cmd = process.argv[2];
if (cmd === "build") cmdBuild();
else if (cmd === "show") cmdShow();
else if (cmd === "check") cmdCheck();
else {
  console.error("Pakai: node scripts/pricelist.mjs build|check|show");
  process.exitCode = 1;
}