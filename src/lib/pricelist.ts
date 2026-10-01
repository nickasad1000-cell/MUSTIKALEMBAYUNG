import pricelist from "@/data/pricelist.json";

/**
 * Status unit. `null` berarti belum ada data operasional - bukan berarti
 * tersedia. Unit seperti ini ditampilkan sebagai "Belum dapat dipastikan",
 * tidak pernah dihitung sebagai tersedia.
 */
export type UnitStatus = "tersedia" | "terjual" | null;

export type PricelistUnit = {
  kode: string;
  blok: string;
  tipe: string;
  luasTanah: number | null;
  mutuKualitas: number | null;
  /** Unit hook/pojok: tambah Rp5.000.000 sesuai pricelist. */
  hook: boolean;
  hargaDasar: number;
  status: UnitStatus;
  /** Catatan sumber untuk unit yang belum ada di pricelist resmi. */
  flag?: string;
};

const units = pricelist as PricelistUnit[];

/**
 * Unit yang terlihat di siteplan tapi belum ada di pricelist resmi, jadi belum
 * dibuka penjualan. Tidak ditampilkan sebagai unit yang bisa dibeli.
 */
const PRA_PENJUALAN = new Set(
  units.filter((u) => u.luasTanah === null).map((u) => u.kode.toLowerCase())
);

export function isPresaleUnit(kode: string): boolean {
  return PRA_PENJUALAN.has(kode.toLowerCase());
}

/** Unit yang punya harga resmi di pricelist. */
export function getSellableUnits(): PricelistUnit[] {
  return units.filter((u) => !isPresaleUnit(u.kode));
}

export function getPricelistUnit(kode: string): PricelistUnit | undefined {
  return units.find((u) => u.kode.toLowerCase() === kode.toLowerCase());
}

/** Status yang aman ditampilkan publik: null berarti belum dipastikan. */
export function statusLabel(status: UnitStatus): string {
  if (status === "terjual") return "Terjual";
  if (status === "tersedia") return "Tersedia";
  return "Belum dapat dipastikan";
}

/** True hanya kalau statusnya benar-benar "tersedia", bukan null. */
export function isTersedia(unit: PricelistUnit): boolean {
  return unit.status === "tersedia";
}

export function isTerjual(unit: PricelistUnit): boolean {
  return unit.status === "terjual";
}

/**
 * Tambahan hook sesuai pricelist. Dihitung, bukan ditulis manual, supaya tidak
 * bisa melenceng dari angka di dokumen.
 */
export const HOOK_TAMBAHAN = 5_000_000;
export const TANDA_JADI = 2_500_000;

/** Total yang harus dibayar di muka: tanda jadi + mutu (hook sudah di dalam mutu). */
export function totalUangMuka(unit: PricelistUnit): number {
  return TANDA_JADI + (unit.mutuKualitas ?? 0) + (unit.hook ? HOOK_TAMBAHAN : 0);
}

export function pricelistCounts(): {
  total: number;
  terjual: number;
  tersedia: number;
  belumPasti: number;
} {
  const jual = getSellableUnits();
  const terjual = jual.filter(isTerjual).length;
  const tersedia = jual.filter(isTersedia).length;
  return { total: jual.length, terjual, tersedia, belumPasti: jual.length - terjual - tersedia };
}