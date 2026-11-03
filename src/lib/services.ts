/**
 * Data layer for the Services collection.
 * Fetches from WordPress.
 */
import { wpCollection, WP_TAGS, type WpPost, type WpSeo } from "@/lib/wordpress";
import { decodeEntities, richTextToPlainText } from "@/lib/richtext";

export interface Service {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  seo: WpSeo | null;
  modified?: string;
}

interface ServiceFields {
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
}

function mapPostToService(post: WpPost<ServiceFields>): Service {
  const f = post.fields;
  const description = richTextToPlainText(post.content?.rendered);
  return {
    id: post.slug,
    slug: post.slug,
    order: post.menu_order ?? 99,
    title: decodeEntities(post.title.rendered),
    subtitle: f.subtitle,
    shortDescription: f.shortDescription || description,
    description,
    longDescription: richTextToPlainText(f.longDescription),
    features: f.features,
    image: post.featuredImage?.url ?? "",
    seo: post.fields.seo ?? null,
    modified: post.modified_gmt,
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const posts = await wpCollection<ServiceFields>("services", WP_TAGS.services);
    return posts.map(mapPostToService);
  } catch {
    return [];
  }
}
