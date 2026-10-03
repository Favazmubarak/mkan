"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible || contactVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll back to top"
      className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-plum-950/80 text-gold shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-plum-900 hover:scale-110 hover:shadow-gold/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold animate-in fade-in zoom-in-90 cursor-pointer"
    >
      <span
        aria-hidden="true"
        className="text-lg font-light transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}
