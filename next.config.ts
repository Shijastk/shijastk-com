import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 Cache Components — enables `'use cache'`, cacheTag and cacheLife.
  cacheComponents: true,
  images: {
    remotePatterns: [
      // GitHub avatars + repo OpenGraph images
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      // Supabase Storage (project covers/screenshots). Host is taken from the
      // project URL at runtime; the wildcard keeps any *.supabase.co bucket valid.
      { protocol: "https", hostname: "*.supabase.co" },
      // Backblaze B2 / S3-compatible storage (admin-uploaded project images).
      // B2 S3 endpoints are multi-level: s3.<region>.backblazeb2.com
      // Next.js wildcard only matches one level, so we need two patterns.
      { protocol: "https", hostname: "*.backblazeb2.com" },
      { protocol: "https", hostname: "*.*.backblazeb2.com" },
    ],
  },
};

export default nextConfig;
