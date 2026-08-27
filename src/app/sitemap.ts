import type { MetadataRoute } from "next";
import { getPricelistUnits } from "@/lib/pricelist";

const BASE = "https://mustikalembayung.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/units/tipe-36`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPricelistUnits().map((u) => ({
      url: `${BASE}/unit/${u.kode.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
