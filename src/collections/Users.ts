import type { CollectionConfig } from "payload";
import { isSuperadmin } from "@/lib/payload-access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    description: "Admin accounts. Only superadmin can manage users.",
  },
  access: {
    read: isSuperadmin,
    create: isSuperadmin,
    update: ({ req }) => {
      // Users can update their own profile; superadmin can update anyone
      if (req.user?.role === "superadmin") return true;
      return { id: { equals: req.user?.id } };
    },
    delete: isSuperadmin,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "contentEditor",
      options: [
        { label: "Super Admin", value: "superadmin" },
        { label: "Content Editor", value: "contentEditor" },
      ],
      admin: {
        description: "superadmin has full access. contentEditor can manage content only.",
      },
    },
    {
      name: "name",
      type: "text",
    },
  ],
};
