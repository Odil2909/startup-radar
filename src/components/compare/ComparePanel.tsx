"use client";

import React from "react";
import type { Opportunity } from "@/types/opportunity";

function WinnerBadge() {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-primary/80 px-2 py-0.5 text-xs font-semibold text-white">
      Winner
    </span>
  );
}

function rowClass(winner: boolean) {
  return `flex items-center justify-between ${winner ? "bg-white/3" : ""} rounded-md px-3 py-2`;
}

export function ComparePanel({
  a,
  b,
}: {
  a?: Opportunity | null;
  b?: Opportunity | null;
}) {
  if (!a && !b)
    return (
      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">
          Select two opportunities to compare.
        </div>
      </div>
    );

  const metrics = [
    { key: "score", label: "Opportunity Score" },
    { key: "growth", label: "Potential (Trend Growth)" },
    { key: "competition", label: "Competition" },
    { key: "difficulty", label: "Difficulty" },
    { key: "monetization", label: "Monetization (est)" },
    { key: "source", label: "Source" },
  ];

  function monetization(o?: Opportunity | null) {
    if (!o) return "—";
    // simple heuristic: average of score and growth
    const val = Math.round((o.score + o.growth) / 2);
    return `${val}`;
  }

  function getVal(key: string, o?: Opportunity | null) {
    if (!o) return "—";
    switch (key) {
      case "score":
        return o.score;
      case "growth":
        return o.growth;
      case "competition":
        return o.competition;
      case "difficulty":
        return o.difficulty;
      case "monetization":
        return monetization(o);
      case "source":
        return o.source ?? "—";
      default:
        return "—";
    }
  }

  function winnerFor(key: string) {
    if (!a || !b) return null;
    const va = getVal(key, a);
    const vb = getVal(key, b);
    // numeric compare when possible
    const na = typeof va === "number" ? (va as number) : null;
    const nb = typeof vb === "number" ? (vb as number) : null;
    if (na !== null && nb !== null) {
      if (key === "competition" || key === "difficulty") {
        // lower is better
        if (na < nb) return "a";
        if (nb < na) return "b";
        return null;
      }
      // higher is better
      if (na > nb) return "a";
      if (nb > na) return "b";
      return null;
    }
    // fallback: non-numeric, compare strings
    if (va > vb) return "a";
    if (vb > va) return "b";
    return null;
  }

  const winners: Record<string, string | null> = {};
  for (const m of metrics) winners[m.key] = winnerFor(m.key);

  // overall winner: by score
  let overall: string | null = null;
  if (a && b) {
    overall = a.score > b.score ? "a" : b.score > a.score ? "b" : null;
  }

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-muted">Comparison</div>
        {overall && (
          <div className="text-sm">
            Overall Winner:{" "}
            <span className="font-semibold">
              {overall === "a" ? a?.title : b?.title}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-3 items-center gap-4 px-2 text-xs text-muted">
          <div>Metric</div>
          <div className="text-center">Opportunity A</div>
          <div className="text-center">Opportunity B</div>
        </div>

        {metrics.map((m) => {
          const win = winners[m.key];
          return (
            <div key={m.key} className={rowClass(Boolean(win))}>
              <div className="w-1/3 text-sm">{m.label}</div>
              <div className="flex w-1/3 items-center justify-center">
                <div className="text-sm font-medium">{getVal(m.key, a)}</div>
                {win === "a" && <WinnerBadge />}
              </div>
              <div className="flex w-1/3 items-center justify-center">
                <div className="text-sm font-medium">{getVal(m.key, b)}</div>
                {win === "b" && <WinnerBadge />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComparePanel;
