import type { GlobalConfig } from "payload";
import { isEditor } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    description: "All text content for the homepage.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        { name: "label", type: "text", defaultValue: "Greece · Mediterranean · Aegean" },
        { name: "headline", type: "text", defaultValue: "Sail the Mediterranean" },
        { name: "subheadline", type: "text", defaultValue: "Bespoke yacht charters across the Greek islands. Where the Aegean meets luxury." },
        { name: "ctaPrimaryText", type: "text", defaultValue: "Explore Our Fleet" },
        { name: "ctaSecondaryText", type: "text", defaultValue: "Plan Your Journey" },
        {
          name: "stats",
          type: "array",
          label: "Stats Row",
          maxRows: 4,
          fields: [
            { name: "value", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
          defaultValue: [
            { value: "5", label: "Premium Yachts" },
            { value: "8+", label: "Destinations" },
            { value: "300+", label: "Happy Guests" },
            { value: "10+", label: "Years Experience" },
          ],
        },
      ],
    },
    {
      name: "aboutIntro",
      type: "group",
      label: "About Intro Section",
      fields: [
        { name: "quoteText", type: "text", defaultValue: "Where the Aegean meets luxury." },
        { name: "quoteAttribution", type: "text", defaultValue: "— ALMA YACHTING, GREECE" },
        { name: "sectionLabel", type: "text", defaultValue: "01 / Our Story" },
        { name: "sectionHeading", type: "text", defaultValue: "Born from a love of the sea" },
        {
          name: "bodyText",
          type: "richText",
        },
      ],
    },
    {
      name: "fleetPreview",
      type: "group",
      label: "Fleet Preview Section",
      fields: [
        { name: "label", type: "text", defaultValue: "02 / Fleet" },
        { name: "heading", type: "text", defaultValue: "Our Premium Vessels" },
        { name: "subtitle", type: "text", defaultValue: "Five exceptional catamarans, each a floating sanctuary for the discerning traveller." },
      ],
    },
    {
      name: "servicesSection",
      type: "group",
      label: "Services Section",
      fields: [
        { name: "label", type: "text", defaultValue: "03 / Services" },
        { name: "heading", type: "text", defaultValue: "What We Offer" },
        { name: "subtitle", type: "text", defaultValue: "A complete suite of maritime services, delivered with Greek warmth and world-class precision." },
      ],
    },
    {
      name: "destinationsSection",
      type: "group",
      label: "Destinations Section",
      fields: [
        { name: "label", type: "text", defaultValue: "04 / Destinations" },
        { name: "heading", type: "text", defaultValue: "Greek Island Paradise" },
        { name: "subtitle", type: "text", defaultValue: "From the glamour of Mykonos to the serenity of Hydra — discover Greece as only a yacht can show you." },
      ],
    },
    {
      name: "ctaSection",
      type: "group",
      label: "CTA Section",
      fields: [
        { name: "label", type: "text", defaultValue: "05 / Begin Your Journey" },
        { name: "heading", type: "text", defaultValue: "Ready to Set Sail?" },
        { name: "bodyText", type: "text", defaultValue: "Contact our team to begin crafting your perfect Greek sailing experience. We respond within 24 hours." },
        { name: "ctaPrimaryText", type: "text", defaultValue: "Plan Your Charter" },
        { name: "ctaSecondaryText", type: "text", defaultValue: "Browse Our Fleet" },
      ],
    },
    seoExtendedFields,
  ],
};
