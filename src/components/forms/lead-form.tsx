"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
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
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-950 outline-none transition placeholder:text-navy-800/55 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20";

  return (
    <div className="w-full rounded-2xl bg-paper p-6 ring-1 ring-navy-100 sm:p-8">
      <div>
        {status === "success" ? (
          <div className="flex flex-col items-center py-10 text-center">
            <CheckCircle2 size={48} className="text-emerald-500" />
            <h3 className="mt-4 text-lg font-extrabold text-navy-950">
              Terima kasih!
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-800/70">
              Minat Anda sudah kami terima. Tim kami akan menghubungi Anda
              segera.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full px-4 py-2 text-sm font-bold text-navy-700 underline underline-offset-2"
            >
              Kirim minat lain
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-name"
                  className="mb-1.5 block text-sm font-bold text-navy-950"
                >
                  Nama Lengkap
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

              <div>
                <label
                  htmlFor="lead-phone"
                  className="mb-1.5 block text-sm font-bold text-navy-950"
                >
                  No. WhatsApp
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  required
                  type="tel"
                  pattern="[0-9+\-\s]{8,}"
                  autoComplete="tel"
                  placeholder="08xx xxxx xxxx"
                  className={`${inputClass} tabular-nums`}
                />
              </div>

              <div>
                <label
                  htmlFor="lead-unit"
                  className="mb-1.5 block text-sm font-bold text-navy-950"
                >
                  Unit yang Diminati{" "}
                  <span className="font-medium text-navy-800/70">(opsional)</span>
                </label>
                <select
                  id="lead-unit"
                  name="unitSlug"
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="">Belum menentukan</option>
                  {units.map((unit) => (
                    <option key={unit.slug} value={unit.slug}>
                      {unit.name}
                      {unit.price ? ` — ${priceShort(unit.price)}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="lead-message"
                  className="mb-1.5 block text-sm font-bold text-navy-950"
                >
                  Pesan{" "}
                  <span className="font-medium text-navy-800/70">(opsional)</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  autoComplete="off"
                  placeholder="Contoh: Saya ingin tanya syarat KPR pegawai…"
                  className={`${inputClass} resize-none`}
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98] disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Mengirim…"
                ) : (
                  <>
                    <MessageCircle size={18} />
                    Kirim Minat Saya
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
