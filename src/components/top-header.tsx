import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Mail, Phone, Search, Settings, User } from "lucide-react";
import { npr } from "@/lib/dummy-data";
import { useLiveData } from "@/lib/live-data";
import avatar from "@/assets/aliza.jpg";

const titles: Record<string, { title: string; sub: string }> = {
  "/": { title: "Business Overview", sub: "Sales and outlet performance at a glance." },
  "/sales": { title: "Sales Analytics", sub: "Track revenue trends across periods." },
  "/products": { title: "Product Analytics", sub: "See what sells and what doesn't." },
  "/outlets": { title: "Outlet Performance", sub: "Compare outlets and drill into detail." },
  "/reports": { title: "Reports", sub: "Download and share business reports." },
  "/customers": { title: "Customers", sub: "Coming soon." },
  "/inventory": { title: "Inventory", sub: "Coming soon." },
  "/profile": { title: "User Profile", sub: "Manage your account details." },
  "/settings": { title: "Settings", sub: "Coming soon." },
  "/help": { title: "Help & Support", sub: "Coming soon." },
  "/notifications": { title: "Notifications", sub: "Coming soon." },
  "/search": { title: "Search", sub: "Coming soon." },
  "/signin": { title: "Sign In", sub: "Access the analytics dashboard." },
};

export function TopHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const page = titles[pathname] ?? titles["/"]!;
  const live = useLiveData();
  const [menu, setMenu] = useState(false);

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex flex-wrap items-center gap-4 px-6 py-4 lg:px-8">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-semibold">{page.title}</h1>
          <p className="text-xs text-muted-foreground">{page.sub}</p>
        </div>

        <div className="relative ml-auto hidden w-72 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <Link
            to="/search"
            className="flex h-10 w-full items-center rounded-full border border-border bg-muted/60 pl-9 pr-4 text-sm text-muted-foreground transition hover:border-gold hover:bg-background"
          >
            Search outlets, products, reports…
          </Link>
        </div>

        <div className="hidden text-right leading-tight xl:block">
          <p className="text-xs font-medium">{today || "\u00a0"}</p>
          <p className="text-[11px] text-muted-foreground">{today ? `Updated ${live.updatedAt}` : "\u00a0"}</p>
        </div>

        <Link
          to="/sales"
          title="Live today's sales — click for today's analytics"
          className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-[11px] font-semibold text-success transition hover:bg-success/15"
        >
          <span className="live-dot h-2 w-2 rounded-full bg-success" />
          Live · {npr(live.sales)} today
        </Link>

        <Link
          to="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenu((m) => !m)}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-gold/40"
          >
            <img
              src={avatar}
              alt="Aliza Shrestha profile"
              loading="lazy"
              width={512}
              height={512}
              className="h-full w-full object-cover"
            />
          </button>

          {menu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setMenu(false)} />
              <div className="card-surface absolute right-0 z-40 mt-2 w-72 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt="Aliza Shrestha profile"
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="truncate font-semibold">Aliza Shrestha</p>
                    <p className="truncate text-xs text-muted-foreground">Operations Head</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> aliza.shrestha@gmail.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> +977 9801-234567
                  </li>
                </ul>
                <div className="mt-4 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setMenu(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                  >
                    <User className="h-4 w-4" /> View profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenu(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <Link
                    to="/signin"
                    onClick={() => setMenu(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
