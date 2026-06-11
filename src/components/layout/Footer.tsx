import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/95 text-muted">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm text-white">Opportunity Radar</p>
          <p className="mt-2 text-sm text-muted">
            A local MVP for founders to discover markets, products, and growth
            signals.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/opportunities" className="transition hover:text-white">
            Opportunities
          </Link>
        </div>
      </div>
    </footer>
  );
}
