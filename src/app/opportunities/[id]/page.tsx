import Link from 'next/link';
import { notFound } from 'next/navigation';
import { opportunities } from '@/data/opportunities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { OpportunityCard } from '@/components/cards/OpportunityCard';

export default function OpportunityDetailsPage(props: any) {
  const opportunity = opportunities.find((item) => item.id === props.params.id);

  if (!opportunity) {
    notFound();
  }

  const related = opportunities.filter((item) => item.category === opportunity.category && item.id !== opportunity.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/opportunities" className="text-sm text-primary transition hover:text-indigo-300">
            <ArrowLeft className="inline h-4 w-4" /> Back to opportunities
          </Link>
        </div>

        <Card className="bg-surface/90 border-slate-800 shadow-soft p-8">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{opportunity.category}</Badge>
                <span className="text-sm uppercase tracking-[0.24em] text-muted">Opportunity</span>
              </div>
              <CardTitle className="text-4xl">{opportunity.title}</CardTitle>
              <CardDescription>{opportunity.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Growth</p>
              <p className="mt-3 text-4xl font-semibold text-white">{opportunity.growth}%</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Competition</p>
              <p className="mt-3 text-4xl font-semibold text-white">{opportunity.competition}/10</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Difficulty</p>
              <p className="mt-3 text-4xl font-semibold text-white">{opportunity.difficulty}/10</p>
            </div>
          </CardContent>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <h2 className="text-xl font-semibold">Market insight</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                This opportunity sits at the intersection of {opportunity.category.toLowerCase()} and modern workflows. It is well suited for founders who want to build differentiated tooling with strong adoption potential.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Sparkles className="h-5 w-5 text-primary" /> Related Opportunities</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <OpportunityCard key={item.id} opportunity={item} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
