import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface MethodProps {
  data?: typeof homeContent.method;
  assets?: typeof defaultAssets;
}

export function Method({ data = homeContent.method, assets = defaultAssets }: MethodProps) {
  const method = data;

  const getStepImage = (key: string) => {
    switch (key) {
      case "concept":
        return assets.method?.concept?.src || assets.heroBg.src;
      case "development":
        return assets.method?.development?.src || assets.heroBg.src;
      case "curation":
        return assets.method?.curation?.src || assets.heroBg.src;
      case "production":
        return assets.method?.production?.src || assets.heroBg.src;
      case "reporting":
        return assets.method?.reporting?.src || assets.heroBg.src;
      default:
        return assets.heroBg.src;
    }
  };

  return (
    <section
      id="method"
      className="bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-16">
          <div>
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold-dark mb-2">
              {method.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-plum-900 tracking-tight">
              {method.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-sans font-medium tracking-[0.15em] uppercase text-plum-900/80">
              {method.subtitle}
            </p>
          </div>

          <Link
            href={method.cta?.href || "#method"}
            className="group inline-flex items-center gap-2 text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-900 transition-colors duration-300 hover:text-gold-dark"
          >
            <span className="relative">
              {method.cta?.label || "Our Approach"}
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

        {/* 5 Sequential Framework Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 relative">
          {(method.steps || []).map((step, index, arr) => (
            <div key={step.number} className="flex flex-col relative group">
              {/* Top Step Header with Circular Number and Connecting Line */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-plum-900/25 bg-cream text-plum-900 font-sans text-xs font-semibold tracking-wider transition-colors duration-300 group-hover:border-gold-dark group-hover:text-gold-dark">
                  {step.number}
                </div>

                {/* Connecting Line-Arrow on Desktop */}
                {index < arr.length - 1 && (
                  <div className="hidden lg:flex items-center flex-1 h-[1px] bg-plum-900/20 relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-plum-900/40">
                      →
                    </span>
                  </div>
                )}
              </div>

              {/* Step Thumbnail Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-5 bg-plum-900/5">
                <Image
                  src={getStepImage(step.imageKey)}
                  alt={step.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Step Title — noticeably heavier / semi-bold per reference */}
              <h3 className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-plum-900 mb-2">
                {step.name}
              </h3>

              {/* Step Description */}
              <p className="font-sans text-xs font-light leading-relaxed text-plum-900/75">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
