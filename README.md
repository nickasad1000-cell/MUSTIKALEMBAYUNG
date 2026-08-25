# Mustika Lembayung — Website Katalog Perumahan

Landing page & katalog lengkap Perumahan **Mustika Lembayung**.

## Stack Teknologi

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- Data katalog: `src/data/units.json` (statis — siap migrasi ke CMS bila diperlukan)

## Menjalankan Proyek

```bash
npm install   # sekali saja
npm run dev   # buka http://localhost:3000
```

Build produksi:

```bash
npm run build && npm start
```

Lint & verifikasi:

```bash
npm run lint
```

## Struktur Proyek

```
src/
├─ app/            # Halaman (App Router)
│  ├─ layout.tsx   # Root layout + metadata SEO
│  └─ page.tsx     # Landing page (hero, keunggulan, katalog, CTA)
├─ data/
│  └─ units.json   # Katalog unit/tipe rumah
└─ lib/
   └─ units.ts     # Tipe data + helper akses katalog
```

## Roadmap

- [x] Fase 0 — Setup repo, stack, scaffold
- [ ] Fase 1–2 — Konten, sitemap, wireframe
- [ ] Fase 3 — Desain visual & UI kit (shadcn/ui)
- [ ] Fase 4 — Katalog lengkap: filter, detail unit (`/units/[slug]`), galeri, form lead
- [ ] Fase 5 — SEO teknis, aksesibilitas, performance, deploy
