"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdmin, logoutAdmin } from "@/lib/auth";
import { getClientIdentity } from "@/lib/rate-limit";

export interface AuthState {
  success: boolean;
  error?: string;
}

export async function loginAdminAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const emailField = formData.get("email");
  const passwordField = formData.get("password");
  const email = typeof emailField === "string" ? emailField.trim() : "";
  const password = typeof passwordField === "string" ? passwordField : "";

  if (!email || !password || email.length > 254 || Buffer.byteLength(password, "utf8") > 72) {
    return { success: false, error: "Invalid email or password." };
  }

  const reqHeaders = await headers();
  const ipAddress = getClientIdentity(reqHeaders);
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
