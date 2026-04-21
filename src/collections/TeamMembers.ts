import type { CollectionConfig } from "payload";
import { isEditor, contentEditorCreate, contentEditorDelete } from "../lib/payload-access.ts";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    description: "Team members shown on the About page.",
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
      name: "role",
      type: "text",
      required: true,
      admin: { description: "Job title, e.g. Founder & Managing Director" },
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: {
        description: "Display order. Lower numbers appear first.",
        position: "sidebar",
      },
    },
  ],
};
