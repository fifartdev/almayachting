/**
 * Data layer for team members (WordPress → Team), shown on the About page.
 */
import { wpCollection, WP_TAGS, type WpImage } from "@/lib/wordpress";
import { decodeEntities } from "@/lib/richtext";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: WpImage | null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const posts = await wpCollection<{ role: string; bio: string }>("team-members", WP_TAGS.team);
    return posts.map((post) => ({
      id: post.id,
      name: decodeEntities(post.title.rendered),
      role: post.fields.role,
      bio: post.fields.bio,
      photo: post.featuredImage,
    }));
  } catch {
    return [];
  }
}
