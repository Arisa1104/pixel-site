import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixel — your futuristic AI sidekick",
  description:
    "Pixel is the assistant persona running inside Clawdbot: daily digests, web scouting, reminders, and Discord delivery.",
  metadataBase: new URL("https://pixel-site-pied.vercel.app"),
  openGraph: {
    title: "Pixel — your futuristic AI sidekick",
    description:
      "Daily digests • Web scouting • Automations • Discord delivery (powered by Clawdbot).",
    url: "/",
    siteName: "Pixel",
    images: [{ url: "/opengraph-image" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel — your futuristic AI sidekick",
    description:
      "Daily digests • Web scouting • Automations • Discord delivery (powered by Clawdbot).",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
