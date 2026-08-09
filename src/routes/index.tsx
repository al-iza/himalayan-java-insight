import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  Coffee,
  Receipt,
  Store,
  TrendingUp,
  Wallet,
  CalendarRange,
} from "lucide-react";
import { useState } from "react";
import { kpis, npr, outlets, TOTAL_OUTLET_COUNT } from "@/lib/dummy-data";
import { KpiCard, Toggle } from "@/components/ui-bits";
import { ProductSales, SalesPerformance } from "@/components/charts";
import { OutletPerformance } from "@/components/outlet-performance";
import { RealTimeSales } from "@/components/real-time-sales";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Overview | Himalayan Java Analytics" },
      {
        name: "description",
        content:
          "Executive dashboard for Himalayan Java: sales performance, product sales and outlet performance at a glance.",
      },
      { property: "og:title", content: "Business Overview | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Sales and outlet performance at a glance for Himalayan Java management.",
      },
    ],
  }),
  component: Dashboard,
});

const ranges = ["Today", "This Week", "This Month", "Custom Range"] as const;

function Dashboard() {
  const [range, setRange] = useState<(typeof ranges)[number]>("This Month");
  const [outlet, setOutlet] = useState("All Outlets");

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-center gap-4 p-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <CalendarRange className="h-4 w-4" /> Period
        </span>
        <Toggle options={ranges} value={range} onChange={setRange} />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Outlet
          </span>
          <select
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            className="h-9 rounded-full border border-border bg-muted/60 px-4 text-sm outline-none focus:border-gold"
          >
            <option>All Outlets</option>
            {outlets.map((o) => (
              <option key={o.name}>{o.name}</option>
            ))}
          </select>
          <span className="text-[11px] text-muted-foreground">
            {TOTAL_OUTLET_COUNT}+ outlets connected
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          label="Total Sales"
          value={npr(kpis.totalSales)}
          icon={Banknote}
          meta={`vs ${npr(kpis.prevSales)} last period`}
          highlight
        />
        <KpiCard
          label="Total Orders"
          value={kpis.totalOrders.toLocaleString()}
          icon={Receipt}
          meta={`vs ${kpis.prevOrders.toLocaleString()} last period`}
        />
        <KpiCard
          label="Average Order Value"
          value={npr(kpis.avgOrderValue)}
          icon={Wallet}
          meta="+2.1% vs last period"
        />
        <KpiCard
          label="Best Performing Outlet"
          value={kpis.bestOutlet}
          icon={Store}
          meta={`${npr(486300)} this month`}
        />
        <KpiCard
          label="Top Selling Product"
          value={kpis.topProduct}
          icon={Coffee}
          meta="892 cups sold"
        />
        <KpiCard
          label="Sales Growth"
          value={`+${kpis.salesGrowth}%`}
          icon={TrendingUp}
          meta="Compared to previous period"
          highlight
        />
      </div>

      <SalesPerformance />
      <ProductSales />
      <RealTimeSales />
      <OutletPerformance />
    </div>
  );
}
