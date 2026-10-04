"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Check,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  MapPin,
  Calendar,
  Building2,
  Tag,
  ListChecks,
} from "lucide-react";
import { uploadMediaAction } from "@/app/actions/media";
import { prepareImageUpload } from "@/lib/prepare-image-upload";
import {
  type PortraitPin,
  type PortraitPinAspect,
  type PortraitPinCategory,
  PORTRAIT_CATEGORIES,
  ASPECT_OPTIONS,
} from "@/content/portrait-gallery";

interface PortraitPinEditorDialogProps {
  pin: PortraitPin | null;
  saving: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const PRESET_GALLERY_IMAGES = [
  { label: "Ramadan Fair", src: "/images/2.1.png" },
  { label: "Haute Parfumerie", src: "/images/2.2.png" },
  { label: "Executive Gala", src: "/images/2.3.png" },
  { label: "Sovereign Majlis", src: "/images/2.4.png" },
  { label: "Heritage Pavilion", src: "/images/1.1.png" },
  { label: "Trade Pavilions", src: "/images/1.2.png" },
  { label: "Artisanal Learning", src: "/images/1.3.png" },
  { label: "Luxury Atrium", src: "/images/1.4.png" },
  { label: "Spatial Advisory", src: "/images/1.5.png" },
  { label: "Method Concept", src: "/images/method-concept.jpg" },
  { label: "Method Development", src: "/images/method-development.jpg" },
  { label: "Method Curation", src: "/images/method-curation.jpg" },
];

const LUXURY_SUGGESTED_TAGS = [
  "Spatial Scenography",
  "VIP Protocol",
  "Pavilion Design",
  "Sensory Chambers",
  "Acoustic Engineering",
  "Artisanal Curation",
  "Lighting Scenography",
  "Cultural Heritage",
  "High Jewelry",
  "Diplomatic Majlis",
];

export function PortraitPinEditorDialog({
  pin,
  saving,
  errorMessage,
  onClose,
  onSubmit,
}: PortraitPinEditorDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states initialized with pin
  const [activeTab, setActiveTab] = useState<"essentials" | "meta" | "casestudy">("essentials");
  const [title, setTitle] = useState(pin?.title || "");
  const [subtitle, setSubtitle] = useState(pin?.subtitle || "");
  const [category, setCategory] = useState<PortraitPinCategory>(pin?.category || "exhibitions");
  const [categoryLabel, setCategoryLabel] = useState(pin?.categoryLabel || "Exhibitions");
  const [aspect, setAspect] = useState<PortraitPinAspect>(pin?.aspect || "portrait");
  const [imageUrl, setImageUrl] = useState(pin?.image || "/images/2.1.png");
  const [year, setYear] = useState(pin?.year || "2024");
  const [location, setLocation] = useState(pin?.location || "Dubai, UAE");
  const [client, setClient] = useState(pin?.client || "MKAN Client Partner");

  // Array states
  const [tags, setTags] = useState<string[]>(
    pin?.tags && pin.tags.length > 0 ? pin.tags : ["Spatial Scenography", "VIP Experience"]
  );
  const [newTagInput, setNewTagInput] = useState("");

  const [disciplines, setDisciplines] = useState<string[]>(
    pin?.disciplines && pin.disciplines.length > 0
      ? pin.disciplines
      : ["Spatial Masterplanning", "VIP Protocol"]
  );
  const [newDisciplineInput, setNewDisciplineInput] = useState("");

  const [deliverables, setDeliverables] = useState<string[]>(
    pin?.deliverables && pin.deliverables.length > 0
      ? pin.deliverables
      : ["Custom architectural pavilion setup", "VIP majlis guest protocol"]
  );
  const [newDeliverableInput, setNewDeliverableInput] = useState("");

  // Detailed case study text
  const [summary, setSummary] = useState(pin?.summary || "");
  const [overview, setOverview] = useState(pin?.overview || "");
  const [impact, setImpact] = useState(pin?.impact || "");

  // Upload and UI state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving && !isUploading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saving, isUploading, onClose]);

  const handleCategoryChange = (newCat: PortraitPinCategory) => {
    setCategory(newCat);
    const found = PORTRAIT_CATEGORIES.find((c) => c.key === newCat);
    if (found) {
      setCategoryLabel(found.label);
    }
  };

  const handleFileProcess = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const uploadFile = await prepareImageUpload(file);
      const tempPreview = URL.createObjectURL(uploadFile);
      setImageUrl(tempPreview);

      const slotKey = `portrait_pin_${Date.now()}`;
      const uploadData = new FormData();
      uploadData.append("file", uploadFile);
      uploadData.append("slotKey", slotKey);
      uploadData.append("altText", title || "MKAN Gallery Pin");

      const res = await uploadMediaAction(uploadData);
      if (res.success && res.asset?.url) {
        setImageUrl(res.asset.url);
      } else {
        setUploadError(res.message || "Failed to upload file");
      }
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    if (!tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
    }
    setNewTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddDiscipline = () => {
    if (!newDisciplineInput.trim()) return;
    if (!disciplines.includes(newDisciplineInput.trim())) {
      setDisciplines([...disciplines, newDisciplineInput.trim()]);
    }
    setNewDisciplineInput("");
  };

  const handleRemoveDiscipline = (index: number) => {
    setDisciplines(disciplines.filter((_, i) => i !== index));
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setDeliverables([...deliverables, newDeliverableInput.trim()]);
    setNewDeliverableInput("");
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim() || title.trim().length < 2) {
      setActiveTab("essentials");
      setValidationError("Please enter a showcase title (at least 2 characters).");
      return;
    }
    if (!subtitle.trim() || subtitle.trim().length < 2) {
      setActiveTab("essentials");
      setValidationError("Please enter a showcase subtitle or tagline.");
      return;
    }
    if (!imageUrl.trim()) {
      setActiveTab("essentials");
      setValidationError("Please select or upload an image for this showcase.");
      return;
    }

    // Auto-commit any typed pending inputs if user clicked submit without clicking Add
    const finalTags = [...tags];
    if (newTagInput.trim() && !finalTags.includes(newTagInput.trim())) {
      finalTags.push(newTagInput.trim());
    }

    const finalDisciplines = [...disciplines];
    if (newDisciplineInput.trim() && !finalDisciplines.includes(newDisciplineInput.trim())) {
      finalDisciplines.push(newDisciplineInput.trim());
    }

    const finalDeliverables = [...deliverables];
    if (newDeliverableInput.trim()) {
      finalDeliverables.push(newDeliverableInput.trim());
    }

    const fd = new FormData();
    if (pin?._id) fd.append("_id", pin._id);
    if (pin?.id) fd.append("id", pin.id);
    fd.append("slug", pin?.id || "");
    fd.append("title", title.trim());
    fd.append("subtitle", subtitle.trim());
    fd.append("category", category);
    fd.append("categoryLabel", categoryLabel || category.toUpperCase());
    fd.append("aspect", aspect);
    fd.append("image", imageUrl.trim());
    fd.append("year", year.trim() || "2024");
    fd.append("location", location.trim() || "Dubai, UAE");
    fd.append("client", client.trim() || "MKAN Client Partner");
    fd.append("summary", summary.trim());
    fd.append("overview", overview.trim());
    fd.append("impact", impact.trim());
    fd.append("tags", JSON.stringify(finalTags));
    fd.append("disciplines", JSON.stringify(finalDisciplines));
    fd.append("deliverables", JSON.stringify(finalDeliverables));

    await onSubmit(fd);
  };

  const getAspectClass = (asp: PortraitPinAspect) => {
    switch (asp) {
      case "tall":
        return "aspect-[3/4.2]";
      case "portrait":
        return "aspect-[4/5.2]";
      case "square":
        return "aspect-square";
      case "wide":
        return "aspect-[16/11]";
      case "cinema":
        return "aspect-[16/9]";
      default:
        return "aspect-[4/5.2]";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => {
        if (!saving && !isUploading) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col border border-[#E5E7EB] overflow-hidden text-[#111827]"
      >
        {/* ──────────────────────────────────────────────────────────── */}
        {/* 1. Modal Header                                              */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.62rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#1A060E] text-[#DDB78A]">
                {pin ? "Edit Showcase" : "New Showcase"}
              </span>
              <h2 className="text-base font-bold text-[#111827]">
                {pin ? pin.title : "Add Portrait Gallery Showcase"}
              </h2>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Configure photography, masonry aspect ratio, client details, and case study dossier.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving || isUploading}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            title="Close dialog (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 2. Tab Navigation                                            */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center border-b border-[#E5E7EB] bg-white px-6 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("essentials")}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "essentials"
                ? "border-[#1A060E] text-[#1A060E]"
                : "border-transparent text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>1. Visual &amp; Essentials</span>
            <span className="ml-1 px-1.5 py-0.5 text-[0.62rem] rounded bg-gray-100 text-gray-700 font-mono capitalize">
              {aspect}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("meta")}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "meta"
                ? "border-[#1A060E] text-[#1A060E]"
                : "border-transparent text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            <Tag className="h-3.5 w-3.5" />
            <span>2. Client &amp; Meta Tags</span>
            <span className="ml-1 px-1.5 py-0.5 text-[0.62rem] rounded bg-gray-100 text-gray-700 font-mono">
              {tags.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("casestudy")}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "casestudy"
                ? "border-[#1A060E] text-[#1A060E]"
                : "border-transparent text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            <ListChecks className="h-3.5 w-3.5" />
            <span>3. Case Study Dossier</span>
            <span className="ml-1 px-1.5 py-0.5 text-[0.62rem] rounded bg-gray-100 text-gray-700 font-mono">
              {deliverables.length}
            </span>
          </button>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 3. Form Body (All inputs kept mounted in DOM)                */}
        {/* ──────────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-6">
          {(errorMessage || validationError) && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center justify-between">
              <span>{errorMessage || validationError}</span>
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="text-rose-400 hover:text-rose-700 ml-2"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {uploadError && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl font-medium">
              {uploadError}
            </div>
          )}

          {/* ═════════ TAB 1: VISUAL & ESSENTIALS ═════════ */}
          <div className={activeTab === "essentials" ? "space-y-6" : "hidden"}>
            {/* Essential Title & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Showcase Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. THE RAMADAN FAIR"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Subtitle / Tagline <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Flagship Cultural Retail & Architectural Pavilion"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>
            </div>

            {/* Category and Aspect Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Primary Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as PortraitPinCategory)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                >
                  {PORTRAIT_CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  Display Category Label
                </label>
                <input
                  type="text"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                  placeholder="e.g. Exhibitions"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>
            </div>

            {/* Aspect Ratio Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-2">
                Pinterest Masonry Aspect Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ASPECT_OPTIONS.map((item) => {
                  const isSelected = aspect === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setAspect(item.key)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#1A060E] bg-[#1A060E]/5 ring-2 ring-[#1A060E]"
                          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#111827]">{item.label}</span>
                        <span className="text-[0.62rem] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {item.ratio}
                        </span>
                      </div>
                      <div className="h-16 w-full flex items-center justify-center bg-gray-100 rounded-lg p-1.5 mb-2">
                        <div
                          className={`w-full bg-[#1A060E] rounded-md transition-transform ${
                            isSelected ? "opacity-90" : "opacity-30"
                          } ${
                            item.key === "tall"
                              ? "h-14 max-w-[28px]"
                              : item.key === "portrait"
                              ? "h-12 max-w-[34px]"
                              : item.key === "square"
                              ? "h-10 max-w-[40px]"
                              : item.key === "wide"
                              ? "h-8 max-w-[50px]"
                              : "h-6 max-w-[56px]"
                          }`}
                        />
                      </div>
                      <p className="text-[0.65rem] text-[#6B7280] leading-tight">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Media & Upload */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 border-t border-[#E5E7EB]">
              {/* Preview Box */}
              <div className="md:col-span-5 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                  Live Aspect Preview ({aspect})
                </label>
                <div
                  className={`relative w-full rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#1A060E] shadow-inner ${getAspectClass(
                    aspect
                  )}`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title || "Preview"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                      <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                      <span className="text-xs">No image selected</span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                      <Loader2 className="h-6 w-6 animate-spin mb-2" />
                      <span className="text-xs font-medium">Uploading &amp; optimizing...</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[0.62rem] font-bold text-white uppercase tracking-wider">
                    {categoryLabel || category}
                  </div>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1">
                    Image Source Path or URL
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/2.1.png or https://..."
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-mono"
                  />
                </div>

                <div className="p-4 rounded-xl border border-dashed border-[#D1D5DB] bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
                  <Upload className="h-6 w-6 text-[#9CA3AF] mb-2" />
                  <p className="text-xs font-bold text-[#111827] mb-0.5">Upload New High-Res Image</p>
                  <p className="text-[0.68rem] text-[#6B7280] mb-3">
                    PNG, WebP, JPG up to 10MB (auto-compressed to high-fidelity WebP)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileProcess(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 rounded-xl bg-white border border-[#D1D5DB] hover:bg-[#F3F4F6] text-xs font-bold text-[#111827] transition-all shadow-sm cursor-pointer"
                  >
                    Browse Local File
                  </button>
                </div>

                {/* Preset Picker */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPresets(!showPresets)}
                    className="text-xs font-bold text-[#1A060E] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3 text-[#DDB78A]" />
                    <span>{showPresets ? "Hide MKAN Stock Images" : "Choose from MKAN Stock Images"}</span>
                  </button>

                  {showPresets && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-[#E5E7EB] rounded-xl bg-white">
                      {PRESET_GALLERY_IMAGES.map((preset) => (
                        <button
                          key={preset.src}
                          type="button"
                          onClick={() => setImageUrl(preset.src)}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                            imageUrl === preset.src
                              ? "ring-2 ring-[#1A060E] border-transparent"
                              : "border-[#E5E7EB] hover:opacity-80"
                          }`}
                        >
                          <Image src={preset.src} alt={preset.label} fill className="object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[0.55rem] text-white px-1 py-0.5 truncate text-left">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ═════════ TAB 2: CLIENT & META TAGS ═════════ */}
          <div className={activeTab === "meta" ? "space-y-4" : "hidden"}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#6B7280]" />
                  <span>Execution Year</span>
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#6B7280]" />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dubai, UAE"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1 flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-[#6B7280]" />
                  <span>Client / Partner</span>
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Curated Cultural Brands"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
                />
              </div>
            </div>

            {/* Tags Pills Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-[#374151] mb-1.5">
                Showcase Tags (displayed on card hover)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[32px] p-2 bg-[#FAFAFA] rounded-xl border border-[#E5E7EB]">
                {tags.length === 0 && (
                  <span className="text-xs text-[#9CA3AF] italic">No tags added yet. Type below and press Enter.</span>
                )}
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white text-xs font-medium text-[#374151] border border-[#D1D5DB] shadow-2xs"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(idx)}
                      className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Type a tag name and click + or press Enter..."
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Tag</span>
                </button>
              </div>

              {/* Quick Luxury Suggestions */}
              <div className="mt-3">
                <span className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Quick Luxury Suggestions (click to add):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {LUXURY_SUGGESTED_TAGS.map((sug) => {
                    const isAdded = tags.includes(sug);
                    return (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          if (!isAdded) {
                            setTags([...tags, sug]);
                          }
                        }}
                        disabled={isAdded}
                        className={`text-[0.68rem] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                          isAdded
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#1A060E] hover:text-[#1A060E] hover:bg-gray-50 cursor-pointer shadow-2xs"
                        }`}
                      >
                        {isAdded && <Check className="h-2.5 w-2.5 text-emerald-600" />}
                        <span>{sug}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ═════════ TAB 3: CASE STUDY DOSSIER ═════════ */}
          <div className={activeTab === "casestudy" ? "space-y-4" : "hidden"}>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              These details appear inside the full-screen visual dossier popup when a client clicks on this showcase card on the Experiences page.
            </p>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-1">
                Short Executive Summary
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A concise 1-2 sentence high-level overview..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-1">
                In-Depth Executive Overview
              </label>
              <textarea
                rows={4}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Detailed narrative detailing the creative challenge, architecture, and luxury execution..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white leading-relaxed"
              />
            </div>

            {/* Scope / Deliverables List */}
            <div>
              <label className="block text-xs font-bold text-[#374151] mb-1 flex items-center justify-between">
                <span>Key Scope &amp; Deliverables Checklist</span>
                <span className="text-[0.68rem] text-gray-500 font-normal">Checkmarks inside case study modal</span>
              </label>
              <div className="space-y-2 mb-2 max-h-40 overflow-y-auto pr-1">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A060E] w-4 shrink-0">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const copy = [...deliverables];
                        copy[idx] = e.target.value;
                        setDeliverables(copy);
                      }}
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove deliverable"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDeliverableInput}
                  onChange={(e) => setNewDeliverableInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  placeholder="Add another deliverable bullet..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D1D5DB] bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Disciplines Involved */}
            <div>
              <label className="block text-xs font-bold text-[#374151] mb-1 flex items-center justify-between">
                <span>Specialized Disciplines</span>
                <span className="text-[0.68rem] text-gray-500 font-normal">Pill tags inside modal</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {disciplines.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF3EE] text-xs font-medium text-[#1A060E] border border-[#DDB78A]/40"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDiscipline(idx)}
                      className="text-gray-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDisciplineInput}
                  onChange={(e) => setNewDisciplineInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddDiscipline();
                    }
                  }}
                  placeholder="e.g. VIP Protocol, Acoustic Scenography..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D1D5DB] bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddDiscipline}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#111827] cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Measurable Impact */}
            <div>
              <label className="block text-xs font-bold text-[#374151] mb-1">
                Measurable Impact Highlight
              </label>
              <input
                type="text"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                placeholder="e.g. Over 8,500 qualified high-net-worth visitors over 5 evenings, achieving 100% vendor satisfaction..."
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#1A060E] bg-white font-medium"
              />
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* 4. Modal Footer — Save Button ALWAYS VISIBLE on ANY tab      */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || isUploading}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#D1D5DB] text-xs font-bold text-[#4B5563] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="w-full sm:w-auto flex items-center justify-end gap-2.5">
              {/* Optional Step Switchers */}
              {activeTab === "essentials" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("meta")}
                  className="px-3 py-2.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-100 cursor-pointer"
                >
                  Next: Meta Tags →
                </button>
              )}
              {activeTab === "meta" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("casestudy")}
                  className="px-3 py-2.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-100 cursor-pointer"
                >
                  Next: Case Study →
                </button>
              )}

              {/* Primary Save Button — ALWAYS Accessible on Every Tab */}
              <button
                type="submit"
                disabled={saving || isUploading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1A060E] hover:bg-[#2A0A17] text-[#DDB78A] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{pin ? "Save Changes" : "Create Showcase"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
