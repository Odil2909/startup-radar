import { Opportunity } from "@/types/opportunity";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Card className="group bg-surface/90 border-white/10 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
            <CardDescription>{opportunity.category}</CardDescription>
          </div>
          <Badge variant="secondary">{opportunity.score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted">
        <p>{opportunity.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted">
          <span>Growth {opportunity.growth}%</span>
          <span>Competition {opportunity.competition}/10</span>
          <span>Difficulty {opportunity.difficulty}/10</span>
        </div>
      </CardContent>
    </Card>
  );
}
