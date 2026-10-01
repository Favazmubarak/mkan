"use server";

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
    await connectToDatabase();

    await ContactMessage.findByIdAndUpdate(messageId, { status });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Message marked as ${status}.`,
    };
  } catch (error: any) {
    console.error("[Message Status Error]", error);
    return {
      success: false,
      message: error.message || "Failed to update message status.",
    };
  }
}

export async function deleteMessageAction(
  messageId: string
): Promise<MessageActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    await ContactMessage.findByIdAndDelete(messageId);
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Message deleted successfully.",
    };
  } catch (error: any) {
    console.error("[Message Delete Error]", error);
    return {
      success: false,
      message: error.message || "Failed to delete message.",
    };
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
    await connectToDatabase();

    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();

    if (!messages || messages.length === 0) {
      return { success: false, message: "No inquiries to export." };
    }

    const headers = ["Date", "Name", "Email", "Company", "Phone", "Status", "Message"];
    const rows = messages.map((m) => [
      `"${new Date(m.createdAt).toISOString()}"`,
      `"${(m.name || "").replace(/"/g, '""')}"`,
      `"${(m.email || "").replace(/"/g, '""')}"`,
      `"${(m.company || "").replace(/"/g, '""')}"`,
      `"${(m.phone || "").replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${(m.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const filename = `mkan-inquiries-${new Date().toISOString().split("T")[0]}.csv`;

    return {
      success: true,
      csv: csvContent,
      filename,
    };
  } catch (error: any) {
    console.error("[Export CSV Error]", error);
    return {
      success: false,
      message: error.message || "Failed to export inquiries.",
    };
  }
}
