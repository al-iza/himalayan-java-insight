import type { DateRange } from "react-day-picker";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarRange } from "lucide-react";
import { ProductSales, ProductRevenueBars } from "@/components/charts";
import { Growth, OutletCountHover, Section, Toggle } from "@/components/ui-bits";
import { npr, outlets, type Product } from "@/lib/dummy-data";
import { ALL_OUTLETS, RANGES, productsFor, type Range } from "@/lib/analytics";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Analytics | Himalayan Java" },
      {
        name: "description",
        content:
          "Top selling, lowest selling, highest revenue and fastest growing products by period and outlet.",
      },
      { property: "og:title", content: "Product Analytics | Himalayan Java" },
      {
        property: "og:description",
        content: "See which Himalayan Java menu items sell best and which need attention.",
      },
    ],
  }),
  component: ProductsPage,
});

function MiniList({
  title,
  items,
  metric,
}: {
  title: string;
  items: Product[];
  metric: (p: Product) => string;
}) {
  return (
    <div className="card-surface p-5 transition hover:border-gold/50">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((p, i) => (
          <li key={p.name} className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{i + 1}</span>
            <span className="truncate font-medium">{p.name}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">{metric(p)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsPage() {
  const [range, setRange] = useState<Range>("This Month");
  const [outlet, setOutlet] = useState(ALL_OUTLETS);
  const [custom, setCustom] = useState<DateRange | undefined>(undefined);
  const scoped = productsFor(range, outlet, custom);
  const list = (sorter: (a: Product, b: Product) => number) =>
    [...scoped].sort(sorter).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-center gap-4 p-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <CalendarRange className="h-4 w-4" /> Period
        </span>
        <Toggle options={RANGES} value={range} onChange={setRange} />
        <DateRangePicker
          value={custom}
          onChange={(r) => {
            setCustom(r);
            setRange(r?.from ? "Custom Range" : "This Month");
          }}
        />
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MiniList
          title="Top Selling Products"
          items={list((a, b) => b.qty - a.qty)}
          metric={(p) => `${p.qty}`}
        />
        <MiniList
          title="Lowest Selling Products"
          items={list((a, b) => a.qty - b.qty)}
          metric={(p) => `${p.qty}`}
        />
        <MiniList
          title="Highest Revenue Products"
          items={list((a, b) => b.revenue - a.revenue)}
          metric={(p) => npr(p.revenue)}
        />
        <MiniList
          title="Fastest Growing Products"
          items={list((a, b) => b.growth - a.growth)}
          metric={(p) => `${p.growth >= 0 ? "+" : ""}${p.growth}%`}
        />
      </div>

      <ProductSales limit={8} range={range} outlet={outlet} />

      <Section
        title="Revenue by Product"
        subtitle={`Top 6 products by revenue · ${range} · ${outlet}`}
      >
        <ProductRevenueBars range={range} outlet={outlet} custom={custom} />
      </Section>

      <Section title="Full Product List" subtitle={`${range} · ${outlet}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-3 pr-4 font-semibold">Rank</th>
                <th className="pb-3 pr-4 font-semibold">Product</th>
                <th className="pb-3 pr-4 text-right font-semibold">Quantity</th>
                <th className="pb-3 pr-4 text-right font-semibold">Revenue</th>
                <th className="pb-3 text-right font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[...scoped]
                .sort((a, b) => b.qty - a.qty)
                .map((p, i) => (
                  <tr
                    key={p.name}
                    className="border-b border-border/70 transition last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3 pr-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
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
      </Section>
    </div>
  );
}
