"use client";

import { useState, type FormEvent } from "react";
import type { Unit } from "@/lib/units";

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
        json.reason === "VALIDATION_ERROR"
          ? "Periksa kembali isian form Anda."
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } catch {
      setStatus("error");
      setErrorMessage("Tidak dapat menghubungi server. Coba lagi.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 text-left shadow-lg">
      {status === "success" ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
            ✓
          </span>
          <h3 className="text-xl font-semibold text-zinc-900">Terima kasih!</h3>
          <p className="text-zinc-600">
            Data Anda sudah kami terima. Tim marketing akan menghubungi Anda
            secepatnya.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-zinc-900">
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
                placeholder="Nama Anda"
                className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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
                placeholder="08xxxxxxxxxx"
                className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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
                placeholder="nama@email.com"
                className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              >
                <option value="">— Belum menentukan —</option>
                {units.map((unit) => (
                  <option key={unit.slug} value={unit.slug}>
                    {unit.name}
                    {unit.price ? ` — ${formatPriceShort(unit.price)}` : ""}
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
                placeholder="Pertanyaan atau jadwal kunjungan yang diinginkan…"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            {status === "not-configured" && (
              <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Database Supabase belum dikonfigurasi. Data tidak tersimpan —
                hubungi developer atau sementara gunakan tombol WhatsApp.
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
              className="h-11 w-full rounded-full bg-emerald-900 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
            >
              {status === "loading" ? "Mengirim…" : "Kirim & Minta Info"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function formatPriceShort(price: number): string {
  if (price >= 1_000_000_000)
    return `Rp ${(price / 1_000_000_000).toFixed(2).replace(".", ",")} M`;
  return `Rp ${Math.round(price / 1_000_000)} jt`;
}
