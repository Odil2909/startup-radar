"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyzePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze(e?: any) {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ idea }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setResult(data.analysis ?? data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to analyze" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-semibold">Idea Analyzer</h1>
        <p className="mt-2 text-sm text-muted">
          Enter a short startup idea and get a local analysis (no external AI).
        </p>

        <form onSubmit={handleAnalyze} className="mt-6">
          <div className="grid gap-4">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. AI Study Assistant"
              className="h-12 w-full rounded-3xl border border-white/10 bg-background/90 px-4 text-sm text-white outline-none"
            />
            <div>
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 font-semibold"
              >
                {loading ? "Analyzing…" : "Analyze"}
              </button>
            </div>
          </div>
        </form>

        {result && (
          <Card className="mt-6 bg-surface/90">
            <CardHeader>
              <CardTitle>Analysis for {result.title ?? idea}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-muted">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
