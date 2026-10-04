"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site as defaultSite } from "@/content/site";
import { Logo } from "@/components/Logo";
import { scrollToElementCenter, cinematicScrollTo } from "@/lib/cinematic-scroll";
import { MapPin, Phone, Mail, ArrowUpRight, ArrowUp } from "lucide-react";

interface FooterProps {
  site?: typeof defaultSite;
}

export function Footer({ site = defaultSite }: FooterProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    if (pathname === "/" || pathname === "") {
      scrollToElementCenter(href, 1400, href);
    } else {
      const targetId = href.replace("#", "");
      const localEl = targetId ? document.getElementById(targetId) : null;
      if (localEl) {
        scrollToElementCenter(href, 1200, href);
      } else {
        if (href === "#home" || href === "#") {
          router.push("/");
        } else {
          router.push(`/${href}`);
        }
      }
    }
  };

  const scrollToTop = () => {
    cinematicScrollTo(0, 1400, () => {
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", " ");
      }
    });
  };

  const phone = site.contact?.phone || "+971 50 222 5890";
  const email = site.contact?.email || "mkanconcept@gmail.com";
  const location = site.contact?.location || "Wasl 51, Dubai, UAE";
  const mapUrl = site.contact?.locationMapUrl || "https://maps.google.com/?q=Wasl+51+Dubai";
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello MKAN Concept, I would like to inquire about your curated luxury experiences.")}`;

  return (
    <footer className="relative bg-plum-950 border-t border-cream/10 px-5 sm:px-8 lg:px-12 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 text-cream overflow-hidden">
      {/* Ambient Radial Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[radial-gradient(ellipse_at_top,_rgba(221,183,138,0.12)_0%,_transparent_70%)] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Top Ambient Champagne Hairline */}
      <div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/40 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        {/* Tier 1: Brand Identity & Top Elevator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 sm:pb-12 border-b border-cream/10">
          <div className="flex flex-col max-w-lg">
            {/* Logo & Scroll to Top button */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/" || pathname === "") {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
                className="group flex items-center text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="MKAN Concept - Home"
              >
                <Logo className="h-9 sm:h-10 lg:h-11 w-auto" />
              </Link>

              {/* Mobile Dedicated Elevator Pill (visible on mobile only) */}
              <button
                onClick={scrollToTop}
                className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream/20 bg-cream/5 text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/80 active:bg-gold/20 active:border-gold transition-all"
                aria-label="Scroll back to top"
              >
                <span>Top</span>
                <ArrowUp size={12} className="text-gold" />
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-[0.8125rem] font-sans font-light tracking-[0.04em] text-cream/70 leading-relaxed">
              Curating luxury exhibitions, visionary brand activations, and bespoke cultural spaces across the UAE since 2017.
            </p>
          </div>

          {/* Desktop & Tablet Navigation Glide Menu */}
          <nav aria-label="Footer Navigation" className="w-full md:w-auto">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-x-6 gap-y-3.5 sm:gap-x-8" role="list">
              {site.footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="group relative inline-block py-1 text-[0.72rem] sm:text-[0.75rem] font-sans font-medium tracking-[0.25em] uppercase text-cream/70 transition-colors duration-300 hover:text-[#EAD0B3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#DDB78A] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Back to Top Button */}
          <div className="hidden md:block shrink-0">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-cream/70 hover:text-[#EAD0B3] transition-colors duration-300 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:-translate-y-0.5 group-hover:bg-gold/10 group-hover:shadow-[0_0_15px_rgba(221,183,138,0.25)]">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>

        {/* Tier 2: Atelier Touchpoints Grid (Mobile & Tablet Refined) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-10 border-b border-cream/10 text-xs font-sans">
          {/* Location Touchpoint */}
          <div className="flex flex-col justify-between p-4 sm:p-5 rounded-sm border border-cream/10 bg-cream/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-cream/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-gold/90 shrink-0" />
                <span className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-gold/90">
                  Studio Atelier
                </span>
              </div>
              <p className="text-cream/85 font-light leading-relaxed text-xs sm:text-[0.8125rem]">
                {location}
              </p>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 inline-flex items-center gap-1.5 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-gold hover:text-[#EAD0B3] transition-colors"
            >
              <span>View On Map</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Direct Concierge Inquiries */}
          <div className="flex flex-col justify-between p-4 sm:p-5 rounded-sm border border-cream/10 bg-cream/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-cream/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-gold/90 shrink-0" />
                <span className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-gold/90">
                  Direct Inquiries
                </span>
              </div>
              <div className="flex flex-col gap-1.5 text-xs sm:text-[0.8125rem] text-cream/85 font-light">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="transition-colors hover:text-gold flex items-center justify-between"
                >
                  <span>{phone}</span>
                  <span className="text-[0.62rem] tracking-[0.15em] uppercase text-cream/40">Call</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-gold flex items-center justify-between"
                >
                  <span className="truncate">{email}</span>
                  <span className="text-[0.62rem] tracking-[0.15em] uppercase text-cream/40">Email</span>
                </a>
              </div>
            </div>
            <div className="mt-3.5 flex items-center gap-2 text-[0.65rem] text-emerald-400/90 font-light">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Response within 24 hours</span>
            </div>
          </div>

          {/* Social Archive & WhatsApp */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between p-4 sm:p-5 rounded-sm border border-cream/10 bg-cream/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-cream/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} className="text-gold/90 shrink-0" />
                <span className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-gold/90">
                  Connect & Archive
                </span>
              </div>
              <p className="text-cream/70 font-light text-xs sm:text-[0.8125rem] leading-relaxed mb-3">
                Explore our ongoing cultural portfolio and bespoke event activations.
              </p>
            </div>

            {/* Social Pill Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Instagram */}
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MKAN Concept Instagram"
                className="inline-flex h-9.5 w-9.5 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105 hover:bg-gold/10 active:scale-95"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={site.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MKAN Concept LinkedIn"
                className="inline-flex h-9.5 w-9.5 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-105 hover:bg-gold/10 active:scale-95"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Concierge"
                className="inline-flex h-9.5 w-9.5 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400 hover:scale-105 hover:bg-emerald-400/10 active:scale-95"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Legal & Discreet Admin Entry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 text-[0.66rem] font-sans tracking-[0.22em] uppercase text-cream/50 text-center sm:text-left">
          <p>{site.footer.copyright}</p>

          <div className="flex items-center gap-4">
            <span className="text-gold/70">{site.footer.locationTag}</span>
            <span className="text-cream/20" aria-hidden="true">·</span>
            <Link 
              href="/privacy" 
              className="transition-colors hover:text-cream/80"
            >
              Privacy Policy
            </Link>

            {/* Discreet Admin Entry Portal */}
            <Link
              href="/admin/login"
              rel="nofollow"
              aria-label="Admin portal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cream/20 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <span className="inline-block h-2 w-2 rounded-full border border-cream/30 hover:border-gold transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
