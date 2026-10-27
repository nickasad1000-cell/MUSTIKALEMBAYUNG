import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { site, waLink } from "@/lib/site";

const NAV = [
  { href: "/#katalog", label: "Tipe Rumah" },
  { href: "/#pricelist", label: "Daftar Unit" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#lokasi", label: "Lokasi" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/assets/logo-icon-dark.png"
                alt={`Logo ${site.name}`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg ring-1 ring-white/20"
              />
              <div>
                <p className="text-sm font-extrabold">{site.name}</p>
                <p className="text-xs text-white/60">{site.developer}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Rumah subsidi tipe 36/60 di Sumbersuko, Lumajang.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={17} className="mt-0.5 shrink-0 text-gold-400" />
                {site.address}
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone size={17} className="shrink-0 text-gold-400" />
                  {site.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} {site.developer}. Seluruh hak cipta
            dilindungi.
          </p>
          <p className="mt-1.5">
            Harga dan ketersediaan unit dapat berubah sewaktu-waktu.
          </p>
        </div>
      </div>
    </footer>
  );
}
