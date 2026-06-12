import { NewsItem, analyzeStory } from "./opportunity-engine";

export type Idea = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  competition: string;
  potential: string;
  estimatedBuildTime: string; // e.g. "4 weeks"
  monetization: string[];
  opportunityScore: number; // 0-100
  reasoning: string;
  mvpPlan: { week: string; tasks: string[] }[];
  revenueModel: string[]; // ranked monetization strategies
};

const TITLES = [
  (t: string) => `${t} Platform`,
  (t: string) => `${t} Analytics`,
  (t: string) => `${t} for Teams`,
  (t: string) => `Next-gen ${t}`,
  (t: string) => `${t} Dashboard`,
  (t: string) => `${t} Marketplace`,
  (t: string) => `${t} Automation`,
  (t: string) => `${t} as a Service`,
  (t: string) => `${t} Insights`,
  (t: string) => `AI ${t} Assistant`,
];

function pickTitle(base: string, idx: number) {
  const f = TITLES[idx % TITLES.length];
  // remove generic words to make title concise
  const cleaned = base.replace(/\b(tool|app|service|platform)\b/gi, "").trim();
  const title = f(cleaned || base);
  return title.replace(/\s+/g, " ").trim();
}

function estimateBuildTime(difficultyLabel: string) {
  if (difficultyLabel === "Easy") return "2-4 weeks";
  if (difficultyLabel === "Moderate") return "4-8 weeks";
  return "8-16 weeks";
}

function scoreIdea(analysis: ReturnType<typeof analyzeStory>) {
  // Combine aspects: market (potential), competition (lower better), difficulty (lower better), monetization count
  const market =
    analysis.potential === "High"
      ? 90
      : analysis.potential === "Medium"
        ? 65
        : 30;
  const competition =
    analysis.competition === "Low"
      ? 90
      : analysis.competition === "Medium"
        ? 60
        : 25;
  const difficulty =
    analysis.difficulty === "Easy"
      ? 90
      : analysis.difficulty === "Moderate"
        ? 60
        : 30;
  const monetizationFactor = Math.min(
    100,
    (analysis.monetization.length || 1) * 30,
  );

  const score = Math.round(
    market * 0.3 +
      competition * 0.25 +
      monetizationFactor * 0.25 +
      difficulty * 0.2,
  );
  return Math.max(0, Math.min(100, score));
}

function generateMVPPlan(title: string, difficulty: string) {
  const base = [
    {
      week: "Week 1",
      tasks: [
        "Define scope and core MVP features",
        "Design data model and APIs",
        "Create basic UI wireframes",
      ],
    },
    {
      week: "Week 2",
      tasks: [
        "Implement core backend APIs",
        "Build initial frontend pages and components",
        "Integrate basic authentication",
      ],
    },
    {
      week: "Week 3",
      tasks: [
        "Add key integrations (3rd party APIs)",
        "Polish UX and error handling",
        "Write basic tests and CI",
      ],
    },
    {
      week: "Week 4",
      tasks: [
        "Prepare deployment pipeline",
        "Beta release and collect feedback",
        "Plan next features and roadmap",
      ],
    },
  ];
  if (difficulty === "Hard") {
    base[0].tasks.push("Proof-of-concept for core algorithm");
    base[2].tasks.push("Performance optimization and infra hardening");
  }
  if (difficulty === "Easy") {
    base[1].tasks.push("Seed demo data and examples");
    base[3].tasks.push("Marketing landing page and collect signups");
  }
  return base;
}

function rankRevenueMethods(methods: string[]) {
  // Simple ranking heuristic: prefer subscription and enterprise-related
  const ranking = [
    "Subscription",
    "Enterprise Sales",
    "Marketplace Fees",
    "Developer API / Paid Tier",
    "Advertising",
    "Affiliate / Referral",
    "Transaction Fees",
    "Freemium / Upsell",
    "One-time Purchase",
  ];
  return methods
    .slice()
    .sort((a, b) => ranking.indexOf(a) - ranking.indexOf(b));
}

let cache: { ts: number; ideas: Idea[] } | null = null;
const TTL = 1000 * 60 * 10; // 10 minutes cache

export async function generateIdeasFromStories(
  stories: NewsItem[],
  count = 100,
): Promise<Idea[]> {
  const now = Date.now();
  if (cache && now - cache.ts < TTL && cache.ideas.length >= count)
    return cache.ideas.slice(0, count);

  const ideas: Idea[] = [];
  // For each story create 1-3 ideas depending on title length
  let idx = 0;
  for (const s of stories) {
    const analysis = analyzeStory(
      s,
      stories.map((st) => ({ category: st.title || "" }) as any),
    );
    const variants = Math.min(
      3,
      Math.max(1, Math.floor((s.title?.length || 20) / 40) + 1),
    );
    for (let v = 0; v < variants && ideas.length < count; v++) {
      const title = pickTitle(s.title || "Startup Idea", idx + v);
      const difficulty = analysis.difficulty;
      const competition = analysis.competition;
      const monetization = analysis.monetization;
      const opportunityScore = scoreIdea(analysis);
      const mvpPlan = generateMVPPlan(title, difficulty);
      const revenueModel = rankRevenueMethods(monetization);

      const idea: Idea = {
        id: `idea-${s.id}-${v}`,
        title,
        description: `Build ${title} — ${s.title}. ${analysis.reasoning}`,
        category: analysis.category,
        difficulty,
        competition,
        potential: analysis.potential,
        estimatedBuildTime: estimateBuildTime(difficulty),
        monetization: monetization,
        opportunityScore,
        reasoning: analysis.reasoning,
        mvpPlan,
        revenueModel,
      };

      ideas.push(idea);
    }
    idx += 1;
    if (ideas.length >= count) break;
  }

  // If not enough, produce synthetic ideas by remixing titles
  while (ideas.length < count) {
    const a = stories[Math.floor(Math.random() * stories.length)];
    const analysis = analyzeStory(
      a,
      stories.map((st) => ({ category: st.title || "" }) as any),
    );
    const title = pickTitle(
      a.title || "Idea",
      Math.floor(Math.random() * TITLES.length),
    );
    const difficulty = analysis.difficulty;
    const idea: Idea = {
      id: `idea-synth-${ideas.length}`,
      title,
      description: `${title} — derived from ${a.title}. ${analysis.reasoning}`,
      category: analysis.category,
      difficulty,
      competition: analysis.competition,
      potential: analysis.potential,
      estimatedBuildTime: estimateBuildTime(difficulty),
      monetization: analysis.monetization,
      opportunityScore: scoreIdea(analysis),
      reasoning: analysis.reasoning,
      mvpPlan: generateMVPPlan(title, difficulty),
      revenueModel: rankRevenueMethods(analysis.monetization),
    };
    ideas.push(idea);
  }

  cache = { ts: Date.now(), ideas };
  return ideas.slice(0, count);
}

export function getIdeaById(ideas: Idea[], id: string) {
  return ideas.find((i) => i.id === id) || null;
}
