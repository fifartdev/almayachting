import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getYachts, getYachtBySlug, getRelatedYachts } from "@/lib/yachts";
import YachtDetailClient from "./YachtDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const yachts = await getYachts();
    return yachts.map((yacht) => ({ slug: yacht.slug }));
  } catch {
    // Fallback: known slugs prevent build failure if DB is unreachable
    return [
      { slug: "lagoon-55" },
      { slug: "lagoon-51" },
      { slug: "lagoon-46" },
      { slug: "fountaine-pajot-51" },
      { slug: "fountaine-pajot-44" },
    ];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) return { title: "Yacht Not Found" };

  return {
    title: yacht.name,
    description: `${yacht.name} — ${yacht.type}, ${yacht.year}. ${yacht.guests} guests, ${yacht.cabins} cabins. From €${yacht.startingPrice.toLocaleString()}/week. Based in ${yacht.basePort}.`,
    openGraph: {
      images: yacht.heroImage ? [{ url: yacht.heroImage }] : [],
    },
  };
}

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) notFound();

  const related = await getRelatedYachts(slug, 3);

  return <YachtDetailClient yacht={yacht} related={related} />;
}
