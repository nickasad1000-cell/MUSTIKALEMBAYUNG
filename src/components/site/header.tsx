import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-emerald-950"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
          <Link href="/#keunggulan" className="hover:text-emerald-900">
            Keunggulan
          </Link>
          <Link href="/#katalog" className="hover:text-emerald-900">
            Katalog Unit
          </Link>
          <Link href="/#galeri" className="hover:text-emerald-900">
            Galeri
          </Link>
          <Link href="/#lokasi" className="hover:text-emerald-900">
            Lokasi
          </Link>
          <Link href="/#kontak" className="hover:text-emerald-900">
            Kontak
          </Link>
        </nav>
        <Link
          href="/#kontak"
          className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
}
