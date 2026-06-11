import { Startup } from "@/types/startup";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className="bg-surface/90 border-white/10 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
      <CardHeader>
        <CardTitle className="text-lg">{startup.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted">
        <p>{startup.description}</p>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{startup.funding}</Badge>
          <span>{startup.users} users</span>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted">
          Growth {startup.growth}%
        </p>
      </CardContent>
    </Card>
  );
}
