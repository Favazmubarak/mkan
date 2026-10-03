import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface BuiltForBrandsProps {
  data?: typeof homeContent.builtForBrands;
  assets?: typeof defaultAssets;
}

export function BuiltForBrands({ data = homeContent.builtForBrands, assets = defaultAssets }: BuiltForBrandsProps) {
  const builtForBrands = data;
  const brandAsset = assets.builtForBrands;

  return (
    <section className="bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-plum-900 tracking-normal">
              {builtForBrands.heading}
            </h2>

            <p className="mt-6 text-sm sm:text-base font-sans font-normal leading-relaxed text-plum-950/80 max-w-lg">
              {builtForBrands.paragraph}
            </p>

            <div className="mt-8">
              <Link
                href={builtForBrands.cta?.href || "#clients"}
                className="group inline-flex items-center gap-2 text-xs font-sans font-medium tracking-[0.2em] uppercase text-plum-900 transition-colors duration-300 hover:text-gold-dark"
              >
                <span className="relative">
                  {builtForBrands.cta?.label || "Our Clients"}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-plum-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-gold-dark" />
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column — Elegant Arched Architecture Photo */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="group relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] bg-plum-900/10 shadow-sm img-shimmer-wrapper">
              <Image
                src={brandAsset.src}
                alt={brandAsset.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center img-arch-zoom"
                {...(("blurDataURL" in brandAsset && typeof brandAsset.blurDataURL === "string")
                  ? { placeholder: "blur" as const, blurDataURL: brandAsset.blurDataURL }
                  : {})}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
