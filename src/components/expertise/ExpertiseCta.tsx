"use client";

import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, ArrowUpRight, Camera } from "lucide-react";
import { site as defaultSite } from "@/content/site";

interface ExpertiseCtaProps {
  site?: typeof defaultSite;
  imageSrc?: string;
}

export function ExpertiseCta({
  site = defaultSite,
  imageSrc = "/images/Hero1.png",
}: ExpertiseCtaProps) {
  const phone = site.contact?.phone || "+971 50 222 5890";
  const email = site.contact?.email || "mkanconcept@gmail.com";
  const instagram = site.contact?.instagramHandle || "@mkan.concept";
  const instagramUrl = site.contact?.instagramUrl || "https://instagram.com/mkan.concept";
  const location = site.contact?.location || "Wasl 51, Dubai, UAE";
  const mapUrl = site.contact?.locationMapUrl || "https://maps.google.com/?q=Wasl+51+Dubai";

  return (
    <section
      id="contact"
      className="relative bg-[#16030C] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/20"
    >
      {/* Background Cinematic Visual with Deep Plum Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
        <Image
          src={imageSrc}
          alt="MKAN Concept Atelier Portal"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16030C] via-[#16030C]/90 to-[#16030C]/70" />
      </div>

      <div className="mx-auto max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Cinematic Closing Statement & Touchpoint Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#DDB78A]/60" aria-hidden="true" />
                <span className="text-[0.68rem] sm:text-[0.74rem] font-sans font-medium tracking-[0.35em] uppercase text-[#DDB78A]">
                  COMMISSION AN EXPERIENCE
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.06]">
                LET&apos;S CREATE SOMETHING EXCEPTIONAL.
              </h2>

              <p className="mt-5 font-sans text-sm sm:text-base font-light text-[#EAE0D5]/80 leading-relaxed max-w-lg">
                To explore collaboration opportunities, commission an upcoming exhibition, or discuss your next visionary brand activation, connect with our Dubai atelier.
              </p>

              {/* Direct Atelier Coordinates Grid */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="group flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#220811]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/10 text-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#16030C] transition-colors">
                      <Phone size={14} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.6rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Atelier Direct
                      </span>
                      <span className="text-xs font-sans text-[#FAF1E8] truncate">
                        {phone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="text-[#DDB78A]/50 group-hover:text-[#DDB78A]" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#220811]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/10 text-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#16030C] transition-colors">
                      <Mail size={14} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.6rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Private Inquiries
                      </span>
                      <span className="text-xs font-sans text-[#FAF1E8] truncate">
                        {email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="text-[#DDB78A]/50 group-hover:text-[#DDB78A]" />
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#220811]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/10 text-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#16030C] transition-colors">
                      <Camera size={14} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.6rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Visual Archive
                      </span>
                      <span className="text-xs font-sans text-[#FAF1E8] truncate">
                        {instagram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="text-[#DDB78A]/50 group-hover:text-[#DDB78A]" />
                </a>

                {/* Location */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#220811]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/10 text-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#16030C] transition-colors">
                      <MapPin size={14} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[0.6rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A]">
                        Studio Atelier
                      </span>
                      <span className="text-xs font-sans text-[#FAF1E8] truncate">
                        {location}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="text-[#DDB78A]/50 group-hover:text-[#DDB78A]" />
                </a>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-6 border-t border-[#DDB78A]/15 flex items-center gap-3 text-xs font-sans text-[#EAE0D5]/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Accepting New Commissions · Dubai & UAE</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Contact Form Card */}
          <div className="lg:col-span-6 relative">
            <div className="p-6 sm:p-8 lg:p-10 rounded-sm border border-[#DDB78A]/30 bg-[#220811]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <span className="text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-[#DDB78A] block mb-2">
                INITIATE A DIALOGUE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#FAF1E8] uppercase mb-6">
                Tell Us About Your Vision
              </h3>
              <ContactForm theme="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
