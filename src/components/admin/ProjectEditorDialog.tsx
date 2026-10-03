"use client";

import { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import type { StudioProject } from "./studio-types";

interface ProjectEditorDialogProps {
  project: StudioProject | null;
  saving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ProjectEditorDialog({
  project,
  saving,
  errorMessage,
  onClose,
  onSubmit,
}: ProjectEditorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const titleId = "project-editor-title";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        if (!saving) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
          <h2 id={titleId} className="text-base font-bold text-[#111827]">
            {project ? "Edit Experience" : "Add Experience"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close project editor"
            className="rounded p-1 text-[#9CA3AF] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:opacity-50"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {errorMessage && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {errorMessage}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {project?._id && <input type="hidden" name="id" value={project._id} />}

          <div>
            <label htmlFor="project-title" className="mb-1 block text-xs font-bold uppercase text-[#374151]">Project Title *</label>
            <input
              id="project-title"
              type="text"
              name="title"
              required
              minLength={2}
              maxLength={120}
              autoFocus
              defaultValue={project?.title || ""}
              placeholder="e.g. RAMADAN FAIR 2026"
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
          </div>

          <div>
            <label htmlFor="project-subtitle" className="mb-1 block text-xs font-bold uppercase text-[#374151]">Subtitle *</label>
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="project-category" className="mb-1 block text-xs font-bold uppercase text-[#374151]">Category *</label>
              <select
                id="project-category"
                name="category"
                required
                defaultValue={project?.category || "events"}
                className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                <option value="events">Events</option>
                <option value="exhibitions">Exhibitions</option>
                <option value="workshops">Workshops</option>
                <option value="activations">Activations</option>
              </select>
            </div>

            <div>
              <label htmlFor="project-image-key" className="mb-1 block text-xs font-bold uppercase text-[#374151]">Image Slot</label>
              <select
                id="project-image-key"
                name="imageKey"
                defaultValue={project?.imageKey || "ramadanFair"}
                className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 font-mono text-xs text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                <option value="ramadanFair">experiences.ramadanFair</option>
                <option value="corporateEvents">experiences.corporateEvents</option>
                <option value="luxuryActivation">experiences.luxuryActivation</option>
                <option value="privateEngagement">experiences.privateEngagement</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="project-image-url" className="mb-1 block text-xs font-bold uppercase text-[#374151]">Custom Photo URL (Optional)</label>
            <input
              id="project-image-url"
              type="text"
              inputMode="url"
              name="imageUrl"
              maxLength={2048}
              defaultValue={project?.imageUrl || ""}
              placeholder="https://…"
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 font-mono text-xs text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            />
            <p className="mt-1 text-xs text-[#6B7280]">Use an HTTPS URL or leave blank to use the selected image slot.</p>
          </div>

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
              Feature on public homepage
            </label>
          </div>

          <div className="flex justify-end gap-2.5 border-t border-[#F3F4F6] pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#4B5563] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#1A060E] px-5 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
