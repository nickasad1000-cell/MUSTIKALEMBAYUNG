import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPricelistUnit,
  getPricelistUnits,
} from "@/lib/pricelist";
import { waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UnitPhotoGrid } from "@/components/site/unit-photo-grid";
import { NavigateLink } from "@/components/site/navigate-link";

interface PageProps {
  params: Promise<{ kode: string }>;
}

export function generateStaticParams() {
  return getPricelistUnits().map((u) => ({ kode: u.kode.toLowerCase() }));
}

function rupiah(n: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kode } = await params;
  const u = getPricelistUnit(kode);
  if (!u) return { title: "Unit tidak ditemukan" };

  const state = u.status === "terjual" ? "Terjual" : "Tersedia";
  const title = `Unit ${u.kode} Blok ${u.blok} — Rumah Subsidi Tipe ${u.tipe} Lumajang (${state})`;
  const luas = u.luasTanah !== null ? `${u.luasTanah} m²` : "—";
  const description = `Unit ${u.kode} Blok ${u.blok}, type ${u.tipe}, tanah ±${luas}. Harga ${rupiah(u.hargaDasar)}${u.mutuKualitas !== null ? ` + peningkatan mutu ${rupiah(u.mutuKualitas)}` : ""}. Status: ${state} — Perumahan Mustika Lembayung Sumbersuko.`;

  return {
    title,
    description,
    alternates: { canonical: `/unit/${u.kode.toLowerCase()}` },
    openGraph: {
      title,
      description,
      url: `/unit/${u.kode.toLowerCase()}`,
      siteName: "Mustika Lembayung Sumbersuko",
      locale: "id_ID",
      type: "website",
      images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
  };
}

const SPECS = [
  "Canopy carport",
  "Pagar pembatas & roster depan",
  "Meja dapur set + kompor tanam",
  "Lantai granit",
  "Kusen aluminium, daun pintu HPL",
  "Atap spandek",
  "Listrik 900 watt, air sumur bor",
  "Closet jongkok + dinding granit",
];

const PHOTOS = [
  { src: "/assets/tampak-depan.webp", alt: "Tampak depan rumah tipe 36" },
  { src: "/assets/teras-carport.webp", alt: "Teras & carport rumah tipe 36" },
  { src: "/assets/ruang-tamu.webp", alt: "Ruang tamu & dapur" },
  { src: "/assets/kamar-tidur.webp", alt: "Kamar tidur utama" },
  { src: "/assets/kamar-tidur-2.webp", alt: "Kamar tidur — tampak lain" },
  { src: "/assets/kamar-mandi.webp", alt: "Kamar mandi dinding granit" },
  { src: "/assets/siteplan.webp", alt: "Site plan Mustika Lembayung Sumbersuko" },
];

export default async function UnitDetailPage({ params }: PageProps) {
  const { kode } = await params;
  const u = getPricelistUnit(kode);
  if (!u) notFound();

  const sold = u.status === "terjual";

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <NavigateLink
              target="pricelist"
              className="transition-colors duration-300 hover:text-navy-800"
            >
              Pricelist
            </NavigateLink>
            <span aria-hidden> / </span>
            <span className="font-medium text-navy-950">Unit {u.kode}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-navy-950 sm:text-5xl">
                  Unit {u.kode}
                </h1>
                {sold ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Terjual
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Tersedia
                  </span>
                )}
              </div>
              <p className="mt-2 text-lg text-zinc-600 tabular-nums">
                Blok {u.blok} · Type {u.tipe} ·{" "}
                {u.luasTanah !== null ? `${u.luasTanah} m² tanah` : "Luas hubungi marketing"} · 2 KT / 1 KM
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 rounded-3xl border border-navy-950/5 bg-zinc-50 p-8">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">Harga Rumah</dt>
                  <dd className="mt-1 font-heading text-xl font-semibold tabular-nums text-navy-950 sm:text-2xl">
                    {rupiah(u.hargaDasar)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    Peningkatan Mutu
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-semibold tabular-nums text-navy-950 sm:text-2xl">
                    {u.mutuKualitas !== null ? rupiah(u.mutuKualitas) : "Hubungi"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">Angsuran Mulai</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-navy-950">
                    Rp 1.072.180<span className="text-sm font-normal text-zinc-500"> /bln (20 th)</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">Booking</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-navy-950">Rp 100 ribu</dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-2.5 text-zinc-700">
                {SPECS.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span aria-hidden className="font-bold text-gold-600">✓</span>
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                *Simulasi berdasarkan pricelist; nilai final angsuran ditentukan bank.
                Blok hook/pojok +Rp5 jt, selisih tanah +Rp1 jt/m².
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {sold ? (
                  <a
                    href={waLink(
                      `info unit lain yang masih tersedia selain ${u.kode}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-medium text-zinc-700 transition duration-300 ease-brand hover:bg-zinc-50 active:scale-[0.98]"
                  >
                    Unit terjual — Tanya Unit Lain
                  </a>
                ) : (
                  <a
                    href={waLink(
                      `unit ${u.kode} (Blok ${u.blok}, type ${u.tipe}). Boleh minta info lengkap?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-navy-950 px-6 font-medium text-white transition duration-300 ease-brand hover:bg-navy-800 active:scale-[0.98]"
                  >
                    Tanya Unit {u.kode} via WhatsApp
                  </a>
                )}
                <NavigateLink
                  target="pricelist"
                  className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-medium text-zinc-700 transition duration-300 ease-brand hover:bg-zinc-50 active:scale-[0.98]"
                >
                  ← Lihat Pricelist
                </NavigateLink>
              </div>
            </div>

            <div>
              <UnitPhotoGrid photos={PHOTOS} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
