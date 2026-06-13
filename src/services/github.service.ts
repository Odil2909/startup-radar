export interface GithubTrendingRepo {
  author: string;
  name: string;
  url: string;
  description?: string | null;
  language?: string | null;
  stars?: number;
  forks?: number;
  currentPeriodStars?: number;
}

const GH_TREND_URL = "https://ghapi.huchen.dev/repositories";
const ghCache = new Map<string, { ts: number; data: any }>();
const GH_TTL = 15 * 60 * 1000; // 15 minutes

async function ghCachedFetch<T>(key: string, url: string): Promise<T> {
  const now = Date.now();
  const existing = ghCache.get(key);
  if (existing && now - existing.ts < GH_TTL) return existing.data as T;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = (await res.json()) as T;
  ghCache.set(key, { ts: now, data });
  return data;
}

export async function fetchGithubTrending(): Promise<GithubTrendingRepo[]> {
  try {
    const data = await ghCachedFetch<GithubTrendingRepo[]>(
      "gh-trending",
      GH_TREND_URL,
    );
    return data || [];
  } catch (err) {
    console.error("fetchGithubTrending error", err);
    return [];
  }
}

export function clearGithubCache() {
  ghCache.clear();
}
