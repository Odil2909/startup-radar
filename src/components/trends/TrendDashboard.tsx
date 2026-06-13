"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTrends } from "@/hooks/useTrends";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Opportunity = {
  id: string;
  title: string;
  score: number;
  category?: string;
};

export default function TrendDashboard({
  fetchCurrent,
  initialItems,
}: {
  fetchCurrent?: () => Promise<Opportunity[]>;
  initialItems?: Opportunity[];
}) {
  const t = useTrends();
  const [current, setCurrent] = useState<Opportunity[]>(initialItems || []);

  useEffect(() => {
    let mounted = true;
    if (initialItems && initialItems.length > 0) return;
    // client-side fetch fallback
    (async () => {
      try {
        const res = await fetch("/api/sources");
        if (!res.ok) return;
        const data = await res.json();
        const items: Opportunity[] = (data || []).map((d: any) => ({
          id: String(d.id),
          title: d.title,
          score: d.opportunityScore ?? d.score ?? 0,
          category: d.category,
        }));
        if (mounted) setCurrent(items);
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchCurrent, initialItems]);

  async function handleSnapshot() {
    await t.snapshotNow(
      current.map((c) => ({
        id: c.id,
        title: c.title,
        score: c.score,
        category: c.category,
        timestamp: new Date().toISOString(),
      })),
    );
    t.refresh();
  }

  const categorySeries = useMemo(() => t.computeCategoryCountsOverTime(), [t]);

  const { rising } = useMemo(() => t.computeRisingAndFalling(10), [t]);
  const topRisingIds = rising.map((r) => r.id).slice(0, 3);
  const scoreHistories = useMemo(
    () =>
      topRisingIds.map((id) => ({
        id,
        history: t.getScoreHistoryForId(id),
      })),
    [t, topRisingIds],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trends</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSnapshot}
            className="rounded bg-primary px-3 py-1 text-white"
          >
            Snapshot now
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Category Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <AreaChart data={categorySeries}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(s) => new Date(s).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(s) => new Date(s).toLocaleString()}
                  />
                  <Legend />
                  {/* map keys dynamically by using first entry */}
                  {categorySeries.length > 0 &&
                    Object.keys(categorySeries[0])
                      .filter((k) => k !== "date")
                      .map((key, idx) => (
                        <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stackId="1"
                          stroke={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
                          fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
                        />
                      ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rising Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rising.map((r) => (
                <div key={r.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.category} — score {r.score}
                    </div>
                  </div>
                  <div className="text-green-600">+{r.delta}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Rising Score History</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart
                data={
                  scoreHistories.length
                    ? scoreHistories[0].history.map((h) => ({
                        date: h.date,
                        ...scoreHistories.reduce((acc, cur) => {
                          const item = cur.history.find(
                            (x) => x.date === h.date,
                          );
                          acc[cur.id] = item?.score;
                          return acc;
                        }, {} as any),
                      }))
                    : []
                }
              >
                <XAxis
                  dataKey="date"
                  tickFormatter={(s) => new Date(s).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip />
                {scoreHistories.map((s, idx) => (
                  <Line
                    key={s.id}
                    type="monotone"
                    dataKey={s.id}
                    stroke={["#8884d8", "#82ca9d", "#ff7300"][idx % 3]}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
