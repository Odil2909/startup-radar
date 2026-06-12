"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/idea-engine";
import { useSavedIdeas } from "@/hooks/useSavedIdeas";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { items, add, remove } = useSavedIdeas();
  const saved = useMemo(
    () => items.some((i) => i.id === idea.id),
    [items, idea.id],
  );

  return (
    <Card className="group bg-surface/90 border-white/10 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{idea.title}</CardTitle>
            <div className="mt-1 text-sm text-muted">
              {idea.category} • {idea.potential}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary">{idea.opportunityScore}</Badge>
            <button
              onClick={() => (saved ? remove(idea.id) : add(idea))}
              className="rounded-full bg-white/5 px-3 py-1 text-xs"
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted line-clamp-3">{idea.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          <span>Difficulty: {idea.difficulty}</span>
          <span>Competition: {idea.competition}</span>
          <span>Build: {idea.estimatedBuildTime}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {idea.monetization.slice(0, 3).map((m) => (
            <span key={m} className="rounded-full bg-white/5 px-3 py-1 text-xs">
              {m}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
