import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { SITE_URL } from "@/lib/news";
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
    default: "KEB News",
    template: "%s | KEB News",
  },
  description:
    "KEB News is an editorial-style AI and tech publication with original briefings written from primary-source material.",
  openGraph: {
    title: "KEB News",
    description:
      "Original AI and tech briefings written from the source file, with an elegant front page built for real readers.",
    siteName: "KEB News",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "KEB News",
    description:
      "Original AI and tech briefings written from the source file, not just outbound links.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
