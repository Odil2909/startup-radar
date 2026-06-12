"use client";

import { NewsCard, NewsCardSkeleton } from "./NewsCard";
import { useNews } from "@/hooks/useNews";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface NewsListProps {
  limit?: number;
}

export default function NewsList({ limit = 20 }: NewsListProps) {
  const { data, isLoading, error } = useNews(limit);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Unable to load Hacker News.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-sm text-muted">No stories found.</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.slice(0, limit).map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}
    </div>
  );
}
