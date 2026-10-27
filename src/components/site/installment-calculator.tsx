"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

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
    <section className="bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 text-gold-400">
              <Calculator size={22} />
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                Simulasi angsuran per bulan
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy-100/80">
              Pilih tenor kredit untuk melihat perkiraan angsuran rumah tipe
              36/60 di Mustika Lembayung.
            </p>
          </div>

          <div className="w-full max-w-md">
            <div
              className="grid grid-cols-3 gap-2"
              role="group"
              aria-label="Pilih tenor"
            >
              {INSTALLMENTS.map((i) => (
                <button
                  key={i.tenor}
                  type="button"
                  onClick={() => setTenor(i.tenor)}
                  aria-pressed={tenor === i.tenor}
                  className={`rounded-xl px-3 py-3 text-center transition ${
                    tenor === i.tenor
                      ? "bg-gold-400 text-navy-950"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  <span className="block text-lg font-extrabold leading-none">
                    {i.tenor}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider">
                    Tahun
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                Angsuran {tenor} tahun
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-gold-400">
                {formatRupiah(active.monthly)}
                <span className="text-base font-semibold text-white/70">
                  {" "}
                  /bulan
                </span>
              </p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-navy-200/70">
              *Simulasi berdasarkan pricelist. Nilai final angsuran ditentukan
              oleh bank.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
