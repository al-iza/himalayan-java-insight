import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SalesPerformance } from "@/components/charts";
import { RealTimeSales } from "@/components/real-time-sales";
import { KpiCard, OutletCountHover, Toggle } from "@/components/ui-bits";
import { Banknote, CalendarRange, Receipt, TrendingUp, Wallet } from "lucide-react";
import { npr, outlets } from "@/lib/dummy-data";
import { ALL_OUTLETS, RANGES, kpisFor, type Range } from "@/lib/analytics";
import { useLiveData } from "@/lib/live-data";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Sales Analytics | Himalayan Java" },
      {
        name: "description",
        content:
          "Today, weekly and monthly sales trends for Himalayan Java with period-over-period comparison per outlet.",
      },
      { property: "og:title", content: "Sales Analytics | Himalayan Java" },
      {
        property: "og:description",
        content: "Track Himalayan Java revenue trends by period and by outlet.",
      },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  const [range, setRange] = useState<Range>("Today");
  const [outlet, setOutlet] = useState(ALL_OUTLETS);
  const live = useLiveData();
  const k = kpisFor(range, outlet);

  const isLive = range === "Today" && outlet === ALL_OUTLETS;
  const sales = isLive ? live.sales : k.sales;
  const orders = isLive ? live.orders : k.orders;
  const aov = isLive ? live.avg : k.aov;

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-center gap-4 p-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <CalendarRange className="h-4 w-4" /> Period
        </span>
        <Toggle options={RANGES} value={range} onChange={setRange} />
        <div className="ml-auto flex items-center gap-2">
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Sales"
          value={npr(sales)}
          icon={Banknote}
          meta={isLive ? `Live · updated ${live.updatedAt}` : `${range} · ${outlet}`}
          highlight
        />
        <KpiCard label="Total Orders" value={orders.toLocaleString()} icon={Receipt} />
        <KpiCard
          label="Avg Order Value"
          value={npr(Number(aov.toFixed(1)))}
          icon={Wallet}
        />
        <KpiCard
          label="Sales Growth"
          value={`${k.growth >= 0 ? "+" : ""}${k.growth}%`}
          icon={TrendingUp}
        />
      </div>

      <SalesPerformance range={range} outlet={outlet} onRangeChange={setRange} />
      <RealTimeSales outlet={outlet} />
    </div>
  );
}
