import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { VibeProvider } from "@/components/vibe-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

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
  title: "Pixel's Desk",
  description: "A calm daily editorial brief of AI tools — curated by Pixel for Arisa.",
  metadataBase: new URL("https://heypixel.dev"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Pixel's Desk",
    description: "Daily AI tool picks with an editorial vibe — X-first, web-verified.",
    url: "/",
    siteName: "Pixel's Desk",
    images: [{ url: "/og-image.png", width: 1312, height: 736 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel's Desk",
    description: "Daily AI tool picks with an editorial vibe — X-first, web-verified.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${editorialSerif.variable} ${editorialSans.variable} ${geistMono.variable} antialiased`}>
        <ConvexClientProvider>
          <ThemeProvider>
            <VibeProvider>
              {children}
            </VibeProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
