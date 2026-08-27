import pricelist from "@/data/pricelist.json";

export type PricelistUnit = {
  kode: string;
  blok: string;
  tipe: string;
  luasTanah: number | null;
  mutuKualitas: number | null;
  hargaDasar: number;
  status?: string;
};

const units = pricelist as PricelistUnit[];

/** Blok E1–E9 belum dibuka penjualan — tidak tampil di publik. */
const PRESALE_KODES = new Set(
  ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9"]
);

export function getSellableUnits(): PricelistUnit[] {
  return units.filter((u) => !PRESALE_KODES.has(u.kode.toLowerCase()));
}

export function isPresaleUnit(kode: string): boolean {
  return PRESALE_KODES.has(kode.toLowerCase());
}

export function getPricelistUnits(): PricelistUnit[] {
  return units;
}

export function getPricelistUnit(kode: string): PricelistUnit | undefined {
  return units.find((u) => u.kode.toLowerCase() === kode.toLowerCase());
}

export function pricelistCounts(): { total: number; terjual: number; ready: number } {
  const sellable = getSellableUnits();
  const terjual = sellable.filter((u) => u.status === "terjual").length;
  return { total: sellable.length, terjual, ready: sellable.length - terjual };
}
