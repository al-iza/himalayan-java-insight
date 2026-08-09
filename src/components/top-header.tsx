import { useRouterState } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { LAST_UPDATED } from "@/lib/dummy-data";

const titles: Record<string, { title: string; sub: string }> = {
  "/": { title: "Business Overview", sub: "Sales and outlet performance at a glance." },
  "/sales": { title: "Sales Analytics", sub: "Track revenue trends across periods." },
  "/products": { title: "Product Analytics", sub: "See what sells and what doesn't." },
  "/outlets": { title: "Outlet Performance", sub: "Compare outlets and drill into detail." },
  "/reports": { title: "Reports", sub: "Download and share business reports." },
  "/customers": { title: "Customers", sub: "Coming soon." },
  "/inventory": { title: "Inventory", sub: "Coming soon." },
};

export function TopHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const page = titles[pathname] ?? titles["/"];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex flex-wrap items-center gap-4 px-6 py-4 lg:px-8">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-semibold">{page.title}</h1>
          <p className="text-xs text-muted-foreground">{page.sub}</p>
        </div>

        <div className="relative ml-auto hidden w-72 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search outlets, products, reports…"
            className="h-10 w-full rounded-full border border-border bg-muted/60 pl-9 pr-4 text-sm outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
          />
        </div>

        <div className="hidden text-right leading-tight xl:block">
          <p className="text-xs font-medium">{today}</p>
          <p className="text-[11px] text-muted-foreground">Last Updated: {LAST_UPDATED}</p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-[11px] font-semibold text-success">
          <span className="live-dot h-2 w-2 rounded-full bg-success" />
          Live Data
        </span>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold" />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-xs font-semibold text-background">
          AS
        </button>
      </div>
    </header>
  );
}
