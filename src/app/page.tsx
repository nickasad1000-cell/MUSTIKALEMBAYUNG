import Image from "next/image";
import { getAllUnits } from "@/lib/units";
import { galleryItems, site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UnitCatalog } from "@/components/catalog/unit-catalog";
import { LeadForm } from "@/components/forms/lead-form";

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

export default function Home() {
  const units = getAllUnits();

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <Image
            src="/assets/tampak-depan.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-emerald-950/40"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-28 sm:py-36">
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
              {site.tagline}
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Rumah Siap Huni di Mustika Lembayung Sumbersuko
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/90">
              Rumah subsidi berspek komersial — full granit, canopy carport,
              kompor tanam. Booking hanya <strong>Rp100 ribu</strong>, bisa
              langsung terima kunci. Ready {site.readyUnits} unit.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="#katalog"
                className="flex h-12 items-center justify-center rounded-full bg-white px-6 font-medium text-emerald-950 transition-colors hover:bg-emerald-50"
              >
                Lihat Katalog Unit
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Chat WhatsApp {site.whatsappDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Promo strip */}
        <section className="border-b border-amber-200 bg-amber-50 py-4">
          <p className="mx-auto max-w-6xl px-6 text-center text-sm font-medium text-amber-900">
            🎉 Promo Siap Huni: booking cuma Rp100 ribu — free DP, free biaya
            balik nama, cicilan flat ±Rp1 juta sampai lunas.
          </p>
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
                        className={`object-cover ${item.src.endsWith(".png") ? "object-contain p-4" : ""}`}
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
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              📍 Buka di Google Maps →
            </a>
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
              <p className="text-sm text-white/60">
                ☎ {site.whatsappDisplay} · {site.address}
              </p>
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
