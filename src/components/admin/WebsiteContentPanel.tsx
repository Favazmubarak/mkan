"use client";

import Image from "next/image";
import { Loader2, Save, Upload } from "lucide-react";
import { homeContent } from "@/content/home";
import type { Editable } from "./studio-types";

interface WebsiteContentPanelProps {
  active: boolean;
  hero: Editable<typeof homeContent.hero>;
  about: Editable<typeof homeContent.about>;
  impact: Editable<typeof homeContent.impactBanner>;
  savingSection: string | null;
  uploadingSlot: string | null;
  uploadedPreviews: Record<string, string>;
  updateSection: (sectionKey: string, field: string, value: unknown) => void;
  handleSaveSection: (sectionKey: string, label: string) => void;
  handleUpload: (slotKey: string, file: File) => Promise<void>;
}

export function WebsiteContentPanel({
  active,
  hero,
  about,
  impact,
  savingSection,
  uploadingSlot,
  uploadedPreviews,
  updateSection,
  handleSaveSection,
  handleUpload,
}: WebsiteContentPanelProps) {
  if (!active) return null;
  return (
              <div className="space-y-6">
                {/* 1. HERO SECTION */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#111827]">Hero Landing Banner</h2>
                      <p className="text-xs text-[#6B7280]">Headline, gold tagline, and hero background photo</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveSection("hero", "Hero Banner")}
                      disabled={savingSection === "hero"}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A060E] text-[#DDB78A] text-xs font-bold hover:bg-[#2A0A17] transition-all cursor-pointer shadow-sm"
                    >
                      {savingSection === "hero" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Save Section</span>
                    </button>
                  </div>

                  {/* Photo Dropzone */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#1A060E] border border-[#D1D5DB] shrink-0">
                        <Image
                          src={uploadedPreviews["heroBg"] || "/images/hero-bg.jpg"}
                          alt="Hero"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111827]">Hero Background Image</p>
                        <p className="text-[0.68rem] text-[#6B7280]">Landscape photo up to 15MB; images over 4MB are compressed before upload.</p>
                      </div>
                    </div>

                    <label className="inline-flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-xs font-bold text-[#111827] shadow-sm transition-all hover:border-[#1A060E] focus-within:ring-2 focus-within:ring-[#B8860B] cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-[#B8860B]" />
                      <span>{uploadingSlot === "heroBg" ? "Preparing & uploading..." : "Replace Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        aria-label={uploadingSlot === "heroBg" ? "Uploading hero background image" : "Replace hero background image"}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUpload("heroBg", f);
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="hero-eyebrow" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Gold Eyebrow Tagline
                      </label>
                      <input
                        id="hero-eyebrow"
                        type="text"
                        value={hero.eyebrow || ""}
                        onChange={(e) => updateSection("hero", "eyebrow", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm font-semibold text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-heading-lines" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Main Hero Headline (One line per row)
                      </label>
                      <textarea
                        id="hero-heading-lines"
                        rows={2}
                        value={Array.isArray(hero.headingLines) ? hero.headingLines.join("\n") : hero.headingLines || ""}
                        onChange={(e) => updateSection("hero", "headingLines", e.target.value.split("\n"))}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-base font-bold text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-subtitle" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Subtitle Description
                      </label>
                      <input
                        id="hero-subtitle"
                        type="text"
                        value={hero.subtitle || ""}
                        onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. ABOUT STORY */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#111827]">About MKAN Story</h2>
                      <p className="text-xs text-[#6B7280]">Brand narrative, portrait photo, and 3 heritage numbers</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveSection("about", "Brand Story")}
                      disabled={savingSection === "about"}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A060E] text-[#DDB78A] text-xs font-bold hover:bg-[#2A0A17] transition-all cursor-pointer shadow-sm"
                    >
                      {savingSection === "about" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Save Section</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#1A060E] border border-[#D1D5DB] shrink-0">
                        <Image
                          src={uploadedPreviews["aboutInterior"] || "/images/about-interior.jpg"}
                          alt="About"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111827]">Story Feature Portrait</p>
                        <p className="text-[0.68rem] text-[#6B7280]">Vertical 4:5 Aspect Ratio</p>
                      </div>
                    </div>

                    <label className="inline-flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-xs font-bold text-[#111827] shadow-sm transition-all hover:border-[#1A060E] focus-within:ring-2 focus-within:ring-[#B8860B] cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-[#B8860B]" />
                      <span>{uploadingSlot === "aboutInterior" ? "Preparing & uploading..." : "Replace Portrait"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        aria-label={uploadingSlot === "aboutInterior" ? "Uploading story portrait" : "Replace story portrait"}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUpload("aboutInterior", f);
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="about-heading" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Story Headline
                      </label>
                      <input
                        id="about-heading"
                        type="text"
                        value={about.heading || ""}
                        onChange={(e) => updateSection("about", "heading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm font-bold text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="about-paragraph" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Story Paragraph
                      </label>
                      <textarea
                        id="about-paragraph"
                        rows={3}
                        value={Array.isArray(about.paragraphs) ? about.paragraphs[0] || "" : about.paragraphs || ""}
                        onChange={(e) => updateSection("about", "paragraphs.0", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] leading-relaxed"
                      />
                    </div>

                    {/* 3 Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {(about.stats || [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }]).map((stat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                          <label htmlFor={`stat-value-${idx}`} className="block text-[0.65rem] uppercase font-bold text-[#6B7280] mb-1">
                            Stat #{idx + 1} value
                          </label>
                          <input
                            id={`stat-value-${idx}`}
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) => updateSection("about", `stats.${idx}.value`, e.target.value)}
                            className="w-full rounded-lg bg-white border border-[#D1D5DB] px-3 py-1 text-sm font-extrabold text-[#111827] mb-1.5 focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                            placeholder="15+"
                          />
                          <label htmlFor={`stat-label-${idx}`} className="sr-only">Stat #{idx + 1} label</label>
                          <input
                            id={`stat-label-${idx}`}
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) => updateSection("about", `stats.${idx}.label`, e.target.value)}
                            className="w-full rounded-lg bg-white border border-[#D1D5DB] px-3 py-1 text-xs text-[#4B5563] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                            placeholder="Years Experience"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. IMPACT */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                      <h3 className="text-base font-bold text-[#111827]">Impact Banner</h3>
                      <button
                        type="button"
                        onClick={() => handleSaveSection("impactBanner", "Impact Banner")}
                        className="rounded-lg bg-[#1A060E] px-3 py-1 text-xs font-bold text-[#DDB78A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                      >
                        Save
                      </button>
                    </div>
                    <div>
                      <label htmlFor="impact-heading" className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Headline</label>
                      <input
                        id="impact-heading"
                        type="text"
                        value={impact.heading || ""}
                        onChange={(e) => updateSection("impactBanner", "heading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm font-semibold text-[#111827]"
                      />
                    </div>
                    <div>
                      <label htmlFor="impact-paragraph" className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Paragraph</label>
                      <input
                        id="impact-paragraph"
                        type="text"
                        value={impact.paragraph || ""}
                        onChange={(e) => updateSection("impactBanner", "paragraph", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-xs text-[#4B5563]"
                      />
                    </div>
                  </div>
                </div>
              </div>

  );
}
