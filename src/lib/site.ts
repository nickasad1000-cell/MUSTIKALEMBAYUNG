export const site = {
  name: "Mustika Lembayung",
  tagline: "Perumahan Premium Keluarga Muda",
  description:
    "Katalog lengkap Perumahan Mustika Lembayung. Temukan hunian nyaman untuk keluarga Anda: tipe rumah, denah, harga, dan fasilitas.",
  whatsapp: "620000000000",
  address: "Jl. Mustika Lembayung No. 1, Bandung, Jawa Barat",
  mapsQuery: "Mustika Lembayung, Bandung, Jawa Barat",
} as const;

export function waLink(text?: string): string {
  const message = text
    ? `Halo, saya tertarik dengan ${text}. Boleh minta info lengkap?`
    : "Halo, saya tertarik dengan Perumahan Mustika Lembayung.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface GalleryItem {
  src?: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  { caption: "Gerbang Utama Cluster" },
  { caption: "Taman Sentral" },
  { caption: "Contoh Rumah Tipe 36" },
  { caption: "Contoh Rumah Tipe 45" },
  { caption: "Fasilitas Playground" },
  { caption: "Suasana Sore Hari" },
];
