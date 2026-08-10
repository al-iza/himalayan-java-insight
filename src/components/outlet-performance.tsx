import { useMemo, useState } from "react";
import { Search, Store, Trophy } from "lucide-react";
import { npr, outlets, TOTAL_OUTLET_COUNT, type Outlet } from "@/lib/dummy-data";
import { Growth, OutletCountHover, Section, Toggle } from "@/components/ui-bits";
import { OutletComparisonChart, ProductSales, SalesPerformance } from "@/components/charts";
import { cn } from "@/lib/utils";

const sorts = ["Sales", "Orders", "Growth"] as const;
type Sort = (typeof sorts)[number];

function sortOutlets(list: Outlet[], sort: Sort) {
  const c = [...list];
  if (sort === "Sales") return c.sort((a, b) => b.sales - a.sales);
  if (sort === "Orders") return c.sort((a, b) => b.orders - a.orders);
  return c.sort((a, b) => b.growth - a.growth);
}

export function OutletPerformance() {
  const [sort, setSort] = useState<Sort>("Sales");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("All Outlets");

  const filtered = useMemo(
    () => outlets.filter((o) => o.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const ranked = sortOutlets(outlets, sort);
  const best = [...outlets].sort((a, b) => b.sales - a.sales)[0]!;
  const detail = outlets.find((o) => o.name === selected);

  return (
    <div className="space-y-6">
      <Section
        title="Outlet Performance"
        subtitle={`Showing 5 of ${TOTAL_OUTLET_COUNT}+ Himalayan Java outlets`}
        action={
          <div className="relative flex w-64 items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search outlets…"
              className="h-9 w-full rounded-full border border-border bg-muted/60 pl-9 pr-3 text-sm outline-none focus:border-gold focus:bg-background"
            />
          </div>
        }
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {["All Outlets", ...filtered.map((o) => o.name)].map((name) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                selected === name
                  ? "border-gold bg-gold-soft/70 text-espresso"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground",
              )}
            >
              <Store className="h-3.5 w-3.5" />
              {name}
            </button>
          ))}
          <OutletCountHover />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Outlet Comparison — Sales (NPR)
            </p>
            <OutletComparisonChart highlight={selected} />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Ranking
              </p>
              <div className="ml-auto">
                <Toggle options={sorts} value={sort} onChange={setSort} />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  <th className="pb-3 pr-3 font-semibold">Rank</th>
                  <th className="pb-3 pr-3 font-semibold">Outlet</th>
                  <th className="pb-3 pr-3 text-right font-semibold">Sales</th>
                  <th className="pb-3 pr-3 text-right font-semibold">Orders</th>
                  <th className="pb-3 text-right font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((o, i) => (
                  <tr
                    key={o.name}
                    onClick={() => setSelected(o.name)}
                    className={cn(
                      "cursor-pointer border-b border-border/70 transition last:border-0 hover:bg-muted/50",
                      o.name === best.name && "bg-gold-soft/30",
                    )}
                  >
                    <td className="py-3 pr-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 pr-3 font-medium">
                      {o.name}
                      {o.name === best.name && (
                        <Trophy className="ml-2 inline h-3.5 w-3.5 text-gold" />
                      )}
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums">{npr(o.sales)}</td>
                    <td className="py-3 pr-3 text-right tabular-nums">
                      {o.orders.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <Growth value={o.growth} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 rounded-lg bg-gold-soft/40 px-3 py-2 text-xs text-espresso">
              <strong>Best Performing Outlet:</strong> {best.name} — {npr(best.sales)} (+
              {best.growth}%)
            </p>
          </div>
        </div>
      </Section>

      {detail && (
        <>
          <OutletDetail outlet={detail} />
          <SalesPerformance outlet={detail.name} />
          <ProductSales outlet={detail.name} limit={6} />
        </>
      )}
    </div>
  );
}

function OutletDetail({ outlet }: { outlet: Outlet }) {
  const stats = [
    { label: "Today's Sales", value: npr(outlet.today) },
    { label: "Weekly Sales", value: npr(outlet.week) },
    { label: "Monthly Sales", value: npr(outlet.sales) },
    { label: "Orders (Month)", value: outlet.orders.toLocaleString() },
    { label: "Average Order Value", value: npr(outlet.aov) },
    { label: "Top Selling Product", value: outlet.topProduct },
  ];

  return (
    <Section
      title={outlet.name}
      subtitle="Outlet detail"
      action={<Growth value={outlet.growth} />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Sales Trend
          </p>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {[52, 61, 48, 70, 66, 84, 92].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t bg-gold/80"
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Last 7 days</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Top Products
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[outlet.topProduct, "Cappuccino", "Butter Croissant"].map((p, i) => (
              <li key={p} className="flex items-center justify-between">
                <span>
                  <span className="mr-2 text-muted-foreground">{i + 1}</span>
                  {p}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {[318, 246, 188][i]}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Peak Sales Period
          </p>
          <p className="mt-3 font-display text-xl font-semibold">{outlet.peak}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Roughly 38% of daily orders happen in this window.
          </p>
        </div>
      </div>
    </Section>
  );
}
