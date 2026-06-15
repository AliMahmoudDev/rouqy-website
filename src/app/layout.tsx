import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
});

const siteUrl = "https://rouqy.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b2b2a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ROUQY — Where Vision Meets Refinement",
    template: "%s | ROUQY Interior Design",
  },
  description:
    "ROUQY is a luxury interior design studio dedicated to transforming ideas into exceptional spaces. From concept development to final execution, we deliver tailored environments defined by precision, sophistication, and enduring quality.",
  keywords: [
    "ROUQY",
    "interior design",
    "luxury interiors",
    "Riyadh interior design",
    "Saudi Arabia interior design",
    "luxury design studio",
    "concept development",
    "refined spaces",
    "sophisticated design",
  ],
  authors: [{ name: "ROUQY", url: siteUrl }],
  creator: "ROUQY",
  publisher: "ROUQY",
  category: "Interior Design",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "ROUQY — Where Vision Meets Refinement",
    description:
      "A luxury interior design studio dedicated to transforming ideas into exceptional spaces. Precision, sophistication, and enduring quality.",
    url: siteUrl,
    siteName: "ROUQY",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ROUQY — Luxury Interior Design Studio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ROUQY — Where Vision Meets Refinement",
    description:
      "A luxury interior design studio dedicated to transforming ideas into exceptional spaces.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-[#0b2b2a] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
