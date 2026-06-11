import { opportunities } from '@/data/opportunities';
import { startups } from '@/data/startups';
import { trends } from '@/data/trends';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function FeaturedSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <Card className="bg-surface/90 border-slate-800 shadow-soft">
        <CardHeader>
          <CardTitle>Opportunity Pulse</CardTitle>
          <CardDescription>Based on recent growth and score trends.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {opportunities.slice(0, 3).map((opportunity) => (
            <div key={opportunity.id} className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{opportunity.title}</p>
                  <p className="text-sm text-muted">{opportunity.category}</p>
                </div>
                <Badge variant="secondary">{opportunity.score}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-surface/90 border-slate-800 shadow-soft">
        <CardHeader>
          <CardTitle>Startup Highlights</CardTitle>
          <CardDescription>Founders that are gaining ground quickly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {startups.slice(0, 3).map((startup) => (
            <div key={startup.id} className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{startup.name}</p>
                  <p className="text-sm text-muted">{startup.funding}</p>
                </div>
                <Badge variant="secondary">{startup.growth}%</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-surface/90 border-slate-800 shadow-soft">
        <CardHeader>
          <CardTitle>Trend Signals</CardTitle>
          <CardDescription>Fast-moving themes shaping product categories.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {trends.slice(0, 3).map((trend) => (
            <div key={trend.id} className="rounded-3xl border border-white/10 bg-background/80 p-5 transition hover:border-primary/40 hover:bg-surface">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{trend.title}</p>
                  <p className="text-sm text-muted">{trend.source}</p>
                </div>
                <Badge variant="secondary">{trend.trendScore}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
