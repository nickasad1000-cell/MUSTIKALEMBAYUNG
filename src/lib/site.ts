export const site = {
  name: "Mustika Lembayung",
  developer: "PT. Lembayung Wanantara Padha",
  tagline: "Siap Huni · Tanpa Perlu Renovasi",
  description:
    "Perumahan Mustika Lembayung Sumbersuko, Lumajang. Rumah subsidi berspek komersial — siap huni tanpa renovasi, full granit, canopy carport, kompor tanam. Booking hanya Rp100 ribu.",
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
  src?: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  { src: "/assets/teras-carport.jpg", caption: "Teras & Carport Tipe 36" },
  { src: "/assets/ruang-tamu.jpg", caption: "Ruang Tamu & Dapur" },
  { src: "/assets/kamar-tidur.jpg", caption: "Kamar Tidur" },
  { src: "/assets/kamar-mandi.jpg", caption: "Kamar Mandi" },
  { src: "/assets/tampak-depan.jpg", caption: "Tampak Depan Rumah" },
  { src: "/assets/denah-tipe-36.png", caption: "Denah Tipe 36" },
];
