import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
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

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mustikalembayung.vercel.app"),
  title: "Mustika Lembayung Sumbersuko — Rumah Subsidi Tipe 36/60 | Lumajang",
  description: `Perumahan Mustika Lembayung di Sumbersuko, Lumajang. Rumah subsidi tipe 36/60, harga Rp166 juta. ${pricelistCounts().tersedia} unit tersedia.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mustika Lembayung Sumbersuko — Rumah Subsidi Tipe 36/60",
    description:
      "Rumah subsidi tipe 36/60 di Sumbersuko, Lumajang. Harga Rp166 juta, booking Rp100 ribu.",
    url: "/",
    siteName: "Mustika Lembayung Sumbersuko",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustika Lembayung Sumbersuko — Rumah Subsidi Tipe 36/60",
    description:
      "Rumah subsidi tipe 36/60 di Sumbersuko, Lumajang. Harga Rp166 juta.",
    images: ["/assets/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Mustika Lembayung Sumbersuko",
  description:
    "Perumahan rumah subsidi tipe 36/60 di Sumbersuko, Lumajang oleh PT. Lembayung Wanantara Padha.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
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
