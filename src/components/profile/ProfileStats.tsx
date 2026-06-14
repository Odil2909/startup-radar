"use client";

import React from "react";
import { useSavedIdeas } from "@/hooks/useSavedIdeas";
import { useValidationHistory } from "@/hooks/useValidationHistory";
import { useTrends } from "@/hooks/useTrends";
import { useState, useEffect } from "react";

type Props = {
  email?: string | null;
};

export function ProfileStats({ email }: Props) {
  const ns = email ? encodeURIComponent(email) : undefined;
  const { items: saved } = useSavedIdeas(ns);
  const { items: history } = useValidationHistory(ns);
  const { latest } = useTrends();

  const tracked = latest?.items?.length ?? 0;

  // support hydrated fallback counts when no namespaced storage exists
  const [savedCount, setSavedCount] = useState(saved.length);
  useEffect(() => setSavedCount(saved.length), [saved.length]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">Saved Ideas</div>
        <div className="mt-2 text-2xl font-bold">{savedCount}</div>
      </div>

      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">Validation History</div>
        <div className="mt-2 text-2xl font-bold">{history.length}</div>
      </div>

      <div className="rounded-lg border border-white/6 bg-card p-4">
        <div className="text-sm text-muted">Tracked Trends</div>
        <div className="mt-2 text-2xl font-bold">{tracked}</div>
      </div>
    </div>
  );
}

export default ProfileStats;
