import { MetadataRoute } from "next";

const BASE_URL = "https://mindware.ao";

// ─── Social Media Profiles ────────────────────────────────────────────────────
// Listed separately – not part of the XML sitemap (Google ignores external URLs)
// but exported for use in metadata/JSON-LD structured data.
export const socialProfiles = {
  facebook: "https://www.facebook.com/profile.php?id=61574905379786",
  instagram: "https://www.instagram.com/mind.ware/",
  linkedin: "https://www.linkedin.com/company/mindware-ces",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=926665793&text&type=phone_number&app_absent=0",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ─── Core Pages ─────────────────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fyi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },

    // ─── Blog Categories ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/blog/categories/inteligencia-artificial`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/blog/categories/front-end`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/blog/categories/back-end`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/blog/categories/soft-skills`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.62,
    },

    // ─── Blog Posts (known static paths from build) ──────────────────────────
    {
      url: `${BASE_URL}/blog/como-ia-muda-aprendizado-programacao`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/alem-do-copilot-workflows-agenticos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/visao-computacional-com-python`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },

    // ─── Legal Pages ────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    // ─── Service Page Anchors ────────────────────────────────────────────────
    {
      url: `${BASE_URL}/service#branding-section`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/service#website-section`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/service#email-section`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/service#pricing-section`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    // ─── FYI Topic Anchors ───────────────────────────────────────────────────
    {
      url: `${BASE_URL}/fyi#facturacao-electronica`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/fyi#software-certificado-agt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/fyi#codigo-hash`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fyi#iva-angola`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/fyi#retencao-na-fonte`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fyi#arquivo-digital`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    // ─── FYI Document Type Anchors ───────────────────────────────────────────
    {
      url: `${BASE_URL}/fyi#factura`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${BASE_URL}/fyi#factura-recibo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fyi#recibo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${BASE_URL}/fyi#factura-proforma`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${BASE_URL}/fyi#nota-de-credito`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
    },

    // ─── Homepage Section Anchors ────────────────────────────────────────────
    {
      url: `${BASE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#products`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${BASE_URL}/#faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },

    // ─── Downloadable Resources ──────────────────────────────────────────────
    {
      url: `${BASE_URL}/Guia%20Fiscal%20Angola.pdf`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
