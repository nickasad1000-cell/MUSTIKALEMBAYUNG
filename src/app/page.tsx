import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Route,
  Zap,
} from "lucide-react";
import { getAvailableUnits as getAvailableTypes } from "@/lib/units";
import { site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollManager } from "@/components/site/scroll-manager";
import { Reveal } from "@/components/site/reveal";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { DocGrid } from "@/components/site/doc-grid";
import { SmoothLink } from "@/components/site/smooth-link";
import { UnitCatalog } from "@/components/catalog/unit-catalog";
import { PricelistTable } from "@/components/site/pricelist-table";
import { getSellableUnits } from "@/lib/pricelist";
import { LeadForm } from "@/components/forms/lead-form";
import { InstallmentCalculator } from "@/components/site/installment-calculator";
import { FloatingWa } from "@/components/site/floating-wa";

export default function Home() {
  const units = getAvailableTypes();
  const allUnits = getSellableUnits();

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <ScrollManager />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-navy-950">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[46dvh] min-h-[320px] lg:h-auto lg:min-h-[100dvh]">
              <Image
                src="/assets/hero.webp"
                alt="Fasad rumah Mustika Lembayung, Sumbersuko Lumajang"
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
                <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
                  Rumah Subsidi{" "}
                  <span className="text-gold-400">Tipe 36/60</span>
                  <span className="block">di Lumajang</span>
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-navy-100 sm:text-lg">
                  LT 60 m² · LB 36 m² · 2 kamar tidur · 1 kamar mandi. Harga
                  Rp166 juta.
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
                    Lihat daftar unit
                  </SmoothLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Katalog Unit */}
        <section id="katalog" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Tipe 36/60
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
                LT 60 m² · LB 36 m², 2 kamar tidur, dan 1 kamar mandi.
              </p>
            </Reveal>
            <UnitCatalog units={units} />
          </div>
        </section>

        {/* Daftar unit */}
        <PricelistTable units={allUnits} />

        {/* Simulasi angsuran */}
        <InstallmentCalculator />

        {/* Siteplan & KPR */}
        <section id="harga" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Siteplan &amp; KPR
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-800/70">
                Siteplan, denah unit, dan dokumen persyaratan KPR.
              </p>
            </Reveal>
            <DocGrid />
          </div>
        </section>

        {/* Galeri */}
        <section id="galeri" className="scroll-mt-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Foto unit
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
                Dokumentasi unit dan lingkungan perumahan.
              </p>
            </Reveal>
            <GalleryGrid />
          </div>
        </section>

        {/* Lokasi */}
        <section id="lokasi" className="scroll-mt-20 bg-paper">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-12">
              <Reveal className="lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                  Alamat &amp; akses
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                  Lokasi
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-navy-800/70">
                  Akses langsung dari Jalan Kabupaten di kawasan Sumbersuko,
                  Lumajang.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-navy-100 sm:p-6">
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                        <MapPin size={20} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-navy-800/50">
                          Alamat
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-navy-950">
                          {site.address}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                        <Route size={20} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-navy-800/50">
                          Akses
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-navy-950">
                          Jalan Kabupaten dengan ROW 6-7 m.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                        <MessageCircle size={20} />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-navy-800/50">
                          Survey &amp; informasi
                        </p>
                        <a
                          href={waLink(
                            "jadwal survey ke lokasi Mustika Lembayung"
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm font-semibold text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
                        >
                          {site.whatsappDisplay}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <a
                  href={waLink("jadwal survey ke lokasi Mustika Lembayung")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98] sm:w-auto"
                >
                  <MessageCircle size={18} />
                  Jadwalkan Survey
                </a>
              </Reveal>

              <Reveal delay={100} className="lg:col-span-3">
                <div className="overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-navy-100">
                  <iframe
                    title={`Peta lokasi ${site.name}`}
                    src={site.mapsEmbed}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="pointer-events-none block h-[360px] w-full rounded-xl border-0 sm:h-[420px] md:pointer-events-auto lg:h-[460px]"
                  />
                </div>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-950"
                >
                  <ArrowUpRight size={16} />
                  Buka peta di Google Maps
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA / Kontak */}
        <section id="kontak" className="scroll-mt-20 bg-white">
          <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8 lg:py-28">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                Konsultasi
              </p>
              <h2 className="mt-3 max-w-md text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Hubungi pemasaran
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-navy-800/70">
                Isi data untuk konsultasi KPR dan jadwal survey.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Dibantu simulasi KPR dan syarat dokumen",
                  "Jadwal survey menyesuaikan Anda",
                  "Dibalas langsung oleh tim pemasaran",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-navy-800/80"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-gold-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>

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
