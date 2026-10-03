"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { X, Upload, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadMediaAction } from "@/app/actions/media";
import { prepareImageUpload } from "@/lib/prepare-image-upload";
import type { StudioProject } from "./studio-types";

interface ProjectEditorDialogProps {
  project: StudioProject | null;
  saving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const PRESET_GALLERY_IMAGES = [
  {
    label: "Ramadan Fair",
    slotKey: "ramadanFair",
    src: "/images/experience-ramadan-fair.jpg",
  },
  {
    label: "Luxury Activation",
    slotKey: "luxuryActivation",
    src: "/images/experience-luxury-activation.jpg",
  },
  {
    label: "Corporate Engagement",
    slotKey: "corporateEvents",
    src: "/images/experience-corporate.jpg",
  },
  {
    label: "Private Engagement",
    slotKey: "privateEngagement",
    src: "/images/experience-private.jpg",
  },
  {
    label: "Built for Brands",
    slotKey: "builtForBrands",
    src: "/images/built-for-brands.jpg",
  },
  {
    label: "Hero Atmosphere",
    slotKey: "heroBg",
    src: "/images/hero-bg.jpg",
  },
];

export function ProjectEditorDialog({
  project,
  saving,
  errorMessage,
  onClose,
  onSubmit,
}: ProjectEditorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial image state
  const initialImageUrl =
    project?.imageUrl ||
    (project?.imageKey
      ? PRESET_GALLERY_IMAGES.find((p) => p.slotKey === project.imageKey)?.src || ""
      : "/images/experience-ramadan-fair.jpg");

  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [imageKey, setImageKey] = useState<string>(project?.imageKey || "ramadanFair");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleFileProcess = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const uploadFile = await prepareImageUpload(file);
      const tempPreview = URL.createObjectURL(uploadFile);
      setImageUrl(tempPreview);

      const slotKey = `experiences.proj_${Date.now()}`;
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("slotKey", slotKey);
      formData.append("altText", project?.title || "MKAN Experience Showcase");

      const res = await uploadMediaAction(formData);
      if (res.success && res.asset?.url) {
        URL.revokeObjectURL(tempPreview);
        setImageUrl(res.asset.url);
        setImageKey(slotKey);
      } else {
        setUploadError(res.message || "Failed to upload image.");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to process photo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const titleId = "project-editor-title";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        if (!saving && !isUploading) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:p-7"
    >
      <div className="space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
          <div>
            <h2 id={titleId} className="text-base font-bold text-[#111827]">
              {project ? "Edit Experience Showcase" : "Add Experience Showcase"}
            </h2>
            <p className="text-xs text-[#6B7280]">
              Custom visual, titles, and public showcase positioning
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving || isUploading}
            aria-label="Close project editor"
            className="rounded p-1 text-[#9CA3AF] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:opacity-50 cursor-pointer"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {(errorMessage || uploadError) && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-800">
            {errorMessage || uploadError}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {project?._id && <input type="hidden" name="id" value={project._id} />}
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <input type="hidden" name="imageKey" value={imageKey} />

          {/* 1. VISUAL IMAGE SELECTION & UPLOAD SECTION */}
          <div className="space-y-2 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#374151] flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-[#B8860B]" />
                <span>Experience Visual *</span>
              </label>

              <button
                type="button"
                onClick={() => setShowGallery(!showGallery)}
                className="text-[0.72rem] font-bold text-[#B8860B] hover:underline cursor-pointer"
              >
                {showGallery ? "Hide Gallery Presets" : "Select from Gallery"}
              </button>
            </div>

            {/* Current Image Preview & Upload Dropzone */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Image Preview Box */}
              <div className="sm:col-span-5 relative aspect-[16/11] rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#14020A] shadow-inner">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Project preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9CA3AF] text-xs">
                    <ImageIcon className="h-6 w-6 mb-1 opacity-50" />
                    <span>No image</span>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs gap-1.5 z-10">
                    <Loader2 className="h-5 w-5 animate-spin text-[#DDB78A]" />
                    <span>Uploading photo...</span>
                  </div>
                )}
              </div>

              {/* Upload Drop Area */}
              <div className="sm:col-span-7 flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
                    isDragOver
                      ? "border-[#B8860B] bg-[#FDF8F0]"
                      : "border-[#D1D5DB] bg-white hover:border-[#B8860B] hover:bg-white"
                  }`}
                >
                  <Upload className="h-4 w-4 text-[#B8860B] mb-1" />
                  <p className="text-xs font-bold text-[#111827]">
                    Click or Drag photo here
                  </p>
                  <p className="text-[0.68rem] text-[#6B7280] mt-0.5">
                    JPG, PNG, WebP up to 15MB (Auto-compressed)
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Gallery Preset Selection */}
            {showGallery && (
              <div className="mt-3 pt-3 border-t border-[#E5E7EB] space-y-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-[#6B7280]">
                  Select from Luxury Presets:
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_GALLERY_IMAGES.map((preset) => {
                    const isSelected = imageUrl === preset.src || imageKey === preset.slotKey;
                    return (
                      <button
                        key={preset.slotKey}
                        type="button"
                        onClick={() => {
                          setImageUrl(preset.src);
                          setImageKey(preset.slotKey);
                        }}
                        className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#B8860B] ring-2 ring-[#B8860B]/30 scale-95"
                            : "border-transparent opacity-75 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <Image
                          src={preset.src}
                          alt={preset.label}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#B8860B]/40 flex items-center justify-center text-white">
                            <Check className="h-4 w-4 drop-shadow-md stroke-[3]" />
                          </div>
                        )}
                        <span className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-[0.55rem] font-bold text-white truncate text-center">
                          {preset.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. PROJECT TITLES */}
          <div>
            <label htmlFor="project-title" className="mb-1 block text-xs font-bold uppercase text-[#374151]">
              Project Title *
            </label>
            <input
              id="project-title"
              type="text"
              name="title"
              required
              minLength={2}
              maxLength={120}
              autoFocus
              defaultValue={project?.title || ""}
              placeholder="e.g. RAMADAN FAIR"
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
          </div>

          <div>
            <label htmlFor="project-subtitle" className="mb-1 block text-xs font-bold uppercase text-[#374151]">
              Subtitle *
            </label>
            <input
              id="project-subtitle"
              type="text"
              name="subtitle"
              required
              minLength={2}
              maxLength={180}
              defaultValue={project?.subtitle || ""}
              placeholder="e.g. Flagship Exhibition Platform"
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
          </div>

          {/* 3. CATEGORY SELECTION */}
          <div>
            <label htmlFor="project-category" className="mb-1 block text-xs font-bold uppercase text-[#374151]">
              Category *
            </label>
            <select
              id="project-category"
              name="category"
              required
              defaultValue={project?.category || "events"}
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            >
              <option value="events">Events & Summits</option>
              <option value="exhibitions">Exhibitions & Pavilions</option>
              <option value="activations">Luxury Brand Activations</option>
              <option value="workshops">Workshops & Masterclasses</option>
            </select>
          </div>

          {/* 4. HOMEPAGE SHOWCASE TOGGLE */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
            <input
              type="checkbox"
              id="featuredOnHome"
              name="featuredOnHome"
              value="true"
              defaultChecked={project ? project.featuredOnHome : true}
              className="h-4 w-4 rounded text-[#111827] focus:ring-[#DDB78A]"
            />
            <label htmlFor="featuredOnHome" className="cursor-pointer text-xs font-semibold text-[#111827]">
              Feature in &ldquo;Selected Experiences&rdquo; carousel on homepage
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2.5 border-t border-[#F3F4F6] pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || isUploading}
              className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#4B5563] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || isUploading}
              className="rounded-lg bg-[#1A060E] px-5 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:cursor-wait disabled:opacity-60 cursor-pointer shadow-sm flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Experience</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
