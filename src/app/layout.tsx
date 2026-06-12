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
  title: "HARMENS — Designed To Be Felt Before It's Seen",
  description:
    "HARMENS is a premier interior design & architecture firm crafting timeless luxury interiors. 200+ projects, 25+ years of experience across Saudi Arabia and the Gulf.",
  keywords: [
    "HARMENS",
    "interior design",
    "architecture",
    "luxury interiors",
    "Saudi Arabia",
    "Riyadh",
    "marble works",
    "wood works",
    "fit-out",
    "furniture solutions",
  ],
  authors: [{ name: "HARMENS" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "HARMENS — Designed To Be Felt Before It's Seen",
    description:
      "Premier interior design & architecture firm crafting timeless luxury interiors across Saudi Arabia and the Gulf.",
    url: "https://harmensdesign.com",
    siteName: "HARMENS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HARMENS — Designed To Be Felt Before It's Seen",
    description:
      "Premier interior design & architecture firm crafting timeless luxury interiors.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161E2D] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
