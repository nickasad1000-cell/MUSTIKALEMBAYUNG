"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox, type LightboxImage } from "@/components/site/lightbox";

export function UnitGallery({
  images,
}: {
  images: (LightboxImage & { png?: boolean })[];
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Perbesar ${img.caption}`}
            className={`group relative block w-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-100 to-gold-100 transition-all duration-500 ease-brand hover:shadow-xl hover:shadow-navy-950/10 focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
              img.png ? "border border-navy-950/5 bg-white" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.caption}
              width={1200}
              height={img.png ? 1500 : 900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`h-auto w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.02] photo-outline ${
                img.png ? "object-contain" : ""
              }`}
              priority={i === 0}
            />
            <span
              aria-hidden
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy-950/50 text-white opacity-0 backdrop-blur transition-all duration-500 ease-brand group-hover:opacity-100"
            >
              ⤢
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-950">
              {img.caption}
            </span>
          </button>
        ))}
      </div>
      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}
