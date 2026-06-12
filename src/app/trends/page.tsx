import React from "react";
import TrendDashboard from "@/components/trends/TrendDashboard";
import { fetchTopNews } from "@/services/hackernews.service";

export default async function TrendsPage() {
  const stories = await fetchTopNews(40);
  const items = (stories || []).map((d: any) => ({
    id: String(d.id),
    title: d.title,
    score: d.opportunityScore ?? d.score ?? 0,
    category: (d as any).category,
  }));
  return (
    <main className="container mx-auto py-8">
      {/* pass initial items to client component to avoid passing server functions */}
      <TrendDashboard initialItems={items} />
    </main>
  );
}
