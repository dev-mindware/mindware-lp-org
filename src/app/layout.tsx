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
  title: "Mindware | Transformando Ideias em Realidade Digital",
  description:
    "A Mindware é uma empresa de Tecnologia especializada em desenvolvimento web, aplicações móveis, design e transformação digital.",
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
