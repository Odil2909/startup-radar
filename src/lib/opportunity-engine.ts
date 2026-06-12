export type NewsItem = {
  id: number;
  title: string;
  url?: string | null;
  by?: string | null;
  score?: number | null;
  time?: number | null; // unix seconds
  descendants?: number | null;
};

export type OpportunityAnalysis = {
  opportunityScore: number; // 0-100
  grade: string; // A+, A, B, C, D
  category: string;
  potential: string; // High/Medium/Low
  competition: string; // Low/Medium/High
  difficulty: string; // Easy/Moderate/Hard
  monetization: string[];
  badges: string[];
  reasoning: string;
};

const CATEGORIES: { name: string; keywords: RegExp }[] = [
  {
    name: "AI",
    keywords:
      /\b(ai|machine learning|ml|deep learning|neural|llm|gpt|openai)\b/i,
  },
  {
    name: "SaaS",
    keywords: /\b(saas|subscription|platform|enterprise|b2b)\b/i,
  },
  {
    name: "Developer Tools",
    keywords: /\b(api|sdk|cli|library|framework|developer)\b/i,
  },
  {
    name: "Cybersecurity",
    keywords: /\b(security|vulnerability|crypto|breach|auth|encryption)\b/i,
  },
  {
    name: "FinTech",
    keywords: /\b(fintech|payment|bank|crypto|wallet|invoice|transaction)\b/i,
  },
  { name: "Gaming", keywords: /\b(game|gaming|player|steam|match|esports)\b/i },
  {
    name: "Education",
    keywords: /\b(learn|education|course|school|student|teaching)\b/i,
  },
  {
    name: "Automation",
    keywords: /\b(automation|automate|workflow|zapier|ifttt)\b/i,
  },
  {
    name: "Open Source",
    keywords: /\b(open source|opensource|mit license|github)\b/i,
  },
  {
    name: "Productivity",
    keywords: /\b(productivity|todo|task|notes|calendar)\b/i,
  },
  {
    name: "Cloud",
    keywords: /\b(aws|azure|gcp|cloud|serverless|kubernetes|docker)\b/i,
  },
  {
    name: "Business",
    keywords: /\b(startup|funding|investor|pitch|marketplace)\b/i,
  },
];

function detectCategory(title: string): string {
  for (const c of CATEGORIES) {
    if (c.keywords.test(title)) return c.name;
  }
  return "Other";
}

function normalize(value: number, max = 100): number {
  if (!isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value)));
}

function popularityScore(hnScore?: number | null) {
  const s = hnScore ?? 0;
  // linear up to 200, then flatten
  const pct = Math.min(100, Math.round((s / 200) * 100));
  return pct;
}

function marketPotential(
  descendants?: number | null,
  hnScore?: number | null,
  title = "",
) {
  const comments = descendants ?? 0;
  const score = hnScore ?? 0;
  // comments heavier than score
  const raw = Math.min(100, comments * 2 + Math.round(score / 2));
  // keyword boost
  const boost = /market|growth|adoption|momentum|trend|demand/i.test(title)
    ? 10
    : 0;
  return normalize(raw + boost);
}

function monetizationAnalysis(title = "", url?: string | null) {
  const methods: Set<string> = new Set();
  const t = (title || "") + " " + (url || "");
  if (/subscription|saas|monthly|yearly|plan|plan\b/i.test(t))
    methods.add("Subscription");
  if (/marketplace|listing|seller|vendor/i.test(t))
    methods.add("Marketplace Fees");
  if (/ad|advertis/i.test(t)) methods.add("Advertising");
  if (/api|sdk|developer|integration/i.test(t))
    methods.add("Developer API / Paid Tier");
  if (/enterprise|b2b|team/i.test(t)) methods.add("Enterprise Sales");
  if (/affiliate|referral/i.test(t)) methods.add("Affiliate / Referral");
  if (/payment|transaction|fee|card|wallet/i.test(t))
    methods.add("Transaction Fees");
  // fallback
  if (methods.size === 0) methods.add("Freemium / Upsell");
  return Array.from(methods);
}

function competitionEstimate(title: string, contextCount = 0) {
  // Heuristic: longer title and generic terms -> higher competition
  const generic = /tool|platform|app|service|solution|startup/i.test(title)
    ? 1
    : 0;
  const len = title.length;
  const raw = Math.min(
    100,
    Math.round((len / 120) * 60 + generic * 30 + contextCount * 10),
  );
  // Map to Low/Medium/High where higher raw means more competition
  if (raw < 35) return { score: 100 - raw, label: "Low" };
  if (raw < 70) return { score: 100 - raw, label: "Medium" };
  return { score: 100 - raw, label: "High" };
}

function difficultyEstimate(title: string) {
  // Keywords indicative of higher technical difficulty
  const hard =
    /infrastructure|compiler|kernel|blockchain|crypto|distributed|kubernetes|compiler|agent/i.test(
      title,
    );
  const medium = /api|sdk|integration|automation|ml|ai|model/i.test(title);
  if (hard) return { score: 80, label: "Hard" };
  if (medium) return { score: 50, label: "Moderate" };
  return { score: 20, label: "Easy" };
}

function gradeFromScore(score: number) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

export function analyzeStory(
  item: NewsItem,
  context: { category?: string }[] = [],
): OpportunityAnalysis {
  const title = item.title || "";
  const category = detectCategory(title);

  const pop = popularityScore(item.score);
  const market = marketPotential(item.descendants, item.score, title);
  const monetizationMethods = monetizationAnalysis(title, item.url);
  // monetization score from methods count and presence of strong keywords
  const monetizationScore = Math.min(
    100,
    monetizationMethods.length * 30 + (item.score ?? 0) / 3,
  );

  const contextCount = context.filter((c) => c.category === category).length;
  const competition = competitionEstimate(title, contextCount);

  const difficulty = difficultyEstimate(title);

  // Final opportunity score: equal weights
  const opportunityScore = normalize(
    Math.round(
      pop * 0.25 +
        market * 0.25 +
        monetizationScore * 0.25 +
        competition.score * 0.25,
    ),
  );

  const grade = gradeFromScore(opportunityScore);

  const potential =
    opportunityScore >= 80 ? "High" : opportunityScore >= 60 ? "Medium" : "Low";

  const badges: string[] = [];
  if (pop >= 70) badges.push("🔥 Trending");
  if (monetizationMethods.length > 0) badges.push("💰 Monetizable");
  if (opportunityScore >= 85) badges.push("🚀 High Potential");
  if (difficulty.label === "Easy") badges.push("⚡ Fast To Build");
  if (competition.label === "Low") badges.push("🏆 Low Competition");
  if (market >= 70) badges.push("📈 Growing Market");

  const reasoning = `Popularity ${pop}/100, Market ${market}/100, Monetization ${Math.round(monetizationScore)}/100, Competition ${Math.round(competition.score)}/100. Computed as 25% each.`;

  return {
    opportunityScore,
    grade,
    category,
    potential,
    competition: competition.label,
    difficulty: difficulty.label,
    monetization: monetizationMethods,
    badges,
    reasoning,
  };
}
