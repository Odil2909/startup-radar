import { startups } from "@/data/startups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StartupsPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Startups
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Featured early-stage startups
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Inspect fast-growing teams and funding momentum.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            View Analytics
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {startups.map((startup) => (
            <Card
              key={startup.id}
              className="bg-surface/90 border-slate-800 shadow-soft"
            >
              <CardHeader>
                <CardTitle className="text-lg">{startup.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted">
                <p>{startup.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">${startup.funding}</Badge>
                  <span>{startup.users} users</span>
                </div>
                <span className="block text-xs uppercase tracking-[0.24em] text-muted">
                  Growth {startup.growth}%
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
