<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sumber data harga — WAJIB DIBACA

Harga dan luas tanah di situs ini berasal dari satu dokumen:
`public/assets/daftar-harga.webp` ("Daftar Harga per Blok").

Aturannya:

1. **Angka harga dan luas tanah hanya boleh diubah di `scripts/pricelist.mjs`.**
   File itu adalah transkripsi dokumen. `src/data/pricelist.json` adalah file
   **hasil generate** — jangan diedit manual.
2. **Status tersedia/terjual hanya boleh diubah di `src/data/unit-status.json`.**
   Status tidak ada di dokumen, jadi tidak boleh dicampur ke sumber harga.
3. **`npm test` (= `npm run pricelist:check`) wajib hijau sebelum build.**
   `npm run build` menjalankan test ini lebih dulu, jadi harga yang salah tidak
   bisa lolos ke produksi. Kalau gagal, jalankan `npm run pricelist`.
4. **Jangan menambah biaya yang tidak tertulis di dokumen** (mis. "selisih tanah
   per m2"). Kalau tidak ada di `daftar-harga.webp`, jangan ditampilkan.
5. **Unit tanpa status tampil sebagai "Belum dapat dipastikan"**, bukan
   "Tersedia". `null` berarti belum ada data operasional, bukan berarti tersedia.
6. **Jangan menebak angka dari unit lain.** Blok E pernah rusak justru karena
   kolom mutu diisi dengan deret baris yang bergeser satu. Ambil setiap angka
   dari barisnya sendiri di dokumen.

Riwayat singkat kenapa aturan ini ada: versi lama situs menampilkan 35 unit
dengan peningkatan mutu Rp15.000.000 padahal dokumen menyatakan Rp0, dan
kolom mutu Blok E bergeser satu baris sehingga harga E10 (Rp29.625.000)
hilang. Semuanya lolos karena tidak ada yang membandingkan data dengan dokumen.
`scripts/pricelist.mjs` + `npm test` dibuat supaya itu tidak bisa terjadi lagi.

Cek cepat tanpa server:

```bash
npm run pricelist:show   # ringkasan unit
npm test                 # verifikasi data vs dokumen
npm run pricelist        # regenerate src/data/pricelist.json
```
