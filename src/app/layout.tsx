import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Leke Culture - Art, Tradition et Fierté Africaine",
  description: "Découvrez la richesse de la culture ivoirienne et africaine à travers nos articles, événements et communauté passionnée. Explorez la danse Zaouli, l'artisanat traditionnel et bien plus.",
  keywords: "culture ivoirienne, tradition africaine, danse Zaouli, artisanat, Côte d'Ivoire, communauté culturelle",
  openGraph: {
    title: "Leke Culture - Art, Tradition et Fierté Africaine",
    description: "Découvrez la richesse de la culture ivoirienne et africaine",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leke Culture",
    description: "Art, Tradition et Fierté Africaine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
