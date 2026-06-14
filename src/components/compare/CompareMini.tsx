"use client";

import React, { useState } from "react";
import { opportunities } from "@/data/opportunities";
import Link from "next/link";

export function CompareMini() {
  const [a, setA] = useState(opportunities[0]?.id ?? "");
  const [b, setB] = useState(opportunities[1]?.id ?? "");

  return (
    <div className="rounded-lg border border-white/10 bg-background/80 p-4">
      <div className="text-sm text-muted">Quick compare</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <select
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full rounded-md border border-white/6 bg-background/60 px-3 py-3 text-sm text-white touch-manipulation"
        >
          {opportunities.map((o) => (
            <option key={o.id} value={o.id} className="text-black">
              {o.title}
            </option>
          ))}
        </select>

        <select
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="w-full rounded-md border border-white/6 bg-background/60 px-3 py-3 text-sm text-white touch-manipulation"
        >
          {opportunities.map((o) => (
            <option key={o.id} value={o.id} className="text-black">
              {o.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-muted">Compare two ideas quickly</div>
        <Link
          href={`/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
          className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}

export default CompareMini;
