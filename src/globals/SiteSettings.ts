import type { GlobalConfig } from "payload";
import { isEditor, isSuperadmin } from "../lib/payload-access.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description: "Company-wide contact info and social links used across Navigation, Footer, and Contact page.",
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      defaultValue: "ALMA Yachting",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Bespoke luxury yacht charter and fleet management services across the Greek islands.",
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "+30 210 300 1618",
    },
    {
      name: "email",
      type: "email",
      defaultValue: "info@almayachting.com",
    },
    {
      name: "address",
      type: "textarea",
      defaultValue: "46 Archimidous str., 17563 Paleo Faliro, Athens, Greece",
    },
    {
      name: "officeHours",
      type: "textarea",
      defaultValue: "Monday – Friday: 9:00 – 18:00\nSaturday: 10:00 – 14:00 (EET / UTC+2)",
    },
    {
      name: "basePort",
      type: "text",
      defaultValue: "Marina Zea · Piraeus · Athens",
    },
    {
      name: "instagramUrl",
      type: "text",
      label: "Instagram URL",
    },
    {
      name: "facebookUrl",
      type: "text",
      label: "Facebook URL",
    },
  ],
};
