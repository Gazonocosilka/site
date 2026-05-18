import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Produce a static export to ./out when running `next build`.
  // Lets the site be opened as plain HTML files or uploaded to any static host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
