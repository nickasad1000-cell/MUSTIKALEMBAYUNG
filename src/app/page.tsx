import Image from "next/image";
import { getAllUnits } from "@/lib/units";
import { galleryItems, site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UnitCatalog } from "@/components/catalog/unit-catalog";
import { LeadForm } from "@/components/forms/lead-form";

const HIGHLIGHTS = [
  {
    title: "Lingkungan Asri",
    description:
      "Hijauan lembayung di setiap sudut cluster dengan taman tematik dan jalur pejalan kaki.",
  },
  {
    title: "Akses Strategis",
    description:
      "Dekat ke sekolah, pasar, rumah sakit, dan pintu tol — semua dalam radius 10 menit.",
  },
  {
    title: "Keamanan 24 Jam",
    description:
      "One gate system, CCTV antar-jemput area, dan patroli keamanan sepanjang hari.",
  },
];

export default function Home() {
  const units = getAllUnits();

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-violet-900 opacity-90"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-28 sm:py-36">
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
              {site.tagline}
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Temukan Kedamaian di Hunian Modern Mustika Lembayung
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              Hunian nyaman dengan konsep hijau, lokasi strategis, dan harga
              bersahabat — dirancang untuk keluarga Indonesia masa kini.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="#katalog"
                className="flex h-12 items-center justify-center rounded-full bg-white px-6 font-medium text-emerald-950 transition-colors hover:bg-emerald-50"
              >
                Lihat Katalog Unit
              </a>
              <a
                href="#kontak"
                className="flex h-12 items-center justify-center rounded-full border border-white/30 px-6 font-medium text-white transition-colors hover:bg-white/10"
              >
                Jadwalkan Kunjungan
              </a>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section id="keunggulan" className="bg-zinc-50 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Mengapa Mustika Lembayung?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-emerald-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Katalog Unit */}
        <section id="katalog" className="py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Katalog Unit
            </h2>
            <p className="mt-2 text-zinc-600">
              Pilih tipe hunian yang paling sesuai untuk keluarga Anda.
            </p>
            <UnitCatalog units={units} />
          </div>
        </section>

        {/* Galeri */}
        <section id="galeri" className="bg-zinc-50 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Galeri
            </h2>
            <p className="mt-2 text-zinc-600">
              Suasana lingkungan dan fasilitas Mustika Lembayung.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryItems.map((item) => (
                <figure
                  key={item.caption}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-violet-100 transition-transform duration-300 group-hover:scale-[1.02]">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-emerald-900/50">
                        {item.caption} — foto segera
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-2 text-sm text-zinc-600">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section id="lokasi" className="py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Lokasi Strategis
            </h2>
            <p className="mt-2 max-w-xl text-zinc-600">{site.address}</p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-black/5 shadow-sm">
              <iframe
                title={`Peta lokasi ${site.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* CTA / Kontak */}
        <section id="kontak" className="bg-emerald-950 py-24 text-white">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
                Siap Menempati Rumah Impian Anda?
              </h2>
              <p className="max-w-md leading-relaxed text-white/80">
                Tim marketing kami siap membantu Anda — mulai dari survei
                lokasi, simulasi KPR, hingga proses akad. Isi form di samping
                atau chat langsung via WhatsApp.
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-emerald-950 transition-colors hover:bg-emerald-50"
              >
                Konsultasi Gratis via WhatsApp
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <LeadForm units={units} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
