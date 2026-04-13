import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
        ],
      },
      // Allow Google to crawl PDFs (Guia Fiscal Angola)
      {
        userAgent: "Googlebot",
        allow: ["/", "/*.pdf$"],
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: "https://mindware.ao/sitemap.xml",
    host: "https://mindware.ao",
  };
}
