"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/** Navigasi ke seksi di homepage dari halaman lain (via sessionStorage.scrollTo). */
export function NavigateLink({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        sessionStorage.setItem("scrollTo", target);
        router.push("/");
      }}
      className={className}
    >
      {children}
    </button>
  );
}
