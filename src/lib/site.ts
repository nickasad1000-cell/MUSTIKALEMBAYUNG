export const site = {
  name: "Mustika Lembayung",
  developer: "PT. Lembayung Wanantara Padha",
  tagline: "Siap Huni · Tanpa Perlu Renovasi",
  description:
    "Perumahan Mustika Lembayung Sumbersuko, Lumajang. Rumah subsidi dengan spek komersial — siap huni tanpa renovasi, full granit, canopy carport, kompor tanam. Booking hanya Rp100 ribu.",
  whatsapp: "6281333372016",
  whatsappDisplay: "0813-3337-2016",
  address: "Sumbersuko, Lumajang, Jawa Timur",
  mapsQuery: "Perumahan Mustika Lembayung Syahfalah, Sumbersuko, Lumajang",
  mapsEmbed:
    "https://www.google.com/maps?q=-8.1670075,113.1694113&z=17&output=embed",
  mapsLink: "https://maps.app.goo.gl/KZAXAtritUGe6fkD9",
  promo: "Booking hanya Rp100 ribu — bisa langsung terima kunci",
  readyUnits: 20,
} as const;

export function waLink(text?: string): string {
  const message = text
    ? `Halo, saya tertarik dengan ${text}. Boleh minta info lengkap?`
    : "Halo, saya tertarik dengan Perumahan Mustika Lembayung Sumbersuko.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  { src: "/assets/teras-carport.webp", caption: "Teras & Carport Tipe 36" },
  { src: "/assets/ruang-tamu.webp", caption: "Ruang Tamu & Dapur" },
  { src: "/assets/kamar-tidur.webp", caption: "Kamar Tidur" },
  { src: "/assets/kamar-tidur-2.webp", caption: "Kamar Tidur — Tampak Lain" },
  { src: "/assets/kamar-mandi.webp", caption: "Kamar Mandi" },
  { src: "/assets/tampak-depan.webp", caption: "Tampak Depan Rumah" },
  { src: "/assets/denah-tipe-36.webp", caption: "Denah Tipe 36" },
];

export interface DocItem {
  src: string;
  title: string;
  description: string;
}

export const docItems: DocItem[] = [
  {
    src: "/assets/daftar-harga.webp",
    title: "Daftar Harga per Blok",
    description:
      "Harga tipe 36/60 blok A–E, biaya peningkatan mutu kualitas, dan blok hook.",
  },
  {
    src: "/assets/siteplan.webp",
    title: "Siteplan Lokasi",
    description:
      "Denah blok A–E, lebar jalan ROW 6–7 m, pos satpam, dan akses Jalan Kabupaten.",
  },
  {
    src: "/assets/ketentuan-kpr.webp",
    title: "Simulasi & Ketentuan KPR",
    description:
      "DP, plafond, simulasi angsuran 10/15/20 tahun, ketentuan & persyaratan berkas.",
  },
];

export const pricingStats = [
  { value: "Rp166 jt", label: "Harga unit tipe 36/60" },
  { value: "Rp5,66 jt", label: "DP (tanda jadi + mutu)" },
  { value: "Rp1,07 jt", label: "Angsuran per bulan · 20 th" },
];
