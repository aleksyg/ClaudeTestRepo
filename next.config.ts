import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Set basePath to your GitHub repo name when deploying to GitHub Pages
  // e.g. basePath: "/ClaudeTestRepo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
