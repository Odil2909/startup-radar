interface StatsCardProps {
  label: string;
  value: string;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-muted">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
