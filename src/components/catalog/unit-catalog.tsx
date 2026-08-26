"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Unit, UnitStatus } from "@/lib/units";
import { priceLabel, STATUS_LABELS } from "@/lib/units";

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: "bg-gold-400 text-navy-950",
  sold: "bg-red-100 text-red-700",
  "coming-soon": "bg-amber-100 text-amber-800",
};

interface Filters {
  status: "all" | UnitStatus;
  bedrooms: "all" | "2" | "3";
}

const INITIAL_FILTERS: Filters = {
  status: "all",
  bedrooms: "all",
};

export function UnitCatalog({ units }: { units: Unit[] }) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filtered = useMemo(
    () =>
      units.filter((unit) => {
        if (filters.status !== "all" && unit.status !== filters.status)
          return false;
        if (
          filters.bedrooms !== "all" &&
          unit.bedrooms !== Number(filters.bedrooms)
        )
          return false;
        return true;
      }),
    [units, filters]
  );

  const isFiltered = filters.status !== "all" || filters.bedrooms !== "all";

  return (
    <div>
      {/* Filter bar */}
      <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-navy-950/5 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:gap-6">
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(value) =>
            setFilters((f) => ({ ...f, status: value as Filters["status"] }))
          }
          options={[
            { label: "Semua Status", value: "all" },
            { label: STATUS_LABELS.available, value: "available" },
            { label: STATUS_LABELS["coming-soon"], value: "coming-soon" },
          ]}
        />
        <FilterSelect
          label="Kamar Tidur"
          value={filters.bedrooms}
          onChange={(value) =>
            setFilters((f) => ({ ...f, bedrooms: value as Filters["bedrooms"] }))
          }
          options={[
            { label: "Semua", value: "all" },
            { label: "2 KT", value: "2" },
            { label: "3 KT", value: "3" },
          ]}
        />
        {isFiltered && (
          <button
            onClick={() => setFilters(INITIAL_FILTERS)}
            className="text-sm font-medium text-navy-700 underline-offset-4 transition-colors duration-300 hover:text-navy-950 hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Menampilkan {filtered.length} dari {units.length} tipe unit
      </p>

      {/* Grid */}
      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((unit) => (
          <article
            key={unit.slug}
            className="group flex flex-col rounded-3xl border border-navy-950/5 bg-navy-950/[0.03] p-2 shadow-sm transition duration-500 ease-brand hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-navy-100 to-gold-100">
              <span
                className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[unit.status]}`}
              >
                {STATUS_LABELS[unit.status]}
              </span>
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

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-zinc-500">
          Tidak ada unit yang sesuai filter. Coba ubah atau reset filter.
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="whitespace-nowrap font-medium text-zinc-600">
        {label}
      </span>
      <select
        id={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
        name={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        autoComplete="off"
        className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition-colors duration-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
