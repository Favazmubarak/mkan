"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesContent } from "@/content/services";
import { assets } from "@/config/assets";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ServicesPage() {
  const [activeTabId, setActiveTabId] = useState("events");

  const currentTab =
    servicesContent.tabs.find((tab) => tab.id === activeTabId) ||
    servicesContent.tabs[0];

  const getServiceImage = (key: string) => {
    switch (key) {
      case "events":
        return assets.expertise.events.src;
      case "exhibitions":
        return assets.expertise.exhibitions.src;
      case "workshops":
        return assets.expertise.workshops.src;
      case "activations":
        return assets.expertise.activations.src;
      case "consultancy":
        return assets.expertise.consultancy.src;
      default:
        return assets.heroBg.src;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-plum-950 text-cream pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="max-w-3xl pb-14 border-b border-cream/10">
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold mb-3">
              {servicesContent.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-cream tracking-tight">
              {servicesContent.header.title}
            </h1>
            <p className="mt-3 font-sans text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-cream/70">
              {servicesContent.header.subtitle}
            </p>
          </div>

          {/* Interactive Services Tab Interface */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column — Vertical Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {servicesContent.tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    type="button"
                    className={`flex items-center justify-between p-5 text-left transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer ${
                      isActive
                        ? "bg-cream text-plum-950 border-cream shadow-md"
                        : "bg-transparent text-cream/80 border-cream/15 hover:border-cream/40 hover:text-cream"
                    }`}
                  >
                    <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                      {tab.name}
                    </span>
                    <span className="font-display text-lg font-light opacity-60">
                      {tab.number}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column — Display Panel with Backdrop Image & Service Details */}
            <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[580px] p-8 sm:p-12 border border-cream/15 overflow-hidden flex flex-col justify-end">
              {/* Background Crossfade Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  key={currentTab.id}
                  src={getServiceImage(currentTab.imageKey)}
                  alt={currentTab.headline}
                  fill
                  priority
                  className="object-cover object-center animate-in fade-in duration-500"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/80 to-plum-950/40" />
              </div>

              {/* Dynamic Content Overlay */}
              <div className="relative z-10 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-display text-3xl font-light text-gold">
                    {currentTab.number}
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-cream">
                    {currentTab.headline}
                  </h2>
                </div>

                <p className="mt-4 font-sans text-sm sm:text-base font-light leading-relaxed text-cream/90">
                  {currentTab.description}
                </p>

                {/* Subservices Bulleted List */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-cream/15">
                  {currentTab.subservices.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-cream/80"
                    >
                      <span className="text-gold text-xs">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Discover More CTA Button */}
                <div className="mt-8">
                  <Link
                    href={currentTab.cta.href}
                    className="inline-flex items-center gap-2.5 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <span>{currentTab.cta.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
