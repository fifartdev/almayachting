/**
 * Data layer for the Services collection.
 * Fetches from Payload CMS.
 */
import { getPayload } from "@/lib/payload";
import { richTextToPlainText } from "@/lib/richtext";

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
}

function resolveImageUrl(image: unknown): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const img = image as Record<string, unknown>;
  return (img.url as string) || "";
}

function mapDocToService(doc: Record<string, unknown>): Service {
  const features = (doc.features as Array<{ text: string }> | undefined) ?? [];
  const description = richTextToPlainText(doc.description);
  return {
    id: (doc.slug as string) || (doc.id as string),
    slug: doc.slug as string,
    order: (doc.order as number) ?? 99,
    title: doc.title as string,
    subtitle: (doc.subtitle as string) ?? "",
    shortDescription: (doc.shortDescription as string) || description,
    description,
    longDescription: richTextToPlainText(doc.longDescription),
    features: features.map((f) => f.text),
    image: resolveImageUrl(doc.image),
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "services",
      limit: 100,
      sort: "order",
    });
    return result.docs.map((doc) => mapDocToService(doc as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}
