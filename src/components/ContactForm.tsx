"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitContactInquiry, type ContactFormState } from "@/app/actions/contact";

interface ContactFormProps {
  theme?: "light" | "dark";
}

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm({ theme = "light" }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState
  );

  const isLight = theme === "light";

  return (
    <div
      className={`relative p-7 sm:p-10 lg:p-11 border transition-all duration-300 rounded-sm overflow-hidden ${
        isLight
          ? "bg-white/90 sm:bg-[#FAF7F2]/95 backdrop-blur-md border-plum-900/10 shadow-[0_25px_60px_-15px_rgba(26,6,14,0.08),0_0_0_1px_rgba(221,183,138,0.25)]"
          : "bg-plum-900/85 backdrop-blur-md border-cream/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
      }`}
    >
      {/* Top Ambient Champagne Gold Hairline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#DDB78A] to-transparent pointer-events-none" />

      {state.success ? (
        <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-500" role="status" aria-live="polite">
          <span className="text-3xl mb-3 block text-gold">✓</span>
          <h3
            className={`font-display text-2xl sm:text-3xl font-normal mb-2 ${
              isLight ? "text-plum-900" : "text-cream"
            }`}
          >
            Inquiry Received
          </h3>
          <p
            className={`text-xs sm:text-sm font-sans font-light max-w-md mx-auto leading-relaxed ${
              isLight ? "text-plum-950/80" : "text-cream/80"
            }`}
          >
            {state.message}
          </p>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-4 sm:gap-5">
          {/* Card Title & Subtitle */}
          <div className="mb-2">
            <h3
              className={`font-display text-xl sm:text-2xl font-normal tracking-normal ${
                isLight ? "text-plum-950" : "text-cream"
              }`}
            >
              Direct Atelier Inquiry
            </h3>
            <p
              className={`mt-1 font-sans text-xs font-light leading-relaxed ${
                isLight ? "text-plum-950/60" : "text-cream/60"
              }`}
            >
              Share your envisioned exhibition, activation, or bespoke concept with our curators.
            </p>
          </div>

          {/* Invisible Honeypot field to trap bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="bot_field">Do not fill this field</label>
            <input
              type="text"
              id="bot_field"
              name="bot_field"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className={`block text-[0.66rem] font-sans font-medium tracking-[0.22em] uppercase mb-1.5 ${
                isLight ? "text-plum-950/75" : "text-cream/75"
              }`}
            >
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              maxLength={200}
              aria-invalid={!!state.errors?.name}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-all duration-300 rounded-sm focus-visible:outline-none ${
                isLight
                  ? "border-plum-900/15 bg-white/75 text-plum-950 placeholder:text-plum-950/35 focus:border-[#B88E5E] focus:bg-white focus:ring-1 focus:ring-[#B88E5E]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-1 focus:ring-gold/40"
              }`}
            />
            {state.errors?.name && (
              <p id="name-error" className="mt-1 text-[0.7rem] text-red-600 font-sans font-medium">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label
              htmlFor="company"
              className={`block text-[0.66rem] font-sans font-medium tracking-[0.22em] uppercase mb-1.5 ${
                isLight ? "text-plum-950/75" : "text-cream/75"
              }`}
            >
              Company / Institution
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Organization name"
              maxLength={200}
              aria-invalid={!!state.errors?.company}
              aria-describedby={state.errors?.company ? "company-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-all duration-300 rounded-sm focus-visible:outline-none ${
                isLight
                  ? "border-plum-900/15 bg-white/75 text-plum-950 placeholder:text-plum-950/35 focus:border-[#B88E5E] focus:bg-white focus:ring-1 focus:ring-[#B88E5E]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-1 focus:ring-gold/40"
              }`}
            />
            {state.errors?.company && (
              <p id="company-error" className="mt-1 text-[0.7rem] text-red-600 font-sans font-medium">
                {state.errors.company}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className={`block text-[0.66rem] font-sans font-medium tracking-[0.22em] uppercase mb-1.5 ${
                isLight ? "text-plum-950/75" : "text-cream/75"
              }`}
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              maxLength={320}
              aria-invalid={!!state.errors?.email}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-all duration-300 rounded-sm focus-visible:outline-none ${
                isLight
                  ? "border-plum-900/15 bg-white/75 text-plum-950 placeholder:text-plum-950/35 focus:border-[#B88E5E] focus:bg-white focus:ring-1 focus:ring-[#B88E5E]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-1 focus:ring-gold/40"
              }`}
            />
            {state.errors?.email && (
              <p id="email-error" className="mt-1 text-[0.7rem] text-red-600 font-sans font-medium">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className={`block text-[0.66rem] font-sans font-medium tracking-[0.22em] uppercase mb-1.5 ${
                isLight ? "text-plum-950/75" : "text-cream/75"
              }`}
            >
              Project Vision &amp; Requirements *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              maxLength={10000}
              placeholder="Tell us about your upcoming event, exhibition, cultural workshop or activation..."
              aria-invalid={!!state.errors?.message}
              aria-describedby={state.errors?.message ? "message-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-all duration-300 rounded-sm focus-visible:outline-none resize-none ${
                isLight
                  ? "border-plum-900/15 bg-white/75 text-plum-950 placeholder:text-plum-950/35 focus:border-[#B88E5E] focus:bg-white focus:ring-1 focus:ring-[#B88E5E]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-1 focus:ring-gold/40"
              }`}
            />
            {state.errors?.message && (
              <p id="message-error" className="mt-1 text-[0.7rem] text-red-600 font-sans font-medium">
                {state.errors.message}
              </p>
            )}
          </div>

          {/* Global Error Banner if any */}
          {state.message && !state.success && (
            <p role="alert" aria-live="assertive" className="text-xs text-red-600 font-sans font-medium">
              {state.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className={`group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-sans font-medium tracking-[0.24em] uppercase transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 cursor-pointer rounded-sm ${
                isLight
                  ? "bg-plum-950 text-cream hover:bg-plum-900 hover:shadow-[0_12px_28px_rgba(26,6,14,0.2)] active:scale-[0.99] border border-[#DDB78A]/40 hover:border-[#DDB78A]"
                  : "bg-gold text-plum-950 hover:bg-gold-light hover:shadow-[0_12px_28px_rgba(221,183,138,0.3)] active:scale-[0.99]"
              }`}
            >
              <span>{isPending ? "Transmitting..." : "Transmit Inquiry"}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 font-bold text-xs"
              >
                →
              </span>
            </button>
          </div>

          <p className={`text-[0.66rem] font-sans font-light leading-relaxed ${isLight ? "text-plum-950/65" : "text-cream/65"}`}>
            By submitting this inquiry, you invite MKAN Concept to connect regarding your project. View our{" "}
            <Link href="/privacy" className="underline underline-offset-2 text-gold-dark hover:text-plum-950 transition-colors">
              privacy notice
            </Link>.
          </p>
        </form>
      )}
    </div>
  );
}
