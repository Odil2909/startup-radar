export type OpportunitySnapshot = {
  id: string;
  title: string;
  score: number;
  category?: string;
  timestamp: string; // ISO
};

export type TrendSnapshot = {
  capturedAt: string; // ISO
  items: OpportunitySnapshot[];
};

const STORAGE_KEY = "sr_trend_snapshots_v1";

export function saveSnapshot(snapshot: TrendSnapshot) {
  if (typeof window === "undefined" || typeof localStorage === "undefined")
    return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const arr: TrendSnapshot[] = raw ? JSON.parse(raw) : [];
  arr.push(snapshot);
  // keep last 365 snapshots
  const trimmed = arr.slice(-365);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getSnapshots(): TrendSnapshot[] {
  if (typeof window === "undefined" || typeof localStorage === "undefined")
    return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getLatestSnapshot(): TrendSnapshot | null {
  const s = getSnapshots();
  return s.length ? s[s.length - 1] : null;
}

export function computeCategoryCountsOverTime(): Array<{
  date: string;
  [category: string]: number | string;
}> {
  const snaps = getSnapshots();
  const result: Array<{ date: string; [category: string]: number | string }> =
    [];
  for (const snap of snaps) {
    const counts: Record<string, number> = {};
    for (const it of snap.items) {
      const c = it.category || "Other";
      counts[c] = (counts[c] || 0) + 1;
    }
    result.push({ date: snap.capturedAt, ...counts });
  }
  return result;
}

export function getScoreHistoryForId(id: string) {
  const snaps = getSnapshots();
  const history = snaps.map((s) => {
    const it = s.items.find((i) => i.id === id);
    return { date: s.capturedAt, score: it ? it.score : null };
  });
  return history;
}

export function computeRisingAndFalling(top = 10) {
  const snaps = getSnapshots();
  if (snaps.length < 2) return { rising: [], falling: [] };
  const last = snaps[snaps.length - 1];
  const prev = snaps[snaps.length - 2];
  const diffs = last.items.map((it) => {
    const p = prev.items.find((x) => x.id === it.id);
    const prevScore = p ? p.score : 0;
    return {
      id: it.id,
      title: it.title,
      category: it.category,
      delta: it.score - prevScore,
      score: it.score,
    };
  });
  const rising = diffs.sort((a, b) => b.delta - a.delta).slice(0, top);
  const falling = diffs.sort((a, b) => a.delta - b.delta).slice(0, top);
  return { rising, falling };
}

export function forecastNextScore(
  history: Array<{ date: string; score: number | null }>,
): number | null {
  // simple deterministic forecast: average delta between available points
  const points = history.filter((h) => h.score !== null) as Array<{
    date: string;
    score: number;
  }>;
  if (points.length < 2) return null;
  let totalDelta = 0;
  let count = 0;
  for (let i = 1; i < points.length; i++) {
    totalDelta += points[i].score - points[i - 1].score;
    count++;
  }
  const avgDelta = totalDelta / count;
  const last = points[points.length - 1].score;
  // predict next by adding avgDelta, clamp
  const pred = Math.max(0, Math.min(100, Math.round(last + avgDelta)));
  return pred;
}
