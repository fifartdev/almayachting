import type { Access } from "payload";

export type UserRole = "superadmin" | "contentEditor";

export const isSuperadmin: Access = ({ req }) => {
  return req.user?.role === "superadmin";
};

export const isEditor: Access = ({ req }) => {
  return req.user?.role === "contentEditor" || req.user?.role === "superadmin";
};

export const isLoggedIn: Access = ({ req }) => {
  return Boolean(req.user);
};

/** Editors can create/read/update but only superadmin can delete */
export const contentEditorCreate: Access = ({ req }) =>
  Boolean(req.user?.role === "contentEditor" || req.user?.role === "superadmin");

export const contentEditorDelete: Access = ({ req }) =>
  req.user?.role === "superadmin";

/** Slug field: only superadmin can change slugs to prevent broken links */
export const slugFieldAccess = {
  update: ({ req }: { req: { user?: { role?: string } } }) =>
    req.user?.role === "superadmin",
};
