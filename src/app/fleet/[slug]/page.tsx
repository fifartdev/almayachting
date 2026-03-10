import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { yachts, getYachtBySlug, getRelatedYachts } from "@/lib/yachts";
import YachtDetailClient from "./YachtDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return yachts.map((yacht) => ({
    slug: yacht.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    return {
      title: "Yacht Not Found",
    };
  }

  return {
    title: yacht.name,
    description: `${yacht.name} — ${yacht.type}, ${yacht.year}. ${yacht.guests} guests, ${yacht.cabins} cabins. From €${yacht.startingPrice.toLocaleString()}/week. Based in ${yacht.basePort}.`,
    openGraph: {
      images: [{ url: `${yacht.heroImage.split("?")[0]}` }],
    },
  };
}

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    notFound();
  }

  const related = getRelatedYachts(slug, 3);

  return <YachtDetailClient yacht={yacht} related={related} />;
}
