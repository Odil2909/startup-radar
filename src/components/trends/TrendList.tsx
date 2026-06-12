"use client";
import React, { useEffect } from "react";
import { useTrends } from "@/hooks/useTrends";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrendList() {
  const trends = useTrends();
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { rising, falling } = mounted
    ? trends.computeRisingAndFalling(15)
    : { rising: [], falling: [] };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Rising Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rising.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No rising opportunities yet.
              </div>
            )}
            {rising.map((r) => (
              <div key={r.id} className="flex justify-between">
                <div className="truncate pr-4">{r.title}</div>
                <div className="font-mono">+{r.delta}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Falling Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {falling.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No falling opportunities yet.
              </div>
            )}
            {falling.map((r) => (
              <div key={r.id} className="flex justify-between">
                <div className="truncate pr-4">{r.title}</div>
                <div className="font-mono text-red-600">{r.delta}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
