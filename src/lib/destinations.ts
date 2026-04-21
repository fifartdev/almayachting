/**
 * Data layer for sailing destinations.
 * Fetches from Payload CMS. Type shape preserved.
 */
import { getPayload } from "@/lib/payload";

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
}

function resolveImageUrl(image: unknown): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const img = image as Record<string, unknown>;
  return (img.url as string) || "";
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

function mapDocToDestination(doc: Record<string, unknown>): Destination {
  const highlights = (doc.highlights as Array<{ text: string }> | undefined) ?? [];
  return {
    id: (doc.slug as string) || (doc.id as string),
    name: doc.name as string,
    region: doc.region as string,
    description: extractPlainText(doc.description),
    shortDescription: (doc.shortDescription as string) ?? "",
    image: resolveImageUrl(doc.image),
    highlights: highlights.map((h) => h.text),
    bestSeason: (doc.bestSeason as string) ?? "",
    distance: (doc.distance as string) ?? "",
  };
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "destinations",
      limit: 100,
      sort: "name",
    });
    return result.docs.map((doc) => mapDocToDestination(doc as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

/** Legacy synchronous export — pages should migrate to getDestinations(). */
export const destinations: Destination[] = [];
