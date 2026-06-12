"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useValidationHistory } from "@/hooks/useValidationHistory";
import { validateIdea, preValidateIdea } from "@/lib/startup-validator";

export default function ValidatorClient() {
  const [title, setTitle] = useState("");
  const [last, setLast] = useState<any>(null);
  const history = useValidationHistory();

  function run() {
    const pre = preValidateIdea(title);
    if (!pre.valid || pre.confidence <= 50) {
      setLast({
        invalid: true,
        reason: pre.reason,
        suggestions: pre.suggestions || [],
        confidence: pre.confidence,
      });
      return;
    }
    const result = validateIdea(title);
    setLast(result);
    history.add(title);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validate an idea</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            placeholder="Enter idea title or short description"
          />
          <button
            onClick={run}
            disabled={!title.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Validate
          </button>
        </div>

        {last && last.invalid && (
          <div className="mt-4 text-red-700">
            <h3 className="font-semibold">Invalid Idea</h3>
            <div className="mt-2">Reason: {last.reason}</div>
            {last.suggestions && last.suggestions.length > 0 && (
              <div className="mt-2">
                <strong>Suggestions:</strong>
                <ul className="list-disc pl-6">
                  {last.suggestions.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-2">Confidence: {last.confidence}%</div>
          </div>
        )}

        {last && !last.invalid && (
          <div className="mt-4">
            <h3 className="font-semibold">
              Result (confidence: {last.confidence}%)
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>Score:</div>
              <div>{last.score}</div>
              <div>Recommendation:</div>
              <div>{last.recommendation}</div>
              <div>Competition:</div>
              <div>{last.competition}</div>
              <div>Difficulty:</div>
              <div>{last.difficulty}</div>
              <div>MVP Time:</div>
              <div>{last.estimatedMvpTime}</div>
              <div>Revenue Potential:</div>
              <div>{last.revenuePotential}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
