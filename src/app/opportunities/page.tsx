"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { opportunities } from "@/data/opportunities";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/constants";

const sortOptions = [
  { value: "score", label: "Score high to low" },
  { value: "growth", label: "Growth high to low" },
];

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("score");

  const filtered = useMemo(() => {
    return opportunities
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((item) =>
        category === "All" ? true : item.category === category,
      )
      .sort(
        (a, b) =>
          b[sortKey as "score" | "growth"] - a[sortKey as "score" | "growth"],
      );
  }, [searchTerm, category, sortKey]);

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Opportunities
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Explore Opportunity Ideas
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Find the best signals sorted by category, growth, and overall
              score.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            View Dashboard
          </Link>
        </div>

        <Card className="bg-surface/90 border-slate-800 shadow-soft p-6">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr_0.9fr]">
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search opportunities"
            />
            <Select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((categoryItem) => (
                <SelectItem key={categoryItem} value={categoryItem}>
                  {categoryItem}
                </SelectItem>
              ))}
            </Select>
            <Select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value)}
            >
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </Card>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opportunity) => (
            <Link
              key={opportunity.id}
              href={`/opportunities/${opportunity.id}`}
            >
              <OpportunityCard opportunity={opportunity} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
