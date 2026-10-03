"use client";

import Image from "next/image";
import { Eye, EyeOff, Trash2, GripVertical, ChevronLeft, ChevronRight } from "lucide-react";
import type { StudioProject } from "./studio-types";

interface PortfolioProjectCardProps {
  project: StudioProject;
  index: number;
  total: number;
  fallbackId: string;
  isDragging?: boolean;
  onToggleHome: (id: string, current: boolean) => void;
  onEdit: (project: StudioProject) => void;
  onDelete: (id: string, title: string) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function PortfolioProjectCard({
  project,
  index,
  total,
  fallbackId,
  isDragging = false,
  onToggleHome,
  onEdit,
  onDelete,
  onMove,
  onDragStart,
  onDragOver,
  onDragEnd,
}: PortfolioProjectCardProps) {
  const projectId = project._id || project.id || fallbackId;
  const databaseProjectId = project._id;

  return (
    <article
      draggable
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDragEnd={onDragEnd}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
        isDragging
          ? "opacity-50 scale-95 border-[#B8860B] ring-2 ring-[#B8860B]/30 shadow-xl"
          : "border-[#E5E7EB] hover:shadow-md hover:border-[#D1D5DB]"
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] bg-[#1A060E] overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.altText || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-[#DDB78A]">
            {project.imageKey || "Default project image"}
          </div>
        )}

        {/* Drag handle & Order Badge (Instagram style) */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
          <span className="flex items-center gap-1 rounded-md bg-[#111827]/90 backdrop-blur-sm px-2 py-1 text-[0.68rem] font-black text-white shadow-md">
            <GripVertical className="h-3.5 w-3.5 text-[#DDB78A]" />
            <span>#{index + 1}</span>
          </span>

          <span className="rounded-md bg-white/95 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-[#111827] shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Visibility Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHome(projectId, project.featuredOnHome);
          }}
          className="absolute right-3 top-3 rounded-md bg-white/95 p-2 text-[#111827] shadow-sm transition-colors hover:text-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] cursor-pointer z-10"
          aria-label={
            project.featuredOnHome
              ? `Remove ${project.title} from homepage carousel`
              : `Feature ${project.title} in homepage carousel`
          }
          aria-pressed={project.featuredOnHome}
          title={
            project.featuredOnHome
              ? "Live on homepage carousel"
              : "Hidden from homepage carousel"
          }
        >
          {project.featuredOnHome ? (
            <Eye aria-hidden="true" className="h-4 w-4 text-emerald-600" />
          ) : (
            <EyeOff aria-hidden="true" className="h-4 w-4 text-[#9CA3AF]" />
          )}
        </button>
      </div>

      {/* Card Content & Action Bar */}
      <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
        <div>
          <h3 className="text-sm font-bold text-[#111827] line-clamp-1">{project.title}</h3>
          <p className="text-xs text-[#6B7280] line-clamp-1 mt-0.5">{project.subtitle}</p>
        </div>

        <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3">
          {/* Quick Position Reorder Controls (Accessible 1-click fallback) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={index === 0}
              onClick={(e) => {
                e.stopPropagation();
                onMove?.(index, index - 1);
              }}
              title="Move left in showcase order"
              className="p-1 rounded text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={index === total - 1}
              onClick={(e) => {
                e.stopPropagation();
                onMove?.(index, index + 1);
              }}
              title="Move right in showcase order"
              className="p-1 rounded text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="rounded px-2 py-1 text-xs font-bold text-[#B8860B] hover:bg-[#FDF8F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] cursor-pointer"
            >
              Edit & Photo
            </button>

            {databaseProjectId && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(databaseProjectId, project.title);
                }}
                className="rounded p-1 text-[#9CA3AF] hover:text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 cursor-pointer"
                aria-label={`Delete ${project.title}`}
                title="Delete project"
              >
                <Trash2 aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
