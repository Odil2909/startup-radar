import { fetchTopNews } from "@/services/hackernews.service";
import { generateIdeasFromStories, getIdeaById } from "@/lib/idea-engine";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function IdeaDetail({ params }: any) {
  const stories = await fetchTopNews(60);
  const ideas = await generateIdeasFromStories(stories, 200);
  const idea = getIdeaById(ideas, params.id);

  if (!idea) return <div className="p-8">Idea not found.</div>;

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <div className="text-sm text-muted">
              {idea.category} • {idea.potential} potential
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="mt-2 text-sm text-muted">{idea.description}</p>

            <h3 className="mt-4 text-lg font-semibold">
              Why this idea matters
            </h3>
            <p className="mt-2 text-sm text-muted">{idea.reasoning}</p>

            <h3 className="mt-4 text-lg font-semibold">Target audience</h3>
            <p className="mt-2 text-sm text-muted">
              Early adopters in {idea.category} and teams looking for faster
              solutions.
            </p>

            <h3 className="mt-4 text-lg font-semibold">Revenue model</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {idea.revenueModel.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h3 className="mt-4 text-lg font-semibold">Competitors</h3>
            <p className="mt-2 text-sm text-muted">
              Search market for similar tools and identify 3-5 competitors
              during validation.
            </p>

            <h3 className="mt-4 text-lg font-semibold">Estimated MVP plan</h3>
            <div className="mt-2 grid gap-3">
              {idea.mvpPlan.map((w) => (
                <div key={w.week}>
                  <strong>{w.week}</strong>
                  <ul className="list-disc pl-5 text-sm">
                    {w.tasks.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
