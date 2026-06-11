import { Trend } from '@/types/trend';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  return (
    <Card className="bg-surface/90 border-white/10 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
      <CardHeader>
        <CardTitle className="text-lg">{trend.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted">
        <div className="flex items-center justify-between gap-3">
          <span>Source: {trend.source}</span>
          <Badge variant="secondary">{trend.trendScore}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
