import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, FileText, Share2, X } from "lucide-react";
import { npr, kpis, outlets, products } from "@/lib/dummy-data";
import { Growth } from "@/components/ui-bits";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports | Himalayan Java Analytics" },
      {
        name: "description",
        content:
          "Daily, weekly, monthly, quarterly and outlet performance reports for Himalayan Java management.",
      },
      { property: "og:title", content: "Reports | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "View, download and export Himalayan Java sales and outlet reports.",
      },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  { name: "Daily Sales Report", period: "Today · 7 Aug 2026", total: 79_070 },
  { name: "Weekly Sales Report", period: "1 – 7 Aug 2026", total: 473_200 },
  { name: "Monthly Sales Report", period: "July 2026", total: 1_842_500 },
  { name: "3-Month Sales Report", period: "May – July 2026", total: 5_182_200 },
  { name: "Outlet Performance Report", period: "July 2026 · 5 outlets", total: 1_842_500 },
];

function ReportsPage() {
  const [open, setOpen] = useState<(typeof reports)[number] | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <div key={r.name} className="card-surface flex flex-col p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-espresso">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.period}</p>
              </div>
            </div>
            <p className="mt-4 font-display text-xl font-semibold">{npr(r.total)}</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setOpen(r)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-105"
              >
                <Eye className="h-3.5 w-3.5" /> View
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium transition hover:bg-muted">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium transition hover:bg-muted">
                <Share2 className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-start">
              <div>
                <h2 className="font-display text-xl font-semibold">{open.name}</h2>
                <p className="text-xs text-muted-foreground">{open.period}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gold-soft/40 p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Total Sales
                </p>
                <p className="mt-1 font-display text-lg font-semibold">{npr(open.total)}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Orders
                </p>
                <p className="mt-1 font-display text-lg font-semibold">
                  {kpis.totalOrders.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Growth
                </p>
                <p className="mt-1 font-display text-lg font-semibold">+{kpis.salesGrowth}%</p>
              </div>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Outlet Breakdown
            </p>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {outlets.map((o) => (
                  <tr key={o.name} className="border-b border-border/70 last:border-0">
                    <td className="py-2.5 font-medium">{o.name}</td>
                    <td className="py-2.5 text-right tabular-nums">{npr(o.sales)}</td>
                    <td className="py-2.5 pl-4 text-right">
                      <Growth value={o.growth} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Top Products
            </p>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p.name} className="border-b border-border/70 last:border-0">
                    <td className="py-2.5 font-medium">{p.name}</td>
                    <td className="py-2.5 text-right tabular-nums">{p.qty}</td>
                    <td className="py-2.5 text-right tabular-nums">{npr(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted">
                <Download className="h-3.5 w-3.5" /> Download PDF
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground">
                <Share2 className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
