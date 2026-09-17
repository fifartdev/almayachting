import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateService: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath("/");
  revalidatePath("/services");
  return doc;
};

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath("/");
  revalidatePath("/services");
  return doc;
};
