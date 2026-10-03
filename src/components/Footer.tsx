"use client";

import Link from "next/link";
import { site as defaultSite } from "@/content/site";
import { Logo } from "@/components/Logo";
import { scrollToElementCenter, cinematicScrollTo } from "@/lib/cinematic-scroll";

interface FooterProps {
  site?: typeof defaultSite;
}

export function Footer({ site = defaultSite }: FooterProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToElementCenter(href, 1400, href);
  };

  const scrollToTop = () => {
    cinematicScrollTo(0, 1400, () => {
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", " ");
      }
    });
  };

  return (
    <footer className="relative bg-plum-950 border-t border-cream/10 px-6 py-14 sm:px-8 lg:px-12 lg:py-20 text-cream overflow-hidden">
      {/* Top Ambient Champagne Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/40 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1440px]">
        {/* Tier 1: Brand & Philosophy + Back to Top */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-cream/10">
          <div className="max-w-md">
            {/* Brand Logo with cinematic scroll to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Back to top"
            >
              <Logo className="h-10 sm:h-11 w-auto" />
            </button>
            <p className="mt-3.5 text-xs font-sans font-light tracking-[0.06em] text-cream/65 leading-relaxed">
              Curating luxury exhibitions, visionary brand activations, and bespoke cultural spaces across the UAE since 2017.
            </p>
          </div>

          {/* Navigation Links with Cinematic Center Glide */}
          <nav aria-label="Footer Navigation" className="w-full lg:w-auto">
            <ul className="flex flex-wrap items-center justify-start lg:justify-center gap-6 sm:gap-8" role="list">
              {site.footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="group relative inline-block py-1.5 text-[0.72rem] sm:text-[0.75rem] font-sans font-medium tracking-[0.28em] uppercase text-cream/70 transition-colors duration-500 hover:text-[#EAD0B3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
                  >
                    <span className="inline-block transition-colors duration-500">
                      {link.label}
                    </span>
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] w-full bg-[#DDB78A] scale-x-0 transition-transform duration-500 origin-center group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dedicated Back to Top Cinematic Trigger */}
          <div className="shrink-0 self-start lg:self-center">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-cream/70 hover:text-[#EAD0B3] transition-colors duration-300 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:-translate-y-1 group-hover:bg-gold/10 group-hover:shadow-[0_0_15px_rgba(221,183,138,0.25)]">
                ↑
              </span>
            </button>
          </div>
        </div>

        {/* Tier 2: Atelier Coordinates & Social Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-cream/10 text-xs font-sans">
          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.66rem] font-medium tracking-[0.22em] uppercase text-gold/80">
              Atelier Location
            </span>
            <span className="text-cream/80 font-light leading-relaxed">
              {site.contact.location || "Wasl 51, Jumeirah, Dubai, UAE"}
            </span>
          </div>

          {/* Concierge & Inquiries */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.66rem] font-medium tracking-[0.22em] uppercase text-gold/80">
              Direct Inquiries
            </span>
            <div className="flex flex-col gap-1 text-cream/80 font-light">
              <a
                href={site.contact.phoneHref || `tel:${site.contact.phone?.replace(/[^0-9+]/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {site.contact.phone}
              </a>
              <a
                href={site.contact.emailHref || `mailto:${site.contact.email}`}
                className="transition-colors hover:text-gold"
              >
                {site.contact.email}
              </a>
            </div>
          </div>

          {/* Social Archive */}
          <div className="flex flex-col gap-2 md:items-end">
            <span className="text-[0.66rem] font-medium tracking-[0.22em] uppercase text-gold/80">
              Connect & Archive
            </span>
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow MKAN Concept on Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/75 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-[1.08] hover:shadow-[0_0_15px_rgba(221,183,138,0.25)] active:scale-[0.95] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={site.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow MKAN Concept on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/75 transition-all duration-300 hover:border-gold hover:text-gold hover:scale-[1.08] hover:shadow-[0_0_15px_rgba(221,183,138,0.25)] active:scale-[0.95] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Legal & Hidden Admin Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[0.66rem] font-sans tracking-[0.25em] uppercase text-cream/50">
          <p>{site.footer.copyright}</p>

          <div className="flex items-center gap-4">
            <span className="text-gold/60">{site.footer.locationTag}</span>
            <span className="text-cream/20">·</span>
            <Link href="/privacy" className="transition-colors hover:text-cream/80">
              Privacy
            </Link>

            {/* Subtle luxury hidden entry point to Admin Portal (44px touch target) */}
            <Link
              href="/admin/login"
              rel="nofollow"
              aria-label="Admin login"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream/20 hover:text-cream/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
            >
              <span className="inline-block h-2 w-2 rounded-full border border-cream/30 hover:border-gold/60 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
