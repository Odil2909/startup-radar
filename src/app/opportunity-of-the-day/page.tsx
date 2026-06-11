import {
  fetchTopStories,
  mapStoryToOpportunity,
} from "@/services/hackernews.service";
import { scoreOpportunity } from "@/lib/opportunity-score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Opportunity of the Day - Opportunity Radar",
  description: "Daily highest scoring opportunity sourced from Hacker News.",
};

export default async function OpportunityOfTheDayPage() {
  const stories = await fetchTopStories(40);
  const opportunities = stories.map(mapStoryToOpportunity);
  const scored = opportunities.map((op) => ({
    op,
    score: scoreOpportunity(op, opportunities),
  }));
  scored.sort((a, b) => b.score.score - a.score.score);
  const top = scored[0];

  if (!top) {
    return (
      <main className="min-h-screen bg-background text-white">
        <div className="mx-auto max-w-4xl px-4 py-8">
          No opportunity available
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-semibold">Opportunity of the Day</h1>
        <p className="mt-2 text-sm text-muted">
          Top scoring idea from recent Hacker News signals.
        </p>

        <Card className="mt-6 bg-surface/90">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{top.op.title}</CardTitle>
                <p className="mt-2 text-sm text-muted">{top.op.category}</p>
              </div>
              <Badge variant="secondary">Score {top.score.score}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-background/80 p-4">
                <p className="text-sm uppercase text-muted">Growth Potential</p>
                <p className="mt-2 text-xl font-semibold">{top.op.growth}%</p>
              </div>
              <div className="rounded-2xl bg-background/80 p-4">
                <p className="text-sm uppercase text-muted">Competition</p>
                <p className="mt-2 text-xl font-semibold">
                  {top.op.competition}/10
                </p>
              </div>
              <div className="rounded-2xl bg-background/80 p-4">
                <p className="text-sm uppercase text-muted">Difficulty</p>
                <p className="mt-2 text-xl font-semibold">
                  {top.op.difficulty}/10
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-background/80 p-6">
              <h3 className="text-lg font-semibold">Why this opportunity?</h3>
              <p className="mt-3 text-sm text-muted">{top.score.reasoning}</p>
            </div>

            <div className="mt-6 rounded-2xl bg-background/80 p-6">
              <h3 className="text-lg font-semibold">Monetization ideas</h3>
              <ul className="mt-3 list-disc pl-5 text-sm text-muted">
                <li>Subscription-based product for power users</li>
                <li>API access for integrations and analytics</li>
                <li>Marketplace for complementary services</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
