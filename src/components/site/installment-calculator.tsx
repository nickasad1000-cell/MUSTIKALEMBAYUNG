"use client";

import { useState } from "react";

const INSTALLMENTS = [
  { tenor: 10, monthly: 1_730_400 },
  { tenor: 15, monthly: 1_287_300 },
  { tenor: 20, monthly: 1_072_180 },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function InstallmentCalculator() {
  const [tenor, setTenor] = useState(20);
  const active = INSTALLMENTS.find((i) => i.tenor === tenor) ?? INSTALLMENTS[2];

  return (
    <div className="mt-10 grid gap-6 rounded-3xl border border-navy-950/5 bg-navy-950 p-6 text-white sm:p-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
          Simulasi angsuran per bulan
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
          Pilih tenor kredit untuk melihat perkiraan cicilan flat rumah tipe
          36/60.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilih tenor">
          {INSTALLMENTS.map((i) => (
            <button
              key={i.tenor}
              type="button"
              onClick={() => setTenor(i.tenor)}
              aria-pressed={tenor === i.tenor}
              className={`rounded-xl px-3 py-3 text-center transition-colors duration-300 ${
                tenor === i.tenor
                  ? "bg-gold-400 text-navy-950"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="block text-lg font-semibold leading-none tabular-nums">
                {i.tenor}
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider">
                Tahun
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            Angsuran {tenor} tahun
          </p>
          <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-gold-400 tabular-nums">
            {formatRupiah(active.monthly)}
            <span className="text-base font-normal text-white/70"> /bulan</span>
          </p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          *Simulasi berdasarkan pricelist. Nilai final angsuran ditentukan oleh
          bank.
        </p>
      </div>
    </div>
  );
}
