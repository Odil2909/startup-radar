import { NextResponse } from "next/server";
import { fetchTopNews } from "@/services/hackernews.service";
import { fetchGithubTrending } from "@/services/github.service";
import { fetchRedditPosts } from "@/services/reddit.service";
import { hnToOpportunity, githubToOpportunity, redditToOpportunity, dedupeAndMerge } from "@/lib/source-normalizer";

const AGG_CACHE = new Map<string, { ts: number; data: any }>();
const AGG_TTL = 15 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();
    const existing = AGG_CACHE.get("sources:all");
    if (existing && now - existing.ts < AGG_TTL) {
      return NextResponse.json(existing.data, { status: 200 });
    }

    const [hn, gh, rd] = await Promise.all([
      fetchTopNews(50).catch(() => []),
      fetchGithubTrending().catch(() => []),
      fetchRedditPosts().catch(() => []),
    ]);

    const hnMapped = (hn as any[]).map((s) => hnToOpportunity(s));
    const ghMapped = (gh as any[]).map((r) => githubToOpportunity(r));
    const rdMapped = (rd as any[]).map((p) => redditToOpportunity(p));

    const merged = dedupeAndMerge([...hnMapped, ...ghMapped, ...rdMapped]);

    AGG_CACHE.set("sources:all", { ts: now, data: merged });
    return NextResponse.json(merged, { status: 200 });
  } catch (err) {
    console.error("/api/sources error", err);
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 });
  }
}
