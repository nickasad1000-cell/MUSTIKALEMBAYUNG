"use client";

import Image from "next/image";
import { useState } from "react";
import { docItems } from "@/lib/site";
import { Lightbox } from "@/components/site/lightbox";

export function DocGrid() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {docItems.map((doc, i) => (
          <button
            key={doc.title}
            onClick={() => setIndex(i)}
            className="group flex flex-col rounded-3xl border border-navy-950/5 bg-navy-950/[0.03] p-2 text-left shadow-sm transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10 focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          >
            <span className="relative block aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-white">
              <Image
                src={doc.src}
                alt={doc.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-brand group-hover:scale-[1.03] photo-outline"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-navy-950/0 text-2xl text-white opacity-0 transition-all duration-500 ease-brand group-hover:bg-navy-950/30 group-hover:opacity-100"
              >
                ⤢ Klik untuk perbesar
              </span>
            </span>
            <span className="flex flex-col gap-1 px-4 pb-4 pt-4">
              <span className="font-heading text-lg font-semibold text-navy-950">
                {doc.title}
              </span>
              <span className="text-sm leading-relaxed text-zinc-600">
                {doc.description}
              </span>
            </span>
          </button>
        ))}
      </div>
      <Lightbox
        images={docItems.map((d) => ({ src: d.src, caption: d.title }))}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}
