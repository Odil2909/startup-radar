import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GrowthChartProps {
  data: { name: string; value: number }[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-soft">
      <div className="mb-4 text-sm uppercase tracking-[0.24em] text-muted">
        Growth
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#27272A" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#A1A1AA", fontSize: 12 }} />
            <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
