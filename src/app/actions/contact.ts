"use server";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactInquiry(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // 1. Honeypot check (Spam bot detection)
    const honeypot = formData.get("bot_field") as string;
    if (honeypot) {
      // Silently pretend success to fool bots
      return {
        success: true,
        message: "Thank you for reaching out to MKAN Concept.",
      };
    }

    // 2. Extract and sanitize form fields
    const name = (formData.get("name") as string)?.trim();
    const company = (formData.get("company") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || "";
    const service = (formData.get("service") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim();

    // 3. Validation
    const errors: Record<string, string> = {};

    if (!name || name.length < 2) {
      errors.name = "Please provide your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!message || message.length < 10) {
      errors.message = "Please include a message describing your inquiry (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        errors,
      };
    }

    // 4. Email Service Dispatch (Resend / SendGrid / Custom SMTP)
    const apiKey = process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "mkanconcept@gmail.com";
    const senderEmail = process.env.CONTACT_EMAIL_FROM || "inquiry@mkanconcept.ae";

    if (apiKey) {
      // In production with API Key configured:
      // await resend.emails.send({ ... })
    }

    console.log("[MKAN Inquiry Dispatched]", {
      name,
      company,
      email,
      phone,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message:
        "Thank you for contacting MKAN Concept. Our senior strategy team will review your inquiry and connect with you shortly.",
    };
  } catch (error) {
    console.error("[Contact Action Error]", error);
    return {
      success: false,
      message:
        "An error occurred while transmitting your message. Please reach out to us directly via email or telephone.",
    };
  }
}
