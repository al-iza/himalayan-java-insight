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
import { npr, outlets } from "@/lib/dummy-data";
import { ALL_OUTLETS, RANGES, kpisFor, type Range } from "@/lib/analytics";
import { KpiCard, OutletCountHover, Toggle } from "@/components/ui-bits";
import { ProductSales, SalesPerformance } from "@/components/charts";
import { OutletPerformance } from "@/components/outlet-performance";
import { RealTimeSales } from "@/components/real-time-sales";
import { useLiveData } from "@/lib/live-data";

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

function Dashboard() {
  const [range, setRange] = useState<Range>("This Month");
  const [outlet, setOutlet] = useState(ALL_OUTLETS);
  const live = useLiveData();
  const k = kpisFor(range, outlet);

  const isToday = range === "Today";
  const sales = isToday && outlet === ALL_OUTLETS ? live.sales : k.sales;
  const orders = isToday && outlet === ALL_OUTLETS ? live.orders : k.orders;
  const aov = isToday && outlet === ALL_OUTLETS ? live.avg : k.aov;

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-center gap-4 p-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <CalendarRange className="h-4 w-4" /> Period
        </span>
        <Toggle options={RANGES} value={range} onChange={setRange} />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Outlet
          </span>
          <select
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            className="h-9 rounded-full border border-border bg-muted/60 px-4 text-sm outline-none focus:border-gold"
          >
            <option>{ALL_OUTLETS}</option>
            {outlets.map((o) => (
              <option key={o.name}>{o.name}</option>
            ))}
          </select>
          <OutletCountHover />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          label="Total Sales"
          value={npr(sales)}
          icon={Banknote}
          meta={
            isToday && outlet === ALL_OUTLETS
              ? `Live · updated ${live.updatedAt}`
              : `vs ${npr(k.prevSales)} last period`
          }
          highlight
        />
        <KpiCard
          label="Total Orders"
          value={orders.toLocaleString()}
          icon={Receipt}
          meta={
            isToday && outlet === ALL_OUTLETS
              ? "Live order count"
              : `vs ${k.prevOrders.toLocaleString()} last period`
          }
        />
        <KpiCard
          label="Average Order Value"
          value={npr(Number(aov.toFixed(1)))}
          icon={Wallet}
          meta={`${range} · ${outlet}`}
        />
        <KpiCard
          label="Best Performing Outlet"
          value={k.bestOutlet.name}
          icon={Store}
          meta={`${npr(k.bestOutlet.sales)} this month`}
        />
        <KpiCard
          label="Top Selling Product"
          value={k.topProduct.name}
          icon={Coffee}
          meta={`${k.topProduct.qty} sold · ${range}`}
        />
        <KpiCard
          label="Sales Growth"
          value={`${k.growth >= 0 ? "+" : ""}${k.growth}%`}
          icon={TrendingUp}
          meta="Compared to previous period"
          highlight
        />
      </div>

      <SalesPerformance range={range} outlet={outlet} onRangeChange={setRange} />
      <ProductSales range={range} outlet={outlet} />
      <RealTimeSales outlet={outlet} />
      <OutletPerformance />
    </div>
  );
}
