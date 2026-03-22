import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],

    // Tell Next.js which widths to pre-generate so the browser
    // always downloads the smallest image that fits the slot.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimised images on the server for 30 days (in seconds).
    // After minimumCacheTTL seconds, Next.js will revalidate lazily
    // (stale-while-revalidate) so users always get a cached copy fast.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days

    // Keep the default loader (Next.js built-in sharp).
    // If you ever move images to a CDN, swap this for a custom loader.
  },

  // Compress all responses (HTML, JS, CSS, JSON) with gzip.
  compress: true,
};

export default nextConfig;
