import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Vessels } from "@/collections/Vessels";
import { Destinations } from "@/collections/Destinations";
import { Services } from "@/collections/Services";
import { TeamMembers } from "@/collections/TeamMembers";

import { SiteSettings } from "@/globals/SiteSettings";
import { Homepage } from "@/globals/Homepage";
import { AboutPage } from "@/globals/AboutPage";
import { FleetPage } from "@/globals/FleetPage";
import { DestinationsPage } from "@/globals/DestinationsPage";
import { ServicesPage } from "@/globals/ServicesPage";
import { ContactPage } from "@/globals/ContactPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— ALMA Yachting CMS",
    },
  },
  collections: [Users, Media, Vessels, Destinations, Services, TeamMembers],
  globals: [SiteSettings, Homepage, AboutPage, FleetPage, DestinationsPage, ServicesPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload.types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
    seoPlugin({
      collections: ["vessels", "destinations", "services"],
      globals: ["homepage", "about-page", "fleet-page", "destinations-page", "services-page", "contact-page"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: { doc: Record<string, unknown> }) => {
        const name = (doc?.name || doc?.title) as string | undefined;
        return name ? `${name} | ALMA Yachting` : "ALMA Yachting";
      },
      generateDescription: ({ doc }: { doc: Record<string, unknown> }) => {
        const desc = doc?.shortDescription as string | undefined;
        return desc || "";
      },
    }),
  ],
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
});
