"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/lib/models/Project";

const PROJECT_CATEGORIES = ["events", "exhibitions", "workshops", "activations"] as const;
type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface ProjectActionResponse {
  success: boolean;
  message: string;
}

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedImageUrl(value: string): boolean {
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export async function upsertProjectAction(
  formData: FormData
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();

    const id = readText(formData, "id");
    const title = readText(formData, "title");
    const subtitle = readText(formData, "subtitle");
    const categoryValue = readText(formData, "category");
    const categoryLabel = readText(formData, "categoryLabel") || subtitle;
    const imageKey = readText(formData, "imageKey") || "ramadanFair";
    const imageUrl = readText(formData, "imageUrl") || "/images/hero-bg.jpg";
    const altText = readText(formData, "altText") || title;
    const description = readText(formData, "description");
    const featuredOnHome =
      formData.get("featuredOnHome") === "true" || formData.get("featuredOnHome") === "on";

    if (id && !mongoose.isValidObjectId(id)) {
      return { success: false, message: "Invalid project identifier." };
    }
    if (title.length < 2 || title.length > 120) {
      return { success: false, message: "Title must be between 2 and 120 characters." };
    }
    if (subtitle.length < 2 || subtitle.length > 180) {
      return { success: false, message: "Subtitle must be between 2 and 180 characters." };
    }
    if (!PROJECT_CATEGORIES.includes(categoryValue as ProjectCategory)) {
      return { success: false, message: "Choose a valid project category." };
    }
    if (categoryLabel.length > 180 || imageKey.length > 80 || altText.length > 300) {
      return { success: false, message: "Project labels or image details exceed the allowed length." };
    }
    if (description.length > 5000) {
      return { success: false, message: "Description must be 5,000 characters or fewer." };
    }
    if (imageUrl.length > 2048 || !isAllowedImageUrl(imageUrl)) {
      return { success: false, message: "Image URL must be a local path or a valid HTTPS URL." };
    }

    const category = categoryValue as ProjectCategory;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!slug) {
      return { success: false, message: "Title must contain at least one English letter or number." };
    }

    const db = await connectToDatabase();
    if (!db) {
      return { success: false, message: "Project storage is temporarily unavailable." };
    }

    const duplicateSlug = await Project.exists({
      slug,
      locale: "en",
      ...(id ? { _id: { $ne: new mongoose.Types.ObjectId(id) } } : {}),
    });
    if (duplicateSlug) {
      return { success: false, message: "A project with this title already exists." };
    }

    const projectData = {
      slug,
      title,
      subtitle,
      category,
      categoryLabel,
      imageKey,
      imageUrl,
      altText,
      description,
      featuredOnHome,
      updatedAt: new Date(),
    };

    if (id) {
      const updated = await Project.findByIdAndUpdate(id, projectData, { new: true });
      if (!updated) return { success: false, message: "Project was not found." };
    } else {
      const sortOrder = await Project.countDocuments({ locale: "en" });
      await Project.create({ ...projectData, sortOrder, locale: "en" });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Project saved successfully." };
  } catch (error) {
    console.error("[Upsert Project Error]", error);
    return { success: false, message: "Failed to save the project." };
  }
}

export async function deleteProjectAction(
  projectId: string
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(projectId)) {
      return { success: false, message: "Invalid project identifier." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Project storage is temporarily unavailable." };

    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) return { success: false, message: "Project was not found." };
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Project deleted successfully." };
  } catch (error) {
    console.error("[Delete Project Error]", error);
    return { success: false, message: "Failed to delete the project." };
  }
}

export async function toggleProjectHomeAction(
  projectId: string,
  featured: boolean
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(projectId) || typeof featured !== "boolean") {
      return { success: false, message: "Invalid homepage visibility update." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Project storage is temporarily unavailable." };

    const updated = await Project.findByIdAndUpdate(projectId, { featuredOnHome: featured });
    if (!updated) return { success: false, message: "Project was not found." };
    revalidatePath("/");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Project ${featured ? "added to" : "removed from"} Home Page showcase.`,
    };
  } catch (error) {
    console.error("[Toggle Project Error]", error);
    return { success: false, message: "Failed to update project visibility." };
  }
}

export async function reorderProjectsAction(
  orderedIds: string[]
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return { success: false, message: "Invalid project order list." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Project storage is temporarily unavailable." };

    const operations = orderedIds.map((id, index) => {
      if (mongoose.isValidObjectId(id)) {
        return Project.findByIdAndUpdate(id, { sortOrder: index });
      } else {
        // Fallback for slug-based items
        return Project.findOneAndUpdate({ slug: id, locale: "en" }, { sortOrder: index });
      }
    });

    await Promise.all(operations);
    revalidatePath("/");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Portfolio order updated successfully.",
    };
  } catch (error) {
    console.error("[Reorder Projects Error]", error);
    return { success: false, message: "Failed to update portfolio order." };
  }
}
