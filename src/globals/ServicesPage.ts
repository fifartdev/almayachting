import type { GlobalConfig } from "payload";
import { isEditor } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  admin: {
    description: "Text content for the Services page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "pageLabel",
      type: "text",
      defaultValue: "03 / Services",
    },
    {
      name: "pageHeading",
      type: "text",
      defaultValue: "What We Offer",
    },
    {
      name: "pageSubheading",
      type: "text",
      defaultValue: "A complete suite of maritime services, delivered with Greek warmth.",
    },
    {
      name: "whyAlmaLabel",
      type: "text",
      defaultValue: "Why ALMA",
    },
    {
      name: "whyAlmaHeading",
      type: "text",
      defaultValue: "The ALMA Difference",
    },
    {
      name: "whyAlmaSubtitle",
      type: "text",
      defaultValue: "We're not a booking platform. We're a team of passionate sailors who happen to run a company.",
    },
    {
      name: "whyAlmaStats",
      type: "array",
      label: "Why ALMA Stats",
      maxRows: 4,
      fields: [
        { name: "stat", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "description", type: "text" },
      ],
      defaultValue: [
        { stat: "10+", label: "Years in the Aegean", description: "Over a decade of navigating these waters" },
        { stat: "300+", label: "Happy Guests", description: "Guests who return season after season" },
        { stat: "5", label: "Premium Vessels", description: "Maintained to the highest standard" },
        { stat: "24h", label: "Response Time", description: "We're always reachable when you need us" },
      ],
    },
    seoExtendedFields,
  ],
};
