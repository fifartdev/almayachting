/**
 * Data layer for client-managed pages (native WordPress Pages), rendered by the
 * standard page template at /[...slug].
 */
import { wpCollection, WP_TAGS, type WpImage, type WpPost, type WpSeo } from "@/lib/wordpress";
import { decodeEntities } from "@/lib/richtext";

interface PageFields {
  heroLabel: string;
  heroSubtitle: string;
  cta: {
    enabled: boolean;
    heading: string;
    bodyText: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export interface SitePage {
  id: number;
  title: string;
  /** Site-relative path, e.g. "/charter-guide" or "/guides/hydra". */
  path: string;
  /** Block editor HTML. */
  content: string;
  heroImage: WpImage | null;
  heroLabel: string;
  heroSubtitle: string;
  cta: PageFields["cta"];
  seo: WpSeo | null;
  modified?: string;
}

function pathFromLink(link: string): string {
  // "PATHINFO" permalinks (/index.php/slug/) are used on servers without URL rewriting.
  const path = new URL(link).pathname.replace(/^\/index\.php(?=\/|$)/, "").replace(/\/+$/, "");
  return path || "/";
}

function mapPage(post: WpPost<PageFields>): SitePage {
  return {
    id: post.id,
    title: decodeEntities(post.title.rendered),
    path: pathFromLink(post.link),
    content: post.content?.rendered ?? "",
    heroImage: post.featuredImage,
    heroLabel: post.fields.heroLabel,
    heroSubtitle: post.fields.heroSubtitle,
    cta: post.fields.cta,
    seo: post.fields.seo ?? null,
    modified: post.modified_gmt,
  };
}

export async function getPages(): Promise<SitePage[]> {
  try {
    const posts = await wpCollection<PageFields>("pages", WP_TAGS.pages);
    return posts.map(mapPage);
  } catch {
    return [];
  }
}

export async function getPageByPath(path: string): Promise<SitePage | undefined> {
  const pages = await getPages();
  return pages.find((page) => page.path === path);
}
