"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { NewsStory } from "@/hooks/useNews";
import { analyzeStory } from "@/lib/opportunity-engine";

interface NewsCardProps {
  story: NewsStory;
}

export function NewsCard({ story }: NewsCardProps) {
  const date = story.time ? new Date(story.time * 1000) : null;
  const analysis = analyzeStory({
    ...story,
    descendants: (story as any).descendants ?? 0,
  });

  return (
    <Card className="group bg-surface/90 border-white/10 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg leading-tight">
              {story.title}
            </CardTitle>
            <p className="text-sm text-muted">by {story.by ?? "unknown"}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">HN {story.score ?? 0}</Badge>
              <Badge className="bg-gradient-to-r from-primary to-indigo-500 text-white">
                {analysis.grade} {analysis.opportunityScore}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-muted">
              {analysis.category} • {analysis.potential} potential
            </div>
          </div>
          <div className="flex items-center gap-2">
            {analysis.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/5 px-3 py-1 text-xs"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-xs">
              {date ? date.toLocaleString() : "no date"}
            </div>
            <div className="text-xs text-muted">
              Competition: {analysis.competition} • Difficulty:{" "}
              {analysis.difficulty}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted line-clamp-3">
              {analysis.reasoning}
            </div>
            <div>
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs"
                >
                  Open
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs">
                  No Link
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-background/80 p-5 animate-pulse">
      <div className="h-5 w-3/4 rounded bg-muted" />
      <div className="mt-3 h-3 w-1/3 rounded bg-muted" />
      <div className="mt-4 flex justify-between">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-8 w-20 rounded bg-muted" />
      </div>
    </div>
  );
}
