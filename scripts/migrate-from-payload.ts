/**
 * One-off migration: live Payload site → WordPress (alma-headless plugin).
 *
 *   npm run migrate:wp              # migrate
 *   npm run migrate:wp -- --dry-run # read + convert only, write nothing
 *
 * Reads the public Payload REST API (PAYLOAD_SOURCE_URL, default the production site)
 * and writes with an application password (WP_URL, WP_USER, WP_APP_PASSWORD in .env.local).
 * Safe to re-run: posts are matched by slug, media by filename (cached in scripts/.wp-media-map.json).
 */
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const DRY_RUN = process.argv.includes("--dry-run");
const SOURCE = (process.env.PAYLOAD_SOURCE_URL ?? "https://www.almayachting.com").replace(/\/+$/, "");
const WP_URL = (process.env.WP_URL ?? "").replace(/\/+$/, "");
const AUTH = "Basic " + Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64");
const MEDIA_MAP_FILE = path.join("scripts", ".wp-media-map.json");

if (!WP_URL || !process.env.WP_USER || !process.env.WP_APP_PASSWORD) {
  throw new Error("Set WP_URL, WP_USER and WP_APP_PASSWORD in .env.local");
}

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/* ------------------------------------------------------------------ HTTP */

async function source<T = Doc>(apiPath: string): Promise<T> {
  const res = await fetch(`${SOURCE}/api${apiPath}`);
  if (!res.ok) throw new Error(`Payload ${res.status} for ${apiPath}`);
  return (await res.json()) as T;
}

async function wp<T = Doc>(apiPath: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${WP_URL}/wp-json${apiPath}`, {
    ...init,
    headers: { Authorization: AUTH, "Content-Type": "application/json", ...init.headers },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`WordPress ${res.status} for ${apiPath}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

function wpWrite<T = Doc>(apiPath: string, body: unknown, label: string): Promise<T | null> {
  if (DRY_RUN) {
    console.log(`  [dry-run] ${label}`);
    return Promise.resolve(null);
  }
  return wp<T>(apiPath, { method: "POST", body: JSON.stringify(body) });
}

/* --------------------------------------------------------------- Rich text */

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function lexicalNode(node: Doc): string {
  const children = () => (node.children ?? []).map(lexicalNode).join("");
  switch (node.type) {
    case "text": {
      let html = escapeHtml(node.text ?? "");
      const f = node.format ?? 0;
      if (f & 16) html = `<code>${html}</code>`;
      if (f & 1) html = `<strong>${html}</strong>`;
      if (f & 2) html = `<em>${html}</em>`;
      if (f & 4) html = `<s>${html}</s>`;
      if (f & 8) html = `<u>${html}</u>`;
      return html;
    }
    case "linebreak":
      return "<br>";
    case "paragraph": {
      const inner = children();
      return inner.trim() ? `<p>${inner}</p>\n` : "";
    }
    case "heading":
      return `<${node.tag}>${children()}</${node.tag}>\n`;
    case "quote":
      return `<blockquote>${children()}</blockquote>\n`;
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${children()}</${tag}>\n`;
    }
    case "listitem":
      return `<li>${children()}</li>`;
    case "link":
    case "autolink":
      return `<a href="${escapeHtml(node.fields?.url ?? "#")}">${children()}</a>`;
    default:
      return children();
  }
}

function lexicalToHtml(richText: unknown): string {
  const root = (richText as Doc | null)?.root;
  return root ? lexicalNode(root).trim() : "";
}

/* -------------------------------------------------------------------- Media */

let mediaMap: Record<string, number> = {};

async function loadMediaMap() {
  if (existsSync(MEDIA_MAP_FILE)) mediaMap = JSON.parse(await readFile(MEDIA_MAP_FILE, "utf8"));
}

async function saveMediaMap() {
  if (!DRY_RUN) await writeFile(MEDIA_MAP_FILE, JSON.stringify(mediaMap, null, 2));
}

async function findExistingMedia(filename: string): Promise<number | null> {
  const base = filename.replace(/\.[^.]+$/, "");
  const found = await wp<Doc[]>(`/wp/v2/media?search=${encodeURIComponent(base)}&per_page=20&_fields=id,source_url`);
  // WordPress stores large images as "name-scaled.jpg".
  const scaled = filename.replace(/(\.[^.]+)$/, "-scaled$1");
  const match = found.find((m) => [filename, scaled].includes(String(m.source_url).split("/").pop() ?? ""));
  return match ? match.id : null;
}

/** Uploads a file (Payload media doc or local path) once and returns its WordPress attachment ID. */
async function uploadMedia(file: { filename: string; mimeType: string; alt?: string | null; caption?: string | null; url?: string; localPath?: string }): Promise<number> {
  if (mediaMap[file.filename]) return mediaMap[file.filename];

  const existing = await findExistingMedia(file.filename);
  if (existing) return (mediaMap[file.filename] = existing);

  if (DRY_RUN) {
    console.log(`  [dry-run] upload ${file.filename}`);
    return 0;
  }

  const data = file.localPath
    ? await readFile(file.localPath)
    : Buffer.from(await (await fetch(`${SOURCE}${file.url}`)).arrayBuffer());

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: AUTH,
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    },
    body: data,
  });
  if (!res.ok) throw new Error(`Upload ${file.filename} failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
  const media = (await res.json()) as Doc;

  await wp(`/wp/v2/media/${media.id}`, {
    method: "POST",
    body: JSON.stringify({ alt_text: file.alt ?? "", caption: file.caption ?? "" }),
  });

  console.log(`  uploaded ${file.filename} → #${media.id}`);
  mediaMap[file.filename] = media.id;
  await saveMediaMap();
  return media.id;
}

async function mediaId(media: Doc | null | undefined): Promise<number> {
  return media?.filename ? uploadMedia(media as { filename: string; mimeType: string }) : 0;
}

/* --------------------------------------------------------------------- SEO */

async function seoFrom(doc: Doc) {
  const meta = doc.meta ?? {};
  const ext = doc.seoExtended ?? {};
  return {
    title: meta.title ?? "",
    description: meta.description ?? "",
    focusKeyphrase: ext.focusKeyphrase ?? "",
    secondaryKeyphrases: (ext.secondaryKeyphrases ?? []).map((p: Doc) => p.phrase).filter(Boolean),
    canonicalUrl: ext.canonicalUrl ?? "",
    openGraph: { image: await mediaId(meta.image) },
    ai: { contentSummary: ext.contentSummary ?? "" },
  };
}

const texts = (items: Doc[] | null | undefined, key = "text") => (items ?? []).map((i) => i[key]).filter(Boolean);
const nullsToEmpty = (obj: Doc) => JSON.parse(JSON.stringify(obj, (_k, v) => (v === null ? "" : v)));

/* ------------------------------------------------------------------- Posts */

async function upsertPost(restBase: string, slug: string, body: Doc) {
  const existing = await wp<Doc[]>(
    `/wp/v2/${restBase}?slug=${encodeURIComponent(slug)}&status=publish,draft,pending,private&context=edit&_fields=id`,
  );
  const target = existing[0] ? `/wp/v2/${restBase}/${existing[0].id}` : `/wp/v2/${restBase}`;
  await wpWrite(target, { slug, status: "publish", ...body }, `${existing[0] ? "update" : "create"} ${restBase}/${slug}`);
  if (!DRY_RUN) console.log(`  ${existing[0] ? "updated" : "created"} ${restBase}/${slug}`);
}

async function migrateVessels() {
  console.log("Vessels");
  const { docs } = await source<{ docs: Doc[] }>("/vessels?limit=100&depth=1&sort=name");
  for (const [i, v] of docs.entries()) {
    const images: number[] = [];
    for (const item of v.images ?? []) images.push(await mediaId(item.image));
    await upsertPost("vessels", v.slug, {
      title: v.name,
      content: lexicalToHtml(v.description),
      menu_order: i,
      featured_media: await mediaId(v.heroImage),
      fields: {
        ...nullsToEmpty({
          type: v.type,
          year: v.year,
          length: v.length,
          beam: v.beam,
          draft: v.draft,
          guests: v.guests,
          cabins: v.cabins,
          bathrooms: v.bathrooms,
          crew: v.crew,
          startingPrice: v.startingPrice,
          location: v.location,
          basePort: v.basePort,
          specifications: v.specifications ?? {},
        }),
        highlights: texts(v.highlights),
        images: images.filter(Boolean),
        seo: await seoFrom(v),
      },
    });
  }
}

async function migrateDestinations() {
  console.log("Destinations");
  const { docs } = await source<{ docs: Doc[] }>("/destinations?limit=100&depth=1&sort=name");
  for (const [i, d] of docs.entries()) {
    await upsertPost("destinations", d.slug, {
      title: d.name,
      content: lexicalToHtml(d.description),
      menu_order: i,
      featured_media: await mediaId(d.image),
      fields: {
        ...nullsToEmpty({ region: d.region, shortDescription: d.shortDescription, bestSeason: d.bestSeason, distance: d.distance }),
        highlights: texts(d.highlights),
        seo: await seoFrom(d),
      },
    });
  }
}

async function migrateServices() {
  console.log("Services");
  const { docs } = await source<{ docs: Doc[] }>("/services?limit=100&depth=1&sort=order");
  for (const s of docs) {
    await upsertPost("services", s.slug, {
      title: s.title,
      content: lexicalToHtml(s.description),
      menu_order: s.order ?? 99,
      featured_media: await mediaId(s.image),
      fields: {
        ...nullsToEmpty({ subtitle: s.subtitle, shortDescription: s.shortDescription }),
        longDescription: lexicalToHtml(s.longDescription),
        features: texts(s.features),
        seo: await seoFrom(s),
      },
    });
  }
}

async function migrateTeam() {
  console.log("Team");
  const { docs } = await source<{ docs: Doc[] }>("/team-members?limit=100&depth=1&sort=order");
  for (const t of docs) {
    const slug = String(t.name).toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await upsertPost("team-members", slug, {
      title: t.name,
      menu_order: t.order ?? 99,
      featured_media: await mediaId(t.photo),
      fields: nullsToEmpty({ role: t.role, bio: t.bio }),
    });
  }
}

/* ---------------------------------------------------------------- Settings */

async function putSettings(key: string, data: Doc) {
  await wpWrite(`/alma/v1/settings/${key}`, data, `settings ${key}`);
  if (!DRY_RUN) console.log(`  saved settings ${key}`);
}

async function migrateSettings() {
  console.log("Page settings");
  const g = async (slug: string) => {
    const doc = await source(`/globals/${slug}?depth=1`);
    const rest: Doc = { ...doc };
    for (const key of ["id", "updatedAt", "createdAt", "globalType", "meta", "seoExtended"]) delete rest[key];
    return { rest, seo: await seoFrom(doc) };
  };

  const site = (await g("site-settings")).rest;
  await putSettings("site-settings", nullsToEmpty(site));

  const home = await g("homepage");
  const heroSlide = await uploadMedia({
    filename: "hero-b.jpg",
    mimeType: "image/jpeg",
    alt: "Luxury catamaran sailing the Aegean Sea",
    localPath: path.join("public", "images", "various", "hero-b.jpg"),
  });
  await putSettings("homepage", {
    ...nullsToEmpty(home.rest),
    hero: { ...nullsToEmpty(home.rest.hero ?? {}), mode: "slider", slides: heroSlide ? [heroSlide] : [] },
    aboutIntro: { ...nullsToEmpty(home.rest.aboutIntro ?? {}), bodyText: lexicalToHtml(home.rest.aboutIntro?.bodyText) },
    seo: home.seo,
  });

  const about = await g("about-page");
  await putSettings("about-page", { ...nullsToEmpty(about.rest), storyText: lexicalToHtml(about.rest.storyText), seo: about.seo });

  for (const key of ["fleet-page", "destinations-page", "services-page", "contact-page"]) {
    const page = await g(key);
    await putSettings(key, { ...nullsToEmpty(page.rest), seo: page.seo });
  }

  // SEO & GEO screen: seed business details once; never overwrite what the client has entered.
  const current = await wp<Doc>("/alma/v1/settings/seo");
  if (!current.organization?.name) {
    await putSettings("seo", {
      general: {
        siteUrl: "https://www.almayachting.com",
        siteName: site.companyName || "ALMA Yachting",
        titleTemplate: "%s | ALMA Yachting",
        defaultTitle: home.seo.title || "ALMA Yachting | Luxury Yacht Charter & Management in Greece",
        defaultDescription: home.seo.description,
        locale: "en_US",
        themeColor: "#0A1628",
      },
      social: { sameAs: [site.instagramUrl, site.facebookUrl].filter(Boolean) },
      organization: {
        type: "TravelAgency",
        name: site.companyName || "ALMA Yachting",
        description: site.tagline ?? "",
        phone: site.phone ?? "",
        email: site.email ?? "",
        streetAddress: "46 Archimidous str.",
        locality: "Paleo Faliro",
        region: "Attica",
        postalCode: "17563",
        country: "GR",
        currency: "EUR",
        logo: await uploadMedia({ filename: "alma-logo.png", mimeType: "image/png", alt: "ALMA Yachting", localPath: path.join("public", "alma-logo.png") }),
      },
      location: { placeName: "Piraeus, Athens", region: "GR-I" },
    });
  } else {
    console.log("  SEO & GEO screen already filled in — left unchanged");
  }
}

/* ------------------------------------------------------------------- Menus */

async function ensureMenu(location: string, name: string, items: Array<{ title: string; url: string }>) {
  const locations = await wp<Doc>("/wp/v2/menu-locations");
  if (locations[location]?.menu) {
    console.log(`  menu "${location}" already assigned — left unchanged`);
    return;
  }
  const menu = await wpWrite<Doc>("/wp/v2/menus", { name, locations: [location] }, `create menu ${name}`);
  for (const [i, item] of items.entries()) {
    await wpWrite(
      "/wp/v2/menu-items",
      { title: item.title, url: item.url, menus: menu?.id, menu_order: i + 1, status: "publish", type: "custom" },
      `  menu item ${item.title}`,
    );
  }
  if (!DRY_RUN) console.log(`  created menu "${name}"`);
}

async function migrateMenus() {
  console.log("Menus");
  await ensureMenu("primary", "Main navigation", [
    { title: "Fleet", url: "/fleet" },
    { title: "Destinations", url: "/destinations" },
    { title: "Services", url: "/services" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ]);
  await ensureMenu("footer", "Footer navigation", [
    { title: "Our Story", url: "/about" },
    { title: "Services", url: "/services" },
    { title: "Destinations", url: "/destinations" },
    { title: "Contact Us", url: "/contact" },
  ]);
}

/* -------------------------------------------------------------------- Main */

async function main() {
  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Migrating ${SOURCE} → ${WP_URL}\n`);
  const ping = await fetch(`${WP_URL}/wp-json/alma/v1/settings`);
  if (!ping.ok) throw new Error("The ALMA Headless plugin is not active on WordPress (alma/v1 not found).");

  await loadMediaMap();
  await migrateVessels();
  await migrateDestinations();
  await migrateServices();
  await migrateTeam();
  await migrateSettings();
  await migrateMenus();
  await saveMediaMap();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
