export type ValidationResult = {
  score: number; // 0-100
  confidence: number; // 0-100 pre-validation confidence
  competition: "Low" | "Medium" | "High";
  difficulty: "Easy" | "Moderate" | "Hard";
  estimatedMvpTime: string; // e.g. '3 Weeks'
  revenuePotential: "Low" | "Medium" | "High";
  targetAudience: string[];
  risks: string[];
  recommendation: "Worth Building" | "Consider" | "Not Recommended";
  breakdown: {
    marketDemand: number;
    monetization: number;
    competitionFactor: number;
    difficultyFactor: number;
    novelty: number;
  };
};

export type PreValidationResult = {
  valid: boolean;
  confidence: number; // 0-100
  reason?: string;
  suggestions?: string[];
};

function containsAny(text: string, arr: RegExp[]) {
  return arr.some((r) => r.test(text));
}

export function validateIdea(title: string): ValidationResult {
  const t = (title || "").toLowerCase();

  // Run pre-validation first
  const pre = preValidateIdea(title);
  if (!pre.valid) {
    return {
      score: 0,
      confidence: pre.confidence,
      competition: "High",
      difficulty: "Easy",
      estimatedMvpTime: "N/A",
      revenuePotential: "Low",
      targetAudience: [],
      risks: [pre.reason || "Invalid idea"],
      recommendation: "Not Recommended",
      breakdown: {
        marketDemand: 0,
        monetization: 0,
        competitionFactor: 0,
        difficultyFactor: 0,
        novelty: 0,
      },
    };
  }

  // heuristics
  const marketKeywords = [
    /ai|machine learning|ml|llm|gpt/,
    /resume|job|hiring|interview/,
    /education|study|learning|course/,
    /finance|fintech|payment|bank/,
    /game|gaming|esports/,
    /health|wellness|fit|sleep/,
    /cloud|kubernetes|serverless|aws|gcp|azure/,
  ];

  const monetizationKeywords = [
    /subscription|saas|monthly|yearly|premium/,
    /marketplace|vendor|seller/,
    /ad|advertis|sponsored/,
    /api|developer|sdk|integration/,
    /enterprise|b2b|team/,
    /affiliate|referral/,
    /one-?time|pay once|one time purchase/,
  ];

  const hardKeywords = [
    /infrastructure|kernel|blockchain|compiler|distributed|security|encryption/,
  ];
  const mediumKeywords = [/api|integration|automation|ml|ai|model|nlp/];

  // market demand score (0-30)
  let marketDemand = 0;
  for (const k of marketKeywords) {
    if (k.test(t)) marketDemand += 6; // up to 42 but we'll clamp
  }
  marketDemand = Math.min(30, marketDemand);

  // monetization (0-25)
  let monetization = 0;
  for (const k of monetizationKeywords) if (k.test(t)) monetization += 8;
  monetization = Math.min(25, monetization);

  // competition: generic words increase competition
  const genericWords = (
    t.match(/\b(tool|platform|app|service|solution|startup|system)\b/g) || []
  ).length;
  const competitionRaw = Math.min(
    100,
    genericWords * 30 + Math.max(0, 10 - t.length / 20),
  );
  const competitionFactor = Math.round(100 - competitionRaw); // higher is better
  const competition: ValidationResult["competition"] =
    competitionRaw < 35 ? "Low" : competitionRaw < 70 ? "Medium" : "High";

  // difficulty
  let difficulty: ValidationResult["difficulty"] = "Easy";
  if (containsAny(t, hardKeywords)) difficulty = "Hard";
  else if (containsAny(t, mediumKeywords)) difficulty = "Moderate";

  const difficultyFactor =
    difficulty === "Easy" ? 100 : difficulty === "Moderate" ? 60 : 30;

  // novelty: penalize extremely generic titles, reward unique words
  const words = t.split(/\s+/).filter(Boolean);
  const unique = new Set(words).size;
  const novelty = Math.min(10, unique);

  // final score weights: market 30, monetization 25, competitionFactor 20, difficultyFactor 15, novelty 10 => sum 100
  const rawScore = Math.round(
    (marketDemand / 30) * 30 +
      (monetization / 25) * 25 +
      (competitionFactor / 100) * 20 +
      (difficultyFactor / 100) * 15 +
      (novelty / 10) * 10,
  );
  const score = Math.max(0, Math.min(100, rawScore));

  // revenue potential
  const revenuePotential: ValidationResult["revenuePotential"] =
    monetization >= 15 ? "High" : monetization >= 8 ? "Medium" : "Low";

  // estimated MVP time
  let estimatedMvpTime = "4 Weeks";
  if (difficulty === "Easy") estimatedMvpTime = "2-3 Weeks";
  if (difficulty === "Moderate") estimatedMvpTime = "4-8 Weeks";
  if (difficulty === "Hard") estimatedMvpTime = "8-16 Weeks";

  // target audience heuristics
  const audiences: string[] = [];
  if (/student|school|learn|education|course/.test(t))
    audiences.push("Students");
  if (/enterprise|b2b|team|company/.test(t))
    audiences.push("Teams / Enterprises");
  if (/developer|api|sdk|cli/.test(t)) audiences.push("Developers");
  if (/freelance|resume|job|hiring|interview/.test(t))
    audiences.push("Job Seekers");
  if (audiences.length === 0) audiences.push("Early adopters / Enthusiasts");

  // risks
  const risks: string[] = [];
  if (competition === "High") risks.push("High market competition");
  if (difficulty === "Hard") risks.push("Technical complexity");
  if (/data|privacy|personal/.test(t)) risks.push("Data & privacy compliance");
  if (risks.length === 0) risks.push("Execution risk, market fit to validate");

  const recommendation: ValidationResult["recommendation"] =
    score >= 80
      ? "Worth Building"
      : score >= 60
        ? "Consider"
        : "Not Recommended";

  return {
    score,
    confidence: pre.confidence,
    competition,
    difficulty,
    estimatedMvpTime,
    revenuePotential,
    targetAudience: audiences,
    risks,
    recommendation,
    breakdown: {
      marketDemand,
      monetization,
      competitionFactor,
      difficultyFactor,
      novelty,
    },
  };
}

export function preValidateIdea(title: string): PreValidationResult {
  const raw = (title || "").trim();
  if (!raw)
    return {
      valid: false,
      confidence: 0,
      reason: "Empty input",
      suggestions: ["Provide a short idea title or description."],
    };

  // length checks
  const length = raw.length;
  const words = raw.split(/\s+/).filter(Boolean);

  // reject numeric-only
  if (/^\d+$/.test(raw)) {
    return {
      valid: false,
      confidence: 0,
      reason: "Input is numbers only",
      suggestions: [
        'Use words to describe the idea, e.g. "AI resume builder for students"',
      ],
    };
  }

  // reject nonsense repeated characters
  if (/^[^a-zA-Z0-9\s]{3,}$/.test(raw) || /([a-z])\1{6,}/i.test(raw)) {
    return {
      valid: false,
      confidence: 0,
      reason: "Input looks like gibberish",
      suggestions: ["Use meaningful words and avoid repeated characters."],
    };
  }

  // word count and length scoring
  const lengthScore = Math.min(30, Math.max(0, Math.round((length / 60) * 30)));
  const wordScore = Math.min(
    25,
    Math.max(0, Math.round((words.length / 6) * 25)),
  );

  // keyword presence boosts confidence
  const keywords = [
    /\b(ai|ml|machine learning|resume|job|hiring|education|fintech|health|cloud|kubernetes)\b/i,
  ];
  const keywordScore = keywords.some((r) => r.test(raw)) ? 25 : 0;

  // ensure input is more than single generic word
  const genericSingle =
    words.length === 1 &&
    /^(app|tool|service|platform|idea|startup|ai|test|demo)$/i.test(raw);
  if (genericSingle) {
    return {
      valid: false,
      confidence: 30,
      reason: "Input is too short or generic",
      suggestions: [
        'Add a short descriptor, e.g. "for students", "SaaS", "for developers"',
      ],
    };
  }

  // alphanumeric content check
  const alphaCount = (raw.match(/[a-zA-Z]/g) || []).length;
  const alphaScore = alphaCount > 0 ? 20 : 0;

  const confidence = Math.min(
    100,
    lengthScore + wordScore + keywordScore + alphaScore,
  );

  if (confidence < 50) {
    const reason =
      words.length === 1 ? "Single word — too vague" : "Insufficient detail";
    const suggestions: string[] = [];
    if (words.length === 1)
      suggestions.push(
        'Add a short modifier: e.g. "for students", "SaaS", "for developers"',
      );
    suggestions.push(
      "Describe the target user and primary benefit in 3-6 words.",
    );
    return { valid: false, confidence, reason, suggestions };
  }

  return { valid: true, confidence };
}
