"use client";

import { useActionState } from "react";
import { loginAdminAction, type AuthState } from "@/app/actions/auth";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const initialState: AuthState = {
  success: false,
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialState
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAF8] px-6 py-12 text-[#1A1A1A] selection:bg-[#DDB78A] selection:text-white">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(221,183,138,0.08)_0,transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-[#E8E4DF] bg-white p-8 sm:p-10 shadow-lg">
          {/* Brand Header */}
          <div className="text-center pb-7 border-b border-[#E8E4DF]">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#DDB78A] text-white font-bold text-2xl mb-4 shadow-sm">
              M
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#1A1A1A]">
              MKAN CONCEPT
            </h1>
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[#DDB78A] mt-1">
              Studio Management Console
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="mt-7 flex flex-col gap-4.5">
            {/* Error Banner */}
            {state?.error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 font-medium leading-relaxed">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-[0.7rem] font-semibold tracking-wide uppercase text-[#6B6560] mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8A8A]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="admin@mkanconcept.ae"
                  className="w-full rounded-lg border border-[#E0DBD5] bg-[#F5F3F0] pl-10 pr-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#8A8A8A] focus:border-[#DDB78A] focus:ring-1 focus:ring-[#DDB78A]/40 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[0.7rem] font-semibold tracking-wide uppercase text-[#6B6560] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8A8A]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-[#E0DBD5] bg-[#F5F3F0] pl-10 pr-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#8A8A8A] focus:border-[#DDB78A] focus:ring-1 focus:ring-[#DDB78A]/40 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#DDB78A] px-6 py-3 text-xs font-bold tracking-wide uppercase text-white transition-all duration-200 hover:bg-[#D0A875] hover:shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <span>{isPending ? "Verifying..." : "Sign In"}</span>
                {!isPending && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </form>

          {/* Bottom */}
          <div className="mt-7 pt-5 border-t border-[#E8E4DF] flex items-center justify-between text-[0.68rem] text-[#8A8A8A]">
            <Link
              href="/"
              className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
            >
              <span>← Back to Website</span>
            </Link>

            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Encrypted Session</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
