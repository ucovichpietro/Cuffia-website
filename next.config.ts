import type { NextConfig } from "next";

// Su GitHub Pages il sito è una cartella di file statici sotto /Cuffia-website.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/Cuffia-website" : "";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(pages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  }),
};

export default nextConfig;
