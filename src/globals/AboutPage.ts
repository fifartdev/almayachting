import type { GlobalConfig } from "payload";
import { isEditor } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: {
    description: "Text and stats for the About page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "pageLabel",
      type: "text",
      defaultValue: "06 / About",
    },
    {
      name: "pageHeading",
      type: "text",
      defaultValue: "Our Story",
    },
    {
      name: "storyHeading",
      type: "text",
      defaultValue: "Born in Athens, Made for the Sea",
    },
    {
      name: "storyText",
      type: "richText",
      label: "Story Body Text",
    },
    {
      name: "stats",
      type: "array",
      label: "Stats Overlay",
      maxRows: 4,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
      defaultValue: [
        { value: "5", label: "Premium Yachts" },
        { value: "10+", label: "Years Experience" },
        { value: "300+", label: "Happy Guests" },
        { value: "50+", label: "Destinations" },
      ],
    },
    {
      name: "values",
      type: "array",
      label: "Company Values",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
      defaultValue: [
        {
          title: "Passion",
          description: "We are sailors first and a company second. Every decision we make is filtered through one question: does this make our guests' time on the water better?",
        },
        {
          title: "Integrity",
          description: "Transparent pricing, honest advice, and no hidden surprises. We tell you exactly what to expect, because the last thing we want is for reality to fall short of the promise.",
        },
        {
          title: "Expertise",
          description: "Decades of combined sailing experience across the Aegean and Ionian seas. We know these waters not just professionally, but intimately — as sailors who love them.",
        },
        {
          title: "Sustainability",
          description: "The sea we sail is the sea we cherish. We minimise our environmental footprint through modern vessel technology, responsible anchoring practices, and partnerships with local conservation initiatives.",
        },
      ],
    },
    {
      name: "ctaHeading",
      type: "text",
      defaultValue: "Sail with ALMA",
    },
    {
      name: "ctaBodyText",
      type: "text",
      defaultValue: "Join the hundreds of guests who have experienced the Greek islands through our eyes — and our fleet.",
    },
    seoExtendedFields,
  ],
};
