import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  allowedDevOrigins: ["[::]", "localhost"],
  devIndicators: false,
}

export default nextConfig
