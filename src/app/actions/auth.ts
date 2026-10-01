"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdmin, logoutAdmin } from "@/lib/auth";

export interface AuthState {
  success: boolean;
  error?: string;
}

export async function loginAdminAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const reqHeaders = await headers();
  const ipAddress =
    reqHeaders.get("x-forwarded-for") || reqHeaders.get("x-real-ip") || "";
  const userAgent = reqHeaders.get("user-agent") || "";

  const result = await authenticateAdmin(email, password, ipAddress, userAgent);

  if (!result.success) {
    return { success: false, error: result.error || "Authentication failed." };
  }

  // Redirect to admin dashboard on success
  redirect("/admin");
}

export async function logoutAdminAction(): Promise<void> {
  await logoutAdmin();
  redirect("/admin/login");
}
