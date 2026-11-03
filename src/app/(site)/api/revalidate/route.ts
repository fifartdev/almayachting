/**
 * Webhook called by the WordPress plugin whenever content changes.
 * Header `x-alma-secret` must equal REVALIDATE_SECRET.
 */
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { WP_TAGS } from "@/lib/wordpress";

// Tags are attached to every fetch, so each page using that content (layout included) refreshes.
const TYPE_TAGS: Record<string, string[]> = {
  vessel: [WP_TAGS.vessels],
  destination: [WP_TAGS.destinations],
  service: [WP_TAGS.services],
  team: [WP_TAGS.team],
  page: [WP_TAGS.pages, WP_TAGS.menus], // unpublished pages drop out of menus
  menu: [WP_TAGS.menus],
};

function authorized(req: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-alma-secret");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { type?: string; key?: string };
  const tags =
    body.type === "settings" && body.key
      ? [WP_TAGS.settings(body.key)]
      : (TYPE_TAGS[body.type ?? ""] ?? [WP_TAGS.all]);

  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: tags });
}
