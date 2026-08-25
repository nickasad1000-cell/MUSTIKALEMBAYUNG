import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllUnits,
  getUnitBySlug,
  formatPrice,
  STATUS_LABELS,
} from "@/lib/units";
import { waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

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
    title: `${unit.name} — Mustika Lembayung`,
    description: `Tipe ${unit.buildingArea}/${unit.landArea}, ${unit.bedrooms} kamar tidur, ${unit.bathrooms} kamar mandi. Harga mulai ${formatPrice(unit.price)}.`,
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

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-800">
              Beranda
            </Link>
            <span aria-hidden> / </span>
            <Link href="/#katalog" className="hover:text-emerald-800">
              Katalog Unit
            </Link>
            <span aria-hidden> / </span>
            <span className="font-medium text-zinc-800">{unit.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {/* Visual */}
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-violet-100">
              <span className="text-sm text-emerald-900/50">
                Foto & denah {unit.name} — segera
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
                  {unit.name}
                </h1>
                <p className="mt-2 text-lg text-zinc-600">
                  Tipe {unit.buildingArea}/{unit.landArea} ·{" "}
                  {unit.bedrooms} KT / {unit.bathrooms} KM
                </p>
              </div>

              <p className="text-3xl font-semibold tracking-tight text-emerald-900">
                {formatPrice(unit.price)}
              </p>

              <ul className="space-y-2.5 text-zinc-700">
                {unit.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span aria-hidden className="font-bold text-emerald-600">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(unit.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-emerald-900 font-medium text-white transition-colors hover:bg-emerald-800"
                >
                  Tanya Unit Ini via WhatsApp
                </a>
                <Link
                  href="/#katalog"
                  className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
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
            </div>
          </div>

          {/* Spesifikasi */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Spesifikasi
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 rounded-2xl border border-black/5 bg-zinc-50 p-8 sm:grid-cols-3 lg:grid-cols-6">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-zinc-900">
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
