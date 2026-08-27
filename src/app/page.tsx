import Image from "next/image";
import { getAllUnits } from "@/lib/units";
import { pricingStats, site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollManager } from "@/components/site/scroll-manager";
import { Reveal } from "@/components/site/reveal";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { DocGrid } from "@/components/site/doc-grid";
import { SmoothLink } from "@/components/site/smooth-link";
import { UnitCatalog } from "@/components/catalog/unit-catalog";
import { LeadForm } from "@/components/forms/lead-form";
import { InstallmentCalculator } from "@/components/site/installment-calculator";
import { FloatingWa } from "@/components/site/floating-wa";

const HIGHLIGHTS = [
  {
    title: "Siap Huni Tanpa Renovasi",
    description:
      "Setiap unit sudah termasuk canopy carport, pagar pembatas & roster depan, meja dapur set, dan kompor tanam. Bawa barang, langsung tinggal.",
  },
  {
    title: "Spek Komersial",
    description:
      "Lantai full granit, kusen aluminium, atap spandek, dan finishing cat rapi — kualitas bangunan setara rumah komersial dengan harga subsidi.",
  },
  {
    title: "Lokasi Strategis",
    description:
      "Sumbersuko, Lumajang — dekat akses jalan utama, sekolah, pasar, dan pusat keramaian. Lingkungan pemukiman yang ramai dan aman.",
  },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-navy-950/10 bg-navy-950/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </p>
  );
}

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
  const units = getAllUnits();

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
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <Image
            src="/assets/hero.webp"
            alt=""
            fill
            preload
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="object-cover opacity-40"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-7 px-6 pb-28 pt-40 sm:pb-36 sm:pt-52">
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
              {site.tagline}
            </p>
            <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Rumah Siap Huni di{" "}
              <span className="text-gold-400">Mustika Lembayung</span>{" "}
              Sumbersuko
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/90">
              Rumah subsidi dengan spek komersial — full granit, canopy
              carport, kompor tanam. Booking hanya <strong>Rp100 ribu</strong>,
              bisa langsung terima kunci. Ready {site.readyUnits} unit.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <SmoothLink
                target="katalog"
                className="flex h-12 items-center justify-center rounded-full bg-white px-7 font-medium text-navy-950 transition duration-300 ease-brand hover:bg-gold-400 active:scale-[0.97]"
              >
                Lihat Katalog Unit
              </SmoothLink>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 font-medium text-white backdrop-blur transition duration-300 ease-brand hover:bg-white/20 active:scale-[0.97]"
              >
                Chat WhatsApp {site.whatsappDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Promo strip */}
        <section className="border-b border-gold-500/20 bg-gold-400 py-4">
          <p className="mx-auto max-w-6xl px-6 text-center text-sm font-semibold text-navy-950">
            🎉 Promo Siap Huni: booking cuma Rp100 ribu — free DP, free biaya
            balik nama, cicilan flat ±Rp1 juta sampai lunas.
          </p>
        </section>

        {/* Keunggulan */}
        <section id="keunggulan" className="scroll-mt-28 bg-zinc-50 py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <Eyebrow>Kenapa Mustika Lembayung</Eyebrow>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Rumah subsidi yang tidak terasa seperti rumah subsidi
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {HIGHLIGHTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 120}>
                  <div className="h-full rounded-3xl border border-navy-950/5 bg-navy-950/[0.03] p-2">
                    <div className="h-full rounded-[1.25rem] bg-white p-7 shadow-sm">
                      <span
                        aria-hidden
                        className="font-heading text-3xl font-semibold text-gold-500"
                      >
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-navy-950">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-zinc-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Katalog Unit */}
        <section id="katalog" className="scroll-mt-28 py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <Eyebrow>Katalog Unit</Eyebrow>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Pilih tipe hunian untuk keluarga Anda
              </h2>
            </Reveal>
            <UnitCatalog units={units} />
          </div>
        </section>

        {/* Harga & Siteplan */}
        <section id="harga" className="scroll-mt-28 bg-zinc-50 py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <Eyebrow>Transparan & Jelas</Eyebrow>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Harga & siteplan
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-600">
                Klik dokumen untuk memperbesar — semua angka resmi dari
                developer, tanpa biaya tersembunyi.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {pricingStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 100}>
                  <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-sm">
                    <p className="font-heading text-3xl font-semibold tracking-tight text-navy-950 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <InstallmentCalculator />
            <DocGrid />
          </div>
        </section>

        {/* Galeri */}
        <section id="galeri" className="scroll-mt-28 py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <Eyebrow>Galeri</Eyebrow>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Lihat langsung unit & lingkungannya
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-600">
                Foto asli unit siap huni. Klik foto untuk memperbesar.
              </p>
            </Reveal>
            <GalleryGrid />
          </div>
        </section>

        {/* Lokasi */}
        <section id="lokasi" className="scroll-mt-28 bg-zinc-50 py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <Eyebrow>Lokasi Strategis</Eyebrow>
              <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Sumbersuko, Lumajang
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-600">
                {site.address} — akses mudah ke jalan kabupaten, sekolah,
                pasar, dan pusat keramaian.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-10 overflow-hidden rounded-3xl border border-navy-950/5 shadow-sm">
                <iframe
                  title={`Peta lokasi ${site.name}`}
                  src={site.mapsEmbed}
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-navy-700 transition-colors duration-300 hover:text-navy-950"
              >
                📍 Buka di Google Maps →
              </a>
            </Reveal>
          </div>
        </section>

        {/* CTA / Kontak */}
        <section id="kontak" className="scroll-mt-28 bg-navy-950 py-24 text-white sm:py-32">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Konsultasi Gratis
              </p>
              <h2 className="mt-5 max-w-md font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                Siap menempati rumah impian Anda?
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/80">
                Tim marketing kami siap membantu Anda — mulai dari survei
                lokasi, simulasi KPR, hingga proses akad. Isi form di samping
                atau chat langsung via WhatsApp.
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex h-12 w-fit items-center justify-center rounded-full bg-white px-8 font-medium text-navy-950 transition duration-300 ease-brand hover:bg-gold-400 active:scale-[0.97]"
              >
                Konsultasi Gratis via WhatsApp
              </a>
              <p className="mt-6 text-sm text-white/60">
                ☎ {site.whatsappDisplay} · {site.address}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="flex justify-center lg:justify-end">
                <LeadForm units={units} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWa />
    </div>
  );
}
