import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface ExpertiseProps {
  data?: typeof homeContent.expertise;
  assets?: typeof defaultAssets;
}

export function Expertise({ data = homeContent.expertise, assets = defaultAssets }: ExpertiseProps) {
  const expertise = data;
  const repeatedEyebrow = expertise.eyebrow.trim().toLocaleLowerCase() === expertise.title.trim().toLocaleLowerCase();
  const viewAllIsSelfLink = String(expertise.viewAllCta?.href) === "#services";
  const viewAllHref = viewAllIsSelfLink ? "#contact" : expertise.viewAllCta?.href || "#contact";
  const viewAllLabel = viewAllIsSelfLink ? "Discuss a Service" : expertise.viewAllCta?.label || "Discuss a Service";

  const getImageSrc = (key: string) => {
    switch (key) {
      case "events":
        return assets.expertise?.events?.src || assets.heroBg.src;
      case "exhibitions":
        return assets.expertise?.exhibitions?.src || assets.heroBg.src;
      case "workshops":
        return assets.expertise?.workshops?.src || assets.heroBg.src;
      case "activations":
        return assets.expertise?.activations?.src || assets.heroBg.src;
      case "consultancy":
        return assets.expertise?.consultancy?.src || assets.heroBg.src;
      default:
        return assets.heroBg.src;
    }
  };

  return (
    <section
      id="services"
      className="bg-plum-900 text-cream px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-12">
          <div>
            {!repeatedEyebrow && (
              <p className="mb-2 font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold/80 sm:text-[0.75rem]">
                {expertise.eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-normal">
              {expertise.title}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/80 transition-colors duration-300 hover:text-gold"
          >
            <span className="relative">
              {viewAllLabel}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-gold origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* 5 Column Tall Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {(expertise.cards || []).map((card) => (
            <Link
              key={card.number}
              href={card.cta?.href || "#contact"}
              className="group relative flex flex-col justify-end min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] p-6 border border-cream/15 overflow-hidden transition-all duration-500 hover:border-gold/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              {/* Card Image Background with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={getImageSrc(card.imageKey)}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/75 to-plum-950/20" />
              </div>

              {/* Card Content Overlay */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                {/* Number */}
                <span className="font-display text-2xl sm:text-3xl font-light text-gold mb-1">
                  {card.number}
                </span>

                {/* Title */}
                <h3 className="font-sans text-sm sm:text-base font-semibold tracking-[0.18em] uppercase text-cream mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs font-normal leading-relaxed text-cream/75 mb-6 line-clamp-3">
                  {card.description}
                </p>

                {/* Explore Link */}
                <div className="inline-flex items-center gap-2 text-[0.68rem] font-sans font-medium tracking-[0.22em] uppercase text-cream/90 transition-colors group-hover:text-gold">
                  <span>{card.cta?.label || "Explore"}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
