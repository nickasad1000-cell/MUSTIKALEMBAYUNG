export const site = {
  name: "Mustika Lembayung",
  developer: "PT. Lembayung Wanantara Padha",
  tagline: "Rumah Subsidi Tipe 36/60 di Sumbersuko",
  description:
    "Perumahan Mustika Lembayung di Sumbersuko, Lumajang. Rumah subsidi tipe 36/60 dengan harga Rp166 juta.",
  whatsapp: "6281333372016",
  whatsappDisplay: "0813-3337-2016",
  address: "Sumbersuko, Lumajang, Jawa Timur",
  mapsQuery: "Perumahan Mustika Lembayung Syahfalah, Sumbersuko, Lumajang",
  mapsEmbed:
    "https://www.google.com/maps?q=-8.1670075,113.1694113&z=17&output=embed",
  mapsLink: "https://maps.app.goo.gl/KZAXAtritUGe6fkD9",
  promo: "Booking Rp100 ribu",
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
  { src: "/assets/teras-carport.webp", caption: "Teras & Carport Tipe 36/60" },
  { src: "/assets/ruang-tamu.webp", caption: "Ruang Tamu & Dapur" },
  { src: "/assets/kamar-tidur.webp", caption: "Kamar Tidur" },
  { src: "/assets/kamar-tidur-2.webp", caption: "Kamar Tidur — Tampak Lain" },
  { src: "/assets/kamar-mandi.webp", caption: "Kamar Mandi" },
  { src: "/assets/tampak-depan.webp", caption: "Tampak Depan Rumah" },
];

export interface DocItem {
  src: string;
  title: string;
  description: string;
}

export const docItems: DocItem[] = [
  {
    src: "/assets/siteplan.webp",
    title: "Siteplan Lokasi",
    description:
      "Denah blok A–E, lebar jalan ROW 6–7 m, pos satpam, dan akses Jalan Kabupaten.",
  },
  {
    src: "/assets/denah-tipe-36.webp",
    title: "Denah Tipe 36/60",
    description:
      "Denah 2 kamar tidur, 1 kamar mandi, carport, dan area servis.",
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
  { value: "Rp2,5 jt", label: "Tanda jadi (belum mengurangi harga)" },
  { value: "Rp1,07 jt", label: "Angsuran per bulan · 20 th" },
];

/**
 * Ketentuan yang benar-benar tertulis di pricelist resmi. Jangan menambah
 * biaya lain (mis. "selisih tanah per m2") tanpa dokumen pendukung.
 */
export const pricelistNotes = [
  "Blok hook/pojok +Rp5 jt.",
  "Tanda jadi Rp2,5 jt, tidak mengurangi harga rumah.",
  "Peningkatan mutu kualitas dibayar maksimal 14 hari setelah tanda jadi, sebagai uang muka.",
  "Harga jual dan angsuran mengikuti keputusan bank.",
] as const;
