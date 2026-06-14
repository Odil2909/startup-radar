"use client";

import React, { useMemo, useState } from "react";
import type { Opportunity } from "@/types/opportunity";
import OpportunitySelector from "./OpportunitySelector";
import ComparePanel from "./ComparePanel";

export function CompareApp({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [aId, setAId] = useState<string | null>(opportunities[0]?.id ?? null);
  const [bId, setBId] = useState<string | null>(opportunities[1]?.id ?? null);

  const a = useMemo(
    () => opportunities.find((o) => o.id === aId) ?? null,
    [opportunities, aId],
  );
  const b = useMemo(
    () => opportunities.find((o) => o.id === bId) ?? null,
    [opportunities, bId],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Compare Opportunities</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <OpportunitySelector
          opportunities={opportunities}
          selectedId={aId}
          onSelect={(id) => setAId(id)}
          label="Opportunity A"
        />

        <OpportunitySelector
          opportunities={opportunities}
          selectedId={bId}
          onSelect={(id) => setBId(id)}
          label="Opportunity B"
        />

        <div className="rounded-lg border border-white/6 bg-card p-4">
          <div className="text-sm text-muted">Quick Actions</div>
          <div className="mt-3 space-y-2 text-sm">
            <div>Compare by score, growth, competition, difficulty.</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ComparePanel a={a} b={b} />
      </div>
    </div>
  );
}

export default CompareApp;
