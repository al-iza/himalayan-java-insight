import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Section } from "@/components/ui-bits";
import { npr, outlets, TOTAL_OUTLET_COUNT } from "@/lib/dummy-data";
import { MAP_H, MAP_W, NEPAL_PATH, mapOutlets, project, slugify } from "@/lib/outlet-map";
import { cn } from "@/lib/utils";

export function OutletMap() {
  const [hover, setHover] = useState<string | null>(null);
  const active = mapOutlets.filter((o) => o.active);
  const soon = mapOutlets.filter((o) => !o.active);

  return (
    <Section
      title="Outlets across Nepal"
      subtitle={`${active.length} outlets reporting live · ${TOTAL_OUTLET_COUNT}+ in the network`}
      action={
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Live analytics
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-border bg-muted" /> Coming soon
          </span>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gold-soft/20 p-2">
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Map of Himalayan Java outlets across Nepal"
        >
          <path
            d={NEPAL_PATH}
            className="fill-background stroke-gold"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          {mapOutlets.map((o) => {
            const p = project(o.lon, o.lat);
            const isHover = hover === o.name;
            return (
              <Link
                key={o.name}
                to="/outlets/$outlet"
                params={{ outlet: slugify(o.name) }}
                onMouseEnter={() => setHover(o.name)}
                onMouseLeave={() => setHover(null)}
                aria-label={`${o.name}, ${o.city}`}
              >
                <g className="cursor-pointer">
                  {o.active && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHover ? 18 : 13}
                      className="fill-gold/25 transition-all"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={o.active ? 7 : 5}
                    className={cn(
                      "transition-all",
                      o.active
                        ? "fill-gold stroke-background"
                        : "fill-muted stroke-muted-foreground/60",
                    )}
                    strokeWidth={2}
                  />
                  {(isHover || o.active) && (
                    <text
                      x={p.x}
                      y={p.y - (o.active ? 16 : 12)}
                      textAnchor="middle"
                      className={cn(
                        "fill-foreground font-semibold",
                        isHover ? "opacity-100" : "opacity-70",
                      )}
                      style={{ fontSize: 13 }}
                    >
                      {o.name}
                    </text>
                  )}
                </g>
              </Link>
            );
          })}
        </svg>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Live outlets
          </p>
          <ul className="mt-3 space-y-2">
            {active.map((o) => {
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
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Other outlets · analytics coming soon
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {soon.map((o) => (
              <Link
                key={o.name}
                to="/outlets/$outlet"
                params={{ outlet: slugify(o.name) }}
                className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold hover:text-espresso"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
