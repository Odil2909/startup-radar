import { fetchTopNews } from "@/services/hackernews.service";
import { generateIdeasFromStories } from "@/lib/idea-engine";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function IdeaOfTheDay() {
  const stories = await fetchTopNews(60);
  const ideas = await generateIdeasFromStories(stories, 200);
  ideas.sort((a, b) => b.opportunityScore - a.opportunityScore);
  const top = ideas[0];
  if (!top) return <div className="p-8">No ideas.</div>;

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <Card className="p-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">Idea of the Day</CardTitle>
                <p className="mt-2 text-muted">Top generated startup idea</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">
                  {top.opportunityScore}
                </div>
                <div className="text-sm text-muted">{top.category}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">{top.title}</h2>
            <p className="mt-4 text-sm text-muted">{top.description}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Why it matters</h3>
                <p className="mt-2 text-sm text-muted">{top.reasoning}</p>
                <h4 className="mt-4 text-sm font-semibold">Build time</h4>
                <p className="text-sm">{top.estimatedBuildTime}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Monetization</h3>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {top.monetization.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
