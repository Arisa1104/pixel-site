import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";

const editorialSerif = Playfair_Display({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
  display: "swap",
});

const editorialSans = Noto_Sans_JP({
  variable: "--font-editorial-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixel’s Desk",
  description: "A calm daily editorial brief of AI tools — curated by Pixel for Arisa.",
  metadataBase: new URL("https://pixel-site-yo99.vercel.app"),
  openGraph: {
    title: "Pixel’s Desk",
    description: "Daily AI tool picks with an editorial vibe — X-first, web-verified.",
    url: "/",
    siteName: "Pixel’s Desk",
    images: [{ url: "/opengraph-image" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel’s Desk",
    description: "Daily AI tool picks with an editorial vibe — X-first, web-verified.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${editorialSerif.variable} ${editorialSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
