import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MORE_OUTLET_NAMES, TOTAL_OUTLET_COUNT } from "@/lib/dummy-data";

export function Section({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-surface p-6", className)}>
      <div className="mb-5 flex flex-wrap items-start gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action && <div className="ml-auto flex flex-wrap items-center gap-2">{action}</div>}
      </div>
      {children}
    </section>
  );
}

export function Growth({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
        className,
      )}
    >
      {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {up ? "+" : ""}
      {value}%
    </span>
  );
}

export function KpiCard({
  label,
  value,
  meta,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  meta?: ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-surface p-5 transition hover:shadow-gold/40",
        highlight && "border-gold/50 bg-gold-soft/25",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-soft text-espresso">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{value}</p>
      {meta && <div className="mt-2 text-xs text-muted-foreground">{meta}</div>}
    </div>
  );
}

export function Toggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-border bg-muted/60 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
            value === o
              ? "bg-gold text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function ComingSoon({ title, message }: { title: string; message: string }) {
  return (
    <div className="card-surface mx-auto max-w-xl p-12 text-center">
      <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso">
        Coming Soon
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{message}</p>
    </div>
  );
}

export function OutletCountHover({ className }: { className?: string }) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      <span className="cursor-default rounded-full border border-dashed border-border px-3 py-1 text-[11px] text-muted-foreground transition group-hover:border-gold group-hover:bg-gold-soft/40 group-hover:text-espresso">
        {TOTAL_OUTLET_COUNT}+ outlets connected
      </span>
      <span className="pointer-events-none absolute right-0 top-full z-40 mt-2 hidden w-72 rounded-xl border border-border bg-card p-3 text-left shadow-[var(--shadow-card)] group-hover:block">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Also reporting
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {MORE_OUTLET_NAMES.slice(0, 12).map((n) => (
            <span
              key={n}
              className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-foreground"
            >
              {n}
            </span>
          ))}
        </span>
        <span className="mt-2 block text-[11px] text-muted-foreground">
          + {TOTAL_OUTLET_COUNT - 5 - 12} more outlets across Nepal
        </span>
      </span>
    </span>
  );
}
