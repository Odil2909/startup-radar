export interface RedditPost {
  id: string;
  title: string;
  url?: string;
  subreddit: string;
  score?: number;
  num_comments?: number;
  created_utc?: number;
}

const DEFAULT_SUBREDDITS = [
  "startups",
  "Entrepreneur",
  "SideProject",
  "technology",
  "MachineLearning",
];

const redditCache = new Map<string, { ts: number; data: any }>();
const REDDIT_TTL = 15 * 60 * 1000; // 15 minutes

async function redditCachedFetch<T>(key: string, url: string): Promise<T> {
  const now = Date.now();
  const existing = redditCache.get(key);
  if (existing && now - existing.ts < REDDIT_TTL) return existing.data as T;

  const res = await fetch(url, { headers: { "User-Agent": "startup-radar/1.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = (await res.json()) as T;
  redditCache.set(key, { ts: now, data });
  return data;
}

export async function fetchRedditPosts(subreddits: string[] = DEFAULT_SUBREDDITS, perSub = 10): Promise<RedditPost[]> {
  try {
    const promises = subreddits.map(async (sr) => {
      const url = `https://www.reddit.com/r/${sr}/hot.json?limit=${perSub}`;
      const res = await redditCachedFetch<any>(`reddit:${sr}`, url);
      const posts = (res?.data?.children || []).map((c: any) => ({
        id: c.data.id,
        title: c.data.title,
        url: c.data.url,
        subreddit: sr,
        score: c.data.score,
        num_comments: c.data.num_comments,
        created_utc: c.data.created_utc,
      }));
      return posts as RedditPost[];
    });

    const nested = await Promise.all(promises);
    return nested.flat();
  } catch (err) {
    console.error("fetchRedditPosts error", err);
    return [];
  }
}

export function clearRedditCache() {
  redditCache.clear();
}
