"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { ContactMessage } from "@/lib/models/ContactMessage";

export interface MessageActionResponse {
  success: boolean;
  message: string;
}

export async function toggleMessageReadAction(
  messageId: string,
  status: "read" | "unread"
): Promise<MessageActionResponse> {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(messageId) || !["read", "unread"].includes(status)) {
      return { success: false, message: "Invalid inquiry status update." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Inquiry storage is temporarily unavailable." };

    const updated = await ContactMessage.findByIdAndUpdate(messageId, { status });
    if (!updated) return { success: false, message: "Inquiry was not found." };
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Message marked as ${status}.`,
    };
  } catch (error: unknown) {
    console.error("[Message Status Error]", error);
    return { success: false, message: "Failed to update inquiry status." };
  }
}

export async function setMessageRepliedAction(
  messageId: string,
  replied: boolean
): Promise<MessageActionResponse> {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(messageId) || typeof replied !== "boolean") {
      return { success: false, message: "Invalid inquiry reply status update." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Inquiry storage is temporarily unavailable." };

    const updated = await ContactMessage.findByIdAndUpdate(
      messageId,
      replied ? { replied, status: "read" } : { replied }
    );
    if (!updated) return { success: false, message: "Inquiry was not found." };
    revalidatePath("/admin");

    return {
      success: true,
      message: replied ? "Inquiry marked as replied." : "Replied status removed.",
    };
  } catch (error: unknown) {
    console.error("[Message Reply Status Error]", error);
    return { success: false, message: "Failed to update inquiry reply status." };
  }
}

export async function deleteMessageAction(
  messageId: string
): Promise<MessageActionResponse> {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(messageId)) {
      return { success: false, message: "Invalid inquiry identifier." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Inquiry storage is temporarily unavailable." };

    const deleted = await ContactMessage.findByIdAndDelete(messageId);
    if (!deleted) return { success: false, message: "Inquiry was not found." };
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Message deleted successfully.",
    };
  } catch (error: unknown) {
    console.error("[Message Delete Error]", error);
    return { success: false, message: "Failed to delete inquiry." };
  }
}

export async function exportMessagesCsvAction(): Promise<{
  success: boolean;
  csv?: string;
  filename?: string;
  message?: string;
}> {
  try {
    await requireAdmin();
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Inquiry storage is temporarily unavailable." };

    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(5000).lean();

    if (!messages || messages.length === 0) {
      return { success: false, message: "No inquiries to export." };
    }

    const headers = ["Date", "Name", "Email", "Company", "Phone", "Status", "Replied", "Message"];
    const rows = messages.map((m) => [
      `"${new Date(m.createdAt).toISOString()}"`,
      `"${(m.name || "").replace(/"/g, '""')}"`,
      `"${(m.email || "").replace(/"/g, '""')}"`,
      `"${(m.company || "").replace(/"/g, '""')}"`,
      `"${(m.phone || "").replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${m.replied ? "Yes" : "No"}"`,
      `"${(m.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const filename = `mkan-inquiries-${new Date().toISOString().split("T")[0]}.csv`;

    return {
      success: true,
      csv: csvContent,
      filename,
    };
  } catch (error: unknown) {
    console.error("[Export CSV Error]", error);
    return { success: false, message: "Failed to export inquiries." };
  }
}
