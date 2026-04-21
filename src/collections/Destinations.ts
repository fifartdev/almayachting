import type { CollectionConfig } from "payload";
import { isEditor, contentEditorCreate, contentEditorDelete } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const Destinations: CollectionConfig = {
  slug: "destinations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "distance", "bestSeason"],
    description: "Greek island sailing destinations.",
  },
  access: {
    read: () => true,
    create: contentEditorCreate,
    update: isEditor,
    delete: contentEditorDelete,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-safe identifier (e.g. hydra). Only superadmin should change this.",
        position: "sidebar",
      },
    },
    {
      name: "region",
      type: "text",
      required: true,
      admin: { description: "e.g. Ionian Islands, Saronic Gulf, Cyclades" },
    },
    {
      name: "shortDescription",
      type: "text",
      required: true,
      admin: { description: "One sentence shown in preview cards." },
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "highlights",
      type: "array",
      label: "Highlights",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "bestSeason",
      type: "text",
      admin: { description: "e.g. May – October" },
    },
    {
      name: "distance",
      type: "text",
      admin: { description: "e.g. 55 nautical miles from Athens" },
    },
    seoExtendedFields,
  ],
};
