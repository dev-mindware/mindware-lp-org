import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { socialProfiles } from "./sitemap";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mindware.ao"),
  title: {
    default: "Mindware | Empresa de Tecnologia em Angola",
    template: "%s | Mindware",
  },
  description:
    "Mindware: empresa de tecnologia em Angola especializada em desenvolvimento web, apps móveis, branding e email profissional. Soluções digitais para empresas em Luanda.",
  keywords: [
    "empresa de tecnologia em Angola",
    "desenvolvimento web em Angola",
    "criação de sites profissionais em Luanda",
    "desenvolvimento de aplicativos móveis em Angola",
    "empresa de software em Angola",
    "transformação digital para empresas",
    "design UX/UI em Angola",
    "agência digital em Luanda",
    "desenvolvimento de sistemas sob medida",
    "consultoria em tecnologia Angola",
  ],
  authors: [{ name: "Mindware", url: "https://mindware.ao" }],
  creator: "Mindware",
  publisher: "Mindware",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://mindware.ao",
    siteName: "Mindware",
    title: "Mindware | Empresa de Tecnologia em Angola",
    description:
      "Mindware: empresa de tecnologia em Angola especializada em desenvolvimento web, apps móveis, branding e email profissional. Soluções digitais para empresas em Luanda.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindware — Transformando Ideias em Realidade Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindware | Empresa de Tecnologia em Angola",
    description:
      "Soluções digitais premium: websites, apps, branding e email profissional para empresas em Angola.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD: tells Google which social profiles belong to this Organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mindware",
    url: "https://mindware.ao",
    logo: "https://mindware.ao/icon.png",
    sameAs: Object.values(socialProfiles),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+244-926-665-793",
      contactType: "customer support",
      availableLanguage: ["Portuguese"],
    },
  };

  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="mIQkIZQqVY4KID4F5fVH2d6VQsDGWrOo0MTltCKSNUc"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${satoshi.className} antialiased font-sans flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="grow">{children}</main>
          <Analytics />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
