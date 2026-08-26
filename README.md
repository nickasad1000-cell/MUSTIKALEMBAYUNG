# Mustika Lembayung — Website Katalog Perumahan

Landing page & katalog lengkap Perumahan **Mustika Lembayung** Sumbersuko, Lumajang.

**Live:** https://mustikalembayung.vercel.app

## Stack Teknologi

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com) — database lead/form calon pembeli
- Hosting: **Vercel**

## Menjalankan Proyek

```bash
npm install          # sekali saja
cp .env.example .env.local   # lalu isi kredensial Supabase
npm run dev          # buka http://localhost:3000
```

Build produksi:

```bash
npm run build && npm start
```

Lint & verifikasi:

```bash
npm run lint
```

## Setup Supabase

1. Buat project di [supabase.com](https://supabase.com) → **New Project**.
2. Buka **SQL Editor** → paste isi `supabase/schema.sql` → **Run**.
   (Membuat tabel `leads` + keamanan RLS: publik hanya bisa INSERT.)
3. Ambil kredensial di **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(rahasia, jangan dibagikan)*
4. Simpan di `.env.local` (lokal) dan Environment Variables Vercel (produksi).

> Tanpa env Supabase, situs tetap jalan — form akan menampilkan pesan
> "database belum dikonfigurasi" alih-alih error.

## Deploy ke Vercel

1. Push repo ini ke GitHub (`git push`).
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repo `nickasad1000-cell/MUSTIKALEMBAYUNG`.
3. Framework preset: **Next.js** (terdeteksi otomatis). Klik **Deploy**.
4. Setelah deploy pertama, buka **Settings → Environment Variables** dan tambahkan
   variabel Supabase dari tabel di atas → **Redeploy**.
5. (Opsional) Tambahkan domain custom di **Settings → Domains**.

Setiap `git push` ke `main` otomatis men-trigger deploy baru.

## Struktur Proyek

```
src/
├─ app/
│  ├─ layout.tsx            # Root layout + metadata SEO
│  ├─ page.tsx              # Landing page (hero, keunggulan, katalog, galeri, lokasi, kontak)
│  ├─ units/[slug]/page.tsx # Detail unit (spesifikasi, fitur, CTA WA)
│  └─ api/leads/route.ts    # API form lead → insert ke Supabase
├─ components/
│  ├─ catalog/unit-catalog.tsx  # Grid katalog + filter (status/KT/harga)
│  ├─ forms/lead-form.tsx       # Form calon pembeli
│  ├─ site/header.tsx, footer.tsx
│  └─ ui/                       # Komponen shadcn/ui
├─ data/units.json           # Katalog unit/tipe rumah (statis)
└─ lib/
   ├─ units.ts               # Tipe data + helper katalog
   ├─ site.ts                # Konfigurasi situs (WA, alamat, peta, galeri)
   ├─ supabase.ts            # Client Supabase (server)
   └─ utils.ts               # cn() helper shadcn
supabase/schema.sql          # Skema database (jalankan sekali di SQL Editor)
```

## Roadmap

- [x] Fase 0 — Setup repo, stack, scaffold
- [x] Fase 4a — Katalog + filter, detail unit, form lead + Supabase, galeri & lokasi, UI kit shadcn
- [x] Konten asli: foto rumah, denah, nomor WA, koordinat peta (Sumbersuko, Lumajang)
- [ ] Harga final per unit (sementara: "Hubungi untuk harga")
- [ ] Halaman tambahan: fasilitas, tentang, FAQ, blog
- [ ] Fase 5 — SEO teknis lanjutan (sitemap, schema.org), aksesibilitas audit
- [ ] Dashboard admin leads (opsional, via Supabase Studio dulu cukup)
