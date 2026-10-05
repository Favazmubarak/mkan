"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site as defaultSite } from "@/content/site";
import { Logo } from "@/components/Logo";
import { scrollToElementCenter, cinematicScrollTo } from "@/lib/cinematic-scroll";
import { ArrowUpRight, ArrowUp } from "lucide-react";

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
  const mapUrl = site.contact?.locationMapUrl || "https://maps.google.com/?q=Wasl+51+Dubai";
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello MKAN Concept, I would like to inquire about your curated luxury experiences."
  )}`;

  return (
    <footer className="relative bg-[#1A040E] border-t border-cream/10 px-6 sm:px-8 lg:px-12 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 text-cream overflow-hidden selection:bg-[#DDB78A] selection:text-[#1A040E]">
      {/* Ambient Top Glow & Hairline */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-56 bg-[radial-gradient(ellipse_at_top,_rgba(221,183,138,0.14)_0%,_transparent_70%)] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/45 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        {/* Tier 1: Atelier Identity & Studio Elevator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-14 border-b border-cream/10">
          <div className="max-w-xl">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/" || pathname === "") {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
              className="group inline-flex items-center text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              aria-label="MKAN Concept - Home"
            >
              <Logo className="h-9 sm:h-10 lg:h-11 w-auto" />
            </Link>

            <p className="mt-4 text-xs sm:text-[0.875rem] font-sans font-light tracking-wide text-cream/75 leading-relaxed">
              A Dubai-born experiential atelier curating high-level summits, flagship cultural fairs, luxury activations, and bespoke experiential environments across the Emirates.
            </p>
          </div>

          {/* Studio Origin & Elevator Action */}
          <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-2 md:pt-0 border-t border-cream/5 md:border-t-0">
            <div className="flex flex-col md:items-end">
              <span className="text-[0.62rem] sm:text-[0.65rem] font-sans font-semibold tracking-[0.28em] uppercase text-[#DDB78A]">
                Atelier Dubai · Est. 2017
              </span>
              <span className="text-[0.68rem] sm:text-[0.72rem] font-sans font-light tracking-[0.15em] text-cream/50 mt-0.5">
                Wasl 51, Jumeirah 1
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-cream/20 bg-cream/[0.04] text-[0.66rem] sm:text-[0.7rem] font-sans font-medium tracking-[0.22em] uppercase text-cream/80 transition-all duration-300 hover:border-[#DDB78A] hover:text-[#DDB78A] hover:bg-[#DDB78A]/10 active:scale-95 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="text-[#DDB78A] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Tier 2: Architectural Dossier & Contact Touchpoints (No Boxed Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 py-12 sm:py-14 border-b border-cream/10 text-xs font-sans">
          {/* Column 1: Navigation / Explore */}
          <div className="lg:col-span-3">
            <p className="text-[0.65rem] sm:text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[#DDB78A] mb-5 flex items-center gap-2">
              <span className="h-px w-3 bg-[#DDB78A]/60" aria-hidden="true" />
              <span>EXPLORE</span>
            </p>
            <ul className="space-y-3" role="list">
              {site.footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="group inline-flex items-center py-1 text-xs sm:text-[0.8125rem] font-light tracking-[0.06em] text-cream/75 transition-colors duration-300 hover:text-[#EAD0B3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#DDB78A] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Studio Location & Visits */}
          <div className="lg:col-span-3">
            <p className="text-[0.65rem] sm:text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[#DDB78A] mb-5 flex items-center gap-2">
              <span className="h-px w-3 bg-[#DDB78A]/60" aria-hidden="true" />
              <span>STUDIO & VISITS</span>
            </p>
            <address className="not-italic space-y-2 text-cream/75 font-light text-xs sm:text-[0.8125rem] leading-relaxed">
              <p className="font-normal text-cream/90">Wasl 51, Al Wasl Road</p>
              <p>Jumeirah 1, Dubai</p>
              <p className="text-cream/60">United Arab Emirates</p>
              <p className="text-[0.72rem] text-[#DDB78A]/80 pt-1">
                Private consultations by appointment
              </p>
            </address>
            <div className="mt-4 pt-1">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#DDB78A] hover:text-cream transition-colors duration-300"
              >
                <span>Open In Maps</span>
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Column 3: Direct Dialogue & Inquiries */}
          <div className="lg:col-span-3">
            <p className="text-[0.65rem] sm:text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[#DDB78A] mb-5 flex items-center gap-2">
              <span className="h-px w-3 bg-[#DDB78A]/60" aria-hidden="true" />
              <span>DIRECT DIALOGUE</span>
            </p>
            <div className="space-y-4 text-xs sm:text-[0.8125rem] font-light">
              <div>
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45 mb-1">
                  Concierge Voice Line
                </span>
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="text-cream/90 font-normal hover:text-[#DDB78A] transition-colors duration-300 inline-block py-0.5"
                >
                  {phone}
                </a>
              </div>

              <div>
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45 mb-1">
                  Direct Electronic Mail
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-cream/90 font-normal hover:text-[#DDB78A] transition-colors duration-300 break-all inline-block py-0.5"
                >
                  {email}
                </a>
              </div>

              <p className="text-[0.72rem] text-cream/55 leading-relaxed pt-1">
                Direct correspondence with our creative directors & producers.
              </p>
            </div>
          </div>

          {/* Column 4: WhatsApp & Social Portfolio */}
          <div className="lg:col-span-3">
            <p className="text-[0.65rem] sm:text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[#DDB78A] mb-5 flex items-center gap-2">
              <span className="h-px w-3 bg-[#DDB78A]/60" aria-hidden="true" />
              <span>CONCIERGE & SOCIAL</span>
            </p>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Concierge"
              className="group flex items-center justify-between w-full p-3 rounded-lg border border-[#25D366]/30 bg-[#25D366]/[0.06] hover:bg-[#25D366]/[0.12] hover:border-[#25D366]/60 transition-all duration-300 mb-5 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-[#25D366] font-semibold">
                    WhatsApp Concierge
                  </span>
                  <span className="block text-[0.7rem] text-cream/80 font-light">
                    Instant messaging channel
                  </span>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#25D366] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Social Channels */}
            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45 mb-2.5">
                Follow Atelier Process
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MKAN Concept Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 hover:border-[#DDB78A] hover:text-[#DDB78A] hover:scale-105 hover:bg-[#DDB78A]/10 active:scale-95 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                  aria-label="MKAN Concept LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 hover:border-[#DDB78A] hover:text-[#DDB78A] hover:scale-105 hover:bg-[#DDB78A]/10 active:scale-95 cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <span className="text-[0.7rem] text-cream/60 font-light pl-1">
                  @mkan.concept
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Legal & Discreet Admin Entry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[0.66rem] sm:text-[0.69rem] font-sans tracking-[0.2em] uppercase text-cream/50 text-center sm:text-left">
          <p className="order-2 sm:order-1 font-light">
            {site.footer.copyright}
          </p>

          <div className="order-1 sm:order-2 flex items-center justify-center gap-4 sm:gap-6">
            <span className="text-[#DDB78A]/85 font-medium">
              {site.footer.locationTag}
            </span>
            <span className="text-cream/20" aria-hidden="true">·</span>
            <Link 
              href="/privacy" 
              className="transition-colors hover:text-cream/80"
            >
              Privacy Policy
            </Link>
            <span className="text-cream/20" aria-hidden="true">·</span>

            {/* Discreet Admin Entry Portal */}
            <Link
              href="/admin/login"
              rel="nofollow"
              aria-label="Studio Admin Portal"
              className="group inline-flex items-center gap-1.5 text-cream/30 hover:text-[#DDB78A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cream/30 group-hover:bg-[#DDB78A] transition-colors" />
              <span className="text-[0.6rem] tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Portal
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
