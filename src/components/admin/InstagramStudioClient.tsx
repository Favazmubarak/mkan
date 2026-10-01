"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  saveSectionDraftAction,
  publishSectionAction,
  publishAllSectionsAction,
} from "@/app/actions/sections";
import {
  upsertProjectAction,
  deleteProjectAction,
  toggleProjectHomeAction,
} from "@/app/actions/projects";
import { uploadMediaAction } from "@/app/actions/media";
import {
  toggleMessageReadAction,
  deleteMessageAction,
} from "@/app/actions/messages";
import { logoutAdminAction } from "@/app/actions/auth";
import { homeContent } from "@/content/home";
import {
  Layers,
  Grid,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Send,
  Loader2,
  X,
  LogOut,
  ExternalLink,
  Upload,
  Check,
  Sparkles,
  Save,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Props Interface                                                   */
/* ------------------------------------------------------------------ */
interface StudioProps {
  initialSections: Record<string, any>;
  initialProjects: any[];
  initialMessages: any[];
  initialSite: any;
  userEmail?: string;
}

export function InstagramStudioClient({
  initialSections,
  initialProjects,
  initialMessages,
  initialSite,
  userEmail,
}: StudioProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<"content" | "portfolio" | "inbox" | "settings">("content");

  // Data State
  const [sections, setSections] = useState(initialSections);
  const [projects, setProjects] = useState(initialProjects);
  const [messages, setMessages] = useState(initialMessages);
  const [siteData, setSiteData] = useState(initialSite);
  const [selectedMessage, setSelectedMessage] = useState<any>(initialMessages[0] || null);
  const [inboxFilter, setInboxFilter] = useState<"all" | "unread">("all");

  // Action States
  const [isPublishing, setIsPublishing] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadedPreviews, setUploadedPreviews] = useState<Record<string, string>>({});
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isProjectSaving, setIsProjectSaving] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* ------------------------------------------------------------------ */
  /*  Field Change Helper                                               */
  /* ------------------------------------------------------------------ */
  const updateSection = (sectionKey: string, field: string, value: any) => {
    setSections((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[sectionKey]) copy[sectionKey] = { draftData: {} };
      if (!copy[sectionKey].draftData) copy[sectionKey].draftData = {};

      const keys = field.split(".");
      let target = copy[sectionKey].draftData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  /* ------------------------------------------------------------------ */
  /*  Save & Publish Single Section                                     */
  /* ------------------------------------------------------------------ */
  const handleSaveSection = async (sectionKey: string, label: string) => {
    setSavingSection(sectionKey);
    try {
      const data = sections[sectionKey]?.draftData || sections[sectionKey]?.data;
      await saveSectionDraftAction(sectionKey, data);
      const res = await publishSectionAction(sectionKey);
      if (res.success) {
        showToast(`${label} saved & published live.`);
      } else {
        showToast(res.message || "Failed to update section.", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Action failed.", "error");
    } finally {
      setSavingSection(null);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Publish All Changes Live                                          */
  /* ------------------------------------------------------------------ */
  const handlePublishAll = async () => {
    setIsPublishing(true);
    try {
      for (const key of Object.keys(sections)) {
        if (sections[key]?.draftData) {
          await saveSectionDraftAction(key, sections[key].draftData);
        }
      }
      if (siteData) {
        await saveSectionDraftAction("site", siteData);
      }
      const res = await publishAllSectionsAction();
      if (res.success) {
        showToast("✨ All changes are now live on the public website!");
      } else {
        showToast(res.message || "Failed to publish.", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Publishing failed.", "error");
    } finally {
      setIsPublishing(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Photo Upload Handler (15MB Limit)                                 */
  /* ------------------------------------------------------------------ */
  const handleUpload = async (slotKey: string, file: File) => {
    setUploadingSlot(slotKey);
    const tempUrl = URL.createObjectURL(file);
    setUploadedPreviews((prev) => ({ ...prev, [slotKey]: tempUrl }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slotKey", slotKey);
      formData.append("altText", "MKAN Luxury Visual");

      const res = await uploadMediaAction(formData);
      if (res.success) {
        showToast("Photo uploaded & optimized.");
      } else {
        showToast(res.message || "Upload failed.", "error");
      }
    } catch {
      showToast("Image upload failed.", "error");
    } finally {
      setUploadingSlot(null);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Project CRUD                                                      */
  /* ------------------------------------------------------------------ */
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProjectSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await upsertProjectAction(formData);
      if (res.success) {
        showToast("Project saved.");
        setIsProjectModalOpen(false);
        setActiveProject(null);
        window.location.reload();
      } else {
        showToast(res.message || "Save failed.", "error");
      }
    } catch {
      showToast("Could not save project.", "error");
    } finally {
      setIsProjectSaving(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return;
    try {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        showToast("Project deleted.");
      }
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  const handleToggleHome = async (id: string, current: boolean) => {
    try {
      const res = await toggleProjectHomeAction(id, !current);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === id || p.id === id ? { ...p, featuredOnHome: !current } : p
          )
        );
      }
    } catch {
      // Ignored
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Messages                                                          */
  /* ------------------------------------------------------------------ */
  const handleToggleRead = async (id: string, status: string) => {
    const next = status === "unread" ? "read" : "unread";
    try {
      await toggleMessageReadAction(id, next);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: next } : m))
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage((prev: any) => ({ ...prev, status: next }));
      }
    } catch {
      // Ignored
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessageAction(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setSelectedMessage(null);
      showToast("Message deleted.");
    } catch {
      // Ignored
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Save Studio Profile                                               */
  /* ------------------------------------------------------------------ */
  const handleSaveProfile = async () => {
    try {
      await saveSectionDraftAction("site", siteData);
      await publishSectionAction("site");
      showToast("Studio profile updated & published live.");
    } catch {
      showToast("Failed to update profile.", "error");
    }
  };

  // Section Data Resolvers
  const hero = sections.hero?.draftData || sections.hero?.data || homeContent.hero;
  const about = sections.about?.draftData || sections.about?.data || homeContent.about;
  const expertise = sections.expertise?.draftData || sections.expertise?.data || homeContent.expertise;
  const method = sections.method?.draftData || sections.method?.data || homeContent.method;
  const philosophy = sections.philosophy?.draftData || sections.philosophy?.data || homeContent.philosophy;
  const impact = sections.impactBanner?.draftData || sections.impactBanner?.data || homeContent.impactBanner;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans selection:bg-[#DDB78A] selection:text-[#111827] pb-24">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. Header Bar                                                */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-6 lg:px-10 py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-[#DDB78A] font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-[#111827]">
                  MKAN CONCEPT
                </span>
                <span className="text-[0.62rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]">
                  Studio Dashboard
                </span>
              </div>
              <p className="text-[0.68rem] text-[#6B7280] font-medium">
                Luxury Event Consultancy • Dubai Flagship
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#4B5563] hover:text-[#111827] hover:border-[#D1D5DB] transition-all shadow-sm"
            >
              <span>View Public Website</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>

            <button
              type="button"
              onClick={handlePublishAll}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-5 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#1F2937] active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Publish All Changes</span>
                </>
              )}
            </button>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="p-2 rounded-xl text-[#9CA3AF] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. Studio Workspace                                          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2 sticky top-[80px]">
            <div className="p-2 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-1">
              {[
                { id: "content", label: "Website Content", icon: Layers, desc: "Hero, Story, Services" },
                { id: "portfolio", label: "Portfolio Grid", icon: Grid, desc: "Experience showcases" },
                { id: "inbox", label: "Client Inquiries", icon: MessageSquare, badge: unreadCount, desc: "Direct client inquiries" },
                { id: "settings", label: "Studio Profile", icon: Settings, desc: "Contact & address" },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#111827] text-white shadow-sm"
                        : "hover:bg-[#F9FAFB] text-[#374151]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? "text-[#DDB78A]" : "text-[#6B7280]"}`} />
                      <div>
                        <p className={`text-xs font-bold leading-none ${isActive ? "text-white" : "text-[#111827]"}`}>
                          {tab.label}
                        </p>
                        <p className={`text-[0.68rem] mt-1 ${isActive ? "text-white/70" : "text-[#9CA3AF]"}`}>
                          {tab.desc}
                        </p>
                      </div>
                    </div>
                    {tab.badge && tab.badge > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[0.62rem] font-bold bg-rose-500 text-white">
                        {tab.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-3">
              <p className="text-xs font-bold text-[#111827]">Quick Publish</p>
              <button
                type="button"
                onClick={handlePublishAll}
                disabled={isPublishing}
                className="w-full py-2.5 rounded-xl bg-[#DDB78A] hover:bg-[#E5C7A3] text-[#111827] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Publish All Changes</span>
              </button>
            </div>
          </aside>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 1: WEBSITE CONTENT                               */}
            {/* ──────────────────────────────────────────────────── */}
            {activeTab === "content" && (
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111827] text-[#DDB78A] text-xs font-bold hover:bg-[#1F2937] transition-all cursor-pointer shadow-sm"
                    >
                      {savingSection === "hero" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Save Section</span>
                    </button>
                  </div>

                  {/* Photo Dropzone */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#111827] border border-[#D1D5DB] shrink-0">
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
                        <p className="text-[0.68rem] text-[#6B7280]">Full HD / 4K Landscape Photo (Max 15MB)</p>
                      </div>
                    </div>

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D1D5DB] hover:border-[#111827] text-xs font-bold text-[#111827] transition-all shadow-sm cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-[#B8860B]" />
                      <span>{uploadingSlot === "heroBg" ? "Uploading..." : "Replace Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUpload("heroBg", f);
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Gold Eyebrow Tagline
                      </label>
                      <input
                        type="text"
                        value={hero.eyebrow || ""}
                        onChange={(e) => updateSection("hero", "eyebrow", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm font-semibold text-[#111827] focus:border-[#B8860B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Main Hero Headline (One line per row)
                      </label>
                      <textarea
                        rows={2}
                        value={Array.isArray(hero.headingLines) ? hero.headingLines.join("\n") : hero.headingLines || ""}
                        onChange={(e) => updateSection("hero", "headingLines", e.target.value.split("\n"))}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-base font-bold text-[#111827] focus:border-[#B8860B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Subtitle Description
                      </label>
                      <input
                        type="text"
                        value={hero.subtitle || ""}
                        onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#111827] focus:border-[#B8860B] focus:outline-none"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111827] text-[#DDB78A] text-xs font-bold hover:bg-[#1F2937] transition-all cursor-pointer shadow-sm"
                    >
                      {savingSection === "about" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Save Section</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#111827] border border-[#D1D5DB] shrink-0">
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

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D1D5DB] hover:border-[#111827] text-xs font-bold text-[#111827] transition-all shadow-sm cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-[#B8860B]" />
                      <span>{uploadingSlot === "aboutInterior" ? "Uploading..." : "Replace Portrait"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUpload("aboutInterior", f);
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Story Headline
                      </label>
                      <input
                        type="text"
                        value={about.heading || ""}
                        onChange={(e) => updateSection("about", "heading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm font-bold text-[#111827] focus:border-[#B8860B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                        Story Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(about.paragraphs) ? about.paragraphs[0] || "" : about.paragraphs || ""}
                        onChange={(e) => updateSection("about", "paragraphs.0", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#111827] focus:border-[#B8860B] focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* 3 Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {(about.stats || [{}, {}, {}]).map((stat: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                          <label className="block text-[0.65rem] uppercase font-bold text-[#6B7280] mb-1">
                            Stat #{idx + 1}
                          </label>
                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) => updateSection("about", `stats.${idx}.value`, e.target.value)}
                            className="w-full rounded-lg bg-white border border-[#D1D5DB] px-3 py-1 text-sm font-extrabold text-[#111827] mb-1.5 focus:border-[#B8860B] focus:outline-none"
                            placeholder="15+"
                          />
                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) => updateSection("about", `stats.${idx}.label`, e.target.value)}
                            className="w-full rounded-lg bg-white border border-[#D1D5DB] px-3 py-1 text-xs text-[#4B5563] focus:border-[#B8860B] focus:outline-none"
                            placeholder="Years Experience"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. PHILOSOPHY & IMPACT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                      <h3 className="text-base font-bold text-[#111827]">Philosophy Quote</h3>
                      <button
                        type="button"
                        onClick={() => handleSaveSection("philosophy", "Philosophy Quote")}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-[#111827] text-[#DDB78A]"
                      >
                        Save
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Quote Statement</label>
                      <input
                        type="text"
                        value={philosophy.heading || ""}
                        onChange={(e) => updateSection("philosophy", "heading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm font-semibold text-[#111827]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Subheading</label>
                      <input
                        type="text"
                        value={philosophy.subheading || ""}
                        onChange={(e) => updateSection("philosophy", "subheading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-xs text-[#4B5563]"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                      <h3 className="text-base font-bold text-[#111827]">Impact Banner</h3>
                      <button
                        type="button"
                        onClick={() => handleSaveSection("impactBanner", "Impact Banner")}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-[#111827] text-[#DDB78A]"
                      >
                        Save
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Headline</label>
                      <input
                        type="text"
                        value={impact.heading || ""}
                        onChange={(e) => updateSection("impactBanner", "heading", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm font-semibold text-[#111827]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Paragraph</label>
                      <input
                        type="text"
                        value={impact.paragraph || ""}
                        onChange={(e) => updateSection("impactBanner", "paragraph", e.target.value)}
                        className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-xs text-[#4B5563]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 2: PORTFOLIO GRID                                */}
            {/* ──────────────────────────────────────────────────── */}
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Portfolio Experiences</h2>
                    <p className="text-xs text-[#6B7280]">Manage exhibitions, luxury activations, and featured experiences</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(null);
                      setIsProjectModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2.5 text-xs font-bold text-[#DDB78A] hover:bg-[#1F2937] transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((proj, idx) => {
                    const pId = proj._id || proj.id || `p-${idx}`;
                    return (
                      <div
                        key={pId}
                        className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/3] bg-[#111827]">
                          {proj.imageUrl ? (
                            <Image src={proj.imageUrl} alt={proj.title} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#DDB78A]">
                              {proj.imageKey}
                            </div>
                          )}
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-[0.62rem] font-bold uppercase tracking-wider text-[#111827] shadow-sm">
                            {proj.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleHome(pId, !!proj.featuredOnHome)}
                            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/95 text-[#111827] hover:text-[#B8860B] transition-colors shadow-sm cursor-pointer"
                            title={proj.featuredOnHome ? "Shown on Homepage" : "Hidden from Homepage"}
                          >
                            {proj.featuredOnHome ? (
                              <Eye className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-[#9CA3AF]" />
                            )}
                          </button>
                        </div>

                        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-[#111827]">{proj.title}</h3>
                            <p className="text-xs text-[#6B7280]">{proj.subtitle}</p>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProject(proj);
                                setIsProjectModalOpen(true);
                              }}
                              className="text-xs font-bold text-[#B8860B] hover:underline cursor-pointer"
                            >
                              Edit Details
                            </button>
                            {proj._id && (
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj._id, proj.title)}
                                className="text-[#9CA3AF] hover:text-rose-600 p-1 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 3: CLIENT INQUIRIES                              */}
            {/* ──────────────────────────────────────────────────── */}
            {activeTab === "inbox" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Client Messages</h2>
                    <p className="text-xs text-[#6B7280]">Direct inquiries received from website visitors</p>
                  </div>
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => setInboxFilter("all")}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        inboxFilter === "all" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
                      }`}
                    >
                      All ({messages.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setInboxFilter("unread")}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        inboxFilter === "unread" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>
                </div>

                {messages.length === 0 ? (
                  <div className="p-16 rounded-2xl bg-white border border-[#E5E7EB] text-center space-y-2">
                    <MessageSquare className="h-8 w-8 mx-auto text-[#9CA3AF]" />
                    <p className="text-sm font-bold text-[#111827]">No Messages Yet</p>
                    <p className="text-xs text-[#6B7280]">When clients contact you, their messages will appear here.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                    {/* Left Message List */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] divide-y divide-[#E5E7EB] overflow-y-auto max-h-[560px]">
                      {messages
                        .filter((m) => (inboxFilter === "unread" ? m.status === "unread" : true))
                        .map((m) => {
                          const isSelected = selectedMessage?._id === m._id;
                          return (
                            <div
                              key={m._id}
                              onClick={() => {
                                setSelectedMessage(m);
                                if (m.status === "unread") handleToggleRead(m._id, "unread");
                              }}
                              className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-[#DDB78A]/15"
                                  : m.status === "unread"
                                  ? "bg-amber-50/70 hover:bg-amber-50"
                                  : "hover:bg-[#F9FAFB]"
                              }`}
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-[#DDB78A] text-xs font-bold">
                                {m.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-[#111827] truncate">{m.name}</h4>
                                  <span className="text-[0.62rem] text-[#9CA3AF]">
                                    {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                                <p className="text-[0.68rem] text-[#B8860B] font-semibold truncate mt-0.5">
                                  {m.company || m.email}
                                </p>
                                <p className="text-[0.68rem] text-[#6B7280] truncate mt-1">
                                  {m.message}
                                </p>
                              </div>
                              {m.status === "unread" && (
                                <span className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0 animate-pulse" />
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Right Detail Pane */}
                    <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#FAFAFA]">
                      {selectedMessage ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                            <div>
                              <h3 className="text-base font-bold text-[#111827]">{selectedMessage.name}</h3>
                              <p className="text-xs text-[#B8860B] font-semibold mt-0.5">
                                {selectedMessage.email} {selectedMessage.phone && `• ${selectedMessage.phone}`}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(selectedMessage._id)}
                              className="text-[#9CA3AF] hover:text-rose-600 p-2 rounded-lg cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                            <span className="text-[0.62rem] uppercase font-bold text-[#9CA3AF]">Message Body</span>
                            <p className="text-sm text-[#111827] whitespace-pre-wrap leading-relaxed">
                              {selectedMessage.message}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4">
                            <a
                              href={`mailto:${selectedMessage.email}?subject=Re:%20MKAN%20Concept%20Inquiry`}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#1F2937]"
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span>Reply via Email</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleToggleRead(selectedMessage._id, selectedMessage.status)}
                              className="text-xs font-semibold text-[#4B5563] hover:text-[#111827] px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer"
                            >
                              {selectedMessage.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#9CA3AF]">
                          Select a message to view the inquiry.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 4: STUDIO SETTINGS & PROFILE                     */}
            {/* ──────────────────────────────────────────────────── */}
            {activeTab === "settings" && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-6">
                <div className="border-b border-[#F3F4F6] pb-4">
                  <h2 className="text-lg font-bold text-[#111827]">Studio Contact & Info</h2>
                  <p className="text-xs text-[#6B7280]">Official numbers, email, Instagram handle, and studio location</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Studio Name</label>
                    <input
                      type="text"
                      value={siteData.name || ""}
                      onChange={(e) => setSiteData({ ...siteData, name: e.target.value })}
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={siteData.tagline || ""}
                      onChange={(e) => setSiteData({ ...siteData, tagline: e.target.value })}
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Official Phone</label>
                    <input
                      type="text"
                      value={siteData.contact?.phone || ""}
                      onChange={(e) =>
                        setSiteData({
                          ...siteData,
                          contact: {
                            ...siteData.contact,
                            phone: e.target.value,
                            phoneHref: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                          },
                        })
                      }
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                      placeholder="+971 50 222 5890"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Official Email</label>
                    <input
                      type="email"
                      value={siteData.contact?.email || ""}
                      onChange={(e) =>
                        setSiteData({
                          ...siteData,
                          contact: {
                            ...siteData.contact,
                            email: e.target.value,
                            emailHref: `mailto:${e.target.value.trim()}`,
                          },
                        })
                      }
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                      placeholder="mkanconcept@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Instagram Handle</label>
                    <input
                      type="text"
                      value={siteData.contact?.instagramHandle || ""}
                      onChange={(e) =>
                        setSiteData({
                          ...siteData,
                          contact: { ...siteData.contact, instagramHandle: e.target.value },
                        })
                      }
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                      placeholder="@mkan.concept"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Instagram Link</label>
                    <input
                      type="text"
                      value={siteData.contact?.instagramUrl || ""}
                      onChange={(e) =>
                        setSiteData({
                          ...siteData,
                          contact: { ...siteData.contact, instagramUrl: e.target.value },
                        })
                      }
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                      placeholder="https://instagram.com/mkan.concept"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Physical Location</label>
                    <input
                      type="text"
                      value={siteData.contact?.location || ""}
                      onChange={(e) =>
                        setSiteData({
                          ...siteData,
                          contact: { ...siteData.contact, location: e.target.value },
                        })
                      }
                      className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                      placeholder="Wasl 51, Dubai, UAE"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="px-5 py-2.5 rounded-xl bg-[#111827] text-[#DDB78A] text-xs font-bold hover:bg-[#1F2937] transition-all cursor-pointer"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. Floating Toast Alert                                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-[#111827] text-white border-white/15"
              : "bg-rose-900 text-white border-rose-700"
          }`}>
            <span className="text-xs font-bold">{toast.text}</span>
            <button type="button" onClick={() => setToast(null)} className="text-white/60 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. Portfolio Experience Modal                                */}
      {/* ──────────────────────────────────────────────────────────── */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
              <h3 className="text-base font-bold text-[#111827]">
                {activeProject ? "Edit Experience" : "Add Experience"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setActiveProject(null);
                }}
                className="text-[#9CA3AF] hover:text-[#111827] p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {activeProject?._id && <input type="hidden" name="id" value={activeProject._id} />}

              <div>
                <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={activeProject?.title || ""}
                  placeholder="e.g. RAMADAN FAIR 2026"
                  className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Subtitle *</label>
                <input
                  type="text"
                  name="subtitle"
                  required
                  defaultValue={activeProject?.subtitle || ""}
                  placeholder="e.g. Flagship Exhibition Platform"
                  className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-sm text-[#111827]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Category *</label>
                  <select
                    name="category"
                    required
                    defaultValue={activeProject?.category || "events"}
                    className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3 py-2 text-sm text-[#111827]"
                  >
                    <option value="events">Events</option>
                    <option value="exhibitions">Exhibitions</option>
                    <option value="workshops">Workshops</option>
                    <option value="activations">Activations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Slot Key</label>
                  <select
                    name="imageKey"
                    defaultValue={activeProject?.imageKey || "ramadanFair"}
                    className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3 py-2 text-xs font-mono text-[#111827]"
                  >
                    <option value="ramadanFair">experiences.ramadanFair</option>
                    <option value="corporateEvents">experiences.corporateEvents</option>
                    <option value="luxuryActivation">experiences.luxuryActivation</option>
                    <option value="privateEngagement">experiences.privateEngagement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#374151] mb-1">Custom Photo URL (Optional)</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={activeProject?.imageUrl || ""}
                  placeholder="/uploads/... or https://..."
                  className="w-full rounded-xl bg-white border border-[#D1D5DB] px-3.5 py-2 text-xs font-mono text-[#111827]"
                />
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <input
                  type="checkbox"
                  id="featuredOnHome"
                  name="featuredOnHome"
                  value="true"
                  defaultChecked={activeProject ? !!activeProject.featuredOnHome : true}
                  className="w-4 h-4 rounded text-[#111827] focus:ring-[#DDB78A]"
                />
                <label htmlFor="featuredOnHome" className="text-xs text-[#111827] font-semibold cursor-pointer">
                  Feature on public homepage
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  onClick={() => {
                    setIsProjectModalOpen(false);
                    setActiveProject(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProjectSaving}
                  className="px-5 py-2 rounded-lg bg-[#111827] text-[#DDB78A] text-xs font-bold hover:bg-[#1F2937] cursor-pointer"
                >
                  {isProjectSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
