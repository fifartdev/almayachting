/**
 * Seeds the Media collection by uploading all existing local images from
 * public/images/ to Payload (and from there to Vercel Blob in production).
 *
 * Returns a map of localPath → Payload media document ID so that subsequent
 * seed scripts can reference the uploaded media.
 */
import fs from "fs";
import path from "path";
import type { Payload } from "payload";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

interface ImageEntry {
  localPath: string;
  absolutePath: string;
  alt: string;
}

function collectImages(): ImageEntry[] {
  const entries: ImageEntry[] = [];

  function walk(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item)) {
        const rel = "/" + path.relative(PUBLIC_DIR, full).replace(/\\/g, "/");
        entries.push({
          localPath: rel,
          absolutePath: full,
          alt: path
            .basename(item, path.extname(item))
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        });
      }
    }
  }

  walk(path.join(PUBLIC_DIR, "images"));
  return entries;
}

export async function seedMedia(
  payload: Payload,
): Promise<Map<string, string>> {
  const localPathToId = new Map<string, string>();

  console.log("📸 Seeding media...");

  const images = collectImages();
  console.log(`  Found ${images.length} images in public/images/`);

  for (const img of images) {
    // Check if already seeded (using alt text as a proxy — good enough for a one-time seed)
    const existing = await payload.find({
      collection: "media",
      where: { alt: { equals: img.alt } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const doc = existing.docs[0];
      localPathToId.set(img.localPath, doc.id as string);
      console.log(`  ✓ Already exists: ${img.localPath}`);
      continue;
    }

    try {
      const buffer = fs.readFileSync(img.absolutePath);
      const mimeType = img.absolutePath.endsWith(".png") ? "image/png" : "image/jpeg";

      const doc = await payload.create({
        collection: "media",
        data: { alt: img.alt },
        file: {
          data: buffer,
          mimetype: mimeType,
          name: path.basename(img.absolutePath),
          size: buffer.length,
        },
      });

      localPathToId.set(img.localPath, doc.id as string);
      console.log(`  ✓ Uploaded: ${img.localPath}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${img.localPath}`, err);
    }
  }

  console.log(`📸 Media seeding complete. ${localPathToId.size} images mapped.\n`);
  return localPathToId;
}
