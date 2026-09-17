import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateDestination: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath("/");
  revalidatePath("/destinations");
  return doc;
};

export const revalidateDestinationDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath("/");
  revalidatePath("/destinations");
  return doc;
};
