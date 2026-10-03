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
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-bold tracking-[0.2em] uppercase text-plum-900/70 mb-5">
              {about.eyebrow}
            </p>

            {/* Main Heading H2 */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-normal leading-[1.05] tracking-tight text-[#3B0918] uppercase">
              {about.heading.split('JUST ').map((part, i) => (
                <span key={i}>
                  {part}{i === 0 ? 'JUST ' : ''}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>

            <div className="mt-8 flex gap-5">
              {/* Vertical Arrow Line */}
              <div className="flex flex-col items-center mt-2 shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3B0918]/60 mb-2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <div className="w-[1px] bg-[#3B0918]/40 h-full min-h-[140px]"></div>
              </div>

              {/* Subheading & Paragraph */}
              <div className="flex flex-col gap-5 pb-2">
                <h3 className="font-display text-xl sm:text-2xl lg:text-[1.9rem] font-normal leading-[1.2] tracking-tight text-[#3B0918] uppercase max-w-lg">
                  {about.subheading}
                </h3>
                <p className="text-[0.85rem] sm:text-[0.9rem] font-sans font-medium leading-[1.7] text-[#3B0918]/80 max-w-md">
                  {Array.isArray(about.paragraphs) ? about.paragraphs[0] : about.paragraphs}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pl-[32px] sm:pl-[38px]">
              <Link
                href={aboutCtaHref}
                className="inline-flex items-center gap-3 border-[1.5px] border-[#3B0918]/30 px-7 py-3 text-[0.7rem] font-sans font-bold tracking-[0.2em] uppercase text-[#3B0918] transition-colors duration-300 hover:border-[#3B0918] hover:bg-[#3B0918]/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B0918]"
              >
                {aboutCtaLabel} <span aria-hidden="true" className="ml-1 text-[1.1em]">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column — Interior Photograph & Stats */}
          <div className="lg:col-span-6 flex flex-col pt-4 lg:pt-0">
            {/* Image Frame */}
            <div className="relative p-2 border border-[#3B0918]/15 rounded-sm bg-cream shadow-xl">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-plum-950/10">
                <Image
                  src={aboutInterior.src}
                  alt={aboutInterior.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  {...(("blurDataURL" in aboutInterior && typeof aboutInterior.blurDataURL === "string")
                    ? { placeholder: "blur" as const, blurDataURL: aboutInterior.blurDataURL }
                    : {})}
                />
              </div>
            </div>

            {/* Stats centered under the image */}
            <div className="mt-9 flex items-center justify-center gap-6 sm:gap-10 mx-auto w-full max-w-lg">
              <div className="flex flex-col text-center">
                <p className="font-display text-[1.8rem] sm:text-[2.1rem] font-semibold text-[#3B0918] tracking-wider mb-1">
                  2017
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] font-sans font-bold tracking-[0.2em] uppercase text-[#3B0918]/70">
                  ESTABLISHED
                </p>
              </div>
              
              <div className="w-[1px] h-12 bg-[#3B0918]/30" />
              
              <div className="flex flex-col text-center">
                <p className="font-display text-[1.8rem] sm:text-[2.1rem] font-semibold text-[#3B0918] tracking-wider mb-1">
                  DUBAI
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] font-sans font-bold tracking-[0.2em] uppercase text-[#3B0918]/70">
                  BASED
                </p>
              </div>

              <div className="w-[1px] h-12 bg-[#3B0918]/30" />
              
              <div className="flex flex-col text-center">
                <p className="font-display text-[1.8rem] sm:text-[2.1rem] font-semibold text-[#3B0918] tracking-wider mb-1">
                  EMIRATI
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] font-sans font-bold tracking-[0.2em] uppercase text-[#3B0918]/70">
                  OWNED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
