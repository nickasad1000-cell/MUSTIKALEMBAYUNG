"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export type UnitPhoto = { src: string; alt: string };

/** Grid foto unit + lightbox ringan (tanpa dependensi animasi). */
export function UnitPhotoGrid({ photos }: { photos: UnitPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) => (cur === null ? null : (cur + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Perbesar foto: ${p.alt}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="photo-outline object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/15" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeri foto unit"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>
          )}
          <figure
            className="relative h-[82dvh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <figcaption className="absolute inset-x-0 bottom-0 rounded-lg bg-navy-950/70 px-4 py-2.5 text-center text-xs font-medium text-white backdrop-blur">
              {photos[active].alt} — {active + 1}/{photos.length}
            </figcaption>
          </figure>
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
