"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FavoritesPage() {
  const { items, remove, clear } = useFavorites();

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Favorites
            </p>
            <h1 className="text-3xl font-semibold">Saved Opportunities</h1>
          </div>
          <div>
            <button
              onClick={() => clear()}
              className="rounded-full bg-white/5 px-4 py-2 text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="bg-surface/90 p-6">
            <CardHeader>
              <CardTitle>No saved opportunities</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              Save opportunities to view them here later.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((op) => (
              <div key={op.id}>
                <OpportunityCard opportunity={op} />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => remove(op.id)}
                    className="rounded-full bg-white/5 px-3 py-1 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
