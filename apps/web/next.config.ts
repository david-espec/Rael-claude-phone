import type { NextConfig } from "next";

// Set by the GitHub Pages workflow so the site works from /<repo>/.
// Empty locally, so `npm run dev` / `npm run build` still work at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
