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

const siteUrl = "https://harmensdesign.com";

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
    default: "HARMENS — Designed To Be Felt Before It's Seen",
    template: "%s | HARMENS Interior Design",
  },
  description:
    "HARMENS is a premier interior design & architecture firm crafting timeless luxury interiors across Saudi Arabia and the Gulf. 200+ projects, 25+ years of experience in residential, commercial, and hospitality design.",
  keywords: [
    "HARMENS",
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
  authors: [{ name: "HARMENS", url: siteUrl }],
  creator: "HARMENS",
  publisher: "HARMENS",
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
      { url: "/favicon.svg", rel: "mask-icon", color: "#D4AF37" },
    ],
  },

  // === OPEN GRAPH (Facebook, LinkedIn, etc.) ===
  openGraph: {
    title: "HARMENS — Designed To Be Felt Before It's Seen",
    description:
      "Premier interior design & architecture firm crafting timeless luxury interiors across Saudi Arabia and the Gulf. 200+ projects, 25+ years of excellence.",
    url: siteUrl,
    siteName: "HARMENS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HARMENS — Premier Interior Design & Architecture",
        type: "image/png",
      },
    ],
  },

  // === TWITTER CARD ===
  twitter: {
    card: "summary_large_image",
    title: "HARMENS — Designed To Be Felt Before It's Seen",
    description:
      "Premier interior design & architecture firm crafting timeless luxury interiors across Saudi Arabia and the Gulf.",
    images: ["/og-image.png"],
    creator: "@harmens",
    site: "@harmens",
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
    "apple-mobile-web-app-title": "HARMENS",
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
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#13140f] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
