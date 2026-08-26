"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryItems } from "@/lib/site";
import { Lightbox } from "@/components/site/lightbox";

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {galleryItems.map((item, i) => (
          <figure key={item.caption}>
            <button
              onClick={() => setIndex(i)}
              aria-label={`Perbesar foto ${item.caption}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-navy-100 to-gold-100 transition-all duration-500 ease-brand hover:shadow-xl hover:shadow-navy-950/10 focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.05] photo-outline ${
                  item.src.endsWith(".png") ? "object-contain p-4" : ""
                }`}
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-navy-950/0 text-2xl text-white opacity-0 transition-all duration-500 ease-brand group-hover:bg-navy-950/30 group-hover:opacity-100"
              >
                ⤢
              </span>
            </button>
            <figcaption className="mt-2 px-1 text-sm text-zinc-600">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <Lightbox
        images={galleryItems}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}
