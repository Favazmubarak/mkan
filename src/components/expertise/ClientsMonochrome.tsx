"use client";

import Image from "next/image";

interface ClientItem {
  name: string;
  logo: string;
  width: number;
  height: number;
  aspectRatio: number;
}

const CLIENTS: ClientItem[] = [
  { name: "Abu Dhabi Business Women Council", logo: "/images/logo/abudhabi-business-women-council.png", width: 800, height: 172, aspectRatio: 4.65 },
  { name: "Dubai Ladies Club", logo: "/images/logo/dubai-ladies-club.png", width: 463, height: 324, aspectRatio: 1.43 },
  { name: "Chalhoub Group", logo: "/images/logo/chalhoub.png", width: 432, height: 379, aspectRatio: 1.14 },
  { name: "Emirates Steel", logo: "/images/logo/emirates-steel.png", width: 654, height: 200, aspectRatio: 3.27 },
  { name: "Galeries Lafayette", logo: "/images/logo/gallaries.png", width: 603, height: 315, aspectRatio: 1.91 },
  { name: "Dubai Health Authority", logo: "/images/logo/health-authotirty.png", width: 241, height: 220, aspectRatio: 1.1 },
  { name: "HSBC", logo: "/images/logo/HSBC.png", width: 213, height: 157, aspectRatio: 1.36 },
  { name: "Kaya Skin Clinic", logo: "/images/logo/kaya.png", width: 796, height: 305, aspectRatio: 2.61 },
  { name: "KIZAD", logo: "/images/logo/kizad.png", width: 575, height: 189, aspectRatio: 3.04 },
  { name: "SEHA", logo: "/images/logo/seha.png", width: 179, height: 155, aspectRatio: 1.15 },
  { name: "Alta Pleat", logo: "/images/logo/alta-pleat.png", width: 206, height: 186, aspectRatio: 1.11 },
  { name: "Aisha's", logo: "/images/logo/aishas.png", width: 165, height: 133, aspectRatio: 1.24 },
  { name: "EIC", logo: "/images/logo/eic.png", width: 345, height: 218, aspectRatio: 1.58 },
  { name: "Fabula Jewels", logo: "/images/logo/fabula.png", width: 391, height: 109, aspectRatio: 3.59 },
  { name: "Fiz", logo: "/images/logo/fiz.png", width: 229, height: 260, aspectRatio: 0.88 },
  { name: "Homa Q", logo: "/images/logo/homaq.png", width: 379, height: 130, aspectRatio: 2.92 },
  { name: "Selsela", logo: "/images/logo/selsela.png", width: 190, height: 106, aspectRatio: 1.79 },
];

export function ClientsMonochrome() {
  return (
    <section
      id="clients"
      className="relative bg-[#16030C] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-[#DDB78A]/15"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-[#DDB78A]/60" aria-hidden="true" />
            <span className="text-[0.68rem] font-sans font-medium tracking-[0.3em] uppercase text-[#DDB78A]">
              INSTITUTIONAL TRUST
            </span>
            <span className="h-px w-6 bg-[#DDB78A]/60" aria-hidden="true" />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-normal tracking-wide uppercase text-[#FAF1E8]">
            SELECTED CLIENTS & COLLABORATORS
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans font-light text-[#EAE0D5]/70">
            Partnering with government entities, international luxury houses, and regional enterprises.
          </p>
        </div>

        {/* Monochrome Luxury Logo Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              title={client.name}
              className="group flex h-24 sm:h-28 items-center justify-center p-4 rounded-sm border border-[#DDB78A]/15 bg-[#1C0511]/40 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A]/50 hover:bg-[#1C0511] hover:-translate-y-0.5"
            >
              <div className="relative h-10 sm:h-12 w-full max-w-[130px] flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="140px"
                  className="object-contain filter grayscale brightness-125 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-150 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
