"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

export interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null && index >= 0 && index < images.length;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  if (!open || index === null) return null;
  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className="fixed inset-0 z-50 flex flex-col bg-navy-950/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-4 text-white">
        <p className="text-sm text-white/80">
          {index + 1} / {images.length} — {image.caption}
        </p>
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl transition-all duration-300 ease-brand hover:bg-white/20 active:scale-95"
        >
          ✕
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-all duration-300 ease-brand hover:bg-white/20 active:scale-95 sm:left-6"
        >
          ‹
        </button>
        <div className="relative max-h-[82vh] w-auto">
          <Image
            src={image.src}
            alt={image.caption}
            width={1920}
            height={1920}
            sizes="100vw"
            className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            priority
          />
        </div>
        <button
          onClick={next}
          aria-label="Berikutnya"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-all duration-300 ease-brand hover:bg-white/20 active:scale-95 sm:right-6"
        >
          ›
        </button>
      </div>
    </div>
  );
}
