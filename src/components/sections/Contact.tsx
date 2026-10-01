import Image from "next/image";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";
import { site as defaultSite } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

interface ContactProps {
  data?: typeof homeContent.contact;
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
}

export function Contact({ data = homeContent.contact, site = defaultSite, assets = defaultAssets }: ContactProps) {
  const contact = data;
  const contactArch = assets.contactArch;

  // Use dynamic site contact details if available, or fall back to contact.details
  const phone = site.contact?.phone || contact.details?.phone || "+971 50 222 5890";
  const email = site.contact?.email || contact.details?.email || "mkanconcept@gmail.com";
  const instagram = site.contact?.instagramHandle || contact.details?.instagram || "@mkan.concept";
  const instagramUrl = site.contact?.instagramUrl || `https://instagram.com/${instagram.replace("@", "")}`;
  const address = site.contact?.location || contact.details?.address || "Wasl 51, Dubai, UAE";

  return (
    <section
      id="contact"
      className="relative bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column — Contact Information & Direct Touchpoints */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold-dark mb-3">
                {contact.eyebrow}
              </p>

              {/* Main Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-plum-900 tracking-tight">
                {contact.heading}
              </h2>

              <p className="mt-4 font-sans text-sm sm:text-base font-light text-plum-950/80 leading-relaxed max-w-md">
                {contact.intro}
              </p>

              {/* Contact Coordinate Rows */}
              <div className="mt-10 flex flex-col gap-5">
                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="group flex items-center gap-4 text-xs sm:text-sm font-sans font-normal text-plum-900 transition-colors hover:text-gold-dark"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-plum-900/20 text-plum-900 transition-colors group-hover:border-gold-dark group-hover:text-gold-dark">
                    📞
                  </span>
                  <span>{phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 text-xs sm:text-sm font-sans font-normal text-plum-900 transition-colors hover:text-gold-dark"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-plum-900/20 text-plum-900 transition-colors group-hover:border-gold-dark group-hover:text-gold-dark">
                    ✉️
                  </span>
                  <span>{email}</span>
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-xs sm:text-sm font-sans font-normal text-plum-900 transition-colors hover:text-gold-dark"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-plum-900/20 text-plum-900 transition-colors group-hover:border-gold-dark group-hover:text-gold-dark">
                    📷
                  </span>
                  <span>{instagram}</span>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 text-xs sm:text-sm font-sans font-normal text-plum-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-plum-900/20 text-plum-900">
                    📍
                  </span>
                  <span>{address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form Card overlaid on Arched Architecture Graphic */}
          <div className="lg:col-span-6 relative">
            {/* Background Arched Frame Graphic on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm overflow-hidden rounded-t-[140px] opacity-20 pointer-events-none hidden sm:block">
              <Image
                src={contactArch.src}
                alt="Architectural Arch"
                fill
                className="object-cover object-center"
                {...(("blurDataURL" in contactArch && typeof contactArch.blurDataURL === "string")
                  ? { placeholder: "blur" as const, blurDataURL: contactArch.blurDataURL }
                  : {})}
              />
            </div>

            {/* Floating Form Card */}
            <div className="relative z-10">
              <ContactForm theme="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
