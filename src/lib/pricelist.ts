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

export function getPricelistUnits(): PricelistUnit[] {
  return units;
}

export function getPricelistUnit(kode: string): PricelistUnit | undefined {
  return units.find((u) => u.kode.toLowerCase() === kode.toLowerCase());
}

export function pricelistCounts(): { total: number; terjual: number; ready: number } {
  const terjual = units.filter((u) => u.status === "terjual").length;
  return { total: units.length, terjual, ready: units.length - terjual };
}
