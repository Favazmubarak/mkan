"use client";

import { site as defaultSite } from "@/content/site";
import { useState, useEffect } from "react";

interface NavbarProps {
  site?: typeof defaultSite;
}

export function Navbar({ site = defaultSite }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "method", "experiences", "clients", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === "#home" || href === "#" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", " ");
      return;
    }

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 sm:px-8 lg:px-12 lg:py-7"
      >
        {/* Brand Luxury Logo Mark — Left */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="MKAN Concept Home"
        >
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gold text-plum-950 font-display text-xl sm:text-2xl font-bold tracking-tighter shadow-md">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.45rem] sm:text-[1.7rem] font-bold tracking-[0.16em] text-cream">
              MKAN
            </span>
            <span className="text-[0.52rem] sm:text-[0.58rem] font-sans font-bold tracking-[0.35em] uppercase text-gold">
              CONCEPT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links — Centered */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9" role="menubar">
          {site.nav.map((item) => {
            const targetSection = item.href.replace("#", "");
            const isActive = activeSection === targetSection;

            return (
              <li key={item.label} role="none">
                <a
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  role="menuitem"
                  className="group relative inline-block py-1 text-[0.72rem] font-sans font-medium tracking-[0.22em] uppercase text-cream/80 transition-colors duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  {/* Scaling text */}
                  <span className="inline-block transition-transform duration-300 group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
                    {item.label}
                  </span>

                  {/* Drawing underline from left */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] w-full bg-cream transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Outlined Gold CTA Button — Right */}
        <a
          href={site.cta.href}
          onClick={(e) => handleScrollTo(e, site.cta.href)}
          className="group hidden lg:inline-flex items-center gap-2.5 border border-gold/70 px-5 py-2 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-cream shrink-0 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
        >
          <span>{site.cta.label}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          className="lg:hidden text-cream p-2 -mr-2 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="h-7 w-7"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Fullscreen Luxury Mobile Overlay Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-plum-950/98 backdrop-blur-xl px-8 py-12 lg:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-6">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex flex-col leading-none"
            >
              <span className="font-display text-2xl font-normal tracking-wider text-cream">
                MKAN
              </span>
              <span className="text-[0.5rem] font-sans font-medium tracking-[0.35em] uppercase text-cream/70">
                CONCEPT
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 text-cream hover:text-gold cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-6 py-8">
            {site.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="block font-display text-3xl font-light text-cream/90 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom Drawer CTA & Coordinates */}
          <div className="border-t border-cream/10 pt-8">
            <a
              href={site.cta.href}
              onClick={(e) => handleScrollTo(e, site.cta.href)}
              className="flex items-center justify-between border border-gold/70 px-6 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-cream transition-colors hover:bg-gold/10 hover:border-gold"
            >
              <span>{site.cta.label}</span>
              <span>→</span>
            </a>
            <p className="mt-6 text-[0.65rem] font-sans tracking-[0.25em] uppercase text-cream/50">
              {site.contact.location} &ensp;|&ensp; {site.contact.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
