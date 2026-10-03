import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface AboutProps {
  data?: typeof homeContent.about;
  assets?: typeof defaultAssets;
}

export function About({ data = homeContent.about, assets = defaultAssets }: AboutProps) {
  const about = data;
  const storyIsSelfLink = String(about.cta?.href) === "#about";
  const aboutCtaHref = storyIsSelfLink ? "#method" : about.cta?.href || "#method";
  const aboutCtaLabel = storyIsSelfLink ? "Our Approach" : about.cta?.label || "Our Approach";
  const aboutInterior = assets.aboutInterior;

  return (
    <section id="about" className="bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold-dark mb-4">
                {about.eyebrow}
              </p>

              {/* Main Heading H2 */}
              <h2 className="max-w-[18ch] font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.05] tracking-normal text-plum-900 text-balance">
                {about.heading}
              </h2>

              {/* Subheading */}
              <h3 className="mt-5 font-sans text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-plum-900/90 leading-relaxed">
                {about.subheading}
              </h3>

              {/* Body Paragraph */}
              <p className="mt-6 text-sm sm:text-base font-sans font-normal leading-relaxed text-plum-950/80 max-w-xl">
                {Array.isArray(about.paragraphs) ? about.paragraphs[0] : about.paragraphs}
              </p>

              {/* CTA Link */}
              <div className="mt-8">
                <Link
                  href={aboutCtaHref}
                  className="group inline-flex items-center gap-2 text-xs font-sans font-medium tracking-[0.2em] uppercase text-plum-900 transition-colors duration-300 hover:text-gold-dark"
                >
                  <span className="relative">
                    {aboutCtaLabel}
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
          </div>

          {/* Right Column — Interior Photograph */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-plum-950/10">
              <Image
                src={aboutInterior.src}
                alt={aboutInterior.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                {...(("blurDataURL" in aboutInterior && typeof aboutInterior.blurDataURL === "string")
                  ? { placeholder: "blur" as const, blurDataURL: aboutInterior.blurDataURL }
                  : {})}
              />
            </div>
          </div>
        </div>

        {/* Stats Strip with Thin Hairline Dividers */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-plum-900/15">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-plum-900/15 text-center">
            {(about.stats || []).map((stat) => (
              <div key={stat.label} className="py-4 sm:py-0 sm:px-6">
                <p className="font-display text-3xl sm:text-4xl font-normal text-plum-900 tracking-wide">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.65rem] sm:text-[0.7rem] font-sans font-medium tracking-[0.25em] uppercase text-plum-900/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
