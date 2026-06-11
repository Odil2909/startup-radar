import { Opportunity } from "@/types/opportunity";

type HNItem = {
  id: number;
  by?: string;
  descendants?: number;
  score?: number;
  time?: number;
  title?: string;
  url?: string;
  type?: string;
};

const BASE = "https://hacker-news.firebaseio.com/v0";

const cache = new Map<string, { ts: number; data: any }>();
const TTL = 1000 * 60 * 3; // 3 minutes

async function cachedFetch<T>(key: string, url: string): Promise<T> {
  const now = Date.now();
  const existing = cache.get(key);
  if (existing && now - existing.ts < TTL) return existing.data as T;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = (await res.json()) as T;
  cache.set(key, { ts: now, data });
  return data;
}

export interface HackerNewsStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  author?: string;
  time: number;
  descendants?: number;
}

export async function fetchTopStoryIds(limit = 50): Promise<number[]> {
  try {
    const ids = await cachedFetch<number[]>(
      "topstories",
      `${BASE}/topstories.json`,
    );
    return ids.slice(0, limit);
  } catch (err) {
    console.error("fetchTopStoryIds error", err);
    return [];
  }
}

export async function fetchStory(id: number): Promise<HackerNewsStory | null> {
  try {
    const item = await cachedFetch<HNItem>(
      `item:${id}`,
      `${BASE}/item/${id}.json`,
    );
    if (!item || item.type !== "story") return null;
    return {
      id: item.id,
      title: item.title || "Untitled",
      url: item.url,
      score: item.score || 0,
      author: item.by,
      time: item.time || Date.now() / 1000,
      descendants: item.descendants || 0,
    };
  } catch (err) {
    console.error("fetchStory error", err);
    return null;
  }
}

export async function fetchTopStories(limit = 50): Promise<HackerNewsStory[]> {
  const ids = await fetchTopStoryIds(limit);
  const promises = ids.map((id) => fetchStory(id));
  const items = await Promise.all(promises);
  return items.filter((i): i is HackerNewsStory => i !== null);
}

export function mapStoryToOpportunity(story: HackerNewsStory): Opportunity {
  const category = /ai|machine|ml|learning/i.test(story.title)
    ? "AI"
    : /game|gaming|player|stream/i.test(story.title)
      ? "Gaming"
      : /health|wellness|fit|sleep/i.test(story.title)
        ? "Health"
        : /fintech|payment|bank|card|invoice/i.test(story.title)
          ? "Fintech"
          : /study|learn|course|education|school/i.test(story.title)
            ? "Productivity"
            : "Lifestyle";

  const description = story.title;
  const growth = Math.min(
    100,
    Math.round((story.descendants || 0) * 2 + (story.score || 0) / 2),
  );
  const competition = Math.min(
    10,
    Math.max(1, Math.round((story.score || 0) / 20)),
  );
  const difficulty = Math.min(
    10,
    Math.max(1, Math.round((story.title.length / 40) * 10)),
  );
  const score = Math.min(
    100,
    Math.round(
      growth * 0.5 +
        (100 - competition * 10) * 0.3 +
        (100 - difficulty * 10) * 0.2,
    ),
  );

  return {
    id: `hn-${story.id}`,
    title: story.title,
    description,
    category,
    growth,
    competition,
    difficulty,
    score,
  };
}
