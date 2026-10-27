import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  CookingPot,
  DoorOpen,
  Fence,
  House,
  LayoutGrid,
  MessageCircle,
  Ruler,
  Zap,
} from "lucide-react";
import { formatPrice, type Unit } from "@/lib/units";
import { waLink } from "@/lib/site";

const FEATURE_ICONS = [
  { match: "carport", Icon: Car },
  { match: "dapur", Icon: CookingPot },
  { match: "pagar", Icon: Fence },
  { match: "pintu", Icon: DoorOpen },
  { match: "kusen", Icon: DoorOpen },
  { match: "atap", Icon: House },
  { match: "listrik", Icon: Zap },
  { match: "air", Icon: Zap },
  { match: "closet", Icon: Bath },
  { match: "kamar mandi", Icon: Bath },
  { match: "lantai", Icon: LayoutGrid },
] as const;

function FeatureIcon({ feature }: { feature: string }) {
  const text = feature.toLowerCase();
  const found = FEATURE_ICONS.find(({ match }) => text.includes(match));
  const Icon = found?.Icon ?? CheckCircle2;

  return <Icon size={17} className="mt-0.5 shrink-0 text-gold-500" />;
}

export function UnitCatalog({ units }: { units: Unit[] }) {
  const price = units[0]?.price ?? 166_000_000;

  return (
    <>
      <div className="mx-auto mt-12 grid max-w-2xl gap-8">
        {units.map((unit) => (
          <article
            key={unit.slug}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-100 transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {unit.image ? (
                <Image
                  src={unit.image}
                  alt={unit.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <span className="flex h-full items-center justify-center bg-navy-50 text-sm text-navy-900/50">
                  Foto {unit.name} — segera
                </span>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                {unit.name}
              </span>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-navy-800">
                <span className="inline-flex items-center gap-1.5">
                  <Ruler size={16} className="text-navy-600" />
                  LT {unit.landArea} m²
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 size={16} className="text-navy-600" />
                  LB {unit.buildingArea} m²
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble size={16} className="text-navy-600" />
                  {unit.bedrooms} Kamar Tidur
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bath size={16} className="text-navy-600" />
                  {unit.bathrooms} Kamar Mandi
                </span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {unit.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800/80"
                  >
                    <FeatureIcon feature={feature} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/units/${unit.slug}`}
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-navy-950 px-5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
              >
                Lihat detail unit
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Harga rumah
              </p>
              <p className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {formatPrice(price)}
              </p>
            </div>
            <div className="hidden h-12 w-px bg-white/15 sm:block" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-200">
                Angsuran mulai
              </p>
              <p className="mt-1.5 text-xl font-extrabold tracking-tight sm:text-2xl">
                {formatPrice(1_072_180)}
                <span className="ml-1 text-sm font-semibold text-white/60">
                  /bulan · 20 tahun
                </span>
              </p>
            </div>
          </div>
          <a
            href={waLink("harga dan ketersediaan unit Mustika Lembayung")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold-400 px-5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            Tanya harga
          </a>
        </div>
        <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
          Angsuran adalah simulasi tenor 20 tahun. Nilai final ditentukan bank.
        </p>
      </div>
    </>
  );
}
