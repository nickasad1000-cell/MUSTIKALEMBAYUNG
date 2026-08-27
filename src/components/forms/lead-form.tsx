"use client";

import { useState, type FormEvent } from "react";
import type { Unit } from "@/lib/units";
import { priceShort } from "@/lib/units";

type FormStatus = "idle" | "loading" | "success" | "error" | "not-configured";

export function LeadForm({ units }: { units: Unit[] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? "") || undefined,
          unitSlug: String(data.get("unitSlug") ?? "") || undefined,
          message: String(data.get("message") ?? "") || undefined,
          website: String(data.get("website") ?? "") || undefined,
        }),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (json.reason === "SUPABASE_NOT_CONFIGURED") {
        setStatus("not-configured");
        return;
      }
      setStatus("error");
      setErrorMessage(
        json.reason === "RATE_LIMITED"
          ? "Terlalu banyak percobaan. Tunggu beberapa menit atau hubungi kami via WhatsApp."
          : json.reason === "VALIDATION_ERROR"
            ? "Periksa kembali isian form Anda."
            : "Terjadi kesalahan. Silakan coba lagi."
      );
    } catch {
      setStatus("error");
      setErrorMessage("Tidak dapat menghubungi server. Coba lagi.");
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-navy-950 outline-none transition-colors duration-300 placeholder:text-zinc-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20";

  return (
    <div className="w-full max-w-md rounded-3xl border border-navy-950/5 bg-navy-950/[0.06] p-2 shadow-2xl shadow-navy-950/20">
      <div className="rounded-[1.25rem] bg-white p-7 text-left">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-2xl text-navy-950">
              ✓
            </span>
            <h3 className="font-heading text-xl font-semibold text-navy-950">
              Terima kasih!
            </h3>
            <p className="text-zinc-600">
              Data Anda sudah kami terima. Tim marketing akan menghubungi Anda
              secepatnya.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm font-medium text-navy-700 transition-colors duration-300 hover:text-navy-950 hover:underline"
            >
              Kirim pesan lain
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-xl font-semibold text-navy-950">
              Jadwalkan Kunjungan
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Isi form di bawah — kami balas maksimal 1×24 jam.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="lead-name"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Nama Lengkap *
                </label>
                <input
                  id="lead-name"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Nama Anda"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lead-phone"
                  className="block text-sm font-medium text-zinc-700"
                >
                  No. WhatsApp *
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  required
                  type="tel"
                  pattern="[0-9+\-\s]{8,}"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  className={`${inputClass} tabular-nums`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lead-email"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Email (opsional)
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lead-unit"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Unit yang Diminati
                </label>
                <select
                  id="lead-unit"
                  name="unitSlug"
                  defaultValue=""
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">— Belum menentukan —</option>
                  {units.map((unit) => (
                    <option key={unit.slug} value={unit.slug}>
                      {unit.name}
                      {unit.price ? ` — ${priceShort(unit.price)}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lead-message"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Pesan (opsional)
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  autoComplete="off"
                  placeholder="Pertanyaan atau jadwal kunjungan yang diinginkan…"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors duration-300 placeholder:text-zinc-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
                />
              </div>

              {/* Honeypot anti-bot — tersembunyi dari manusia */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "not-configured" && (
                <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Layanan penerimaan data sedang tidak aktif. Silakan langsung
                  chat WhatsApp kami di 0813-3337-2016.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 w-full rounded-full bg-navy-950 text-sm font-medium text-white transition duration-300 ease-brand hover:bg-navy-800 active:scale-[0.98] disabled:opacity-60"
              >
                {status === "loading" ? "Mengirim…" : "Kirim & Minta Info"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
