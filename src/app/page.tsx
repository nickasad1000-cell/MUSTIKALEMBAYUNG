import Image from "next/image";
import { getAllUnits, formatPrice, STATUS_LABELS } from "@/lib/units";

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

const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-800",
  sold: "bg-red-100 text-red-700",
  "coming-soon": "bg-amber-100 text-amber-800",
};

export default function Home() {
  const units = getAllUnits();

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight text-emerald-950">
            Mustika Lembayung
          </span>
          <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#keunggulan" className="hover:text-emerald-900">
              Keunggulan
            </a>
            <a href="#katalog" className="hover:text-emerald-900">
              Katalog Unit
            </a>
            <a href="#kontak" className="hover:text-emerald-900">
              Kontak
            </a>
          </nav>
          <a
            href="#kontak"
            className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-violet-900 opacity-90"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-28 sm:py-36">
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
              Perumahan Premium Keluarga Muda
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                  Katalog Unit
                </h2>
                <p className="mt-2 text-zinc-600">
                  Pilih tipe hunian yang paling sesuai untuk keluarga Anda.
                </p>
              </div>
              <span className="text-sm text-zinc-500">
                {units.length} tipe tersedia
              </span>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <article
                  key={unit.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-violet-100">
                    <Image
                      src="/file.svg"
                      alt={`Ilustrasi ${unit.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-10 grayscale group-hover:grayscale-0"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[unit.status]}`}
                    >
                      {STATUS_LABELS[unit.status]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900">
                        {unit.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        LT {unit.landArea} m² · LB {unit.buildingArea} m² ·{" "}
                        {unit.bedrooms} KT / {unit.bathrooms} KM
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-sm text-zinc-600">
                      {unit.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span aria-hidden className="text-emerald-700">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                      <p className="font-semibold text-emerald-900">
                        {formatPrice(unit.price)}
                      </p>
                      <a
                        href="#kontak"
                        className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
                      >
                        Detail →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Kontak */}
        <section id="kontak" className="bg-emerald-950 py-24 text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Siap Menempati Rumah Impian Anda?
            </h2>
            <p className="max-w-xl text-white/80">
              Tim marketing kami siap membantu Anda — mulai dari survei lokasi,
              simulasi KPR, hingga proses akad.
            </p>
            <a
              href="https://wa.me/620000000000"
              className="flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-emerald-950 transition-colors hover:bg-emerald-50"
            >
              Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-emerald-950 py-12 text-sm text-white/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>© {new Date().getFullYear()} Mustika Lembayung.</p>
          <p>Harga & spesifikasi dapat berubah tanpa pemberitahuan.</p>
        </div>
      </footer>
    </div>
  );
}
