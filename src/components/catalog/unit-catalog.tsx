"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Unit, UnitStatus } from "@/lib/units";
import { formatPrice, STATUS_LABELS } from "@/lib/units";

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: "bg-emerald-100 text-emerald-800",
  sold: "bg-red-100 text-red-700",
  "coming-soon": "bg-amber-100 text-amber-800",
};

const PRICE_OPTIONS = [
  { label: "Semua Harga", value: Infinity },
  { label: "≤ Rp 400 jt", value: 400_000_000 },
  { label: "≤ Rp 600 jt", value: 600_000_000 },
  { label: "≤ Rp 800 jt", value: 800_000_000 },
];

interface Filters {
  status: "all" | UnitStatus;
  bedrooms: "all" | "2" | "3";
  maxPrice: number;
}

const INITIAL_FILTERS: Filters = {
  status: "all",
  bedrooms: "all",
  maxPrice: Infinity,
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
        if (unit.price > filters.maxPrice) return false;
        return true;
      }),
    [units, filters]
  );

  const isFiltered =
    filters.status !== "all" ||
    filters.bedrooms !== "all" ||
    filters.maxPrice !== Infinity;

  return (
    <div>
      {/* Filter bar */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-black/5 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:gap-6">
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
        <FilterSelect
          label="Harga Maks."
          value={String(filters.maxPrice)}
          onChange={(value) =>
            setFilters((f) => ({ ...f, maxPrice: Number(value) }))
          }
          options={PRICE_OPTIONS.map((opt) => ({
            label: opt.label,
            value: String(opt.value),
          }))}
        />
        {isFiltered && (
          <button
            onClick={() => setFilters(INITIAL_FILTERS)}
            className="text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
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
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-violet-100">
              <span
                className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[unit.status]}`}
              >
                {STATUS_LABELS[unit.status]}
              </span>
              <span className="flex h-full items-center justify-center text-sm text-emerald-900/50">
                Foto {unit.name} — segera
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
                <Link
                  href={`/units/${unit.slug}`}
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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
