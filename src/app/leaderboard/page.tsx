"use client";

import { useMemo, useState } from "react";
import { useNews } from "@/hooks/useNews";
import { analyzeStory } from "@/lib/opportunity-engine";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LeaderboardPage() {
  const { data, isLoading, error } = useNews(50);
  const [filter, setFilter] = useState<string>("highest-score");

  const list = useMemo(() => {
    if (!data) return [];
    const mapped = data.map((s) => ({
      s,
      a: analyzeStory({ ...s, descendants: (s as any).descendants ?? 0 }),
    }));
    switch (filter) {
      case "lowest-competition":
        return mapped.sort((x, y) =>
          x.a.competition === y.a.competition
            ? y.a.opportunityScore - x.a.opportunityScore
            : x.a.competition === "Low"
              ? -1
              : 1,
        );
      case "highest-potential":
        return mapped.sort(
          (x, y) => y.a.opportunityScore - x.a.opportunityScore,
        );
      case "newest":
        return mapped.sort((x, y) => (y.s.time ?? 0) - (x.s.time ?? 0));
      default:
        return mapped.sort(
          (x, y) => y.a.opportunityScore - x.a.opportunityScore,
        );
    }
  }, [data, filter]);

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="mt-2 text-sm text-muted">Top opportunities</p>

        <div className="mt-6 flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded bg-background/60 p-2 text-sm"
          >
            <option value="highest-score">Highest Score</option>
            <option value="lowest-competition">Lowest Competition</option>
            <option value="highest-potential">Highest Potential</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <div>Loading...</div>}
          {error && <div className="text-sm text-muted">{error.message}</div>}
          {!isLoading &&
            !error &&
            list.map(({ s, a }) => (
              <Card key={s.id} className="p-4">
                <CardHeader>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                  <div className="text-xs text-muted">
                    {a.category} • {a.potential}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      Score: {a.opportunityScore} ({a.grade})
                    </div>
                    <a
                      href={s.url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs"
                    >
                      Open
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
        </section>
      </div>
    </main>
  );
}
