import type { CollectionConfig } from "payload";
import { isEditor, contentEditorCreate, contentEditorDelete } from "@/lib/payload-access";
import { seoExtendedFields } from "@/lib/seo-fields";

export const Vessels: CollectionConfig = {
  slug: "vessels",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "year", "guests", "startingPrice"],
    description: "Fleet vessels available for charter.",
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
        description: "URL-safe identifier. Must match the route exactly (e.g. lagoon-55). Only superadmin should change this.",
        position: "sidebar",
      },
    },
    {
      name: "type",
      type: "text",
      required: true,
      admin: { description: "e.g. Luxury Catamaran" },
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "length",
      type: "text",
      required: true,
      admin: { description: "e.g. 55ft" },
    },
    {
      name: "beam",
      type: "text",
    },
    {
      name: "draft",
      type: "text",
    },
    {
      name: "guests",
      type: "number",
      required: true,
    },
    {
      name: "cabins",
      type: "number",
      required: true,
    },
    {
      name: "bathrooms",
      type: "number",
      required: true,
    },
    {
      name: "crew",
      type: "number",
      defaultValue: 2,
    },
    {
      name: "startingPrice",
      type: "number",
      required: true,
      admin: {
        description: "Weekly charter price in EUR.",
      },
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Greece",
    },
    {
      name: "basePort",
      type: "text",
      defaultValue: "Athens, Greece",
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "highlights",
      type: "array",
      label: "Highlights",
      minRows: 1,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "specifications",
      type: "group",
      label: "Technical Specifications",
      fields: [
        { name: "loa", type: "text", label: "LOA (Length Overall)" },
        { name: "beam", type: "text", label: "Beam" },
        { name: "draft", type: "text", label: "Draft" },
        { name: "displacement", type: "text", label: "Displacement" },
        { name: "sailArea", type: "text", label: "Sail Area" },
        { name: "engines", type: "text", label: "Engines" },
        { name: "fuelCapacity", type: "text", label: "Fuel Capacity" },
        { name: "waterCapacity", type: "text", label: "Water Capacity" },
        { name: "maxSpeed", type: "text", label: "Max Speed" },
        { name: "cruisingSpeed", type: "text", label: "Cruising Speed" },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "images",
      type: "array",
      label: "Gallery Images",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    seoExtendedFields,
  ],
};
