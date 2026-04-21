import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import configPromise from "@payload-config";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config: configPromise as any, params, searchParams });

export default function Page({ params, searchParams }: Args) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return RootPage({ config: configPromise as any, params, searchParams, importMap });
}
