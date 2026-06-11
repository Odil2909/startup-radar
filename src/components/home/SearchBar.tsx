import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="rounded-3xl border border-white/10 bg-background/90 p-6 shadow-soft">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">Search market signals</p>
            <h2 className="text-2xl font-semibold text-white">Find opportunity ideas faster.</h2>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-background/80 p-4 text-sm text-muted">
          <p>Search across opportunities, trends, and startups with category filters and growth ranking.</p>
        </div>
      </div>
    </div>
  );
}
