import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getAvailableUnits,
  getPricelistUnit,
  fotoPublikUrl,
  isPresaleUnit,
  isTersedia,
  totalUangMuka,
} from "@/lib/pricelist";
import { pricelistNotes, waLink } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UnitPhotoGrid } from "@/components/site/unit-photo-grid";
import { NavigateLink } from "@/components/site/navigate-link";

interface PageProps {
  params: Promise<{ kode: string }>;
}

export function generateStaticParams() {
  return getAvailableUnits().map((u) => ({ kode: u.kode.toLowerCase() }));
}

function rupiah(n: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

function mutuLabel(n: number | null): string {
  if (n === null) return "Hubungi";
  if (n === 0) return "Tidak ada";
  return rupiah(n);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kode } = await params;
  const u = getPricelistUnit(kode);
  if (!u || isPresaleUnit(kode) || !isTersedia(u)) {
    return { title: "Unit tidak ditemukan", robots: { index: false } };
  }

  const title = `Unit ${u.kode} Blok ${u.blok} — Rumah Subsidi Tipe ${u.tipe} Lumajang`;
  const luas = u.luasTanah !== null ? `${u.luasTanah} m²` : "—";
  const hook = u.hook ? " Unit hook/pojok (tambahan Rp5 jt)." : "";
  const mutu =
    u.mutuKualitas !== null && u.mutuKualitas > 0
      ? ` + peningkatan mutu ${rupiah(u.mutuKualitas)}`
      : "";
  const description = `Unit ${u.kode} Blok ${u.blok}, tipe ${u.tipe}, tanah ±${luas}. Harga ${rupiah(u.hargaDasar)}${mutu}.${hook} Perumahan Mustika Lembayung Sumbersuko.`;

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
  { src: "/assets/tampak-depan.webp", alt: "Tampak depan rumah tipe 36/60" },
  { src: "/assets/teras-carport.webp", alt: "Teras & carport rumah tipe 36/60" },
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
  if (isPresaleUnit(kode) || !isTersedia(u)) redirect("/#pricelist");

  const foto = fotoPublikUrl(u.foto);

  return (
    <div className="flex flex-col flex-1 bg-white font-sans">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32">
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <NavigateLink
              target="pricelist"
              className="transition-colors duration-300 hover:text-navy-800"
            >
              Daftar Unit
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
                  {u.hook && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                      Hook / pojok +Rp5 jt
                    </span>
                  )}
                </div>
              <p className="mt-2 text-lg text-zinc-600 tabular-nums">
                Blok {u.blok} · Type {u.tipe} ·{" "}
                {u.luasTanah !== null ? `${u.luasTanah} m² tanah` : "Luas hubungi marketing"} · 2 KT / 1 KM
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 rounded-3xl border border-navy-950/5 bg-zinc-50 p-6 sm:grid-cols-2 sm:gap-y-5 sm:p-8">
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
                    {mutuLabel(u.mutuKualitas)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    Uang Muka (DP)
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-semibold tabular-nums text-navy-950 sm:text-2xl">
                    {u.mutuKualitas !== null ? rupiah(totalUangMuka(u)) : "Hubungi"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">Angsuran Mulai</dt>
                  <dd className="mt-1 font-heading text-xl font-semibold tabular-nums text-navy-950 sm:text-2xl">
                    Rp 1.072.180<span className="text-sm font-normal text-zinc-500"> /bln (20 th)</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">Booking</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-navy-950">Rp 100 ribu</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                Uang muka = tanda jadi + peningkatan mutu
                {u.hook ? " + hook" : ""}.
              </p>

              <ul className="mt-6 space-y-2.5 text-zinc-700">
                {SPECS.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span aria-hidden className="font-bold text-gold-600">✓</span>
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                *Harga dan ketentuan mengikuti kebijakan developer.{" "}
                {pricelistNotes.join(" ")}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(`unit ${u.kode} (Blok ${u.blok}, type ${u.tipe})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-navy-950 px-6 font-medium text-white transition duration-300 ease-brand hover:bg-navy-800 active:scale-[0.98]"
                >
                  Tanya Unit {u.kode} via WhatsApp
                </a>
                <NavigateLink
                  target="pricelist"
                  className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-medium text-zinc-700 transition duration-300 ease-brand hover:bg-zinc-50 active:scale-[0.98]"
                >
                  ← Lihat daftar unit
                </NavigateLink>
              </div>
            </div>

            <div>
              {foto && (
                <figure className="mb-3 overflow-hidden rounded-2xl border border-navy-950/10 bg-zinc-100">
                  <div
                    role="img"
                    aria-label={`Foto terbaru unit ${u.kode}`}
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${foto}")` }}
                  />
                </figure>
              )}
              <UnitPhotoGrid photos={PHOTOS} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

