"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Idea } from "@/lib/idea-engine";
import IdeaCard from "./IdeaCard";

interface IdeaGridProps {
  initialIdeas: Idea[];
}

export default function IdeaGrid({ initialIdeas }: IdeaGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<string>("highest-score");
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [monetization, setMonetization] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [competition, setCompetition] = useState<string>("All");
  const [potential, setPotential] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(initialIdeas.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [initialIdeas]);

  const monetizations = useMemo(() => {
    // canonical list to show in filter
    const list = [
      "All",
      "Subscription",
      "Freemium",
      "Ads",
      "Affiliate",
      "Marketplace",
      "One-Time Purchase",
    ];
    return list;
  }, [initialIdeas]);

  const difficulties = useMemo(() => {
    const set = new Set(
      initialIdeas.map((i) =>
        i.difficulty === "Moderate" ? "Medium" : i.difficulty,
      ),
    );
    return ["All", ...Array.from(set)];
  }, [initialIdeas]);

  const list = useMemo(() => {
    let arr = initialIdeas.slice();
    // search filter (title, description)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.monetization.join(" ").toLowerCase().includes(q) ||
          (i.difficulty === "Moderate"
            ? "medium"
            : i.difficulty.toLowerCase()
          ).includes(q),
      );
    }

    if (category !== "All") arr = arr.filter((i) => i.category === category);
    if (monetization !== "All") {
      arr = arr.filter((i) => {
        const can = i.monetization
          .map((m) => {
            const mm = m.toLowerCase();
            if (mm.includes("subscription")) return "Subscription";
            if (mm.includes("freemium")) return "Freemium";
            if (mm.includes("advert") || mm.includes("ad")) return "Ads";
            if (mm.includes("affiliate") || mm.includes("referral"))
              return "Affiliate";
            if (mm.includes("market")) return "Marketplace";
            if (
              mm.includes("one-time") ||
              mm.includes("one time") ||
              mm.includes("purchase")
            )
              return "One-Time Purchase";
            return null;
          })
          .filter(Boolean) as string[];
        return can.includes(monetization);
      });
    }

    if (difficulty !== "All")
      arr = arr.filter(
        (i) =>
          (i.difficulty === "Moderate" ? "Medium" : i.difficulty) ===
          difficulty,
      );
    if (competition !== "All")
      arr = arr.filter((i) => i.competition === competition);
    if (potential !== "All") arr = arr.filter((i) => i.potential === potential);
    // ranking helpers
    const rankCompetition = (c: string) =>
      c === "Low" ? 0 : c === "Medium" ? 1 : 2;

    switch (filter) {
      case "score-desc":
      case "highest-score":
        arr.sort((a, b) => b.opportunityScore - a.opportunityScore);
        break;
      case "score-asc":
        arr.sort((a, b) => a.opportunityScore - b.opportunityScore);
        break;
      case "competition-asc":
      case "lowest-competition":
        arr.sort(
          (a, b) =>
            rankCompetition(a.competition) - rankCompetition(b.competition),
        );
        break;
      case "competition-desc":
        arr.sort(
          (a, b) =>
            rankCompetition(b.competition) - rankCompetition(a.competition),
        );
        break;
      case "fastest-build":
        arr.sort((a, b) => {
          const pa = parseInt(String(a.estimatedBuildTime)) || 999;
          const pb = parseInt(String(b.estimatedBuildTime)) || 999;
          return pa - pb;
        });
        break;
      case "highest-potential":
        arr.sort((a, b) => b.opportunityScore - a.opportunityScore);
        break;
      case "newest":
        // not available on idea object; fallback to stable order
        break;
      default:
        break;
    }
    return arr;
  }, [
    initialIdeas,
    filter,
    category,
    search,
    monetization,
    difficulty,
    competition,
    potential,
  ]);

  // featured top 10
  const featured = useMemo(() => {
    return initialIdeas
      .slice()
      .sort((a, b) => b.opportunityScore - a.opportunityScore)
      .slice(0, 10);
  }, [initialIdeas]);

  // quick stats
  const stats = useMemo(() => {
    const total = initialIdeas.length;
    const avg = total
      ? Math.round(
          initialIdeas.reduce((s, x) => s + x.opportunityScore, 0) / total,
        )
      : 0;
    const highest = total
      ? Math.max(...initialIdeas.map((i) => i.opportunityScore))
      : 0;
    const catCount: Record<string, number> = {};
    initialIdeas.forEach(
      (i) => (catCount[i.category] = (catCount[i.category] || 0) + 1),
    );
    const mostPopularCategory =
      Object.entries(catCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    return { total, avg, highest, mostPopularCategory };
  }, [initialIdeas]);

  const clearAll = useCallback(() => {
    setSearch("");
    setFilter("highest-score");
    setCategory("All");
    setMonetization("All");
    setDifficulty("All");
    setCompetition("All");
    setPotential("All");
    // update URL
    router.replace("/ideas");
  }, [router]);

  // sync from URL params on mount
  useEffect(() => {
    const params = Object.fromEntries(searchParams?.entries() || []);
    if (params.search) setSearch(params.search as string);
    if (params.category) setCategory(params.category as string);
    if (params.monetization) setMonetization(params.monetization as string);
    if (params.difficulty) setDifficulty(params.difficulty as string);
    if (params.competition) setCompetition(params.competition as string);
    if (params.potential) setPotential(params.potential as string);
    if (params.sort) setFilter(params.sort as string);
  }, [searchParams]);

  // push params to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);
    if (monetization !== "All") params.set("monetization", monetization);
    if (difficulty !== "All") params.set("difficulty", difficulty);
    if (competition !== "All") params.set("competition", competition);
    if (potential !== "All") params.set("potential", potential);
    if (filter && filter !== "highest-score") params.set("sort", filter);
    const url = `/ideas${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(url);
  }, [
    search,
    category,
    monetization,
    difficulty,
    competition,
    potential,
    filter,
    router,
  ]);

  return (
    <div>
      <div className="mb-4 grid gap-3 md:flex md:items-center md:gap-3">
        <input
          placeholder="Search ideas, category, monetization, difficulty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded bg-background/60 p-2 text-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded bg-background/60 p-2 text-sm"
        >
          <option value="highest-score">Highest Score</option>
          <option value="score-desc">Score (desc)</option>
          <option value="score-asc">Score (asc)</option>
          <option value="lowest-competition">Lowest Competition</option>
          <option value="competition-asc">Competition (asc)</option>
          <option value="competition-desc">Competition (desc)</option>
          <option value="fastest-build">Fastest To Build</option>
          <option value="highest-potential">Highest Potential</option>
          <option value="newest">Newest</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded bg-background/60 p-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={monetization}
          onChange={(e) => setMonetization(e.target.value)}
          className="rounded bg-background/60 p-2 text-sm"
        >
          {monetizations.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded bg-background/60 p-2 text-sm"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-muted">
          Showing {list.length} of {stats.total} ideas
        </div>
        <div className="text-sm text-muted">
          Total: {stats.total} • Avg: {stats.avg} • High: {stats.highest} • Top
          category: {stats.mostPopularCategory}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 text-center">
          <p className="text-sm">No ideas found.</p>
          <button
            onClick={clearAll}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <section className="mb-6">
            <h3 className="text-lg font-semibold">🔥 Top 10 Ideas</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((i) => (
                <IdeaCard key={i.id} idea={i} />
              ))}
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((i) => (
              <IdeaCard key={i.id} idea={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
