"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { PricelistUnit } from "@/lib/pricelist";
import { pricelistNotes, waLink } from "@/lib/site";

const BLOKS = ["A", "B", "C", "D", "E"] as const;
const PAGE_SIZE = 12;

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
    <section id="pricelist" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="sr-only">Pricelist Unit</h2>

        <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-800 ring-1 ring-navy-100">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {units.length} unit siap huni
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex flex-wrap rounded-full bg-navy-50 p-1"
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

        {shown.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy-200 p-8 text-center">
            <p className="text-sm text-navy-800/70">
              Belum ada unit siap huni di blok ini.
            </p>
            <a
              href={waLink("unit Mustika Lembayung yang masih tersedia")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-navy-950 px-5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              Tanya unit yang tersedia
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {shown.map((u) => (
                <div
                  key={u.kode}
                  className="rounded-2xl bg-white p-4 ring-1 ring-navy-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/unit/${u.kode.toLowerCase()}`}
                        className="text-lg font-extrabold text-navy-950 underline decoration-navy-200 decoration-2 underline-offset-4"
                      >
                        {u.kode}
                      </Link>
                      {u.hook && (
                        <span className="ml-2 rounded-full bg-gold-400/25 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-gold-700 ring-1 ring-gold-500/40">
                          Hook
                        </span>
                      )}
                      <p className="mt-0.5 text-sm text-navy-800/70">
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
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {shown.map((u) => (
                    <tr
                      key={u.kode}
                      className="transition-colors hover:bg-navy-50/60"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-extrabold text-navy-950">
                        <Link
                          href={`/unit/${u.kode.toLowerCase()}`}
                          className="underline decoration-navy-200 decoration-2 underline-offset-4 hover:decoration-gold-400"
                        >
                          {u.kode}
                        </Link>
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
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        <a
                          href={pesanUnit(u)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
                        >
                          <MessageCircle size={14} />
                          Pesan
                        </a>
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
                  className="inline-flex min-h-11 items-center rounded-full border border-navy-200 bg-white px-5 text-sm font-semibold text-navy-800 transition hover:border-navy-300"
                >
                  Tampilkan unit lainnya ({sorted.length - shown.length})
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-navy-800/70">
          <p>
            <strong className="font-semibold text-navy-900">Ketentuan:</strong>{" "}
            {pricelistNotes.join(" ")}
          </p>
          <p>
            Angsuran mulai Rp 1.072.180/bulan (20 tahun)*. Simulasi 10 dan 15
            tahun tersedia di bagian Harga &amp; Siteplan. Nilai final angsuran
            ditentukan bank.
          </p>
        </div>
      </div>
    </section>
  );
}
