import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Opportunity Radar",
  description: "Discover startup opportunities, trends, and market signals.",
  openGraph: {
    title: "Opportunity Radar",
    description: "Discover startup opportunities, trends, and market signals.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opportunity Radar",
    description: "Discover startup opportunities, trends, and market signals.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3558776123499527"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-background text-white">
        <Providers>
          <Navbar />
          <div className="min-h-[calc(100vh-8rem)]">{children}</div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
