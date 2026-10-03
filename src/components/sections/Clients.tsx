import Image from "next/image";
import fs from "fs";
import path from "path";
import { homeContent } from "@/content/home";

export interface ClientItem {
  name: string;
  logo: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
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
  const eyebrow = trustedBy.eyebrow || "OUR CLIENTS";

  // Base list of client logos from curated home content
  const clientList: ClientItem[] = [
    ...(trustedBy.clients && Array.isArray(trustedBy.clients) && trustedBy.clients.length > 0
      ? (trustedBy.clients as ClientItem[])
      : (homeContent.trustedBy.clients as unknown as ClientItem[])),
  ];

  // Dynamically detect any newly uploaded logos in public/images/logo
  try {
    const logoDir = path.join(process.cwd(), "public", "images", "logo");
    if (fs.existsSync(logoDir)) {
      const files = fs.readdirSync(logoDir);
      for (const file of files) {
        if (!/\.(png|jpe?g|svg|webp)$/i.test(file)) continue;
        const webPath = `/images/logo/${file}`.toLowerCase();
        const cleanBase = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").toLowerCase().trim();
        const alreadyExists = clientList.some((c) => {
          const cPath = (c.logo || "").toLowerCase();
          const cName = (c.name || "").toLowerCase().replace(/[-_]/g, " ").trim();
          return cPath.includes(cleanBase) || cName === cleanBase;
        });
        if (!alreadyExists) {
          const formattedName = cleanBase.replace(/\b\w/g, (char) => char.toUpperCase());
          clientList.push({
            name: formattedName,
            logo: `/images/logo/${file}`,
          });
        }
      }
    }
  } catch {
    // Fallback safely to static client list
  }

  // Dynamically split into two balanced rows
  const row1Base = clientList.filter((_, idx) => idx % 2 === 0);
  const row2Base = clientList.filter((_, idx) => idx % 2 !== 0);

  // Guarantee sufficient track length on ultra-wide screens (min 8 items before 2x loop duplication)
  const expandTrack = (items: ClientItem[]) => {
    if (items.length === 0) return items;
    let list = [...items];
    while (list.length < 8) {
      list = [...list, ...items];
    }
    return list;
  };

  const row1Items = expandTrack(row1Base);
  const row2Items = expandTrack(row2Base);

  // 2x duplication creates mathematically seamless 0% -> -50% and -50% -> 0% infinite loop
  const row1Track = [...row1Items, ...row1Items];
  const row2Track = [...row2Items, ...row2Items];

  const renderLogoItem = (client: ClientItem, idx: number, rowKey: string) => {
    const ar = client.aspectRatio || 1.8;
    // Premium optical size tuning: balanced visual weight across varying logo proportions
    const sizeClasses =
      ar > 2.8
        ? "h-8 sm:h-9 lg:h-10 max-w-[160px] sm:max-w-[190px] lg:max-w-[220px]"
        : ar < 1.3
        ? "h-11 sm:h-13 lg:h-15 max-w-[90px] sm:max-w-[110px] lg:max-w-[130px]"
        : "h-9 sm:h-11 lg:h-12 max-w-[135px] sm:max-w-[165px] lg:max-w-[195px]";

    return (
      <div
        key={`${rowKey}-${client.name}-${idx}`}
        className="relative flex items-center justify-center shrink-0 px-7 sm:px-10 lg:px-14 h-14 sm:h-16 lg:h-18 group cursor-pointer"
      >
        {/* Pure naked logo directly on cream background — no card border or background filling */}
        <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={client.width || 240}
            height={client.height || 100}
            className={`object-contain w-auto select-none pointer-events-none transition-all duration-300 opacity-85 group-hover:opacity-100 ${sizeClasses}`}
            unoptimized
          />
        </div>

        {/* Delicate golden vertical hairline divider between logos matching reference */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-7 sm:h-8 lg:h-9 bg-[#D4B996]/55 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    );
  };

  return (
    <section
      id="clients"
      className="relative bg-[#FAF5EE] text-[#240612] py-12 sm:py-14 lg:py-16 xl:py-18 border-t border-[#240612]/6 overflow-hidden select-none"
    >
      {/* ─── Self-Contained Keyframes: Row 1 Right to Left, Row 2 Left to Right ─── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes lux-flow-rtl {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            @keyframes lux-flow-ltr {
              0% {
                transform: translate3d(-50%, 0, 0);
              }
              100% {
                transform: translate3d(0, 0, 0);
              }
            }
            .lux-flow-row-1 {
              display: flex;
              width: max-content;
              align-items: center;
              animation: lux-flow-rtl 38s linear infinite !important;
              will-change: transform;
            }
            .lux-flow-row-2 {
              display: flex;
              width: max-content;
              align-items: center;
              animation: lux-flow-ltr 40s linear infinite !important;
              will-change: transform;
            }
            .lux-flow-row-1:hover,
            .lux-flow-row-2:hover {
              animation-play-state: paused !important;
            }
          `,
        }}
      />

      {/* ─── Eyebrow / Section Title (Bigger & Bolder, Centered at top) ─── */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 text-center mb-7 sm:mb-9 lg:mb-10">
        <p className="font-sans text-[0.88rem] sm:text-[1.02rem] md:text-[1.12rem] lg:text-[1.22rem] font-extrabold sm:font-black tracking-[0.28em] uppercase text-[#381B23]">
          {eyebrow}
        </p>
      </div>

      {/* ─── Two-Row Infinite Runway with lateral edge fade masks ─── */}
      <div className="relative w-full space-y-6 sm:space-y-8 lg:space-y-9 lux-marquee-mask overflow-hidden py-2">
        {/* Row 1: Right to Left (Continuous Infinite Line) */}
        <div
          className="lux-flow-row-1"
          aria-label="Clients carousel row 1"
        >
          {row1Track.map((client, idx) => renderLogoItem(client, idx, "r1"))}
        </div>

        {/* Row 2: Left to Right (Continuous Infinite Line, opposite direction) */}
        <div
          className="lux-flow-row-2"
          aria-label="Clients carousel row 2"
        >
          {row2Track.map((client, idx) => renderLogoItem(client, idx, "r2"))}
        </div>
      </div>
    </section>
  );
}
