import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateVessel: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revalidatePath("/");
  revalidatePath("/fleet");
  if (doc.slug) revalidatePath(`/fleet/${doc.slug}`);
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidatePath(`/fleet/${previousDoc.slug}`);
  }
  return doc;
};

export const revalidateVesselDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath("/");
  revalidatePath("/fleet");
  if (doc?.slug) revalidatePath(`/fleet/${doc.slug}`);
  return doc;
};
