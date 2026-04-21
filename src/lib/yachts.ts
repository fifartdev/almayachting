/**
 * Data layer for fleet vessels.
 * Fetches from Payload CMS. Type shapes are preserved so all existing
 * page components and utility consumers continue to work unchanged.
 */
import { getPayload } from "@/lib/payload";

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
}

function resolveImageUrl(image: unknown): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const img = image as Record<string, unknown>;
  // Vercel Blob URL takes priority; fallback to local url field
  return (img.url as string) || "";
}

function mapVesselToYacht(doc: Record<string, unknown>): Yacht {
  const highlights = (doc.highlights as Array<{ text: string }> | undefined) ?? [];
  const images = (doc.images as Array<{ image: unknown }> | undefined) ?? [];
  const specs = (doc.specifications as Record<string, string>) ?? {};

  return {
    id: (doc.slug as string) || (doc.id as string),
    name: doc.name as string,
    slug: doc.slug as string,
    type: doc.type as string,
    year: doc.year as number,
    length: doc.length as string,
    beam: doc.beam as string,
    draft: doc.draft as string,
    guests: doc.guests as number,
    cabins: doc.cabins as number,
    bathrooms: doc.bathrooms as number,
    crew: (doc.crew as number) ?? 2,
    description: extractPlainText(doc.description),
    highlights: highlights.map((h) => h.text),
    specifications: {
      loa: specs.loa ?? "",
      beam: specs.beam ?? "",
      draft: specs.draft ?? "",
      displacement: specs.displacement ?? "",
      sailArea: specs.sailArea,
      engines: specs.engines ?? "",
      fuelCapacity: specs.fuelCapacity ?? "",
      waterCapacity: specs.waterCapacity ?? "",
      maxSpeed: specs.maxSpeed ?? "",
      cruisingSpeed: specs.cruisingSpeed ?? "",
    },
    heroImage: resolveImageUrl(doc.heroImage),
    images: images.map((item) => resolveImageUrl(item.image)).filter(Boolean),
    startingPrice: doc.startingPrice as number,
    location: (doc.location as string) ?? "Greece",
    basePort: (doc.basePort as string) ?? "Athens, Greece",
  };
}

function extractPlainText(richText: unknown): string {
  if (!richText) return "";
  if (typeof richText === "string") return richText;
  try {
    const rt = richText as { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } };
    return (rt.root?.children ?? [])
      .flatMap((block) => block.children ?? [])
      .map((node) => node.text ?? "")
      .join(" ");
  } catch {
    return "";
  }
}

export async function getYachts(): Promise<Yacht[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "vessels",
      limit: 100,
      sort: "name",
    });
    return result.docs.map((doc) => mapVesselToYacht(doc as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getYachtBySlug(slug: string): Promise<Yacht | undefined> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "vessels",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (result.docs.length === 0) return undefined;
    return mapVesselToYacht(result.docs[0] as unknown as Record<string, unknown>);
  } catch {
    return undefined;
  }
}

export async function getRelatedYachts(slug: string, count = 3): Promise<Yacht[]> {
  const all = await getYachts();
  return all.filter((y) => y.slug !== slug).slice(0, count);
}

/** Legacy synchronous export — kept for any remaining static uses.
 *  Pages that use this directly should be migrated to getYachts(). */
export const yachts: Yacht[] = [];
