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
  price: number;
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

export const STATUS_LABELS: Record<UnitStatus, string> = {
  available: "Tersedia",
  sold: "Terjual",
  "coming-soon": "Segera Hadir",
};
