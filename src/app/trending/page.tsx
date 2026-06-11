import Link from "next/link";
import { trends } from "@/data/trends";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Trending
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Fast-moving market trends
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Discover emerging categories with the strongest momentum.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            View Opportunities
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {trends.map((trend) => (
            <Card
              key={trend.id}
              className="bg-surface/90 border-slate-800 shadow-soft"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{trend.title}</CardTitle>
                  <Badge variant="secondary">{trend.trendScore}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted">
                Source: {trend.source}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
