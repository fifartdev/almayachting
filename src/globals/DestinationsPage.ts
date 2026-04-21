import type { GlobalConfig } from "payload";
import { isEditor } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const DestinationsPage: GlobalConfig = {
  slug: "destinations-page",
  label: "Destinations Page",
  admin: {
    description: "Text content for the Destinations page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "pageLabel",
      type: "text",
      defaultValue: "04 / Destinations",
    },
    {
      name: "pageHeading",
      type: "text",
      defaultValue: "Greek Islands",
    },
    {
      name: "pageSubheading",
      type: "text",
      defaultValue: "The Aegean, Ionian and Saronic seas await.",
    },
    {
      name: "seas",
      type: "array",
      label: "Sea Regions",
      maxRows: 3,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "islands", type: "text", admin: { description: "Comma-separated list of island names." } },
      ],
      defaultValue: [
        {
          name: "Aegean Sea",
          description: "The birthplace of Western civilisation, dotted with iconic Cycladic islands and historic Dodecanese outposts.",
          islands: "Mykonos, Santorini, Paros, Rhodes",
        },
        {
          name: "Ionian Sea",
          description: "Calmer, verdant, and extraordinarily beautiful — the Ionian offers gentler sailing and lush green islands.",
          islands: "Corfu, Zakynthos, Kefalonia, Ithaca",
        },
        {
          name: "Saronic Gulf",
          description: "Athens' backyard archipelago — easily accessible, deeply beautiful, and far less crowded than the Cyclades.",
          islands: "Hydra, Spetses, Aegina, Poros",
        },
      ],
    },
    {
      name: "destinationsGridHeading",
      type: "text",
      defaultValue: "Where Will You Sail?",
    },
    {
      name: "customRouteCta",
      type: "group",
      label: "Custom Route CTA",
      fields: [
        { name: "heading", type: "text", defaultValue: "Create Your Custom Route" },
        { name: "bodyText", type: "text", defaultValue: "Tell us your dream islands and we'll craft the perfect itinerary — from a weekend Saronic hop to a two-week Aegean odyssey." },
      ],
    },
    seoExtendedFields,
  ],
};
