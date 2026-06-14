"use client";

import React from "react";
import Link from "next/link";
import { useSavedIdeas } from "@/hooks/useSavedIdeas";

export function RecentSavedIdeas({ email }: { email?: string | null }) {
  const ns = email ? encodeURIComponent(email) : undefined;
  const { items } = useSavedIdeas(ns);

  if (!items.length)
    return (
      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">Recent Saved Ideas</div>
        <div className="mt-3 text-sm">No saved ideas yet.</div>
      </div>
    );

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">Recent Saved Ideas</div>
        <Link href="/ideas" className="text-sm text-primary">
          View all
        </Link>
      </div>

      <ul className="mt-3 space-y-2">
        {items.slice(0, 5).map((it) => (
          <li key={(it as any).id} className="text-sm">
            {(it as any).title ?? (it as any).id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSavedIdeas;
