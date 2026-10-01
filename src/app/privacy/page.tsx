import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How MKAN Concept uses and retains information submitted through its inquiry form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20 text-plum-950 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gold-dark underline underline-offset-4">
          Back to MKAN Concept
        </Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          MKAN Concept
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Privacy Notice</h1>
        <p className="mt-5 text-base leading-7 text-plum-950/75">
          This notice explains how we handle information sent through the inquiry form on this website.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-plum-950/80">
          <section>
            <h2 className="font-semibold text-plum-950">Information you provide</h2>
            <p className="mt-2">
              The form asks for your name, email address, inquiry message, and optionally your company or affiliation.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-plum-950">How we use it</h2>
            <p className="mt-2">
              We use these details to review and respond to your inquiry. When email notifications are configured,
              they are sent through Resend. Inquiry records are stored in our website inbox using MongoDB.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-plum-950">Abuse prevention</h2>
            <p className="mt-2">
              To limit spam and repeated submissions, the site temporarily stores a keyed hash of the request IP
              address in rate-limit counters. Those counters expire after their rate window, which is at most one hour.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-plum-950">Retention</h2>
            <p className="mt-2">
              Website inbox records are scheduled for automatic deletion after 30 days. Database cleanup may happen
              shortly after that period. Email notifications may remain in email accounts according to the retention
              settings of the recipient and email provider.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-plum-950">Questions</h2>
            <p className="mt-2">
              For questions about an inquiry you have submitted, contact us at{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
