import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllUnits,
  getUnitBySlug,
  formatPrice,
  STATUS_LABELS,
} from "@/lib/units";
import { pricingStats, site, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UnitGallery } from "@/components/site/unit-gallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllUnits().map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) return { title: "Unit tidak ditemukan" };

  return {
    title: `${unit.name} — ${site.name}`,
    description: `Rumah ${unit.buildingArea}/${unit.landArea} m², ${unit.bedrooms} kamar tidur, ${unit.bathrooms} kamar mandi. Siap huni tanpa renovasi di ${site.address}. ${site.promo}.`,
  };
}

export default async function UnitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) notFound();

  const specs = [
    { label: "Luas Tanah", value: `${unit.landArea} m²` },
    { label: "Luas Bangunan", value: `${unit.buildingArea} m²` },
    { label: "Kamar Tidur", value: String(unit.bedrooms) },
    { label: "Kamar Mandi", value: String(unit.bathrooms) },
    { label: "Jumlah Lantai", value: String(unit.floors) },
    { label: "Kapasitas Carport", value: `${unit.carport} mobil` },
  ];

  const galleryImages = [
    ...(unit.image
      ? [{ src: unit.image, caption: `Foto ${unit.name}` }]
      : []),
    ...(unit.denah
      ? [{ src: unit.denah, caption: `Denah ${unit.name}`, png: true }]
      : []),
  ];

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
          {/* Breadcrumb */}
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors duration-300 hover:text-navy-800">
              Beranda
            </Link>
            <span aria-hidden> / </span>
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-navy-800"
            >
              Katalog Unit
            </Link>
            <span aria-hidden> / </span>
            <span className="font-medium text-navy-950">{unit.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {/* Visual */}
            <UnitGallery images={galleryImages} />

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-navy-950 sm:text-5xl">
                  {unit.name}
                </h1>
                <p className="mt-2 text-lg text-zinc-600 tabular-nums">
                  Tipe {unit.buildingArea}/{unit.landArea} ·{" "}
                  {unit.bedrooms} KT / {unit.bathrooms} KM
                </p>
              </div>

              <div>
                <p className="font-heading text-3xl font-semibold tracking-tight text-navy-950 tabular-nums sm:text-4xl">
                  {formatPrice(unit.price ?? 0)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Harga dasar. {site.promo}. Cicilan flat mulai{" "}
                  {pricingStats[2].value}/bulan.*
                </p>
              </div>

              <ul className="space-y-2.5 text-zinc-700">
                {unit.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span aria-hidden className="font-bold text-gold-600">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(unit.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-navy-950 font-medium text-white transition-all duration-300 ease-brand hover:bg-navy-800 active:scale-[0.98]"
                >
                  Tanya Unit Ini via WhatsApp
                </a>
                <Link
                  href="/"
                  className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-medium text-zinc-700 transition-all duration-300 ease-brand hover:bg-zinc-50 active:scale-[0.98]"
                >
                  ← Unit Lainnya
                </Link>
              </div>

              {unit.status === "coming-soon" && (
                <p className="rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
                  Unit ini {STATUS_LABELS[unit.status].toLowerCase()} — daftar
                  via form kontak untuk prioritas booking.
                </p>
              )}
              <p className="text-xs leading-relaxed text-zinc-400">
                *Syarat dan ketentuan berlaku. Blok hook +Rp5 jt, selisih tanah
                +Rp1 jt/m², carport/taman +Rp500 rb/m — detail lengkap di
                bagian Harga & Siteplan. Hubungi marketing untuk info terbaru.
              </p>
            </div>
          </div>

          {/* Spesifikasi */}
          <section className="mt-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-navy-950">
              Spesifikasi
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 rounded-3xl border border-navy-950/5 bg-zinc-50 p-8 sm:grid-cols-3 lg:grid-cols-6">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-navy-950 tabular-nums">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
