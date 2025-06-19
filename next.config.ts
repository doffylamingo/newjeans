import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ik.imagekit.io/**"),
      new URL("https://cdn.discordapp.com/**"),
    ],
  },
};

export default nextConfig;
