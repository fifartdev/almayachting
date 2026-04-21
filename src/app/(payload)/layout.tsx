import React from "react";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import { importMap } from "./admin/importMap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serverFunction = async (args: any) => {
  "use server";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (handleServerFunctions as any)({
    ...args,
    config: configPromise,
    importMap,
  });
};

export default async function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = RootLayout as any;
  return (
    <Layout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </Layout>
  );
}
