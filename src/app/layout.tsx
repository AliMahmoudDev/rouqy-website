import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://rouqy.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#13140f" },
    { media: "(prefers-color-scheme: light)", color: "#13140f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // === CORE SEO ===
  title: {
    default: "ROUQY — Where Elegance Meets Artistry",
    template: "%s | ROUQY",
  },
  description:
    "ROUQY is a premier design studio crafting timeless luxury experiences across Saudi Arabia and the Gulf. Specializing in interior design, architecture, and bespoke living spaces.",
  keywords: [
    "ROUQY",
    "interior design",
    "luxury interiors",
    "architecture",
    "Saudi Arabia interior design",
    "Riyadh interior design",
    "Gulf architecture",
    "marble works",
    "wood works",
    "fit-out",
    "furniture solutions",
    "luxury residential design",
    "commercial interior design",
    "hospitality design",
    "concept design",
    "space planning",
  ],
  authors: [{ name: "ROUQY", url: siteUrl }],
  creator: "ROUQY",
  publisher: "ROUQY",
  category: "Interior Design & Architecture",
  classification: "Interior Design Services",

  // === FAVICONS & ICONS ===
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/favicon.svg", rel: "mask-icon", color: "#1d372d" },
    ],
  },

  // === OPEN GRAPH (Facebook, LinkedIn, etc.) ===
  openGraph: {
    title: "ROUQY — Where Elegance Meets Artistry",
    description:
      "Premier design studio crafting timeless luxury experiences across Saudi Arabia and the Gulf.",
    url: siteUrl,
    siteName: "ROUQY",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ROUQY — Where Elegance Meets Artistry",
        type: "image/png",
      },
    ],
  },

  // === TWITTER CARD ===
  twitter: {
    card: "summary_large_image",
    title: "ROUQY — Where Elegance Meets Artistry",
    description:
      "Premier design studio crafting timeless luxury experiences across Saudi Arabia and the Gulf.",
    images: ["/og-image.png"],
    creator: "@rouqy",
    site: "@rouqy",
  },

  // === ROBOTS ===
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // === ALTERNATE ===
  alternates: {
    canonical: siteUrl,
  },

  // === APP LINKS ===
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "ROUQY",
    "format-detection": "telephone=no",
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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#13140f] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
