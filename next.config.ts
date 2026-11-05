import type { NextConfig } from "next";

// WordPress media (featured images, galleries, hero slides) is served from the CMS host.
const wpHost = process.env.WP_URL ? new URL(process.env.WP_URL).hostname : "cms.almayachting.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wpHost,
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
