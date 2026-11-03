/**
 * Data layer for fleet vessels.
 * Fetches from WordPress. Type shapes are preserved so all existing
 * page components and utility consumers continue to work unchanged.
 */
import { wpCollection, WP_TAGS, type WpImage, type WpPost, type WpSeo } from "@/lib/wordpress";
import { decodeEntities, richTextToPlainText } from "@/lib/richtext";

export interface YachtSpecifications {
  loa: string;
  beam: string;
  draft: string;
  displacement: string;
  sailArea?: string;
  engines: string;
  fuelCapacity: string;
  waterCapacity: string;
  maxSpeed: string;
  cruisingSpeed: string;
}

export interface Yacht {
  id: string;
  name: string;
  slug: string;
  type: string;
  year: number;
  length: string;
  beam: string;
  draft: string;
  guests: number;
  cabins: number;
  bathrooms: number;
  crew: number;
  description: string;
  highlights: string[];
  specifications: YachtSpecifications;
  images: string[];
  heroImage: string;
  startingPrice: number;
  location: string;
  basePort: string;
  seo: WpSeo | null;
  modified?: string;
}

interface VesselFields {
  type: string;
  year: number | null;
  length: string;
  beam: string;
  draft: string;
  guests: number | null;
  cabins: number | null;
  bathrooms: number | null;
  crew: number | null;
  startingPrice: number | null;
  location: string;
  basePort: string;
  highlights: string[];
  specifications: Record<keyof YachtSpecifications, string>;
  images: WpImage[];
}

function mapVesselToYacht(post: WpPost<VesselFields>): Yacht {
  const f = post.fields;
  const specs = f.specifications;

  return {
    id: post.slug,
    name: decodeEntities(post.title.rendered),
    slug: post.slug,
    type: f.type,
    year: f.year ?? 0,
    length: f.length,
    beam: f.beam,
    draft: f.draft,
    guests: f.guests ?? 0,
    cabins: f.cabins ?? 0,
    bathrooms: f.bathrooms ?? 0,
    crew: f.crew ?? 2,
    description: richTextToPlainText(post.content?.rendered),
    highlights: f.highlights,
    specifications: {
      loa: specs.loa,
      beam: specs.beam,
      draft: specs.draft,
      displacement: specs.displacement,
      sailArea: specs.sailArea || undefined,
      engines: specs.engines,
      fuelCapacity: specs.fuelCapacity,
      waterCapacity: specs.waterCapacity,
      maxSpeed: specs.maxSpeed,
      cruisingSpeed: specs.cruisingSpeed,
    },
    heroImage: post.featuredImage?.url ?? "",
    images: f.images.map((image) => image.url),
    startingPrice: f.startingPrice ?? 0,
    location: f.location || "Greece",
    basePort: f.basePort || "Athens, Greece",
    seo: post.fields.seo ?? null,
    modified: post.modified_gmt,
  };
}

export async function getYachts(): Promise<Yacht[]> {
  try {
    const posts = await wpCollection<VesselFields>("vessels", WP_TAGS.vessels);
    return posts.map(mapVesselToYacht);
  } catch {
    return [];
  }
}

export async function getYachtBySlug(slug: string): Promise<Yacht | undefined> {
  const all = await getYachts();
  return all.find((y) => y.slug === slug);
}

export async function getRelatedYachts(slug: string, count = 3): Promise<Yacht[]> {
  const all = await getYachts();
  return all.filter((y) => y.slug !== slug).slice(0, count);
}

/** Legacy synchronous export — kept for any remaining static uses.
 *  Pages that use this directly should be migrated to getYachts(). */
export const yachts: Yacht[] = [];
