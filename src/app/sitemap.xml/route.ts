import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const pages = [
    "/",
    "/opportunities",
    "/trending",
    "/startups",
    "/dashboard",
    "/ai",
    "/gaming",
    "/opportunity-of-the-day",
    "/analyze",
    "/favorites",
  ];
  const urls = pages
    .map((p) => `<url><loc>${baseUrl}${p}</loc></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
