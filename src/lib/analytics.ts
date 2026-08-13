import {
  dailySales,
  weeklySales,
  monthlySales,
  outlets,
  products,
  type Product,
} from "@/lib/dummy-data";

export const RANGES = ["Today", "This Week", "This Month", "Custom Range"] as const;
export type Range = (typeof RANGES)[number];

export const ALL_OUTLETS = "All Outlets";

export const hourlySales = [
  { label: "7 AM", sales: 4_120, prev: 3_640 },
  { label: "8 AM", sales: 8_940, prev: 7_820 },
  { label: "9 AM", sales: 11_260, prev: 10_180 },
  { label: "10 AM", sales: 12_480, prev: 11_040 },
  { label: "11 AM", sales: 9_870, prev: 9_320 },
  { label: "12 PM", sales: 10_640, prev: 9_980 },
  { label: "1 PM", sales: 11_930, prev: 10_460 },
  { label: "2 PM", sales: 9_830, prev: 9_260 },
];

export const quarterSales = [
  { label: "May", sales: 1_640_000, prev: 1_486_000 },
  { label: "Jun", sales: 1_699_700, prev: 1_640_000 },
  { label: "Jul", sales: 1_842_500, prev: 1_699_700 },
];

/** Share of company-wide volume attributable to the selected outlet. */
export function outletShare(outlet: string) {
  if (outlet === ALL_OUTLETS) return 1;
  const o = outlets.find((x) => x.name === outlet);
  if (!o) return 1;
  const total = outlets.reduce((s, x) => s + x.sales, 0);
  return o.sales / total;
}

function outletSeed(outlet: string) {
  if (outlet === ALL_OUTLETS) return 0;
  let h = 0;
  for (const c of outlet) h = (h * 31 + c.charCodeAt(0)) % 97;
  return h;
}

export type Custom = { from?: Date | undefined; to?: Date | undefined } | undefined;

const DAY = 86_400_000;

export function customDays(custom: Custom) {
  if (!custom?.from) return 0;
  const to = custom.to ?? custom.from;
  return Math.max(1, Math.round((to.getTime() - custom.from.getTime()) / DAY) + 1);
}

export function customLabel(custom: Custom) {
  if (!custom?.from) return "Custom Range";
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const to = custom.to ?? custom.from;
  return `${fmt(custom.from)} – ${fmt(to)}`;
}

/** Deterministic daily/weekly buckets between two dates. */
function customSeries(custom: Custom, outlet: string) {
  const from = custom!.from!;
  const days = customDays(custom);
  const step = days <= 16 ? 1 : days <= 90 ? 7 : 30;
  const buckets = Math.max(1, Math.ceil(days / step));
  const share = outletShare(outlet);
  const out: { label: string; sales: number; prev: number }[] = [];
  for (let i = 0; i < buckets; i++) {
    const start = new Date(from.getTime() + i * step * DAY);
    const key = start.getFullYear() * 372 + start.getMonth() * 31 + start.getDate();
    const wobble = 0.82 + ((key * 37) % 45) / 100;
    const base = 58_000 * step * share * wobble;
    out.push({
      label:
        step === 1
          ? start.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
          : step === 7
            ? `Wk ${i + 1}`
            : start.toLocaleDateString("en-GB", { month: "short" }),
      sales: Math.round(base),
      prev: Math.round(base * (0.88 + ((key * 13) % 16) / 100)),
    });
  }
  return out;
}

export function seriesFor(range: Range, outlet: string, custom?: Custom) {
  if (range === "Custom Range" && custom?.from) return customSeries(custom, outlet);
  const base =
    range === "Today"
      ? hourlySales
      : range === "This Week"
        ? dailySales
        : range === "This Month"
          ? weeklySales
          : quarterSales;
  const share = outletShare(outlet);
  const seed = outletSeed(outlet);
  return base.map((d, i) => {
    const wobble = seed === 0 ? 1 : 0.9 + (((seed + i * 13) % 20) / 100);
    return {
      label: d.label,
      sales: Math.round(d.sales * share * wobble),
      prev: Math.round(d.prev * share * wobble * 0.97),
    };
  });
}

export function seriesLabel(range: Range, custom?: Custom) {
  if (range === "Custom Range" && custom?.from) return `Sales · ${customLabel(custom)}`;
  if (range === "Today") return "Hourly sales today";
  if (range === "This Week") return "Daily sales this week";
  if (range === "This Month") return "Weekly sales this month";
  return "Monthly sales · last 3 months";
}

export function kpisFor(range: Range, outlet: string, custom?: Custom) {
  const data = seriesFor(range, outlet, custom);
  const sales = data.reduce((s, d) => s + d.sales, 0);
  const prevSales = data.reduce((s, d) => s + d.prev, 0);
  const aov =
    outlet === ALL_OUTLETS
      ? 147.6
      : (outlets.find((o) => o.name === outlet)?.aov ?? 147.6);
  const orders = Math.max(1, Math.round(sales / aov));
  const prevOrders = Math.max(1, Math.round(prevSales / aov));
  const growth = Number((((sales - prevSales) / prevSales) * 100).toFixed(1));

  const list = productsFor(range, outlet, custom);
  const topProduct = [...list].sort((a, b) => b.qty - a.qty)[0]!;

  const scopedOutlets = outlet === ALL_OUTLETS ? outlets : outlets.filter((o) => o.name === outlet);
  const bestOutlet = [...scopedOutlets].sort((a, b) => b.sales - a.sales)[0]!;

  return { sales, prevSales, orders, prevOrders, aov, growth, topProduct, bestOutlet };
}

const rangeFactor: Record<Range, number> = {
  Today: 0.045,
  "This Week": 0.26,
  "This Month": 1,
  "Custom Range": 2.8,
};

export function productsFor(range: Range, outlet: string, custom?: Custom): Product[] {
  const share = outletShare(outlet);
  const days = range === "Custom Range" ? customDays(custom) : 0;
  const f = (days > 0 ? days / 30 : rangeFactor[range]) * share;
  const seed = outletSeed(outlet);
  return products.map((p, i) => {
    const wobble = seed === 0 ? 1 : 0.85 + (((seed + i * 7) % 30) / 100);
    return {
      name: p.name,
      qty: Math.max(1, Math.round(p.qty * f * wobble)),
      revenue: Math.max(1, Math.round(p.revenue * f * wobble)),
      growth: Number((p.growth + (seed === 0 ? 0 : ((seed + i * 5) % 9) - 4)).toFixed(1)),
    };
  });
}
