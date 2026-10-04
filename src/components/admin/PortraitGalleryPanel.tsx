"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  MapPin,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import {
  type PortraitPin,
  PORTRAIT_CATEGORIES,
  ASPECT_OPTIONS,
} from "@/content/portrait-gallery";

interface PortraitGalleryPanelProps {
  active: boolean;
  pins: PortraitPin[];
  onAddPin: () => void;
  onEditPin: (pin: PortraitPin) => void;
  onDeletePin: (idOrMongoId: string) => void;
  onMovePin: (index: number, direction: "up" | "down") => void;
  onResetDefaults: () => void;
}

export function PortraitGalleryPanel({
  active,
  pins,
  onAddPin,
  onEditPin,
  onDeletePin,
  onMovePin,
  onResetDefaults,
}: PortraitGalleryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAspect, setSelectedAspect] = useState<string>("all");

  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      // Category match
      if (selectedCategory !== "all" && pin.category !== selectedCategory) {
        return false;
      }
      // Aspect match
      if (selectedAspect !== "all" && pin.aspect !== selectedAspect) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pin.title.toLowerCase().includes(q);
        const matchesSub = pin.subtitle.toLowerCase().includes(q);
        const matchesClient = pin.client.toLowerCase().includes(q);
        const matchesTags = pin.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!matchesTitle && !matchesSub && !matchesClient && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [pins, selectedCategory, selectedAspect, searchQuery]);

  if (!active) return null;

  return (
    <div className="space-y-6">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. Header Banner & Actions                                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-[#111827]">
              Portrait &amp; Pinterest Gallery
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1A060E] text-[#DDB78A] text-[0.68rem] font-bold">
              {pins.length} Showcases
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-1 max-w-2xl leading-relaxed">
            Control the visual masonry showcases featured on the{" "}
            <Link
              href="/experiences"
              target="_blank"
              className="text-[#1A060E] font-semibold underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-1"
            >
              <span>/experiences</span>
              <ExternalLink className="h-3 w-3" />
            </Link>{" "}
            page. Reorder cards, adjust Pinterest aspect ratios, update photography, and edit detailed case study dossiers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onResetDefaults}
            className="px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#6B7280] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Restore original 12 verified showcases"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onAddPin}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A060E] px-4 py-2.5 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Showcase</span>
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. Search & Category / Aspect Filters                        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search showcases by title, client, or tag..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-[#FAFAFA] focus:bg-white transition-colors"
            />
          </div>

          {/* Quick Counter */}
          <div className="text-xs text-[#6B7280] font-medium shrink-0 self-end sm:self-center">
            Showing <strong className="text-[#111827]">{filteredPins.length}</strong> of {pins.length}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#F3F4F6]">
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">
            Category:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-[#1A060E] text-white"
                : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
            }`}
          >
            All Categories ({pins.length})
          </button>
          {PORTRAIT_CATEGORIES.map((cat) => {
            const count = pins.filter((p) => p.category === cat.key).length;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-[#1A060E] text-white"
                    : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Aspect Ratio Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#F3F4F6]">
          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">
            Aspect:
          </span>
          <button
            type="button"
            onClick={() => setSelectedAspect("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedAspect === "all"
                ? "bg-[#1A060E] text-white"
                : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
            }`}
          >
            All ({pins.length})
          </button>
          {ASPECT_OPTIONS.map((asp) => {
            const count = pins.filter((p) => p.aspect === asp.key).length;
            const isSelected = selectedAspect === asp.key;
            return (
              <button
                key={asp.key}
                type="button"
                onClick={() => setSelectedAspect(asp.key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-[#1A060E] text-white"
                    : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                }`}
              >
                {asp.label} ({asp.ratio}) ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. Showcase Grid                                             */}
      {/* ──────────────────────────────────────────────────────────── */}
      {filteredPins.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#E5E7EB]">
          <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#111827]">No showcases match your filter</h3>
          <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, selecting &quot;All Categories&quot;, or click &quot;Add Showcase&quot; to create a new card.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPins.map((pin, index) => {
            // Find global index in pins array for move operations
            const globalIndex = pins.findIndex(
              (p) => (p._id && p._id === pin._id) || p.id === pin.id
            );
            const isFirst = globalIndex === 0;
            const isLast = globalIndex === pins.length - 1;

            return (
              <div
                key={pin._id || pin.id || index}
                className="group rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#1A060E] overflow-hidden">
                    <Image
                      src={pin.image}
                      alt={pin.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-[#1A060E]/90 backdrop-blur-md text-[0.62rem] font-bold text-[#DDB78A] uppercase tracking-wider border border-[#DDB78A]/30">
                        #{globalIndex + 1} • {pin.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[0.62rem] font-bold text-[#111827] uppercase">
                        {pin.aspect} ({ASPECT_OPTIONS.find((a) => a.key === pin.aspect)?.ratio})
                      </span>
                    </div>

                    {/* Title in Image Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[0.65rem] text-[#DDB78A] font-bold uppercase tracking-wider">
                        {pin.client || "MKAN Showcase"}
                      </p>
                      <h3 className="text-sm font-bold text-white line-clamp-1">
                        {pin.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[#4B5563] line-clamp-2 italic font-serif">
                      &ldquo;{pin.subtitle}&rdquo;
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[0.68rem] text-[#6B7280]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#9CA3AF]" />
                        <span>{pin.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#9CA3AF]" />
                        <span>{pin.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        <span>{(pin.deliverables?.length ?? 0)} Deliverables</span>
                      </div>
                    </div>

                    {/* Tags Pills */}
                    {pin.tags && pin.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {pin.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[0.62rem] font-medium text-[#4B5563]"
                          >
                            {tag}
                          </span>
                        ))}
                        {pin.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#F3F4F6] text-[0.62rem] text-[#6B7280]">
                            +{pin.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-4 py-3 bg-[#FAFAFA] border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                  {/* Order control arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => onMovePin(globalIndex, "up")}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move card up in gallery display order"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => onMovePin(globalIndex, "down")}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move card down in gallery display order"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[0.62rem] text-[#9CA3AF] ml-1 font-mono">
                      Order: {globalIndex + 1}
                    </span>
                  </div>

                  {/* Edit and Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEditPin(pin)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#D1D5DB] hover:bg-[#F3F4F6] text-xs font-bold text-[#111827] transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeletePin(pin._id || pin.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Delete showcase"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
