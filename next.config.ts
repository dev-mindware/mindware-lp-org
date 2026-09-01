import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot",
    ],
  },

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|ico|mp4|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // A política de cookies passou a ser uma secção da política de
      // privacidade — mantém os links antigos válidos.
      {
        source: "/cookie-policy",
        destination: "/privacy-policy#cookies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
