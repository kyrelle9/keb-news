import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/news";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  keywords: [
    "AI news",
    "tech news",
    "OpenAI",
    "Google Gemini",
    "Anthropic",
    "enterprise AI",
    "AI infrastructure",
  ],
  openGraph: {
    title: SITE_NAME,
    description:
      "Original reporting on AI systems, products, labor, and enterprise software, designed to read like a real publication.",
    images: [
      {
        alt: `${SITE_NAME} logo`,
        height: 1024,
        url: "/brand/keb-news-logo.png",
        width: 1536,
      },
    ],
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Original reporting on AI systems, products, labor, and enterprise software.",
    images: ["/brand/keb-news-logo.png"],
  },
  icons: {
    apple: [{ type: "image/png", url: "/brand/keb-news-icon.png" }],
    icon: [{ type: "image/png", url: "/brand/keb-news-icon.png" }],
    shortcut: ["/brand/keb-news-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
