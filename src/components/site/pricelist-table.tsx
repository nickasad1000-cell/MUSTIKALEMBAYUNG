"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { PricelistUnit, UnitStatus } from "@/lib/pricelist";
import { statusLabel } from "@/lib/pricelist";
import { pricelistNotes, waLink } from "@/lib/site";

const BLOKS = ["A", "B", "C", "D", "E"] as const;

const STATUS_STYLE: Record<Exclude<UnitStatus, null>, string> = {
  tersedia: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  booking: "bg-amber-50 text-amber-700 ring-amber-200",
  terjual: "bg-navy-50 text-navy-700 ring-navy-200",
};

function rupiah(n: number | null): string {
  if (n === null) return "Hubungi";
  if (n === 0) return "Tidak ada";
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

function pesanUnit(u: PricelistUnit): string {
  return waLink(
    `unit ${u.kode} (Blok ${u.blok}, tipe ${u.tipe}) di Mustika Lembayung`
  );
}

function StatusBadge({ status }: { status: UnitStatus }) {
  const style = status
    ? STATUS_STYLE[status]
    : "bg-navy-50 text-navy-700 ring-navy-200";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${style}`}
    >
      {statusLabel(status)}
    </span>
  );
}

export function PricelistTable({ units }: { units: PricelistUnit[] }) {
  const [blok, setBlok] = useState<(typeof BLOKS)[number] | "all">("all");

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

  return (
    <section id="pricelist" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
          Daftar unit
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex flex-wrap rounded-full bg-navy-50 p-1"
            role="group"
            aria-label="Filter blok"
          >
            {(["all", ...BLOKS] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBlok(b)}
                aria-label={b === "all" ? "Semua blok" : `Blok ${b}`}
                aria-pressed={blok === b}
                className={`min-h-11 rounded-full px-3 text-sm font-bold transition sm:px-5 ${
                  blok === b
                    ? "bg-navy-950 text-white shadow-sm"
                    : "text-navy-800 hover:text-navy-950"
                }`}
              >
                {b === "all" ? "Semua" : b}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy-200 p-8 text-center">
            <p className="text-sm text-navy-800/70">
              Tidak ada unit di blok ini.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {sorted.map((u) => (
                <div
                  key={u.kode}
                  className="rounded-2xl bg-white p-4 ring-1 ring-navy-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {u.status === "tersedia" ? (
                          <Link
                            href={`/unit/${u.kode.toLowerCase()}`}
                            className="text-lg font-extrabold text-navy-950 underline decoration-navy-200 decoration-2 underline-offset-4"
                          >
                            {u.kode}
                          </Link>
                        ) : (
                          <span className="text-lg font-extrabold text-navy-950">
                            {u.kode}
                          </span>
                        )}
                        {u.hook && (
                          <span className="rounded-full bg-gold-400/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                            Hook
                          </span>
                        )}
                        <StatusBadge status={u.status} />
                      </div>
                      <p className="mt-1 text-sm text-navy-800/70">
                        Blok {u.blok} • {u.tipe} •{" "}
                        {u.luasTanah !== null
                          ? `${u.luasTanah} m²`
                          : "Luas menyusul"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-navy-800/50">
                        Peningkatan mutu
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-navy-950">
                        {rupiah(u.mutuKualitas)}
                      </p>
                    </div>
                  </div>
                  {u.status === "tersedia" && (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <Link
                        href={`/unit/${u.kode.toLowerCase()}`}
                        className="text-xs font-semibold text-navy-700"
                      >
                        Lihat detail →
                      </Link>
                      <a
                        href={pesanUnit(u)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 text-xs font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
                      >
                        <MessageCircle size={14} />
                        Pesan
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-2xl ring-1 ring-navy-100 md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-navy-50 text-xs font-bold uppercase tracking-wider text-navy-800">
                    <th scope="col" className="px-5 py-3.5">
                      Unit
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Tipe
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Luas Tanah
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Peningkatan Mutu
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {sorted.map((u) => (
                    <tr
                      key={u.kode}
                      className="transition-colors hover:bg-navy-50/60"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-extrabold text-navy-950">
                        {u.status === "tersedia" ? (
                          <Link
                            href={`/unit/${u.kode.toLowerCase()}`}
                            className="underline decoration-navy-200 decoration-2 underline-offset-4 hover:decoration-gold-400"
                          >
                            {u.kode}
                          </Link>
                        ) : (
                          u.kode
                        )}
                        {u.hook && (
                          <span className="ml-2 rounded-full bg-gold-400/25 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                            Hook
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-navy-800/80">
                        {u.tipe}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-navy-800/80">
                        {u.luasTanah !== null ? `${u.luasTanah} m²` : "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-bold text-navy-950">
                        {rupiah(u.mutuKualitas)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <StatusBadge status={u.status} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        {u.status === "tersedia" ? (
                          <a
                            href={pesanUnit(u)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
                          >
                            <MessageCircle size={14} />
                            Pesan
                          </a>
                        ) : (
                          <span className="text-xs text-navy-800/40">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-navy-800/70">
          <p>
            <strong className="font-semibold text-navy-900">Ketentuan:</strong>{" "}
            {pricelistNotes.join(" ")}
          </p>
          <p>
            Angsuran mulai Rp 1.072.180/bulan (20 tahun)*. Simulasi 10 dan 15
            tahun tersedia di bagian simulasi angsuran. Nilai final angsuran
            ditentukan bank.
          </p>
        </div>
      </div>
    </section>
  );
}
