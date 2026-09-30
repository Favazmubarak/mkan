/**
 * Contact Us Page Content
 */

export const contactContent = {
  header: {
    eyebrow: "CONTACT",
    title: "CONTACT",
    heading: "LET'S CREATE SOMETHING EXCEPTIONAL.",
    intro: "Tell us about your next event, exhibition, activation or concept.",
  },

  details: {
    phone: "+971 50 222 5890",
    phoneHref: "tel:+971502225890",
    email: "mkanconcept@gmail.com",
    emailHref: "mailto:mkanconcept@gmail.com",
    instagram: "@mkan.concept",
    instagramUrl: "https://instagram.com/mkan.concept",
    location: "Wasl 51, Dubai, UAE",
    locationMapUrl: "https://maps.google.com/?q=Wasl+51+Dubai",
    hours: "Monday – Friday: 9:00 AM – 6:00 PM GST",
  },

  form: {
    fields: [
      {
        id: "name",
        name: "name",
        type: "text",
        label: "Your Name",
        placeholder: "Your name",
        required: true,
      },
      {
        id: "company",
        name: "company",
        type: "text",
        label: "Company",
        placeholder: "Company / Organization",
        required: false,
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "name@company.com",
        required: true,
      },
      {
        id: "phone",
        name: "phone",
        type: "tel",
        label: "Phone Number",
        placeholder: "+971 50 000 0000",
        required: false,
      },
      {
        id: "service",
        name: "service",
        type: "select",
        label: "Interested Service",
        placeholder: "Select a service",
        options: [
          "Events & Galas",
          "Exhibitions & Cultural Fairs",
          "Workshops & Masterclasses",
          "Brand Activations & Pop-ups",
          "Strategic Consultancy",
          "Other Inquiries",
        ],
        required: false,
      },
      {
        id: "message",
        name: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Tell us about your project vision, timeline, and requirements...",
        required: true,
        rows: 4,
      },
    ],
    submitButton: "Send Message",
    successMessage:
      "Thank you for contacting MKAN Concept. Our senior strategy team will review your inquiry and connect with you shortly.",
    errorMessage:
      "Unable to send message at this time. Please contact us directly via email or phone.",
  },
} as const;

export type ContactContent = typeof contactContent;
