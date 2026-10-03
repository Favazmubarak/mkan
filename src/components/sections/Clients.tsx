import Image from "next/image";
import { homeContent } from "@/content/home";

export interface ClientItem {
  name: string;
  logo: string;
  [key: string]: unknown;
}

interface ClientsProps {
  data?: {
    eyebrow?: string;
    clients?: readonly ClientItem[] | ClientItem[] | any;
    [key: string]: unknown;
  } | typeof homeContent.trustedBy;
}

export function Clients({ data }: ClientsProps) {
  const trustedBy = data || homeContent.trustedBy;
  const eyebrow = trustedBy.eyebrow || "TRUSTED BY";

  // Exact 7 enterprise clients matching media_1791060411155.png
  const row1 = [
    { name: "Government of Dubai", logo: "/images/clients/gov-dubai.svg", width: 175, height: 46 },
    { name: "EMAAR", logo: "/images/clients/emaar.svg", width: 105, height: 56 },
    { name: "MERAAS", logo: "/images/clients/meraas.svg", width: 135, height: 46 },
    { name: "Dubai Culture & Arts Authority", logo: "/images/clients/dubai-culture.svg", width: 130, height: 46 },
  ];

  const row2 = [
    { name: "ADNOC", logo: "/images/clients/adnoc.svg", width: 135, height: 46 },
    { name: "Emirates", logo: "/images/clients/emirates.svg", width: 115, height: 56 },
    { name: "Dubai Future Foundation", logo: "/images/clients/dubai-future.svg", width: 130, height: 46 },
  ];

  return (
    <section
      id="clients"
      className="relative bg-[#FAF5EE] text-[#240612] px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 border-t border-[#240612]/6 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Top-Left Eyebrow Title matching reference image */}
        <p className="font-sans text-[0.72rem] sm:text-[0.78rem] font-bold tracking-[0.24em] uppercase text-[#6B554D] mb-10 sm:mb-12 select-none">
          {eyebrow}
        </p>

        {/* ─── DESKTOP / TABLET LAYOUT (Exact match to reference image) ─── */}
        <div className="hidden md:block space-y-8 lg:space-y-10">
          {/* Row 1: 4 Logos with vertical divider lines */}
          <div className="grid grid-cols-4 items-center">
            {row1.map((client, idx) => (
              <div key={client.name} className="relative flex items-center justify-center px-4 lg:px-6">
                <div className="h-14 lg:h-16 flex items-center justify-center w-full transition-transform duration-300 hover:scale-105">
                  <Image
                    src={client.logo}
                    alt={`${client.name} official logo`}
                    width={client.width}
                    height={client.height}
                    className="object-contain max-h-12 w-auto select-none pointer-events-none transition-opacity duration-300 opacity-90 hover:opacity-100"
                    unoptimized
                  />
                </div>
                {/* Thin vertical divider line after each item (except the last in row) */}
                {idx < row1.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 lg:h-12 bg-[#D4B996]/55"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Row 2: 3 Logos with vertical divider lines, matching reference layout */}
          <div className="grid grid-cols-4 items-center">
            {row2.map((client, idx) => (
              <div key={client.name} className="relative flex items-center justify-center px-4 lg:px-6">
                <div className="h-14 lg:h-16 flex items-center justify-center w-full transition-transform duration-300 hover:scale-105">
                  <Image
                    src={client.logo}
                    alt={`${client.name} official logo`}
                    width={client.width}
                    height={client.height}
                    className="object-contain max-h-12 w-auto select-none pointer-events-none transition-opacity duration-300 opacity-90 hover:opacity-100"
                    unoptimized
                  />
                </div>
                {/* Thin vertical divider line between row 2 items */}
                {idx < row2.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 lg:h-12 bg-[#D4B996]/55"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
            {/* 4th empty column to maintain the exact 4-over-3 silhouette */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>

        {/* ─── MOBILE LAYOUT (2 Columns with clean responsive dividers) ─── */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 items-center md:hidden">
          {[...row1, ...row2].map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center p-3 h-14"
            >
              <Image
                src={client.logo}
                alt={`${client.name} official logo`}
                width={client.width}
                height={client.height}
                className="object-contain max-h-10 w-auto select-none pointer-events-none opacity-90"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
