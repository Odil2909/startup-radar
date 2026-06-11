import Link from 'next/link';

export function Hero() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-surface/90 p-10 shadow-soft">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Market discovery for founders
          </span>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Opportunity Radar for startup teams.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted">
              Explore fresh product ideas, growth signals, and startup momentum in a polished local MVP. No external APIs, no keys — just actionable insights.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/opportunities" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
              Browse Opportunities
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary/50 hover:text-primary">
              View Dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-background/80 p-8 text-sm text-muted shadow-soft">
          <div className="grid gap-4">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="font-medium text-white">Signal focus</p>
              <p className="mt-2 text-sm">Monitor categories like AI, gaming, health, and productivity to capture high-conviction ideas.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="font-medium text-white">Data-driven ranking</p>
              <p className="mt-2 text-sm">Each opportunity is scored by growth potential, competition, and difficulty for a balanced view.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="font-medium text-white">Built for founders</p>
              <p className="mt-2 text-sm">A fast, responsive dashboard and discovery interface for ideation and validation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
