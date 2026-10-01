"use client";

import Image from "next/image";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import type { StudioProject } from "./studio-types";

interface PortfolioProjectCardProps {
  project: StudioProject;
  fallbackId: string;
  onToggleHome: (id: string, current: boolean) => void;
  onEdit: (project: StudioProject) => void;
  onDelete: (id: string, title: string) => void;
}

export function PortfolioProjectCard({
  project,
  fallbackId,
  onToggleHome,
  onEdit,
  onDelete,
}: PortfolioProjectCardProps) {
  const projectId = project._id || project.id || fallbackId;
  const databaseProjectId = project._id;

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[#111827]">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.altText || project.title} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-[#DDB78A]">
            {project.imageKey || "Default project image"}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-[#111827] shadow-sm">
          {project.category}
        </span>
        <button
          type="button"
          onClick={() => onToggleHome(projectId, project.featuredOnHome)}
          className="absolute right-3 top-3 rounded-md bg-white/95 p-2 text-[#111827] shadow-sm transition-colors hover:text-[#B8860B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          aria-label={project.featuredOnHome ? `Remove ${project.title} from homepage` : `Feature ${project.title} on homepage`}
          aria-pressed={project.featuredOnHome}
        >
          {project.featuredOnHome ? (
            <Eye aria-hidden="true" className="h-4 w-4 text-emerald-600" />
          ) : (
            <EyeOff aria-hidden="true" className="h-4 w-4 text-[#9CA3AF]" />
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-2 p-4">
        <div>
          <h3 className="text-sm font-bold text-[#111827]">{project.title}</h3>
          <p className="text-xs text-[#6B7280]">{project.subtitle}</p>
        </div>
        <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded text-xs font-bold text-[#B8860B] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            Edit details
          </button>
          {databaseProjectId && (
            <button
              type="button"
              onClick={() => onDelete(databaseProjectId, project.title)}
              className="rounded p-1 text-[#9CA3AF] hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              aria-label={`Delete ${project.title}`}
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
