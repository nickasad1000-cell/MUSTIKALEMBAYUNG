"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/lib/site";

const NAV = [
  { id: "katalog", label: "Tipe Rumah" },
  { id: "pricelist", label: "Pricelist" },
  { id: "harga", label: "Harga & Siteplan" },
  { id: "galeri", label: "Galeri" },
  { id: "lokasi", label: "Lokasi" },
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
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const solid = pathname !== "/" || scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
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

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        solid ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", window.location.pathname);
            } else {
              router.push("/");
            }
          }}
          className="flex h-16 items-center gap-2.5"
          aria-label={`${site.name} — kembali ke atas`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              solid ? "bg-navy-950" : "bg-white/15 backdrop-blur"
            }`}
          >
            <Image
              src="/assets/logo-icon-dark.png"
              alt={`Logo ${site.developer}`}
              width={22}
              height={20}
              preload
              className="h-5 w-auto"
            />
          </span>
          <span
            className={`text-sm font-extrabold tracking-tight whitespace-nowrap ${
              solid ? "text-navy-950" : "text-white"
            }`}
          >
            {site.name}
          </span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={`inline-flex h-16 items-center px-1 text-sm font-semibold transition-colors ${
                solid
                  ? "text-navy-800 hover:text-navy-950"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-gold-400 px-4 text-sm font-bold text-navy-950 transition-transform hover:bg-gold-300 active:scale-[0.98]"
          >
            Chat WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className={`rounded-lg p-3 lg:hidden ${
            solid ? "text-navy-950" : "text-white"
          }`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 lg:hidden"
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="block w-full py-2.5 text-left text-sm font-semibold text-navy-800"
            >
              {item.label}
            </button>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-full bg-gold-400 px-4 py-2.5 text-center text-sm font-bold text-navy-950"
          >
            Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
