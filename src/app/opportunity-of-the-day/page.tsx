import { fetchTopNews } from "@/services/hackernews.service";
import { analyzeStory } from "@/lib/opportunity-engine";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function OpportunityOfTheDay() {
  const stories = await fetchTopNews(30);
  const analyses = stories.map((s) => ({
    s,
    a: analyzeStory({ ...s, descendants: (s as any).descendants ?? 0 }),
  }));
  analyses.sort((x, y) => y.a.opportunityScore - x.a.opportunityScore);
  const top = analyses[0];

  if (!top) {
    return <div className="p-8">No opportunity found.</div>;
  }

  const { s, a } = top;

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <Card className="p-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">
                  Opportunity of the Day
                </CardTitle>
                <p className="mt-2 text-muted">
                  Top scored opportunity from Hacker News
                </p>
              </div>
              <div className="text-right">
                <Badge className="text-white">
                  {a.grade} {a.opportunityScore}
                </Badge>
                <div className="mt-2 text-sm text-muted">{a.category}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="mt-4 text-sm text-muted">
              By {s.by ?? "unknown"} •{" "}
              {s.time ? new Date(s.time * 1000).toLocaleString() : ""}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Why it matters</h3>
                <p className="mt-2 text-sm text-muted">{a.reasoning}</p>
                <h4 className="mt-4 text-sm font-semibold">Potential</h4>
                <p className="text-sm">{a.potential}</p>
                <h4 className="mt-4 text-sm font-semibold">Difficulty</h4>
                <p className="text-sm">{a.difficulty}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Monetization</h3>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {a.monetization.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>

                <h3 className="mt-4 text-sm font-semibold">Badges</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={s.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Read on Hacker News
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
