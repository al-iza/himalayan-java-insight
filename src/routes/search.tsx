import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search as SearchIcon } from "lucide-react";
import { Section } from "@/components/ui-bits";
import { npr, outlets } from "@/lib/dummy-data";
import { mapOutlets, slugify } from "@/lib/outlet-map";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search Outlets | Himalayan Java Analytics" },
      {
        name: "description",
        content:
          "Search every Himalayan Java outlet across Nepal and open live analytics for connected locations.",
      },
      { property: "og:title", content: "Search Outlets | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Find any Himalayan Java outlet and jump into its analytics.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term
      ? mapOutlets.filter(
          (o) =>
            o.name.toLowerCase().includes(term) || o.city.toLowerCase().includes(term),
        )
      : mapOutlets;
    return {
      active: list.filter((o) => o.active),
      soon: list.filter((o) => !o.active),
    };
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="card-surface flex items-center gap-3 p-4">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search outlets by name or city…"
          className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {results.active.length + results.soon.length} outlets
        </span>
      </div>

      <Section
        title="Outlets with live analytics"
        subtitle="These locations are connected — open them for full sales, product and outlet analytics."
      >
        {results.active.length === 0 ? (
          <p className="text-sm text-muted-foreground">No connected outlets match your search.</p>
        ) : (
          <ul className="grid gap-2 md:grid-cols-2">
            {results.active.map((o) => {
              const data = outlets.find((x) => x.name === o.name);
              return (
                <li key={o.name}>
                  <Link
                    to="/outlets/$outlet"
                    params={{ outlet: slugify(o.name) }}
                    className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm transition hover:border-gold hover:bg-gold-soft/30"
                  >
                    <MapPin className="h-4 w-4 text-gold" />
                    <span className="font-medium">{o.name}</span>
                    <span className="text-xs text-muted-foreground">{o.city}</span>
                    {data && (
                      <span className="ml-auto tabular-nums text-xs text-muted-foreground">
                        {npr(data.sales)}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section
        title="All other outlets"
        subtitle="Listed across Nepal — analytics for these locations is coming soon."
      >
        {results.soon.length === 0 ? (
          <p className="text-sm text-muted-foreground">No other outlets match your search.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {results.soon.map((o) => (
              <Link
                key={o.name}
                to="/outlets/$outlet"
                params={{ outlet: slugify(o.name) }}
                className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold hover:text-espresso"
              >
                {o.name}
                <span className="ml-1.5 text-[10px] uppercase tracking-wide">soon</span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
