"use client";
import React from "react";
import { useValidationHistory } from "@/hooks/useValidationHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryClient() {
  const { items, remove, clear } = useValidationHistory();

  if (!items || items.length === 0) {
    return <div>No validations yet. Try validating an idea.</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={() => clear()}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white"
        >
          Clear history
        </button>
      </div>
      {items.map((it) => (
        <Card key={it.id}>
          <CardHeader>
            <CardTitle>{it.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div>Score</div>
              <div>{it.result.score}</div>
              <div>Recommendation</div>
              <div>{it.result.recommendation}</div>
              <div>Competition</div>
              <div>{it.result.competition}</div>
              <div>Difficulty</div>
              <div>{it.result.difficulty}</div>
              <div>MVP Time</div>
              <div>{it.result.estimatedMvpTime}</div>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => remove(it.id)}
                className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
