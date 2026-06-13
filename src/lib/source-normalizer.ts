import { NewsStory } from "@/services/hackernews.service";
import type { GithubTrendingRepo } from "@/services/github.service";
import type { RedditPost } from "@/services/reddit.service";
import type { Opportunity } from "@/types/opportunity";

function normalizeTextKey(s?: string) {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function hnToOpportunity(
  story: NewsStory,
): Opportunity & { source: string; url?: string; createdAt?: string } {
  const base = {
    id: `hn-${story.id}`,
    title: story.title,
    description: story.title,
    category: /ai|machine|ml|learning/i.test(story.title)
      ? "AI"
      : /game|gaming|player|stream/i.test(story.title)
        ? "Gaming"
        : /health|wellness|fit|sleep/i.test(story.title)
          ? "Health"
          : /fintech|payment|bank|card|invoice/i.test(story.title)
            ? "Fintech"
            : /study|learn|course|education|school/i.test(story.title)
              ? "Productivity"
              : "Lifestyle",
    growth: Math.min(
      100,
      Math.round((story.descendants || 0) * 2 + (story.score || 0) / 2),
    ),
    competition: Math.min(10, Math.max(1, Math.round((story.score || 0) / 20))),
    difficulty: Math.min(
      10,
      Math.max(1, Math.round((story.title.length / 40) * 10)),
    ),
    score: 0,
  } as Opportunity & { source: string; url?: string; createdAt?: string };

  base.score = Math.min(
    100,
    Math.round(
      base.growth * 0.5 +
        (100 - base.competition * 10) * 0.3 +
        (100 - base.difficulty * 10) * 0.2,
    ),
  );
  base.source = "hackernews";
  base.url = story.url ?? undefined;
  base.createdAt = story.time
    ? new Date(story.time * 1000).toISOString()
    : undefined;
  return base;
}

export function githubToOpportunity(
  repo: GithubTrendingRepo,
): Opportunity & { source: string; url?: string; createdAt?: string } {
  const title = `${repo.author}/${repo.name}`;
  const description = repo.description ?? `${title} — ${repo.language ?? ""}`;
  const growth = Math.min(100, Math.round((repo.currentPeriodStars || 0) * 2));
  const competition = Math.min(
    10,
    Math.max(1, Math.round(((repo.stars || 0) / 1000) * 10)),
  );
  const difficulty = Math.min(
    10,
    Math.max(1, Math.round(((repo.forks || 0) / 1000) * 10)),
  );
  const score = Math.min(
    100,
    Math.round(
      growth * 0.5 +
        (100 - competition * 10) * 0.3 +
        (100 - difficulty * 10) * 0.2,
    ),
  );
  const category = /ai|ml|machine/i.test(repo.language ?? repo.name)
    ? "AI"
    : (repo.language ?? "Developer Tools");

  return {
    id: `gh-${repo.author}-${repo.name}`,
    title,
    description,
    category,
    growth,
    competition,
    difficulty,
    score,
    source: "github",
    url: repo.url,
    createdAt: undefined,
  };
}

export function redditToOpportunity(
  post: RedditPost,
): Opportunity & { source: string; url?: string; createdAt?: string } {
  const title = post.title;
  const description = post.title;
  const growth = Math.min(
    100,
    Math.round((post.num_comments || 0) * 3 + (post.score || 0) / 2),
  );
  const competition = Math.min(
    10,
    Math.max(1, Math.round((post.score || 0) / 50)),
  );
  const difficulty = Math.min(
    10,
    Math.max(1, Math.round((post.title.length / 60) * 10)),
  );
  const score = Math.min(
    100,
    Math.round(
      growth * 0.5 +
        (100 - competition * 10) * 0.3 +
        (100 - difficulty * 10) * 0.2,
    ),
  );
  const category = /ai|machine|ml|learning/i.test(post.title)
    ? "AI"
    : /startup|founder|fund/i.test(post.title)
      ? "Productivity"
      : "Lifestyle";

  return {
    id: `rd-${post.subreddit}-${post.id}`,
    title,
    description,
    category,
    growth,
    competition,
    difficulty,
    score,
    source: "reddit",
    url: post.url,
    createdAt: post.created_utc
      ? new Date(post.created_utc * 1000).toISOString()
      : undefined,
  };
}

export function dedupeAndMerge(
  items: Array<
    Opportunity & { source?: string; url?: string; createdAt?: string }
  >,
) {
  const seen = new Map<
    string,
    Opportunity & { source?: string; url?: string; createdAt?: string }
  >();

  for (const it of items) {
    const key = it.url ? normalizeTextKey(it.url) : normalizeTextKey(it.title);
    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, it);
      continue;
    }

    // keep the highest-scoring one
    if (it.score > existing.score) {
      seen.set(key, it);
    }
  }

  return Array.from(seen.values());
}
