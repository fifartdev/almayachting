import type { CollectionConfig } from "payload";
import { isEditor, contentEditorCreate, contentEditorDelete } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    description: "Services offered by ALMA Yachting.",
  },
  access: {
    read: () => true,
    create: contentEditorCreate,
    update: isEditor,
    delete: contentEditorDelete,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Used as the anchor ID on the services page (e.g. charter). Only superadmin should change this.",
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 99,
      admin: {
        description: "Display order. Lower numbers appear first.",
        position: "sidebar",
      },
    },
    {
      name: "subtitle",
      type: "text",
      admin: { description: "Short tagline shown below the title." },
    },
    {
      name: "shortDescription",
      type: "text",
      admin: { description: "One sentence used on the homepage services grid." },
    },
    {
      name: "description",
      type: "richText",
      label: "Description",
      required: true,
    },
    {
      name: "longDescription",
      type: "richText",
      label: "Long Description",
    },
    {
      name: "features",
      type: "array",
      label: "Features (bullet list)",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    seoExtendedFields,
  ],
};
