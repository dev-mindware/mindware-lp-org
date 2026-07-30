import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
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
