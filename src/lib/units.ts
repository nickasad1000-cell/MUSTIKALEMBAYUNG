import unitsData from "@/data/units.json";

export type UnitStatus = "available" | "sold" | "coming-soon";

export interface Unit {
  slug: string;
  name: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  price?: number | null;
  image?: string;
  denah?: string;
  status: UnitStatus;
  carport: number;
  features: string[];
}

const units = unitsData as Unit[];

export function getAllUnits(): Unit[] {
  return units;
}

export function getUnitBySlug(slug: string): Unit | undefined {
  return units.find((unit) => unit.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Format ringkas gaya "Rp166 jt" / "Rp1,25 M" — konsisten dengan pricingStats. */
export function priceShort(price: number): string {
  if (price >= 1_000_000_000)
    return `Rp${(price / 1_000_000_000).toFixed(2).replace(".", ",")} M`;
  return `Rp${Math.round(price / 1_000_000)} jt`;
}

export function priceLabel(unit: Unit): string {
  return unit.price ? formatPrice(unit.price) : "Hubungi untuk harga";
}

export const STATUS_LABELS: Record<UnitStatus, string> = {
  available: "Tersedia",
  sold: "Terjual",
  "coming-soon": "Segera Hadir",
};
