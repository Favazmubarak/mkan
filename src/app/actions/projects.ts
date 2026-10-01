"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/lib/models/Project";

export interface ProjectActionResponse {
  success: boolean;
  message: string;
}

export async function upsertProjectAction(
  formData: FormData
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const id = (formData.get("id") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const subtitle = (formData.get("subtitle") as string)?.trim();
    const category = (formData.get("category") as string)?.trim() as any;
    const categoryLabel = (formData.get("categoryLabel") as string)?.trim() || subtitle;
    const imageKey = (formData.get("imageKey") as string)?.trim() || "ramadanFair";
    const imageUrl = (formData.get("imageUrl") as string)?.trim() || "/images/hero-bg.jpg";
    const altText = (formData.get("altText") as string)?.trim() || title;
    const description = (formData.get("description") as string)?.trim() || "";
    const featuredOnHome = formData.get("featuredOnHome") === "true" || formData.get("featuredOnHome") === "on";

    if (!title || !subtitle || !category) {
      return { success: false, message: "Title, Subtitle, and Category are required." };
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (id) {
      // Update
      await Project.findByIdAndUpdate(id, {
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
      });
    } else {
      // Create new
      const count = await Project.countDocuments({});
      await Project.create({
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
        sortOrder: count,
        locale: "en",
      });
    }

    revalidatePath("/");
    return { success: true, message: "Project saved successfully." };
  } catch (error: any) {
    console.error("[Upsert Project Error]", error);
    return { success: false, message: error.message || "Failed to save project." };
  }
}

export async function deleteProjectAction(
  projectId: string
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    await Project.findByIdAndDelete(projectId);
    revalidatePath("/");

    return { success: true, message: "Project deleted successfully." };
  } catch (error: any) {
    console.error("[Delete Project Error]", error);
    return { success: false, message: error.message || "Failed to delete project." };
  }
}

export async function toggleProjectHomeAction(
  projectId: string,
  featured: boolean
): Promise<ProjectActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    await Project.findByIdAndUpdate(projectId, { featuredOnHome: featured });
    revalidatePath("/");

    return {
      success: true,
      message: `Project ${featured ? "added to" : "removed from"} Home Page showcase.`,
    };
  } catch (error: any) {
    console.error("[Toggle Project Error]", error);
    return { success: false, message: error.message || "Failed to update project." };
  }
}
