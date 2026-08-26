"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Bersihkan hash dari URL & jalankan scroll tersimpan dari halaman lain. */
export function ScrollManager() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      // tunggu render selesai sebelum scroll
      requestAnimationFrame(() => {
        setTimeout(() => {
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      });
    }
  }, [pathname, router]);

  return null;
}
