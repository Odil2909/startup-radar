import { Opportunity } from "@/types/opportunity";

export type ScoreResult = {
  score: number;
  grade: "A" | "B" | "C" | "D";
  reasoning: string;
  breakdown: {
    marketInterest: number;
    growthPotential: number;
    competitionLevel: number;
    monetizationPotential: number;
  };
};

function gradeFromScore(score: number): ScoreResult["grade"] {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

export function scoreOpportunity(
  opportunity: Opportunity,
  context: Opportunity[] = [],
): ScoreResult {
  // Market interest: use growth (0-100) mapped to 30 points
  const marketInterest = Math.round(
    Math.min(30, (opportunity.growth / 100) * 30),
  );

  // Growth potential: derive from the same growth metric but smaller weight
  const growthPotential = Math.round(
    Math.min(25, ((opportunity.growth + (opportunity.score || 0)) / 200) * 25),
  );

  // Competition: higher competition reduces points. We derive a competition factor from context
  const similarCount = context.filter(
    (c) =>
      c.category === opportunity.category &&
      c.title.split(" ").some((w) => opportunity.title.includes(w)),
  ).length;
  const competitionRaw = Math.min(
    20,
    Math.round((similarCount / Math.max(1, context.length)) * 20),
  );
  const competitionLevel = 20 - competitionRaw; // lower competitionRaw = higher points

  // Monetization potential: heuristic keywords and score
  const monetizableKeywords = [
    "marketplace",
    "subscription",
    "saas",
    "api",
    "platform",
    "payment",
    "revenue",
  ];
  const titleLower = opportunity.title.toLowerCase();
  const monetizationHits = monetizableKeywords.reduce(
    (acc, kw) => acc + (titleLower.includes(kw) ? 1 : 0),
    0,
  );
  const monetizationPotential = Math.min(
    25,
    Math.round(monetizationHits * 8 + (opportunity.score / 100) * 10),
  );

  const total = Math.round(
    marketInterest + growthPotential + competitionLevel + monetizationPotential,
  );

  const grade = gradeFromScore(total);

  const reasoning = `Market interest contributes ${marketInterest} points (growth ${opportunity.growth}). Growth potential adds ${growthPotential}. Competition adjusted score ${competitionLevel} (similar items ${similarCount}). Monetization potential ${monetizationPotential}.`;

  return {
    score: total,
    grade,
    reasoning,
    breakdown: {
      marketInterest,
      growthPotential,
      competitionLevel,
      monetizationPotential,
    },
  };
}
