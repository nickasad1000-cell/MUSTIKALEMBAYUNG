import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-emerald-950 py-12 text-sm text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}.
        </p>
        <p>{site.address}</p>
        <p>Harga & spesifikasi dapat berubah tanpa pemberitahuan.</p>
      </div>
    </footer>
  );
}
