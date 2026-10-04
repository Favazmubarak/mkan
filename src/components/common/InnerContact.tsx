"use client";

import Image from "next/image";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";
import { site as defaultSite } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Camera, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

interface InnerContactProps {
  data?: typeof homeContent.contact;
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
  title?: string;
  subtitle?: string;
}

export function InnerContact({
  data = homeContent.contact,
  site = defaultSite,
  assets = defaultAssets,
  title,
  subtitle,
}: InnerContactProps) {
  const contact = data;
  const contactArch = assets.contactArch || { src: "/images/contact-arch.jpg" };

  // Dynamic site contact details with fallbacks
  const phone = site.contact?.phone || contact.details?.phone || "+971 50 222 5890";
  const email = site.contact?.email || contact.details?.email || "mkanconcept@gmail.com";
  const instagram = site.contact?.instagramHandle || contact.details?.instagram || "@mkan.concept";
  const instagramUrl = site.contact?.instagramUrl || `https://instagram.com/${instagram.replace("@", "")}`;
  const address = site.contact?.location || contact.details?.address || "Wasl 51, Dubai, UAE";
  const mapUrl = site.contact?.locationMapUrl || "https://maps.google.com/?q=Wasl+51+Dubai";

  const displayTitle = title || contact.heading || "LET'S CREATE SOMETHING EXCEPTIONAL.";
  const displaySubtitle = subtitle || contact.intro || "Tell us about your next event, exhibition, activation or concept. Our creative atelier collaborates with forward-thinking brands and institutions to shape unforgettable experiences.";

  return (
    <section
      id="contact"
      className="relative bg-[#20040D] text-[#FAF3EE] px-6 py-20 sm:px-8 lg:px-12 lg:py-28 overflow-hidden select-none border-t border-[#DDB78A]/20"
    >
      {/* Top Ambient Champagne Gold Hairline Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/30 to-transparent pointer-events-none" />

      {/* Subtle Warm Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,_rgba(221,183,138,0.06)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Contact Information & Direct Atelier Coordinates (Dark Vice-Versa) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow with hairline accent */}
              <div className="flex items-center gap-3 mb-3.5">
                <span className="h-px w-8 bg-[#DDB78A]/70" aria-hidden="true" />
                <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.35em] uppercase text-[#DDB78A]">
                  {contact.eyebrow || "ATELIER CONTACT"}
                </p>
              </div>

              {/* Master Display Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-[1.08] text-[#FAF3EE] tracking-[-0.01em]">
                {displayTitle}
              </h2>

              <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base font-light text-[#F3E7DF]/75 leading-relaxed max-w-lg">
                {displaySubtitle}
              </p>

              {/* Bespoke Luxury Contact Touchpoints (Dark Vice-Versa Cards) */}
              <div className="mt-9 sm:mt-11 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* Card 1: Direct Atelier Phone */}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/15 bg-[#2A0512]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#340717] hover:border-[#DDB78A]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#20040D] text-[#DDB78A] transition-colors duration-300 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#20040D]">
                      <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Atelier Direct
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-[#FAF3EE] truncate">
                        {phone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-[#DDB78A]/40 transition-all duration-300 group-hover:text-[#DDB78A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 2: Email Inquiries */}
                <a
                  href={`mailto:${email}`}
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/15 bg-[#2A0512]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#340717] hover:border-[#DDB78A]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#20040D] text-[#DDB78A] transition-colors duration-300 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#20040D]">
                      <Mail aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Private Inquiries
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-[#FAF3EE] truncate">
                        {email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-[#DDB78A]/40 transition-all duration-300 group-hover:text-[#DDB78A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 3: Visual Archive / Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/15 bg-[#2A0512]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#340717] hover:border-[#DDB78A]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#20040D] text-[#DDB78A] transition-colors duration-300 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#20040D]">
                      <Camera aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Visual Portfolio
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-[#FAF3EE] truncate">
                        {instagram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-[#DDB78A]/40 transition-all duration-300 group-hover:text-[#DDB78A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Card 4: Atelier Studio Location */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/15 bg-[#2A0512]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#340717] hover:border-[#DDB78A]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#20040D] text-[#DDB78A] transition-colors duration-300 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#20040D]">
                      <MapPin aria-hidden="true" size={16} strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Studio Atelier
                      </span>
                      <span className="text-xs sm:text-[0.82rem] font-sans font-medium text-[#FAF3EE] truncate">
                        {address}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-[#DDB78A]/40 transition-all duration-300 group-hover:text-[#DDB78A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* Live Atelier Availability & Commitment Badge */}
              <div className="mt-8 pt-6 border-t border-[#DDB78A]/15 flex flex-wrap items-center gap-4 text-xs font-sans text-[#F3E7DF]/70">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-medium tracking-[0.05em] text-[#FAF3EE]">
                    Accepting New Commissions
                  </span>
                </span>
                <span className="text-[#DDB78A]/40" aria-hidden="true">·</span>
                <span className="font-light text-[#F3E7DF]/60">
                  Response guaranteed within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Architectural Arch Portal & Floating Form Card (Dark Vice-Versa Theme) */}
          <div className="lg:col-span-6 relative">
            {/* Architectural Arched Frame Graphic in Background */}
            <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm overflow-hidden rounded-t-[160px] opacity-15 pointer-events-none hidden sm:block mix-blend-luminosity">
              <Image
                src={contactArch.src}
                alt="Architectural Arch"
                fill
                className="object-cover object-center"
                {...(("blurDataURL" in contactArch && typeof contactArch.blurDataURL === "string")
                  ? { placeholder: "blur" as const, blurDataURL: contactArch.blurDataURL }
                  : {})}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20040D] via-transparent to-transparent" />
            </div>

            {/* Floating Form Card in Dark Theme */}
            <div className="relative z-10">
              <ContactForm theme="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
