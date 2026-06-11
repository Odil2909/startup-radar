"use client";

import {
  Bar,
  Line,
  ResponsiveContainer,
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { opportunities } from "@/data/opportunities";
import { trends } from "@/data/trends";
import { startups } from "@/data/startups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { categories } from "@/lib/constants";
const GrowthChart = dynamic(
  () => import("@/components/dashboard/GrowthChart").then((m) => m.GrowthChart),
  { ssr: false },
);
const CategoryChart = dynamic(
  () =>
    import("@/components/dashboard/CategoryChart").then((m) => m.CategoryChart),
  { ssr: false },
);

const average = (values: number[]) =>
  Math.round(values.reduce((acc, value) => acc + value, 0) / values.length);
const chartData = categories.map((category) => ({
  category,
  value: opportunities.filter(
    (opportunity) => opportunity.category === category,
  ).length,
}));

export default function DashboardPage() {
  const totalOpportunities = opportunities.length;
  const totalTrends = trends.length;
  const averageGrowth = average(
    opportunities.map((opportunity) => opportunity.growth),
  );
  const averageScore = average(
    opportunities.map((opportunity) => opportunity.score),
  );

  const growthData = [
    { name: "Jan", value: 24 },
    { name: "Feb", value: 37 },
    { name: "Mar", value: 51 },
    { name: "Apr", value: 66 },
    { name: "May", value: 80 },
    { name: "Jun", value: 92 },
  ];

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Opportunity Analytics
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              A concise overview of opportunity signals, trend momentum, and
              startup performance.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="grid gap-6 md:grid-cols-2">
            <StatsCard
              label="Total Opportunities"
              value={totalOpportunities.toString()}
            />
            <StatsCard label="Total Trends" value={totalTrends.toString()} />
            <StatsCard label="Average Growth" value={`${averageGrowth}%`} />
            <StatsCard label="Average Score" value={`${averageScore}%`} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Suspense
              fallback={<div className="h-72 rounded-3xl bg-background/80" />}
            >
              <GrowthChart data={growthData} />
            </Suspense>
            <Suspense
              fallback={<div className="h-72 rounded-3xl bg-background/80" />}
            >
              <CategoryChart data={chartData} />
            </Suspense>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card className="bg-surface/90 border-slate-800 shadow-soft">
            <CardHeader>
              <CardTitle>Startup Momentum</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={startups.slice(0, 6).map((startup) => ({
                    name: startup.name,
                    growth: startup.growth,
                  }))}
                >
                  <CartesianGrid stroke="#27272A" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="growth" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-surface/90 border-slate-800 shadow-soft">
            <CardHeader>
              <CardTitle>Trend Momentum</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={trends.slice(0, 7).map((trend, index) => ({
                    name: trend.title.slice(0, 12),
                    value: trend.trendScore + index * 2,
                  }))}
                >
                  <CartesianGrid stroke="#27272A" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
