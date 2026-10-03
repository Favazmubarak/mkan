"use client";

import { useState } from "react";
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
import { prepareImageUpload } from "@/lib/prepare-image-upload";
import {
  toggleMessageReadAction,
  setMessageRepliedAction,
  deleteMessageAction,
} from "@/app/actions/messages";
import { logoutAdminAction } from "@/app/actions/auth";
import { homeContent } from "@/content/home";
import { ProjectEditorDialog } from "./ProjectEditorDialog";
import { PortfolioProjectCard } from "./PortfolioProjectCard";
import { ClientInquiriesPanel } from "./ClientInquiriesPanel";
import { StudioProfilePanel } from "./StudioProfilePanel";
import { WebsiteContentPanel } from "./WebsiteContentPanel";
import type { Editable, StudioMessage, StudioProject, StudioSection, StudioSite } from "./studio-types";
import {
  Layers,
  Grid,
  MessageSquare,
  Settings,
  Plus,
  Loader2,
  X,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Props Interface                                                   */
/* ------------------------------------------------------------------ */
interface StudioProps {
  initialSections: Record<string, StudioSection>;
  initialProjects: StudioProject[];
  initialMessages: StudioMessage[];
  initialSite: StudioSite;
}

export function InstagramStudioClient({
  initialSections,
  initialProjects,
  initialMessages,
  initialSite,
}: StudioProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<"content" | "portfolio" | "inbox" | "settings">("content");

  // Data State
  const [sections, setSections] = useState(initialSections);
  const [projects, setProjects] = useState(initialProjects);
  const [messages, setMessages] = useState(initialMessages);
  const [siteData, setSiteData] = useState(initialSite);
  const [selectedMessage, setSelectedMessage] = useState<StudioMessage | null>(initialMessages[0] || null);
  const [inboxFilter, setInboxFilter] = useState<"all" | "unread" | "replied">("all");

  // Action States
  const [isPublishing, setIsPublishing] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadedPreviews, setUploadedPreviews] = useState<Record<string, string>>({});
  const [activeProject, setActiveProject] = useState<StudioProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isProjectSaving, setIsProjectSaving] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* ------------------------------------------------------------------ */
  /*  Field Change Helper                                               */
  /* ------------------------------------------------------------------ */
  const updateSection = (sectionKey: string, field: string, value: unknown) => {
    setSections((prev) => {
      const copy = structuredClone(prev);
      if (!copy[sectionKey]) copy[sectionKey] = { draftData: {}, status: "draft" };
      if (!copy[sectionKey].draftData) copy[sectionKey].draftData = {};

      const keys = field.split(".");
      let target: Record<string, unknown> = copy[sectionKey].draftData;
      for (let i = 0; i < keys.length - 1; i++) {
        const child = target[keys[i]];
        if (!child || typeof child !== "object" || Array.isArray(child)) target[keys[i]] = {};
        target = target[keys[i]] as Record<string, unknown>;
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
      const draftResult = await saveSectionDraftAction(sectionKey, data);
      if (!draftResult.success) {
        showToast(draftResult.message || "Failed to save section draft.", "error");
        return;
      }
      const res = await publishSectionAction(sectionKey);
      if (res.success) {
        showToast(`${label} saved & published live.`);
      } else {
        showToast(res.message || "Failed to update section.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Action failed.", "error");
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
          const draftResult = await saveSectionDraftAction(key, sections[key].draftData);
          if (!draftResult.success) {
            showToast(draftResult.message || `Failed to save ${key}.`, "error");
            return;
          }
        }
      }
      if (siteData) {
        const siteDraftResult = await saveSectionDraftAction("site", siteData);
        if (!siteDraftResult.success) {
          showToast(siteDraftResult.message || "Failed to save studio profile.", "error");
          return;
        }
      }
      const res = await publishAllSectionsAction();
      if (res.success) {
        showToast("✨ All changes are now live on the public website!");
      } else {
        showToast(res.message || "Failed to publish.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Publishing failed.", "error");
    } finally {
      setIsPublishing(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Photo Upload Handler                                               */
  /* ------------------------------------------------------------------ */
  const handleUpload = async (slotKey: string, file: File) => {
    setUploadingSlot(slotKey);
    const previousUrl = uploadedPreviews[slotKey];
    let previewUrl: string | null = null;

    try {
      const uploadFile = await prepareImageUpload(file);
      const currentPreviewUrl = URL.createObjectURL(uploadFile);
      previewUrl = currentPreviewUrl;
      setUploadedPreviews((prev) => ({ ...prev, [slotKey]: currentPreviewUrl }));

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("slotKey", slotKey);
      formData.append("altText", "MKAN Luxury Visual");

      const res = await uploadMediaAction(formData);
      if (res.success) {
        if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
        const imageUrl = res.asset?.url;
        if (previewUrl && imageUrl) {
          URL.revokeObjectURL(previewUrl);
          setUploadedPreviews((prev) => ({ ...prev, [slotKey]: imageUrl }));
        }
        showToast(uploadFile !== file ? "Photo compressed and uploaded." : "Photo uploaded & optimized.");
      } else {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setUploadedPreviews((prev) => {
          if (previousUrl) return { ...prev, [slotKey]: previousUrl };
          const next = { ...prev };
          delete next[slotKey];
          return next;
        });
        showToast(res.message || "Upload failed.", "error");
      }
    } catch (error) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setUploadedPreviews((prev) => {
        if (previousUrl) return { ...prev, [slotKey]: previousUrl };
        const next = { ...prev };
        delete next[slotKey];
        return next;
      });
      showToast(error instanceof Error ? error.message : "Image upload failed.", "error");
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
    setProjectError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await upsertProjectAction(formData);
      if (res.success) {
        showToast("Project saved.");
        setIsProjectModalOpen(false);
        setActiveProject(null);
        window.location.reload();
      } else {
        setProjectError(res.message || "Save failed.");
      }
    } catch {
      setProjectError("Could not save project. Please try again.");
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
      } else {
        showToast(res.message || "Delete failed.", "error");
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
      } else {
        showToast(res.message || "Could not update homepage visibility.", "error");
      }
    } catch {
      showToast("Could not update homepage visibility.", "error");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Messages                                                          */
  /* ------------------------------------------------------------------ */
  const handleToggleRead = async (id: string, status: string) => {
    const next = status === "unread" ? "read" : "unread";
    try {
      const result = await toggleMessageReadAction(id, next);
      if (!result.success) {
        showToast(result.message || "Could not update inquiry status.", "error");
        return;
      }
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: next } : m))
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage((prev) => prev ? { ...prev, status: next } : prev);
      }
    } catch {
      showToast("Could not update inquiry status.", "error");
    }
  };

  const handleToggleReplied = async (id: string, replied: boolean) => {
    try {
      const result = await setMessageRepliedAction(id, !replied);
      if (!result.success) {
        showToast(result.message || "Could not update reply status.", "error");
        return;
      }
      setMessages((prev) => prev.map((message) => message._id === id
        ? { ...message, replied: !replied, status: replied ? message.status : "read" }
        : message));
      setSelectedMessage((prev) => prev?._id === id
        ? { ...prev, replied: !replied, status: replied ? prev.status : "read" }
        : prev);
      showToast(replied ? "Reply status removed." : "Inquiry marked as replied.");
    } catch {
      showToast("Could not update reply status.", "error");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const result = await deleteMessageAction(id);
      if (!result.success) {
        showToast(result.message || "Could not delete inquiry.", "error");
        return;
      }
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setSelectedMessage(null);
      showToast("Message deleted.");
    } catch {
      showToast("Could not delete inquiry.", "error");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Save Studio Profile                                               */
  /* ------------------------------------------------------------------ */
  const handleSaveProfile = async () => {
    try {
      const draftResult = await saveSectionDraftAction("site", siteData);
      if (!draftResult.success) {
        showToast(draftResult.message || "Failed to save studio profile.", "error");
        return;
      }
      const publishResult = await publishSectionAction("site");
      if (!publishResult.success) {
        showToast(publishResult.message || "Failed to publish studio profile.", "error");
        return;
      }
      showToast("Studio profile updated & published live.");
    } catch {
      showToast("Failed to update profile.", "error");
    }
  };

  // Section data is edited in the CMS, so widen seed literals while preserving each section's shape.
  const sectionData = <Key extends keyof typeof homeContent>(key: Key): Editable<(typeof homeContent)[Key]> =>
    (sections[key]?.draftData ?? sections[key]?.data ?? homeContent[key]) as Editable<(typeof homeContent)[Key]>;
  const hero = sectionData("hero");
  const about = sectionData("about");
  const impact = sectionData("impactBanner");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans selection:bg-[#DDB78A] selection:text-[#111827] pb-24">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. Header Bar                                                */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-6 lg:px-10 py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Text-only brand lockup */}
          <div className="flex items-center gap-3">
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
              className="inline-flex items-center gap-2 rounded-xl bg-[#1A060E] px-5 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
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
              {([
                { id: "content", label: "Website Content", icon: Layers, desc: "Hero, Story, Services" },
                { id: "portfolio", label: "Portfolio Grid", icon: Grid, desc: "Experience showcases" },
                { id: "inbox", label: "Client Inquiries", icon: MessageSquare, badge: unreadCount, desc: "Direct client inquiries" },
                { id: "settings", label: "Studio Profile", icon: Settings, desc: "Contact & address" },
              ] as const).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={isActive}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1A060E] text-white shadow-sm"
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
                    {"badge" in tab && tab.badge > 0 ? (
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
                className="w-full py-2.5 rounded-xl bg-[#1A060E] hover:bg-[#2A0A17] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
            <WebsiteContentPanel
              active={activeTab === "content"}
              hero={hero}
              about={about}
              impact={impact}
              savingSection={savingSection}
              uploadingSlot={uploadingSlot}
              uploadedPreviews={uploadedPreviews}
              updateSection={updateSection}
              handleSaveSection={handleSaveSection}
              handleUpload={handleUpload}
            />

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
                      setProjectError(null);
                      setIsProjectModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1A060E] px-4 py-2.5 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <PortfolioProjectCard
                      key={project._id || project.id || `project-${index}`}
                      project={project}
                      fallbackId={`project-${index}`}
                      onToggleHome={handleToggleHome}
                      onEdit={(selectedProject) => {
                        setActiveProject(selectedProject);
                        setProjectError(null);
                        setIsProjectModalOpen(true);
                      }}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 3: CLIENT INQUIRIES                              */}
            {/* ──────────────────────────────────────────────────── */}
            <ClientInquiriesPanel
              active={activeTab === "inbox"}
              messages={messages}
              selectedMessage={selectedMessage}
              filter={inboxFilter}
              unreadCount={unreadCount}
              onFilterChange={setInboxFilter}
              onSelectMessage={setSelectedMessage}
              onToggleRead={handleToggleRead}
              onToggleReplied={handleToggleReplied}
              onDeleteMessage={handleDeleteMessage}
            />

            {/* ──────────────────────────────────────────────────── */}
            {/* TAB 4: STUDIO SETTINGS & PROFILE                     */}
            {/* ──────────────────────────────────────────────────── */}
            <StudioProfilePanel
              active={activeTab === "settings"}
              site={siteData}
              setSite={setSiteData}
              onSave={handleSaveProfile}
            />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. Floating Toast Alert                                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200" role={toast.type === "error" ? "alert" : "status"} aria-live={toast.type === "error" ? "assertive" : "polite"}>
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-[#1A060E] text-white border-white/15"
              : "bg-rose-900 text-white border-rose-700"
          }`}>
            <span className="text-xs font-bold">{toast.text}</span>
            <button type="button" onClick={() => setToast(null)} className="text-white/60 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {isProjectModalOpen && (
        <ProjectEditorDialog
          project={activeProject}
          saving={isProjectSaving}
          errorMessage={projectError || undefined}
          onClose={() => {
            if (isProjectSaving) return;
            setIsProjectModalOpen(false);
            setActiveProject(null);
            setProjectError(null);
          }}
          onSubmit={handleSaveProject}
        />
      )}
    </div>
  );
}
