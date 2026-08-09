import { createFileRoute } from "@tanstack/react-router";
import { SalesPerformance } from "@/components/charts";
import { RealTimeSales } from "@/components/real-time-sales";
import { KpiCard } from "@/components/ui-bits";
import { Banknote, Receipt, TrendingUp, Wallet } from "lucide-react";
import { kpis, npr } from "@/lib/dummy-data";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Sales Analytics | Himalayan Java" },
      {
        name: "description",
        content:
          "Daily, weekly and monthly sales trends for Himalayan Java with period-over-period comparison.",
      },
      { property: "og:title", content: "Sales Analytics | Himalayan Java" },
      {
        property: "og:description",
        content: "Track Himalayan Java revenue trends across daily, weekly and monthly periods.",
      },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Sales" value={npr(kpis.totalSales)} icon={Banknote} highlight />
        <KpiCard label="Total Orders" value={kpis.totalOrders.toLocaleString()} icon={Receipt} />
        <KpiCard label="Avg Order Value" value={npr(kpis.avgOrderValue)} icon={Wallet} />
        <KpiCard label="Sales Growth" value={`+${kpis.salesGrowth}%`} icon={TrendingUp} />
      </div>
      <SalesPerformance />
      <RealTimeSales />
    </div>
  );
}
