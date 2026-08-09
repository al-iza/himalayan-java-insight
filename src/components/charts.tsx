import { useState } from "react";
import {
  Area,
  ComposedChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CHART_COLORS,
  npr,
  nprShort,
  products as allProducts,
  salesSeries,
  outlets,
  type Product,
} from "@/lib/dummy-data";
import { Growth, Section, Toggle } from "@/components/ui-bits";

const periods = ["Daily", "Weekly", "Monthly"] as const;
type Period = (typeof periods)[number];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 12,
  boxShadow: "var(--shadow-card)",
};

export function SalesPerformance() {
  const [period, setPeriod] = useState<Period>("Daily");
  const data = salesSeries[period];
  const total = data.reduce((s, d) => s + d.sales, 0);
  const prevTotal = data.reduce((s, d) => s + d.prev, 0);
  const delta = ((total - prevTotal) / prevTotal) * 100;

  return (
    <Section
      title="Sales Performance"
      subtitle="Sales (NPR) over time"
      action={<Toggle options={periods} value={period} onChange={setPeriod} />}
    >
      <div className="mb-5 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            This Period
          </p>
          <p className="font-display text-2xl font-semibold">{npr(total)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Previous Period
          </p>
          <p className="font-display text-xl font-medium text-muted-foreground">{npr(prevTotal)}</p>
        </div>
        <Growth value={Number(delta.toFixed(1))} className="mb-1.5" />
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              tickFormatter={(v) => nprShort(Number(v)).replace("NPR ", "")}
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => npr(Number(v))} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              name="This Period"
              dataKey="sales"
              stroke="var(--chart-1)"
              strokeWidth={3}
              fill="url(#goldFill)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              name="Previous Period"
              dataKey="prev"
              stroke="var(--chart-4)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}

const sorts = ["Most Sold", "Least Sold", "Revenue", "Growth"] as const;
type Sort = (typeof sorts)[number];

function sortProducts(list: Product[], sort: Sort) {
  const c = [...list];
  if (sort === "Most Sold") return c.sort((a, b) => b.qty - a.qty);
  if (sort === "Least Sold") return c.sort((a, b) => a.qty - b.qty);
  if (sort === "Revenue") return c.sort((a, b) => b.revenue - a.revenue);
  return c.sort((a, b) => b.growth - a.growth);
}

export function ProductSales({ limit = 5 }: { limit?: number }) {
  const [sort, setSort] = useState<Sort>("Most Sold");
  const sorted = sortProducts(allProducts, sort).slice(0, limit);

  return (
    <Section
      title="Product Sales"
      subtitle="Distribution and ranking of menu items"
      action={<Toggle options={sorts} value={sort} onChange={setSort} />}
    >
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sorted}
                dataKey="qty"
                nameKey="name"
                innerRadius={62}
                outerRadius={100}
                paddingAngle={3}
                stroke="var(--card)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {sorted.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v} sold`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-3 pr-4 font-semibold">Rank</th>
                <th className="pb-3 pr-4 font-semibold">Product</th>
                <th className="pb-3 pr-4 text-right font-semibold">Quantity Sold</th>
                <th className="pb-3 pr-4 text-right font-semibold">Revenue</th>
                <th className="pb-3 text-right font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.name} className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-4 text-muted-foreground">#{i + 1}</td>
                  <td className="py-3 pr-4 font-medium">
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                      style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    {p.name}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">{p.qty}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{npr(p.revenue)}</td>
                  <td className="py-3 text-right">
                    <Growth value={p.growth} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export function OutletComparisonChart() {
  const data = [...outlets].sort((a, b) => b.sales - a.sales);
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickFormatter={(v) => nprShort(Number(v)).replace("NPR ", "")}
            tickLine={false}
            axisLine={false}
            width={48}
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          />
          <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} formatter={(v) => npr(Number(v))} />
          <Bar dataKey="sales" name="Sales" radius={[8, 8, 0, 0]} maxBarSize={64}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? "var(--chart-1)" : "var(--chart-3)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
