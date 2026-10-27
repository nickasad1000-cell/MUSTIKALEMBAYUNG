import Image from "next/image";
import Link from "next/link";
import type { Unit } from "@/lib/units";
import { priceLabel } from "@/lib/units";

export function UnitCatalog({ units }: { units: Unit[] }) {
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {units.map((unit) => (
        <article
          key={unit.slug}
          className="group flex flex-col rounded-3xl border border-navy-950/5 bg-navy-950/[0.03] p-2 shadow-sm transition duration-500 ease-brand hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-navy-100 to-gold-100">
            {unit.image ? (
              <Image
                src={unit.image}
                alt={unit.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04] photo-outline"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-sm text-navy-900/50">
                Foto {unit.name} — segera
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 p-5">
            <div>
              <h3 className="font-heading text-xl font-semibold text-navy-950">
                {unit.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 tabular-nums">
                LT {unit.landArea} m² · LB {unit.buildingArea} m² ·{" "}
                {unit.bedrooms} KT / {unit.bathrooms} KM
              </p>
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-600">
              {unit.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden className="font-bold text-gold-600">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between border-t border-navy-950/5 pt-4">
              <p className="font-semibold text-navy-950 tabular-nums">
                {priceLabel(unit)}
              </p>
              <Link
                href={`/units/${unit.slug}`}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-navy-700 transition-colors duration-300 hover:text-navy-950"
              >
                Detail →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
