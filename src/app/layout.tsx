import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { pricelistCounts } from "@/lib/pricelist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mustikalembayung.vercel.app"),
  title: "Mustika Lembayung Sumbersuko — Rumah Siap Huni Tanpa Renovasi | Lumajang",
  description: `Perumahan Mustika Lembayung Sumbersuko, Lumajang. Rumah subsidi dengan spek komersial — siap huni tanpa renovasi, full granit, canopy carport. Booking hanya Rp100 ribu. Ready ${pricelistCounts().ready} unit.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mustika Lembayung Sumbersuko — Rumah Siap Huni Tanpa Renovasi",
    description:
      "Rumah subsidi dengan spek komersial di Sumbersuko, Lumajang. Full granit, canopy carport, kompor tanam. Booking hanya Rp100 ribu — langsung terima kunci.",
    url: "/",
    siteName: "Mustika Lembayung Sumbersuko",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustika Lembayung Sumbersuko — Rumah Siap Huni Tanpa Renovasi",
    description:
      "Rumah subsidi dengan spek komersial di Sumbersuko, Lumajang. Booking hanya Rp100 ribu.",
    images: ["/assets/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Mustika Lembayung Sumbersuko",
  description:
    "Perumahan rumah subsidi siap huni tanpa renovasi di Sumbersuko, Lumajang oleh PT. Lembayung Wanantara Padha.",
  url: "https://mustikalembayung.vercel.app",
  telephone: "+6281333372016",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ds. Rekesan RT.02 RW.10, Sumbersuko",
    addressLocality: "Lumajang",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
  geo: { "@type": "GeoCoordinates", latitude: -8.1670075, longitude: 113.1694113 },
  offers: {
    "@type": "Offer",
    price: "166000000",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
