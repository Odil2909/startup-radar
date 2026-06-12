"use client";

import { useQuery } from "@tanstack/react-query";

export type NewsStory = {
  id: number;
  title: string;
  url?: string | null;
  by?: string | null;
  score?: number | null;
  time?: number | null;
};

async function fetchNews(limit = 20): Promise<NewsStory[]> {
  const res = await fetch(`/api/news`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data: NewsStory[] = await res.json();
  return data.slice(0, limit);
}

export function useNews(limit = 20) {
  return useQuery<NewsStory[], Error, NewsStory[]>({
    queryKey: ["news", limit],
    queryFn: () => fetchNews(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
