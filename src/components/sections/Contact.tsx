import Image from "next/image";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";
import { site as defaultSite } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Camera, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

interface ContactProps {
  data?: typeof homeContent.contact;
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
}

export function Contact({
  data = homeContent.contact,
  site = defaultSite,
  assets = defaultAssets,
}: ContactProps) {
  const contact = data;
  const contactArch = assets.contactArch;

  // Use dynamic site contact details if available, or fall back to contact.details
  const phone = site.contact?.phone || contact.details?.phone || "+971 50 222 5890";
  const email = site.contact?.email || contact.details?.email || "mkanconcept@gmail.com";
  const instagram = site.contact?.instagramHandle || contact.details?.instagram || "@mkan.concept";
  const instagramUrl = site.contact?.instagramUrl || `https://instagram.com/${instagram.replace("@", "")}`;
  const address = site.contact?.location || contact.details?.address || "Wasl 51, Dubai, UAE";
  const mapUrl = site.contact?.locationMapUrl || "https://maps.google.com/?q=Wasl+51+Dubai";

  return (
    <section
      id="contact"
      className="relative bg-[#FAF6F0] text-plum-950 px-6 py-20 sm:px-8 lg:px-12 lg:py-28 overflow-hidden"
    >
      {/* Top Ambient Hairline Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plum-900/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column — Contact Information & Direct Atelier Coordinates */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow with hairline accent */}
              <div className="flex items-center gap-3 mb-3.5">
                <span className="h-px w-8 bg-[#B88E5E]/50" aria-hidden="true" />
                <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.35em] uppercase text-[#B88E5E]">
                  {contact.eyebrow || "ATELIER CONTACT"}
                </p>
              </div>

              {/* Master Display Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-[1.08] text-plum-950 tracking-[-0.01em]">
                {contact.heading || "LET'S CREATE SOMETHING EXCEPTIONAL."}
              </h2>

              <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base font-light text-plum-950/75 leading-relaxed max-w-lg">
                {contact.intro || "Tell us about your next event, exhibition, activation or concept. Our creative atelier collaborates with forward-thinking brands and institutions to shape unforgettable experiences."}
              </p>

              {/* Bespoke Luxury Contact Touchpoints */}
              <div className="mt-9 sm:mt-11 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* Card 1: Direct Atelier Phone */}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-plum-900/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#B88E5E]/40 hover:shadow-[0_8px_20px_rgba(26,6,14,0.05)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B88E5E]/30 bg-[#FAF6F0] text-[#B88E5E] transition-colors duration-300 group-hover:border-[#B88E5E] group-hover:bg-[#B88E5E] group-hover:text-white">
                      <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#B88E5E]">
                        Atelier Direct
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-plum-950 truncate">
                        {phone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-plum-900/30 transition-all duration-300 group-hover:text-[#B88E5E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 2: Email Inquiries */}
                <a
                  href={`mailto:${email}`}
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-plum-900/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#B88E5E]/40 hover:shadow-[0_8px_20px_rgba(26,6,14,0.05)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B88E5E]/30 bg-[#FAF6F0] text-[#B88E5E] transition-colors duration-300 group-hover:border-[#B88E5E] group-hover:bg-[#B88E5E] group-hover:text-white">
                      <Mail aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#B88E5E]">
                        Private Inquiries
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-plum-950 truncate">
                        {email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-plum-900/30 transition-all duration-300 group-hover:text-[#B88E5E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 3: Visual Archive / Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-plum-900/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#B88E5E]/40 hover:shadow-[0_8px_20px_rgba(26,6,14,0.05)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B88E5E]/30 bg-[#FAF6F0] text-[#B88E5E] transition-colors duration-300 group-hover:border-[#B88E5E] group-hover:bg-[#B88E5E] group-hover:text-white">
                      <Camera aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#B88E5E]">
                        Visual Portfolio
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-plum-950 truncate">
                        {instagram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-plum-900/30 transition-all duration-300 group-hover:text-[#B88E5E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 4: Atelier Studio Location */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-plum-900/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#B88E5E]/40 hover:shadow-[0_8px_20px_rgba(26,6,14,0.05)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B88E5E]/30 bg-[#FAF6F0] text-[#B88E5E] transition-colors duration-300 group-hover:border-[#B88E5E] group-hover:bg-[#B88E5E] group-hover:text-white">
                      <MapPin aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#B88E5E]">
                        Studio Atelier
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-plum-950 truncate">
                        {address}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-plum-900/30 transition-all duration-300 group-hover:text-[#B88E5E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* Live Atelier Availability & Commitment Badge */}
              <div className="mt-8 pt-6 border-t border-plum-900/10 flex flex-wrap items-center gap-4 text-xs font-sans text-plum-950/70">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-medium tracking-[0.05em] text-plum-950">
                    Accepting New Commissions
                  </span>
                </span>
                <span className="text-plum-900/20" aria-hidden="true">·</span>
                <span className="font-light text-plum-950/60">
                  Response guaranteed within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Architectural Arch Portal & Floating Form Card */}
          <div className="lg:col-span-6 relative">
            {/* Architectural Arched Frame Graphic in Background */}
            <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm overflow-hidden rounded-t-[160px] opacity-25 pointer-events-none hidden sm:block mix-blend-multiply">
              <Image
                src={contactArch.src}
                alt="Architectural Arch"
                fill
                className="object-cover object-center"
                {...(("blurDataURL" in contactArch && typeof contactArch.blurDataURL === "string")
                  ? { placeholder: "blur" as const, blurDataURL: contactArch.blurDataURL }
                  : {})}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-transparent" />
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
