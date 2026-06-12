import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import NewsList from "@/components/news/NewsList";

export const metadata = {
  title: "Latest Hacker News - Opportunity Radar",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="text-2xl font-semibold">Latest Hacker News</h1>
        <p className="mt-2 text-sm text-muted">Top stories from Hacker News.</p>

        <section className="mt-6">
          <Card className="bg-surface/90 border-slate-800 shadow-soft">
            <CardHeader>
              <CardTitle>Top Stories</CardTitle>
              <CardDescription>
                Real-time Hacker News top stories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsList limit={20} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
