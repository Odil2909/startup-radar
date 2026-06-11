import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Rocket,
  ChartBar,
  Search,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { SearchBar } from "@/components/home/SearchBar";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { opportunities } from "@/data/opportunities";
import { startups } from "@/data/startups";
import { trends } from "@/data/trends";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredOpportunities = opportunities.slice(0, 4);
const featuredStartups = startups.slice(0, 4);
const featuredTrends = trends.slice(0, 4);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Hero />
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <SearchBar />
            <Card className="bg-surface/90 border-slate-800 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <TrendingUp className="h-5 w-5 text-primary" /> Trending
                  Opportunities
                </CardTitle>
                <CardDescription>
                  Signals with momentum for early-stage founders.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {featuredOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted">
                        {opportunity.category}
                      </span>
                      <Badge variant="secondary">
                        Score {opportunity.score}
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {opportunity.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {opportunity.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="bg-surface/90 border-slate-800 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Rocket className="h-5 w-5 text-primary" /> Top Startups
                </CardTitle>
                <CardDescription>
                  Teams leading the next wave of opportunity markets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {startup.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {startup.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{startup.funding}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted">
                      <span>{startup.users} users</span>
                      <span>Growth {startup.growth}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-surface/90 border-slate-800 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Sparkles className="h-5 w-5 text-primary" /> Fastest Growing
                  Trends
                </CardTitle>
                <CardDescription>
                  Market momentum worth exploring this week.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {featuredTrends.map((trend) => (
                  <div
                    key={trend.id}
                    className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {trend.title}
                      </h3>
                      <Badge variant="secondary">{trend.trendScore}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      Source: {trend.source}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-10">
          <FeaturedSection />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="bg-surface/90 border-slate-800 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Latest Opportunities</CardTitle>
              <CardDescription>
                Fresh ideas for founders and market builders.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {opportunities.slice(4, 10).map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-surface/90 border-slate-800 shadow-soft p-6">
            <div className="flex items-center gap-4 text-primary">
              <ChartBar className="h-5 w-5" />
              <div>
                <p className="text-sm uppercase text-muted">Movement</p>
                <p className="text-xl font-semibold">Market pulse</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-white/10 bg-background/80 p-5">
              <p className="text-sm text-muted">
                Opportunity Radar helps you discover signals and build faster
                with market context.
              </p>
            </div>
          </Card>

          <Card className="bg-surface/90 border-slate-800 shadow-soft p-6">
            <div className="flex items-center gap-4 text-primary">
              <Search className="h-5 w-5" />
              <div>
                <p className="text-sm uppercase text-muted">Explore</p>
                <p className="text-xl font-semibold">Browse by category</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {["AI", "Gaming", "Productivity", "Health", "Fintech"].map(
                (label) => (
                  <Badge key={label} className="bg-white/5 text-white">
                    {label}
                  </Badge>
                ),
              )}
            </div>
          </Card>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-surface/90 px-6 py-6 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold">
              Build with better signals.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Use Opportunity Radar to spot promising niches, product gaps, and
              growing categories.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            View Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
