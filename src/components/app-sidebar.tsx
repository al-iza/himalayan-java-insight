import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Coffee,
  Store,
  FileText,
  Users,
  Package,
  HelpCircle,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import avatar from "@/assets/aliza.jpg";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Sales Analytics", url: "/sales", icon: TrendingUp },
  { title: "Product Analytics", url: "/products", icon: Coffee },
  { title: "Outlet Performance", url: "/outlets", icon: Store },
  { title: "Reports", url: "/reports", icon: FileText },
] as const;

const soon = [
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Inventory", url: "/inventory", icon: Package },
] as const;

const bottom = [
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "User Profile", url: "/profile", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const itemClass = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--gold)]"
        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
    );

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-primary-foreground shadow-gold">
          <Coffee className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-semibold">Himalayan Java</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Analytics
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Overview
        </p>
        {main.map((i) => (
          <Link key={i.url} to={i.url} className={itemClass(pathname === i.url)}>
            <i.icon className="h-[18px] w-[18px]" />
            {i.title}
          </Link>
        ))}

        <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Upcoming
        </p>
        {soon.map((i) => (
          <Link key={i.url} to={i.url} className={itemClass(pathname === i.url)}>
            <i.icon className="h-[18px] w-[18px]" />
            <span className="flex-1">{i.title}</span>
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-espresso">
              Soon
            </span>
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-sidebar-border px-3 py-4">
        {bottom.map((i) => (
          <Link key={i.title} to={i.url} className={itemClass(pathname === i.url)}>
            <i.icon className="h-[18px] w-[18px]" />
            {i.title}
          </Link>
        ))}
        <Link
          to="/profile"
          className="mt-3 flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 transition hover:bg-gold-soft/50"
        >
          <img
            src={avatar}
            alt="Aliza Shrestha profile"
            loading="lazy"
            width={512}
            height={512}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-semibold">Aliza Shrestha</p>
            <p className="truncate text-[11px] text-muted-foreground">Operations Head</p>
          </div>
          <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </Link>
      </div>
    </aside>
  );
}
