import type { GroupField } from "payload";

export const seoExtendedFields: GroupField = {
  name: "seoExtended",
  type: "group",
  label: "SEO — Advanced",
  admin: {
    description:
      "Optional fields for advanced SEO and AI-search readiness. All fields are optional but recommended.",
  },
  fields: [
    {
      name: "focusKeyphrase",
      type: "text",
      label: "Focus Key Phrase",
      admin: {
        description:
          "The primary search phrase this page targets (e.g. 'Lagoon 55 charter Greece').",
      },
    },
    {
      name: "secondaryKeyphrases",
      type: "array",
      label: "Secondary Key Phrases",
      fields: [
        {
          name: "phrase",
          type: "text",
          label: "Phrase",
        },
      ],
      admin: {
        description: "Supporting search phrases.",
      },
    },
    {
      name: "contentSummary",
      type: "textarea",
      label: "Content Summary (AI Search)",
      admin: {
        description:
          "2–3 sentences that clearly summarise this page for AI search engines (Perplexity, ChatGPT Search, Google SGE). Write as a factual, human-readable answer.",
      },
    },
    {
      name: "canonicalUrl",
      type: "text",
      label: "Canonical URL",
      admin: {
        description: "Leave blank to use the default URL. Override only when needed.",
      },
    },
  ],
};
