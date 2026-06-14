"use client";

import React from "react";
import Link from "next/link";
import { useValidationHistory } from "@/hooks/useValidationHistory";

export function RecentValidationHistory({ email }: { email?: string | null }) {
  const ns = email ? encodeURIComponent(email) : undefined;
  const { items } = useValidationHistory(ns);

  if (!items.length)
    return (
      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">Recent Validation History</div>
        <div className="mt-3 text-sm">No validation history yet.</div>
      </div>
    );

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">Recent Validation History</div>
        <Link href="/validation-history" className="text-sm text-primary">
          View all
        </Link>
      </div>

      <ul className="mt-3 space-y-2">
        {items.slice(0, 5).map((it) => (
          <li key={it.id} className="text-sm">
            {it.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentValidationHistory;
