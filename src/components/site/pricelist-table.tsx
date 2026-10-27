"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PricelistUnit } from "@/lib/pricelist";
import { pricelistNotes } from "@/lib/site";

const BLOKS = ["A", "B", "C", "D", "E"] as const;
const PAGE_SIZE = 12;

function rupiah(n: number | null): string {
  if (n === null) return "Hubungi";
  if (n === 0) return "Tidak ada";
  return `Rp${new Intl.NumberFormat("id-ID").format(n)}`;
}

export function PricelistTable({ units }: { units: PricelistUnit[] }) {
  const [blok, setBlok] = useState<(typeof BLOKS)[number] | "all">("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const sorted = useMemo(
    () =>
      [...units]
        .filter((u) => blok === "all" || u.blok === blok)
        .sort(
          (a, b) =>
            a.blok.localeCompare(b.blok) ||
            a.kode.localeCompare(b.kode, "id", { numeric: true })
        ),
    [units, blok]
  );

  const shown = sorted.slice(0, limit);

  function pilihBlok(value: (typeof BLOKS)[number] | "all") {
    setBlok(value);
    setLimit(PAGE_SIZE);
  }

  return (
    <section id="pricelist" className="scroll-mt-28 bg-zinc-50 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-navy-950/10 bg-navy-950/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Harga per Unit
        </p>
        <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          Daftar harga tiap unit
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
          Harga rumah Rp166 jt + peningkatan mutu kualitas per unit. Pilih unit
          untuk melihat rincian lengkapnya.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Blok
            </span>
            <div
              className="grid flex-1 grid-cols-6 gap-0.5 rounded-full bg-white p-1 shadow-sm ring-1 ring-navy-950/10 sm:flex sm:flex-none"
              role="group"
              aria-label="Filter blok"
            >
              {(["all", ...BLOKS] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => pilihBlok(b)}
                  aria-label={b === "all" ? "Semua blok" : `Blok ${b}`}
                  aria-pressed={blok === b}
                  className={`min-h-11 rounded-full px-1 text-xs font-semibold transition duration-300 ease-brand sm:px-4 sm:text-sm ${
                    blok === b
                      ? "bg-navy-950 text-white"
                      : "text-zinc-600 hover:bg-navy-950/5 hover:text-navy-950"
                  }`}
                >
                  {b === "all" ? "Semua" : b}
                </button>
              ))}
            </div>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-navy-950/10">
            <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
            {units.length} unit tersedia
          </p>
        </div>

        {shown.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            Belum ada unit tersedia di blok ini.
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {shown.map((u) => (
                <Link
                  key={u.kode}
                  href={`/unit/${u.kode.toLowerCase()}`}
                  className="rounded-2xl border border-navy-950/10 bg-white p-4 shadow-sm transition-colors duration-200 active:bg-zinc-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-lg font-semibold text-navy-950">
                        {u.kode}
                        {u.hook && (
                          <span className="ml-2 rounded-full bg-gold-400/25 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                            Hook
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        Blok {u.blok} · Type {u.tipe} ·{" "}
                        {u.luasTanah !== null ? `${u.luasTanah} m²` : "Luas menyusul"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                        Peningkatan mutu
                      </p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-navy-950">
                        {rupiah(u.mutuKualitas)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium text-navy-700">
                    Lihat detail unit →
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-navy-950/10 bg-white shadow-sm md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-950/10 bg-navy-950/[0.03] text-xs uppercase tracking-wider text-zinc-500">
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Unit
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Type
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Luas Tanah
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Peningkatan Mutu
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-950/5">
                  {shown.map((u) => (
                    <tr
                      key={u.kode}
                      className="transition-colors duration-200 hover:bg-navy-950/[0.03]"
                    >
                      <td className="px-5 py-3.5 font-bold tabular-nums text-navy-950">
                        <Link
                          href={`/unit/${u.kode.toLowerCase()}`}
                          className="underline decoration-navy-950/20 decoration-2 underline-offset-4 transition-colors hover:decoration-gold-500"
                        >
                          {u.kode}
                        </Link>
                        {u.hook && (
                          <span className="ml-2 rounded-full bg-gold-400/25 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                            Hook
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-600">{u.tipe}</td>
                      <td className="px-5 py-3.5 tabular-nums text-zinc-600">
                        {u.luasTanah !== null ? `${u.luasTanah} m²` : "—"}
                      </td>
                      <td className="px-5 py-3.5 font-semibold tabular-nums text-navy-950">
                        {rupiah(u.mutuKualitas)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/unit/${u.kode.toLowerCase()}`}
                          className="inline-flex min-h-11 items-center rounded-full bg-navy-950 px-4 text-xs font-medium text-white transition duration-300 ease-brand hover:bg-navy-800"
                        >
                          Detail →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {shown.length < sorted.length && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((value) => value + PAGE_SIZE)}
                  className="inline-flex min-h-11 items-center rounded-full border border-navy-950/15 bg-white px-5 text-sm font-semibold text-navy-800 transition duration-300 ease-brand hover:border-navy-950/30"
                >
                  Tampilkan unit lainnya ({sorted.length - shown.length})
                </button>
              </div>
            )}
          </>
        )}

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          {pricelistNotes.join(" ")} Angsuran mulai Rp1.072.180/bulan (20
          tahun)*. Simulasi 10 dan 15 tahun tersedia di bagian Harga &amp;
          Siteplan. Nilai final angsuran ditentukan bank.
        </p>
      </div>
    </section>
  );
}
