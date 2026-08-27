"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PricelistUnit } from "@/lib/pricelist";
import { waLink } from "@/lib/site";

const BLOKS = ["A", "B", "C", "D", "E"] as const;

function rupiah(n: number | null): string {
  if (n === null) return "Hubungi marketing";
  return `Rp${new Intl.NumberFormat("id-ID").format(n).replace(/,/g, ".")}`;
}

export function PricelistTable({ units }: { units: PricelistUnit[] }) {
  const router = useRouter();
  const [blok, setBlok] = useState<(typeof BLOKS)[number] | "all">("all");

  const rows = useMemo(
    () =>
      blok === "all" ? units : [...units].sort((a, b) => a.kode.localeCompare(b.kode, "id", { numeric: true })).filter((u) => u.blok === blok),
    [units, blok]
  );
  const sorted = rows[0]?.blok && rows.length === units.length ? [...rows].sort((a, b) => a.blok.localeCompare(b.blok) || a.kode.localeCompare(b.kode, "id", { numeric: true })) : rows;
  const terjual = units.filter((u) => u.status === "terjual").length;

  return (
    <section id="pricelist" className="scroll-mt-28 bg-zinc-50 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-navy-950/10 bg-navy-950/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Harga per Unit
        </p>
        <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          Daftar harga tiap unit
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
          Harga rumah Rp166 jt + peningkatan mutu kualitas per unit sebagai uang muka.
          Klik baris untuk melihat detail lengkap setiap unit.
        </p>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-gold-500/40 bg-gold-400/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-navy-900">
            <strong>Blok E1–E9</strong> belum dibuka penjualan — informasi
            lengkap menyusul.
          </p>
          <a
            href={waLink("info pembukaan penjualan Blok E")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-navy-950 px-5 text-sm font-medium text-white transition duration-300 ease-brand hover:bg-navy-800"
          >
            Langsung Hubungi Marketing
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex flex-wrap gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-navy-950/10" role="group" aria-label="Filter blok">
            {(["all", ...BLOKS] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBlok(b)}
                aria-pressed={blok === b}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold transition duration-300 ease-brand ${
                  blok === b ? "bg-navy-950 text-white" : "text-zinc-600 hover:bg-navy-950/5 hover:text-navy-950"
                }`}
              >
                {b === "all" ? "Semua" : `Blok ${b}`}
              </button>
            ))}
          </div>
          <p className="inline-flex items-center gap-4 text-sm font-semibold text-zinc-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-navy-950/10">
              <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
              Ready {units.length - terjual} dari {units.length} unit
            </span>
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-950/10 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-950/10 bg-navy-950/[0.03] text-xs uppercase tracking-wider text-zinc-500">
                <th scope="col" className="px-5 py-3.5 font-semibold">Unit</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Type</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Luas Tanah</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Peningkatan Mutu</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
                <th scope="col" className="px-5 py-3.5 text-right font-semibold">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-950/5">
              {sorted.map((u) => {
                const sold = u.status === "terjual";
                return (
                  <tr
                    key={u.kode}
                    onClick={() => router.push(`/unit/${u.kode.toLowerCase()}`)}
                    title={`Lihat detail unit ${u.kode}`}
                    className={`cursor-pointer transition-colors duration-200 ${
                      sold ? "bg-zinc-100/60 hover:bg-zinc-200/50" : "hover:bg-navy-950/[0.03]"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-bold tabular-nums text-navy-950">
                      {u.kode}
                      {sold && <span className="sr-only"> (terjual)</span>}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{u.tipe}</td>
                    <td className="px-5 py-3.5 tabular-nums text-zinc-600">
                      {u.luasTanah !== null ? `${u.luasTanah} m²` : "—"}
                    </td>
                    <td className="px-5 py-3.5 font-semibold tabular-nums text-navy-950">
                      {rupiah(u.mutuKualitas)}
                    </td>
                    <td className="px-5 py-3.5">
                      {sold ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          Terjual
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Tersedia
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <a href={`/unit/${u.kode.toLowerCase()}`} className="inline-flex min-h-11 items-center rounded-full bg-navy-950 px-4 text-xs font-medium text-white transition duration-300 ease-brand hover:bg-navy-800">
                        Detail →
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Blok Hook/Pojok +Rp5 jt · selisih tanah +Rp1 jt/m² · tanda jadi Rp2,5 jt (tidak mengurangi harga).
          Angsuran flat mulai Rp1.072.180/bulan (20 tahun)*. Nilai final ditentukan bank.
        </p>
      </div>
    </section>
  );
}
