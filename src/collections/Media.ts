import type { CollectionConfig } from "payload";
import { isEditor, isSuperadmin } from "../lib/payload-access.ts";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  admin: {
    useAsTitle: "alt",
    description: "All uploaded images and assets.",
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isSuperadmin,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for accessibility and SEO.",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
