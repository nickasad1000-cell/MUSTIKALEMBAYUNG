"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/lib/site";

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

  function go(id: string) {
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      sessionStorage.setItem("scrollTo", id);
      router.push("/");
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/85 pl-5 pr-2 shadow-lg shadow-navy-950/5 backdrop-blur-xl">
        <button
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", window.location.pathname);
            } else {
              router.push("/");
            }
          }}
          className="flex items-center gap-3"
          aria-label="Kembali ke atas"
        >
          <Image
            src="/assets/logo-icon-dark.png"
            alt={`Logo ${site.developer}`}
            width={30}
            height={32}
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
              className="min-h-11 rounded-full px-4 font-medium transition-all duration-300 ease-brand hover:bg-navy-950/5 hover:text-navy-950"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => go("kontak")}
          className="flex h-11 items-center rounded-full bg-navy-950 px-5 text-sm font-medium text-white transition-all duration-300 ease-brand hover:bg-navy-800 active:scale-[0.97]"
        >
          Hubungi Kami
        </button>
      </div>
    </header>
  );
}
