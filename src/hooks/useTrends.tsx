"use client";
import { useEffect, useState, useCallback } from "react";
import {
  saveSnapshot,
  getSnapshots,
  getLatestSnapshot,
  computeCategoryCountsOverTime,
  computeRisingAndFalling,
  getScoreHistoryForId,
  forecastNextScore,
  OpportunitySnapshot,
  TrendSnapshot,
} from "@/lib/trend-engine";

export function useTrends() {
  const [snapshots, setSnapshots] = useState<TrendSnapshot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSnapshots(getSnapshots());
  }, []);

  const snapshotNow = useCallback(async (items: OpportunitySnapshot[]) => {
    setLoading(true);
    try {
      const snap: TrendSnapshot = {
        capturedAt: new Date().toISOString(),
        items,
      };
      saveSnapshot(snap);
      setSnapshots(getSnapshots());
      return snap;
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => setSnapshots(getSnapshots()), []);

  return {
    snapshots,
    latest: getLatestSnapshot(),
    loading,
    snapshotNow,
    refresh,
    computeCategoryCountsOverTime,
    computeRisingAndFalling,
    getScoreHistoryForId,
    forecastNextScore,
  } as const;
}
