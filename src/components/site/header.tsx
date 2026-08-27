"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/lib/site";

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "katalog", label: "Katalog Unit" },
  { id: "harga", label: "Harga & Siteplan" },
  { id: "galeri", label: "Galeri" },
  { id: "lokasi", label: "Lokasi" },
  { id: "kontak", label: "Kontak" },
];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", window.location.pathname);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function go(id: string) {
    setMenuOpen(false);
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      sessionStorage.setItem("scrollTo", id);
      router.push("/");
    }
  }

  const pillClass =
    "min-h-11 rounded-full px-4 text-left font-medium transition duration-300 ease-brand hover:bg-navy-950/5 hover:text-navy-950";

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/85 pl-5 pr-2 shadow-lg shadow-navy-950/5 backdrop-blur-xl">
        <button
          onClick={() => {
            setMenuOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", window.location.pathname);
            } else {
              router.push("/");
            }
          }}
          className="flex min-h-11 items-center gap-3"
          aria-label="Mustika Lembayung — kembali ke atas"
        >
          <Image
            src="/assets/logo-icon-dark.png"
            alt={`Logo ${site.developer}`}
            width={32}
            height={29}
            preload
            className="h-8 w-auto"
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-navy-950">
            {site.name}
          </span>
        </button>
        <nav className="hidden items-center gap-1 text-sm text-navy-900/70 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={pillClass}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={() => go("kontak")}
            className="hidden h-11 items-center rounded-full bg-navy-950 px-5 text-sm font-medium text-white transition duration-300 ease-brand hover:bg-navy-800 active:scale-[0.97] min-[420px]:flex"
          >
            Hubungi Kami
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-navy-950 transition-colors duration-300 ease-brand hover:bg-navy-950/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            className="absolute right-0 top-[4.25rem] flex w-60 flex-col gap-1 rounded-3xl border border-navy-950/10 bg-white/95 p-3 shadow-xl shadow-navy-950/15 backdrop-blur-xl lg:hidden"
            aria-label="Navigasi utama"
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`${pillClass} w-full`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex h-11 w-full items-center justify-center rounded-full bg-[#25D366] font-medium text-white transition active:scale-[0.98]"
            >
              Chat WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
