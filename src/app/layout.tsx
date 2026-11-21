import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Serif éditorial pour le titrage (justifié : Leke est une publication / archive culturelle)
const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Grotesque pour le texte courant et l'interface
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lekeculture.com"),
  title: {
    default: "Leke — Les cultures africaines, vivantes",
    template: "%s · Leke",
  },
  description:
    "Leke documente et célèbre les cultures vivantes du continent africain et de sa diaspora : patrimoine, textiles, musiques, arts et modes de vie, à travers récits, images et communauté.",
  keywords: [
    "cultures africaines",
    "patrimoine africain",
    "art africain",
    "textiles africains",
    "musiques africaines",
    "diaspora",
    "Leke",
  ],
  manifest: "/icons/manifest.json",
  openGraph: {
    title: "Leke — Les cultures africaines, vivantes",
    description:
      "Patrimoine, textiles, musiques, arts et modes de vie du continent africain et de sa diaspora.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leke",
    description: "Les cultures africaines, vivantes.",
  },
};

export const viewport: Viewport = {
  themeColor: "#c0392b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-background">
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
