"use client";

import React from "react";
import { useTrends } from "@/hooks/useTrends";

export function WatchlistCategories() {
  const { latest } = useTrends();

  const counts: Record<string, number> = {};
  if (latest?.items) {
    for (const it of latest.items) {
      const c = it.category || "Other";
      counts[c] = (counts[c] || 0) + 1;
    }
  }

  const categories = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="text-sm text-muted">Watchlist Categories</div>
      {categories.length === 0 ? (
        <div className="mt-3 text-sm">No tracked categories yet.</div>
      ) : (
        <ul className="mt-3 space-y-2">
          {categories.slice(0, 6).map(([cat, n]) => (
            <li key={cat} className="flex items-center justify-between text-sm">
              <span>{cat}</span>
              <span className="text-muted">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchlistCategories;
