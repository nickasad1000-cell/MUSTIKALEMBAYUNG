import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-14 text-sm text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Image
            src="/assets/logo.png"
            alt={site.developer}
            width={180}
            height={66}
            className="h-auto w-44 opacity-95"
          />
          <p>
            © {new Date().getFullYear()} {site.developer}.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-white/80">
            {site.name} — {site.address}
          </p>
          <p>
            WA{" "}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline underline-offset-2 transition-colors duration-300 hover:text-white"
            >
              {site.whatsappDisplay}
            </a>{" "}
            ·{" "}
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline underline-offset-2 transition-colors duration-300 hover:text-white"
            >
              Google Maps
            </a>
          </p>
          <p className="text-white/60">
            Harga & spesifikasi dapat berubah tanpa pemberitahuan.
          </p>
        </div>
      </div>
    </footer>
  );
}
