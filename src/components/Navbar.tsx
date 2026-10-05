"use client";

import { site as defaultSite } from "@/content/site";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { scrollToElementCenter } from "@/lib/cinematic-scroll";

interface NavbarProps {
  site?: typeof defaultSite;
}

export function Navbar({ site = defaultSite }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

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

  // Keep keyboard focus inside the modal navigation while it is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const dialog = mobileMenuRef.current;
    const trigger = menuTriggerRef.current;
    if (!dialog) return;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));

    getFocusableElements()[0]?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
      if (trigger?.isConnected) trigger.focus();
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
    closeMobileMenu();

    if (href.startsWith("/")) {
      if (pathname === href) {
        scrollToElementCenter("#top", 1000);
        return;
      }
      router.push(href);
      return;
    }

    if (pathname === "/" || pathname === "") {
      setTimeout(() => {
        scrollToElementCenter(href, 1400, href);
      }, 50);
    } else {
      const targetId = href.replace("#", "");
      const localEl = targetId ? document.getElementById(targetId) : null;
      if (localEl) {
        setTimeout(() => {
          scrollToElementCenter(href, 1200, href);
        }, 50);
      } else {
        if (href === "#home" || href === "#") {
          router.push("/");
        } else {
          router.push(`/${href}`);
        }
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 sm:px-8 lg:px-12 lg:py-7"
      >
        {/* Official brand vector lockup */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="flex shrink-0 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="MKAN Concept Home"
        >
          <Logo className="h-9 sm:h-11 w-auto" />
        </a>

        {/* Desktop Navigation Links — Centered */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {site.nav.map((item) => {
            const targetSection = item.href.replace("#", "").replace("/", "");
            const isActive =
              pathname === item.href ||
              (item.href.startsWith("/") && pathname.startsWith(item.href)) ||
              (pathname === "/" && activeSection === targetSection);

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="group relative inline-block py-1.5 text-[0.75rem] font-sans font-medium tracking-[0.28em] uppercase text-cream/70 transition-colors duration-500 hover:text-[#EAD0B3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <span className="inline-block transition-colors duration-500">
                    {item.label}
                  </span>

                  {/* Draw elegant gold underline from center */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] w-full bg-[#DDB78A] transition-transform duration-500 origin-center ${
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
          className="group hidden lg:inline-flex items-center gap-2.5 border-[1.5px] border-[#B88E5E] px-6 py-2.5 text-[0.72rem] font-sans font-bold tracking-[0.22em] uppercase text-[#B88E5E] shrink-0 transition-all duration-500 hover:border-[#DDB78A] hover:bg-[#DDB78A]/10 hover:text-[#EAD0B3] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
        >
          <span>{site.cta.label}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          className="lg:hidden text-cream p-2 -mr-2 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
          ref={menuTriggerRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mkan-mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
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
          ref={mobileMenuRef}
          id="mkan-mobile-navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-plum-950/98 backdrop-blur-xl px-8 py-12 lg:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button")) {
              closeMobileMenu();
            }
          }}
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-6">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              aria-label="MKAN Concept Home"
            >
              <Logo className="h-9 w-auto" />
            </a>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="rounded p-2 text-cream hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
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
            {site.nav.map((item) => {
              const targetSection = item.href.replace("#", "").replace("/", "");
              const isActive =
                pathname === item.href ||
                (item.href.startsWith("/") && pathname.startsWith(item.href)) ||
                (pathname === "/" && activeSection === targetSection);

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`block rounded font-display text-3xl font-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer ${
                      isActive ? "text-gold font-normal" : "text-cream/90 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Bottom Drawer CTA & Coordinates */}
          <div className="border-t border-cream/10 pt-8">
            <a
              href={site.cta.href}
              onClick={(e) => handleScrollTo(e, site.cta.href)}
              className="flex items-center justify-between border border-gold/70 px-6 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-cream transition-colors hover:bg-gold/10 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
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
