"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Jalankan scroll dari hash atau halaman lain, lalu bersihkan URL. */
export function ScrollManager() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const target = sessionStorage.getItem("scrollTo") || hash;
    if (!target) return;

    sessionStorage.removeItem("scrollTo");
    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", window.location.pathname);
      }, 150);
    });
  }, [pathname, router]);

  return null;
}
