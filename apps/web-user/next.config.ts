import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  allowedDevOrigins: ["[::]", "localhost"],
  devIndicators: false,
  transpilePackages: ["@repo/validation", "@repo/types"],
}

export default nextConfig
