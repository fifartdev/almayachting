import type { GlobalConfig } from "payload";
import { isEditor } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  admin: {
    description: "Text content for the Contact page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "pageLabel",
      type: "text",
      defaultValue: "07 / Contact",
    },
    {
      name: "pageHeading",
      type: "text",
      defaultValue: "Get in Touch",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Begin Your Journey",
    },
    {
      name: "introText",
      type: "text",
      defaultValue: "Whether you have a specific voyage in mind or simply want to explore the possibilities, our team is here to help. We respond to all enquiries within 24 hours.",
    },
    {
      name: "mapLabel",
      type: "text",
      defaultValue: "Alimos Marina, Athens",
    },
    {
      name: "responseGuarantee",
      type: "text",
      defaultValue: "We reply within 24 hours",
    },
    seoExtendedFields,
  ],
};
