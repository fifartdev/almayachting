import type { GlobalConfig } from "payload";
import { isEditor } from "../lib/payload-access.ts";
import { seoExtendedFields } from "../lib/seo-fields.ts";

export const FleetPage: GlobalConfig = {
  slug: "fleet-page",
  label: "Fleet Page",
  admin: {
    description: "Text and stats for the Fleet listing page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "pageLabel",
      type: "text",
      defaultValue: "02 / Fleet",
    },
    {
      name: "pageHeading",
      type: "text",
      defaultValue: "Our Fleet",
    },
    {
      name: "introText",
      type: "text",
      defaultValue: "Five premium catamarans. All based in Athens. All available for crewed or bareboat charter.",
    },
    {
      name: "stats",
      type: "array",
      label: "Stats Strip",
      maxRows: 3,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
      defaultValue: [
        { value: "5", label: "Vessels" },
        { value: "44–55ft", label: "Length Range" },
        { value: "6–8", label: "Guests" },
      ],
    },
    {
      name: "bespokeSection",
      type: "group",
      label: "Bespoke Charters Section",
      fields: [
        { name: "heading", type: "text", defaultValue: "Can't find your perfect match?" },
        { name: "subtitle", type: "text", defaultValue: "Tell us your dream voyage and we'll find the ideal vessel from our extended network of premium yachts across Greece." },
        {
          name: "details",
          type: "array",
          maxRows: 4,
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "text", required: true },
          ],
          defaultValue: [
            { label: "Charter Types", value: "Bareboat & Crewed" },
            { label: "Base Port", value: "Athens, Greece" },
            { label: "Season", value: "April – November" },
            { label: "Response Time", value: "Within 24 Hours" },
          ],
        },
      ],
    },
    seoExtendedFields,
  ],
};
