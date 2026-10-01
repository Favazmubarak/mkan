"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { consumeRateLimit, getClientIdentity } from "@/lib/rate-limit";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

function readTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

/**
 * Handles contact inquiries using Resend (the modern industry standard for Next.js).
 * - Honeypot spam defense
 * - Input validation & sanitization
 * - Persistent message logging to MongoDB inbox
 * - Direct email transmission via Resend API SDK
 */
export async function submitContactInquiry(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // 1. Honeypot check (Spam bot trap)
    const honeypot = readTextField(formData, "bot_field");
    if (honeypot) {
      return {
        success: true,
        message: "Thank you for reaching out to MKAN Concept.",
      };
    }

    const requestHeaders = await headers();
    const rateLimit = await consumeRateLimit(
      "contact-inquiry",
      getClientIdentity(requestHeaders),
      5,
      60 * 60 * 1000,
      true
    );
    if (!rateLimit.available) {
      return {
        success: false,
        message: "We couldn't accept your inquiry right now. Please contact us directly by email.",
      };
    }
    if (!rateLimit.allowed) {
      return {
        success: false,
        message: "Please wait before sending another inquiry.",
      };
    }

    // 2. Extract and sanitize inputs
    const name = readTextField(formData, "name");
    const company = readTextField(formData, "company") || "Private Client";
    const email = readTextField(formData, "email");
    const message = readTextField(formData, "message");

    // 3. Validation
    const errors: Record<string, string> = {};

    if (name.length < 2 || name.length > 200) {
      errors.name = "Please provide a name between 2 and 200 characters.";
    }
    if (company.length > 200) {
      errors.company = "Company name must be 200 characters or fewer.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 320 || !emailRegex.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (message.length < 10 || message.length > 10000) {
      errors.message = "Please provide a message between 10 and 10,000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please review the highlighted fields.",
        errors,
      };
    }

    // 4. Persist the inquiry in the studio inbox when MongoDB is available.
    let savedToInbox = false;
    try {
      const { connectToDatabase } = await import("@/lib/db");
      const { ContactMessage } = await import("@/lib/models/ContactMessage");
      const db = await connectToDatabase();
      if (db) {
        await ContactMessage.create({
          name,
          company,
          email,
          message,
          status: "unread",
        });
        savedToInbox = true;
      }
    } catch (dbErr) {
      console.warn("[Contact DB Warning] Could not persist inquiry in the studio inbox:", dbErr);
    }

    const recipientEmail = process.env.CONTACT_EMAIL_TO || "favazkoppath10@gmail.com";
    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAF8; margin: 0; padding: 24px; color: #1A1A1A; }
            .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E4DF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
            .header { background: #1A060E; padding: 24px 32px; text-align: center; }
            .header h1 { color: #DDB78A; font-size: 18px; margin: 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
            .content { padding: 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8A8A8A; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1A1A1A; font-weight: 500; }
            .message-box { background: #F5F3F0; border-radius: 12px; padding: 16px 20px; border: 1px solid #E0DBD5; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; color: #1A1A1A; }
            .footer { padding: 16px 32px; background: #FAFAF8; border-top: 1px solid #E8E4DF; font-size: 11px; color: #8A8A8A; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MKAN Concept &bull; New Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <div class="label">Company / Affiliation</div>
                <div class="value">${safeCompany}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #A37B52; text-decoration: none;">${safeEmail}</a></div>
              </div>
              <div class="field">
                <div class="label">Inquiry Message</div>
                <div class="message-box">${safeMessage}</div>
              </div>
            </div>
            <div class="footer">
              Received via MKAN Concept Digital Flagship &bull; ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" })} GST
            </div>
          </div>
        </body>
      </html>
    `;

    // 5. Send an email notification when Resend is configured.
    let emailDelivered = false;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const senderEmail = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

      try {
        const { error } = await resend.emails.send({
          from: `MKAN Concept <${senderEmail}>`,
          to: [recipientEmail],
          replyTo: email,
          subject: `[New Inquiry] ${name.replace(/[\r\n]/g, " ")} — MKAN Concept`,
          html: emailHtml,
        });

        if (error) {
          console.error("[Resend Delivery Error]", error);
        } else {
          emailDelivered = true;
        }
      } catch (emailError) {
        console.error("[Resend Request Error]", emailError);
      }
    } else if (process.env.NODE_ENV !== "production") {
      console.info("[Contact Email] Resend is not configured; no notification email was sent.");
    }

    if (!savedToInbox && !emailDelivered) {
      return {
        success: false,
        message: "We couldn't submit your inquiry just now. Please contact us directly by email.",
      };
    }

    return {
      success: true,
      message: savedToInbox
        ? "Thank you. Your inquiry has been received and saved for our team to review."
        : "Thank you. Your inquiry has been sent to our team.",
    };
  } catch (error: unknown) {
    console.error("[Contact Form Exception]", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while transmitting your message. Please connect with us directly via email.",
    };
  }
}
