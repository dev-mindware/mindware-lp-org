import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Analytics } from "@vercel/analytics/next"

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
    "software development",
    "web development",
    "mobile apps",
    "digital transformation",
  ],
  icons: {
    icon: "/icon_white.ico",
    shortcut: "/icon_white.ico",
    apple: "/icon_white.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshi.className} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
