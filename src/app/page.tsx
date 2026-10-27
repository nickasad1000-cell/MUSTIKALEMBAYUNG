import Image from "next/image";
import {
  Building2,
  House,
  MapPin,
  MessageCircle,
  Tag,
  Zap,
} from "lucide-react";
import { getAvailableUnits as getAvailableTypes } from "@/lib/units";
import { pricingStats, site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollManager } from "@/components/site/scroll-manager";
import { Reveal } from "@/components/site/reveal";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { DocGrid } from "@/components/site/doc-grid";
import { SmoothLink } from "@/components/site/smooth-link";
import { UnitCatalog } from "@/components/catalog/unit-catalog";
import { PricelistTable } from "@/components/site/pricelist-table";
import { getAvailableUnits as getAvailablePricelistUnits } from "@/lib/pricelist";
import { LeadForm } from "@/components/forms/lead-form";
import { InstallmentCalculator } from "@/components/site/installment-calculator";
import { FloatingWa } from "@/components/site/floating-wa";

const HIGHLIGHTS = [
  {
    icon: Tag,
    title: "Booking Rp 100 ribu",
    description: "Free DP dan free biaya balik nama.",
  },
  {
    icon: Building2,
    title: "Spek Komersial",
    description: "Lantai full granit, kusen aluminium, dan atap spandek.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description:
      "Sumbersuko, dekat akses jalan kabupaten, sekolah, dan pasar.",
  },
  {
    icon: House,
    title: "Siap Huni Tanpa Renovasi",
    description: "Canopy carport, pagar, meja dapur, dan kompor tanam.",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa biaya booking rumah di Mustika Lembayung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Booking hanya Rp100 ribu — free DP, free biaya balik nama, dan bisa langsung terima kunci karena semua unit siap huni tanpa renovasi.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa harga dan angsuran per bulan rumah Tipe 36?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Harga unit tipe 36/60 mulai Rp166 jt dengan angsuran flat sekitar Rp1,07 jt per bulan (tenor 20 tahun). Simulasi lengkap 10/15/20 tahun tersedia di website.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah rumahnya benar-benar siap huni tanpa renovasi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya. Setiap unit sudah termasuk canopy carport, pagar pembatas & roster depan, meja dapur set, kompor tanam, lantai granit, kusen aluminium, dan atap spandek.",
      },
    },
    {
      "@type": "Question",
      name: "Di mana lokasi Perumahan Mustika Lembayung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sumbersuko, Lumajang, Jawa Timur — dekat akses jalan kabupaten, sekolah, pasar, dan pusat keramaian. Titik lokasi tersedia di Google Maps pada bagian Lokasi.",
      },
    },
  ],
};

export default function Home() {
  const units = getAvailableTypes();
  const readyUnits = getAvailablePricelistUnits();

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <ScrollManager />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-navy-950">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[46dvh] min-h-[320px] lg:h-auto lg:min-h-[100dvh]">
              <Image
                src="/assets/hero.webp"
                alt="Fasad rumah siap huni Mustika Lembayung, Sumbersuko Lumajang"
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_45%] lg:object-[50%_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/60 lg:from-navy-950/40 lg:via-transparent lg:to-navy-950/50" />
            </div>

            <div className="flex items-center px-4 py-14 sm:px-8 lg:min-h-[100dvh] lg:px-14 xl:px-20">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                  Sumbersuko — Lumajang
                </p>
                <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
                  Rumah Subsidi <span className="text-gold-400">SIAP HUNI</span>
                  <span className="block">Tanpa Renovasi di Lumajang</span>
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-navy-100 sm:text-lg">
                  Spek komersial, full granit, canopy carport, dan kompor tanam.
                  Booking hanya Rp 100 ribu, bisa langsung terima kunci.
                </p>
                <p className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-gold-400/10 px-5 py-3 text-sm font-extrabold text-gold-300 ring-1 ring-gold-400/50 sm:text-base">
                  <Zap size={20} fill="currentColor" className="text-gold-400" />
                  Booking hanya Rp 100 ribu
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waLink(
                      "rumah subsidi Mustika Lembayung di Sumbersuko"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
                  >
                    <MessageCircle size={18} />
                    Chat WhatsApp
                  </a>
                  <SmoothLink
                    target="pricelist"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/60 active:scale-[0.98]"
                  >
                    Lihat Pricelist
                  </SmoothLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section
          id="keunggulan"
          className="scroll-mt-20 border-b border-navy-100 bg-white"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <item.icon size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-800/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Katalog Unit */}
        <section id="katalog" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Satu tipe, satu standar kualitas
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
                Semua unit dibangun dengan spesifikasi yang sama baiknya — pilih
                unit yang paling pas untuk keluarga Anda.
              </p>
            </Reveal>
            <UnitCatalog units={units} />
          </div>
        </section>

        {/* Pricelist per unit */}
        <PricelistTable units={readyUnits} />

        {/* Simulasi angsuran */}
        <InstallmentCalculator />

        {/* Harga & Siteplan */}
        <section id="harga" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Siteplan &amp; persyaratan KPR
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-800/70">
                Siteplan dan simulasi angsuran resmi developer. Klik dokumen
                untuk memperbesar.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {pricingStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 100}>
                  <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-100">
                    <p className="text-3xl font-extrabold tracking-tight text-navy-950 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-navy-800/70">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <DocGrid />
          </div>
        </section>

        {/* Galeri */}
        <section id="galeri" className="scroll-mt-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Lihat langsung unit &amp; lingkungannya
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
                Foto asli unit siap huni. Klik foto untuk memperbesar.
              </p>
            </Reveal>
            <GalleryGrid />
          </div>
        </section>

        {/* Lokasi */}
        <section id="lokasi" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-10 lg:grid-cols-5">
              <Reveal className="lg:col-span-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                  Lokasi strategis di Sumbersuko
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={20}
                      className="mt-0.5 shrink-0 text-navy-600"
                    />
                    <p className="text-sm leading-relaxed text-navy-800/80">
                      {site.address} — akses mudah ke jalan kabupaten, sekolah,
                      pasar, dan pusat keramaian.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-navy-600"
                    />
                    <p className="text-sm leading-relaxed text-navy-800/80">
                      Jadwalkan survey ke lokasi:{" "}
                      <a
                        href={waLink(
                          "jadwal survey ke lokasi Mustika Lembayung"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
                      >
                        {site.whatsappDisplay}
                      </a>
                    </p>
                  </div>
                </div>
                <a
                  href={waLink("jadwal survey ke lokasi Mustika Lembayung")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  Jadwalkan Survey
                </a>
              </Reveal>

              <Reveal delay={100} className="lg:col-span-3">
                <div className="overflow-hidden rounded-2xl ring-1 ring-navy-100">
                  <iframe
                    title={`Peta lokasi ${site.name}`}
                    src={site.mapsEmbed}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[420px] w-full border-0"
                  />
                </div>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-950"
                >
                  Buka di Google Maps →
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA / Kontak */}
        <section id="kontak" className="scroll-mt-20 bg-white">
          <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Tertarik? Kirim minat Anda
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-navy-800/70">
                Tinggalkan data Anda — tim pemasaran kami akan menghubungi Anda
                untuk konsultasi KPR dan jadwal survey.
              </p>
              <p className="mt-6 text-sm font-semibold text-navy-800">
                Butuh cepat?{" "}
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
                >
                  WhatsApp {site.whatsappDisplay}
                </a>
              </p>
            </Reveal>
            <Reveal delay={100}>
              <LeadForm units={units} />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWa />
    </div>
  );
}
