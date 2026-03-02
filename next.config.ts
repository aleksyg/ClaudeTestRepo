import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ClaudeTestRepo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
