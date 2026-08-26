"use client";

import type { ReactNode } from "react";
import { scrollToSection } from "@/components/site/header";

export function SmoothLink({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button onClick={() => scrollToSection(target)} className={className}>
      {children}
    </button>
  );
}
