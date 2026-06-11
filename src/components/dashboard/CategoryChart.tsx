import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface CategoryChartProps {
  data: { category: string; value: number }[];
}

const colors = ["#6366F1", "#60A5FA", "#F59E0B", "#22C55E", "#EC4899"];

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-soft">
      <div className="mb-4 text-sm uppercase tracking-[0.24em] text-muted">
        Categories
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={44}
              outerRadius={88}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Legend wrapperStyle={{ color: "#A1A1AA", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
