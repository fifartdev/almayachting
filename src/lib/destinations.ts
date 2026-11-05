/**
 * Data layer for sailing destinations.
 * Fetches from WordPress. Type shape preserved.
 */
import { wpCollection, WP_TAGS, type WpPost, type WpSeo } from "@/lib/wordpress";
import { decodeEntities, richTextToPlainText } from "@/lib/richtext";

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  shortDescription: string;
  image: string;
  highlights: string[];
  bestSeason: string;
  distance: string;
  latitude: number | null;
  longitude: number | null;
  seo: WpSeo | null;
  modified?: string;
}

interface DestinationFields {
  region: string;
  shortDescription: string;
  highlights: string[];
  bestSeason: string;
  distance: string;
  latitude: number | null;
  longitude: number | null;
}

function mapPostToDestination(post: WpPost<DestinationFields>): Destination {
  const f = post.fields;
  return {
    id: post.slug,
    name: decodeEntities(post.title.rendered),
    region: f.region,
    description: richTextToPlainText(post.content?.rendered),
    shortDescription: f.shortDescription,
    image: post.featuredImage?.url ?? "",
    highlights: f.highlights,
    bestSeason: f.bestSeason,
    distance: f.distance,
    latitude: f.latitude ?? null,
    longitude: f.longitude ?? null,
    seo: post.fields.seo ?? null,
    modified: post.modified_gmt,
  };
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const posts = await wpCollection<DestinationFields>("destinations", WP_TAGS.destinations);
    return posts.map(mapPostToDestination);
  } catch {
    return [];
  }
}

/** Legacy synchronous export — pages should migrate to getDestinations(). */
export const destinations: Destination[] = [];
