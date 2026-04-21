import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users.ts";
import { Media } from "./src/collections/Media.ts";
import { Vessels } from "./src/collections/Vessels.ts";
import { Destinations } from "./src/collections/Destinations.ts";
import { Services } from "./src/collections/Services.ts";
import { TeamMembers } from "./src/collections/TeamMembers.ts";

import { SiteSettings } from "./src/globals/SiteSettings.ts";
import { Homepage } from "./src/globals/Homepage.ts";
import { AboutPage } from "./src/globals/AboutPage.ts";
import { FleetPage } from "./src/globals/FleetPage.ts";
import { DestinationsPage } from "./src/globals/DestinationsPage.ts";
import { ServicesPage } from "./src/globals/ServicesPage.ts";
import { ContactPage } from "./src/globals/ContactPage.ts";

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
    push: true,
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
