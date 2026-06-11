import { Opportunity } from "@/types/opportunity";
import { scoreOpportunity } from "./opportunity-score";

export type AnalysisResult = {
  title: string;
  category: string;
  scoreResult: ReturnType<typeof scoreOpportunity>;
  competitionGuess: number;
  difficultyGuess: number;
  monetizationIdeas: string[];
  marketAnalysis: string;
};

function guessCategory(title: string) {
  if (/ai|ml|machine|learning/i.test(title)) return "AI";
  if (/game|gaming|player|stream/i.test(title)) return "Gaming";
  if (/health|wellness|fit|sleep/i.test(title)) return "Health";
  if (/fintech|payment|bank|invoice/i.test(title)) return "Fintech";
  if (/study|learn|course|education/i.test(title)) return "Productivity";
  return "Lifestyle";
}

export function analyzeIdea(
  title: string,
  context: Opportunity[] = [],
): AnalysisResult {
  const category = guessCategory(title);
  const pseudo: Opportunity = {
    id: `idea-${Date.now()}`,
    title,
    description: title,
    category,
    growth: Math.min(100, Math.max(10, Math.round(title.length % 100))),
    competition: Math.min(
      10,
      Math.max(1, Math.round(title.split(" ").length / 5)),
    ),
    difficulty: Math.min(10, Math.max(1, Math.round((title.length / 40) * 10))),
    score: 0,
  };

  const scoreResult = scoreOpportunity(pseudo, context);

  const monetizationIdeas: string[] = [];
  if (/subscription|saas|membership|pro/i.test(title))
    monetizationIdeas.push("Subscription (SaaS / Pro tiers)");
  if (/market|platform|marketplace|exchange/i.test(title))
    monetizationIdeas.push("Marketplace fees / revenue share");
  if (/api|integration|developer/i.test(title))
    monetizationIdeas.push("Paid API / developer plans");
  if (monetizationIdeas.length === 0)
    monetizationIdeas.push("Freemium + paid add-ons or data exports");

  const marketAnalysis = `Category: ${category}. Estimated market interest based on title length and keywords. Consider validating with landing page tests and simple outreach.`;

  return {
    title,
    category,
    scoreResult,
    competitionGuess: pseudo.competition,
    difficultyGuess: pseudo.difficulty,
    monetizationIdeas,
    marketAnalysis,
  };
}
