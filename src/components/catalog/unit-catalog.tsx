import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Ruler,
} from "lucide-react";
import type { Unit } from "@/lib/units";
import { priceLabel } from "@/lib/units";

export function UnitCatalog({ units }: { units: Unit[] }) {
  return (
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

          <div className="p-6 sm:p-8">
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

            <ul className="mt-5 space-y-2.5">
              {unit.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800/80"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-gold-500"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-navy-100 pt-5">
              <span className="text-2xl font-extrabold tracking-tight text-navy-950">
                {priceLabel(unit)}
              </span>
              <span className="text-sm font-medium text-navy-800/60">
                angsuran mulai Rp 1.072.180/bln (20 th)
              </span>
            </div>

            <Link
              href={`/units/${unit.slug}`}
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-navy-950 px-5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
            >
              Lihat detail unit
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
