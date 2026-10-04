"use client";

import { ContactForm } from "@/components/ContactForm";
import { site as defaultSite } from "@/content/site";

interface ApproachCtaProps {
  site?: typeof defaultSite;
}

export function ApproachCta({
  site = defaultSite,
}: ApproachCtaProps) {
  const phone = site.contact?.phone || "+971 50 222 5890";
  const email = site.contact?.email || "mkanconcept@gmail.com";
  const location = site.contact?.location || "Wasl 51, Dubai, UAE";

  return (
    <section id="contact" className="relative bg-[#1A040E] text-[#F5EEE6] px-6 sm:px-10 lg:px-16 py-20 sm:py-24 overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Minimal Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-sans text-[0.68rem] font-medium tracking-[0.35em] uppercase text-[#DDB78A] mb-3">
                START A PROJECT
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight uppercase text-[#FAF1E8] leading-tight">
                LET&apos;S CREATE TOGETHER.
              </h2>
              <p className="mt-4 text-xs sm:text-sm font-sans font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
                Tell us about your next event, exhibition, or activation.
              </p>

              {/* Minimal Clean Touchpoint List */}
              <div className="mt-8 space-y-4 pt-6 border-t border-white/10 text-xs sm:text-sm font-sans">
                <div className="flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#DDB78A]">Phone</span>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="text-[#FAF1E8] hover:text-[#DDB78A] transition-colors mt-0.5">
                    {phone}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#DDB78A]">Email</span>
                  <a href={`mailto:${email}`} className="text-[#FAF1E8] hover:text-[#DDB78A] transition-colors mt-0.5">
                    {email}
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#DDB78A]">Location</span>
                  <span className="text-[#EAE0D5]/80 mt-0.5">{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm border border-white/10 bg-[#16030C]/90 backdrop-blur-sm">
              <ContactForm theme="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
