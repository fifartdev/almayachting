import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export function createRevalidateGlobalHook(paths: string[]): GlobalAfterChangeHook {
  return ({ doc }) => {
    for (const path of paths) revalidatePath(path);
    return doc;
  };
}

export function createRevalidateLayoutHook(path: string): GlobalAfterChangeHook {
  return ({ doc }) => {
    revalidatePath(path, "layout");
    return doc;
  };
}
