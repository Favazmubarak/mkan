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
      className={`p-6 sm:p-10 border transition-colors duration-300 ${
        isLight
          ? "bg-cream/90 backdrop-blur-sm border-plum-900/15"
          : "bg-plum-900/80 backdrop-blur-md border-cream/15"
      }`}
    >
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
        <form action={formAction} className="flex flex-col gap-4">
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
              className={`block text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase mb-1.5 ${
                isLight ? "text-plum-900/70" : "text-cream/70"
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
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 ${isLight ? "focus-visible:ring-plum-900" : "focus-visible:ring-gold"} ${
                isLight
                  ? "border-plum-900/20 bg-cream/60 text-plum-950 placeholder:text-plum-900/40 focus:border-plum-900"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold"
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
              className={`block text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase mb-1.5 ${
                isLight ? "text-plum-900/70" : "text-cream/70"
              }`}
            >
              Company / Organization
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Company name"
              maxLength={200}
              aria-invalid={!!state.errors?.company}
              aria-describedby={state.errors?.company ? "company-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 ${isLight ? "focus-visible:ring-plum-900" : "focus-visible:ring-gold"} ${
                isLight
                  ? "border-plum-900/20 bg-cream/60 text-plum-950 placeholder:text-plum-900/40 focus:border-plum-900"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold"
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
              className={`block text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase mb-1.5 ${
                isLight ? "text-plum-900/70" : "text-cream/70"
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
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 ${isLight ? "focus-visible:ring-plum-900" : "focus-visible:ring-gold"} ${
                isLight
                  ? "border-plum-900/20 bg-cream/60 text-plum-950 placeholder:text-plum-900/40 focus:border-plum-900"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold"
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
              className={`block text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase mb-1.5 ${
                isLight ? "text-plum-900/70" : "text-cream/70"
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
              placeholder="Tell us about your next event, exhibition, activation or concept..."
              aria-invalid={!!state.errors?.message}
              aria-describedby={state.errors?.message ? "message-error" : undefined}
              className={`w-full border px-4 py-3 text-xs sm:text-sm font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 ${isLight ? "focus-visible:ring-plum-900" : "focus-visible:ring-gold"} resize-none ${
                isLight
                  ? "border-plum-900/20 bg-cream/60 text-plum-950 placeholder:text-plum-900/40 focus:border-plum-900"
                  : "border-cream/20 bg-plum-950/60 text-cream placeholder:text-cream/30 focus:border-gold"
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
              className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isLight ? "focus-visible:ring-plum-900" : "focus-visible:ring-gold"} disabled:opacity-60 cursor-pointer ${
                isLight
                  ? "bg-plum-900 text-cream hover:bg-plum-950 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gold text-plum-950 hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              <span>{isPending ? "Transmitting..." : "Send Message"}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className={`text-[0.68rem] leading-relaxed ${isLight ? "text-plum-950/65" : "text-cream/65"}`}>
            By submitting this form, you ask MKAN Concept to use your details to respond to your inquiry. Read our{" "}
            <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
