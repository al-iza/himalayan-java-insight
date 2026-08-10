import { RefreshCw } from "lucide-react";
import { npr } from "@/lib/dummy-data";
import { tick, useLiveData } from "@/lib/live-data";
import { Section } from "@/components/ui-bits";

export function RealTimeSales({ outlet = "All Outlets" }: { outlet?: string }) {
  const live = useLiveData();
  const transactions =
    outlet === "All Outlets"
      ? live.transactions
      : live.transactions.filter((t) => t.outlet === outlet);
  const latest = transactions[0];

  return (
    <Section
      title="Real-Time Sales"
      subtitle="Today's live feed — refreshes automatically every few seconds."
      action={
        <>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-[11px] font-semibold text-success">
            <span className="live-dot h-2 w-2 rounded-full bg-success" /> LIVE
          </span>
          <button
            onClick={tick}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition hover:border-gold hover:bg-gold-soft/40"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-gold-soft/30 p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Today's Sales
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold">{npr(live.sales)}</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Today's Orders
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold">{live.orders}</p>
          </div>
          <div className="rounded-xl border border-border p-4 sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Latest Transaction
            </p>
            {latest ? (
              <>
                <p className="mt-1.5 text-sm font-medium">
                  {latest.id} · {latest.items}
                </p>
                <p className="text-xs text-muted-foreground">
                  {latest.outlet} · {npr(latest.amount)} · {latest.time}
                </p>
              </>
            ) : (
              <p className="mt-1.5 text-sm text-muted-foreground">
                Waiting for the next order at {outlet}…
              </p>
            )}
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">
            Average order value today: {npr(live.avg)} · Last updated {live.updatedAt}
          </p>
        </div>

        <div className="rounded-xl border border-border">
          <p className="border-b border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Recent Transactions · {outlet}
          </p>
          <ul className="divide-y divide-border">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted/50"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.items}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.outlet} · {t.time}
                  </p>
                </div>
                <span className="ml-auto font-medium tabular-nums">{npr(t.amount)}</span>
              </li>
            ))}
            {transactions.length === 0 && (
              <li className="px-4 py-6 text-center text-xs text-muted-foreground">
                No transactions yet for {outlet} in this session.
              </li>
            )}
          </ul>
        </div>
      </div>
    </Section>
  );
}
