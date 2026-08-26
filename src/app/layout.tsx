import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mustika Lembayung Sumbersuko — Rumah Siap Huni Tanpa Renovasi | Lumajang",
  description:
    "Perumahan Mustika Lembayung Sumbersuko, Lumajang. Rumah subsidi berspek komersial — siap huni tanpa renovasi, full granit, canopy carport. Booking hanya Rp100 ribu. Ready 20 unit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
