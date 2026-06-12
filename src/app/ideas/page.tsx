import { fetchTopNews } from "@/services/hackernews.service";
import { generateIdeasFromStories } from "@/lib/idea-engine";
import React, { Suspense } from "react";
import IdeaGrid from "@/components/ideas/IdeaGrid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = { title: "Ideas - Opportunity Radar" };

export default async function IdeasPage() {
  const stories = await fetchTopNews(60);
  const ideas = await generateIdeasFromStories(stories, 100);

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Idea Generator</CardTitle>
            <div className="text-sm text-muted">
              Discover startup ideas generated from Hacker News signals.
            </div>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="py-6 text-sm text-muted">Loading ideas...</div>
              }
            >
              <IdeaGrid initialIdeas={ideas} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
