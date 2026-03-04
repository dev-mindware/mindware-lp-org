import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";

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
    "A Mindware é uma empresa de desenvolvimento de software full-cycle especializada em desenvolvimento web, aplicações móveis e transformação digital.",
  keywords: [
    "tecnologia",
    "angola",
    "mindware",
    "desenvolvimento web",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="mIQkIZQqVY4KID4F5fVH2d6VQsDGWrOo0MTltCKSNUc"
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
