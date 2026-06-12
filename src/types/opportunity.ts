export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  growth: number;
  competition: number;
  difficulty: number;
  score: number;
  // optional metadata for multi-source support
  source?: string; // 'hackernews' | 'github' | 'reddit'
  url?: string;
  createdAt?: string;
}
