import Link from "next/link";
import { opportunities } from "@/data/opportunities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const gamingIdeas = opportunities
  .filter((item) => item.category === "Gaming")
  .slice(0, 6);

export default function GamingPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Gaming
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Gaming opportunity spotlight
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              High-performing ideas in community, analytics, and content.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Browse All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {gamingIdeas.map((item) => (
            <Card
              key={item.id}
              className="bg-surface/90 border-slate-800 shadow-soft"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant="secondary">{item.score}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
