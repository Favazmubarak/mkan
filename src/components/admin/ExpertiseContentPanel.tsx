"use client";

import Image from "next/image";
import { Upload, Sparkles, FileText, CheckCircle2, Trash2 } from "lucide-react";
import { homeContent } from "@/content/home";
import type { Editable } from "./studio-types";

interface ExpertiseContentPanelProps {
  active: boolean;
  expertise: Editable<typeof homeContent.expertise>;
  savingSection: string | null;
  uploadingSlot: string | null;
  uploadedPreviews: Record<string, string>;
  updateSection: (sectionKey: string, field: string, value: unknown) => void;
  handleSaveSection: (sectionKey: string, label: string) => void;
  handleUpload: (slotKey: string, file: File) => Promise<void>;
  handleDeleteMedia: (slotKey: string) => Promise<void>;
}

export function ExpertiseContentPanel({
  active,
  expertise,
  savingSection,
  uploadingSlot,
  uploadedPreviews,
  updateSection,
  handleSaveSection,
  handleUpload,
  handleDeleteMedia,
}: ExpertiseContentPanelProps) {
  if (!active) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3F4F6] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-[#1A060E] text-[#DDB78A]">
                <Sparkles className="h-3 w-3" /> Services & Dedicated Pages
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#111827]">Expertise Services</h2>
            <p className="text-xs text-[#6B7280]">
              Manage the 5 services, cover/hero photo, front-page summaries, and inner page in-depth narratives.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSaveSection("expertise", "Expertise Pages")}
            disabled={savingSection === "expertise"}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A060E] px-5 py-2.5 text-xs font-bold text-[#DDB78A] shadow-sm hover:bg-[#36101E] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{savingSection === "expertise" ? "Saving live..." : "Save & Publish All Pages"}</span>
          </button>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label htmlFor="expertise-title" className="block text-[0.68rem] font-bold uppercase tracking-wider text-[#4B5563] mb-1">
              Main Section Headline
            </label>
            <input
              id="expertise-title"
              type="text"
              value={expertise.title || "OUR EXPERTISE"}
              onChange={(e) => updateSection("expertise", "title", e.target.value)}
              className="w-full rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] px-3.5 py-2 text-sm font-semibold text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
          </div>
          <div>
            <label htmlFor="expertise-cta" className="block text-[0.68rem] font-bold uppercase tracking-wider text-[#4B5563] mb-1">
              Top Right CTA Label
            </label>
            <input
              id="expertise-cta"
              type="text"
              value={expertise.viewAllCta?.label || "VIEW ALL SERVICES"}
              onChange={(e) => updateSection("expertise", "viewAllCta.label", e.target.value)}
              className="w-full rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827] focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
          </div>
        </div>
      </div>

      {/* 5 Distinct Service Cards */}
      <div className="space-y-6">
        {(expertise.cards || []).map((card, idx: number) => {
          const coverSlotKey = `expertise.${card.imageKey}`;
          const defaultServiceImages: Record<string, string> = {
            events: "/images/1.1.png",
            exhibitions: "/images/1.2.png",
            workshops: "/images/1.3.png",
            activations: "/images/1.4.png",
            consultancy: "/images/1.5.png",
          };
          const coverImageSrc =
            uploadedPreviews[coverSlotKey] || defaultServiceImages[card.imageKey] || "/images/1.1.png";

          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-6 transition-all hover:border-[#D1D5DB]"
            >
              {/* Card Header & Route Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F4F6] pb-3.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A060E] text-xs font-extrabold text-[#DDB78A]">
                    {card.number}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#111827] uppercase">
                      {card.title || `Service ${card.number}`}
                    </h3>
                    <p className="text-[0.68rem] text-[#6B7280]">
                      Dedicated route: <code className="text-[#B8860B] font-mono">/expertise/{card.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "service"}</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Single Clean Image Dropzone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF5EE] border border-[#DDB78A]/40">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-20 rounded-lg overflow-hidden bg-[#1A060E] border border-[#D1D5DB] shrink-0 shadow-sm">
                    <Image
                      src={coverImageSrc}
                      alt={card.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Cover & Hero Photograph</p>
                    <p className="text-[0.68rem] text-[#6B7280]">
                      Powers the front-page card and full-bleed hero banner on the inner page.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A060E] hover:bg-[#36101E] px-3.5 py-2 text-xs font-bold text-[#DDB78A] shadow-sm transition-all cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    <span>{uploadingSlot === coverSlotKey ? "Uploading..." : "Replace Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(coverSlotKey, f);
                      }}
                    />
                  </label>
                  {uploadedPreviews[coverSlotKey] && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(coverSlotKey)}
                      title="Reset to default theme photo"
                      className="p-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Text Content & Inner Page Narrative */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#B8860B]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                    Service Titles & In-Depth Story
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Service Title */}
                  <div>
                    <label className="block text-[0.68rem] font-bold uppercase text-[#4B5563] mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) => updateSection("expertise", `cards.${idx}.title`, e.target.value)}
                      className="w-full rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] px-3.5 py-2 text-sm font-bold text-[#111827]"
                    />
                  </div>

                  {/* Front-page Summary */}
                  <div className="sm:col-span-2">
                    <label className="block text-[0.68rem] font-bold uppercase text-[#4B5563] mb-1">
                      Front-page Card Summary (Short bullets or comma-separated list)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(card.items) ? card.items.join(", ") : card.description || ""}
                      onChange={(e) => {
                        updateSection("expertise", `cards.${idx}.description`, e.target.value);
                      }}
                      placeholder="Corporate & Institutional, Government Programs, Product Launches..."
                      className="w-full rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] px-3.5 py-2 text-xs text-[#111827]"
                    />
                  </div>
                </div>

                {/* Inner Page In-Depth Story */}
                <div>
                  <label className="block text-[0.68rem] font-bold uppercase text-[#4B5563] mb-1">
                    Inner Page In-Depth Story & Strategic Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={card.longDescription || card.description || ""}
                    onChange={(e) => {
                      updateSection("expertise", `cards.${idx}.longDescription`, e.target.value);
                    }}
                    placeholder={`Write the comprehensive narrative for ${card.title}. Explain how MKAN delivers luxury execution, strategic objectives, and bespoke experiences...`}
                    className="w-full rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] px-4 py-3 text-xs text-[#111827] leading-relaxed focus-visible:border-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
