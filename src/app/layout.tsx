import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Opportunity Radar",
  description: "Discover startup opportunities, trends, and market signals.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-white">
        <Providers>
          <Navbar />
          <div className="min-h-[calc(100vh-8rem)]">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
