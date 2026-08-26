import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-emerald-950 py-12 text-sm text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Image
            src="/assets/logo.png"
            alt={site.developer}
            width={160}
            height={57}
            className="h-auto w-40 opacity-90"
          />
          <p>
            © {new Date().getFullYear()} {site.developer}.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>{site.name} — {site.address}</p>
          <p>
            WA {site.whatsappDisplay} ·{" "}
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Google Maps
            </a>
          </p>
          <p>Harga & spesifikasi dapat berubah tanpa pemberitahuan.</p>
        </div>
      </div>
    </footer>
  );
}
