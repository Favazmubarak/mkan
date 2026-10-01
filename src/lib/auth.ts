import crypto from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { AdminUser, type IAdminUser } from "@/lib/models/AdminUser";
import { AdminSession } from "@/lib/models/AdminSession";

const SESSION_COOKIE_NAME = "mkan_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Hash raw session token using SHA-256 before database lookup/storage
 */
function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Authenticates admin credentials with brute-force lockout protection.
 * Returns generic error messages to prevent user enumeration.
 */
export async function authenticateAdmin(
  email: string,
  password: string,
  ipAddress: string = "",
  userAgent: string = ""
): Promise<{ success: boolean; error?: string; user?: IAdminUser }> {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return {
        success: false,
        error:
          "Database connection is not configured or unavailable. Please add your MONGODB_URI to .env.local and run `npm run seed`.",
      };
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    // Artificial delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, error: "Invalid credentials." };
  }

  // Check if account is locked
  if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
    const minutesLeft = Math.ceil((user.lockUntil.getTime() - Date.now()) / (60 * 1000));
    return {
      success: false,
      error: `Account is temporarily locked due to excessive failed attempts. Please try again in ${minutesLeft} minute(s).`,
    };
  }

  // Verify password with bcrypt
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    const attempts = (user.failedAttempts || 0) + 1;
    let lockUntil: Date | null = null;

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
    }

    await AdminUser.updateOne(
      { _id: user._id },
      {
        $set: {
          failedAttempts: attempts,
          lockUntil,
        },
      }
    );

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      return {
        success: false,
        error: "Account is temporarily locked for 15 minutes due to multiple failed login attempts.",
      };
    }

    return { success: false, error: "Invalid credentials." };
  }

  // Reset failed attempts on success
  await AdminUser.updateOne(
    { _id: user._id },
    {
      $set: {
        failedAttempts: 0,
        lockUntil: null,
      },
    }
  );

  // Generate cryptographically random 64-character raw session token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await AdminSession.create({
    userId: user._id,
    token: tokenHash,
    ipAddress,
    userAgent,
    expiresAt,
  });

  // Set secure HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });

  return { success: true, user };
  } catch (error: any) {
    console.error("[Authenticate Admin Error]", error);
    return {
      success: false,
      error:
        error.message && error.message.includes("timed out")
          ? "Database connection timed out. Please check your MongoDB Atlas IP whitelist (Network Access) and connection string."
          : error.message || "Authentication failed.",
    };
  }
}

/**
 * Validates active admin session.
 * Used INSIDE Server Actions and API routes for defense-in-depth protection.
 */
export async function getAuthenticatedAdmin(): Promise<{
  authenticated: boolean;
  user?: IAdminUser;
}> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return { authenticated: false };
    }

    const tokenHash = hashToken(sessionCookie.value);
    await connectToDatabase();

    const session = await AdminSession.findOne({
      token: tokenHash,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!session || !session.userId) {
      return { authenticated: false };
    }

    return {
      authenticated: true,
      user: session.userId as unknown as IAdminUser,
    };
  } catch (error) {
    console.error("[Auth Validation Error]", error);
    return { authenticated: false };
  }
}

/**
 * Strict server-side security assertion for protected operations.
 */
export async function requireAdmin(): Promise<IAdminUser> {
  const { authenticated, user } = await getAuthenticatedAdmin();
  if (!authenticated || !user) {
    throw new Error("UNAUTHORIZED: Admin authentication required.");
  }
  return user;
}

/**
 * Destroys current admin session and clears the session cookie.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (sessionCookie && sessionCookie.value) {
      const tokenHash = hashToken(sessionCookie.value);
      await connectToDatabase();
      await AdminSession.deleteOne({ token: tokenHash });
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch (error) {
    console.error("[Logout Error]", error);
  }
}
