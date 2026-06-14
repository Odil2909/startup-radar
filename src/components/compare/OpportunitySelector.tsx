"use client";

import React, { useMemo, useState } from "react";
import type { Opportunity } from "@/types/opportunity";

export function OpportunitySelector({
  opportunities,
  selectedId,
  onSelect,
  label,
}: {
  opportunities: Opportunity[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  label: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return opportunities.slice(0, 10);
    return opportunities.filter((o) => o.title.toLowerCase().includes(q));
  }, [opportunities, query]);

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="text-sm text-muted">{label}</div>

      <input
        className="mt-2 w-full rounded-md border border-white/6 bg-background/60 px-3 py-2 text-sm text-white"
        placeholder="Search opportunities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="mt-3 max-h-56 space-y-2 overflow-auto">
        {filtered.map((o) => (
          <li key={o.id}>
            <button
              onClick={() => onSelect(o.id)}
              className={`w-full text-left rounded-md px-2 py-2 text-sm hover:bg-white/5 ${
                selectedId === o.id ? "bg-white/5" : ""
              }`}
            >
              <div className="font-medium">{o.title}</div>
              <div className="text-xs text-muted">
                {o.category} • Score {o.score}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OpportunitySelector;
