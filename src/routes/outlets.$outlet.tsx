import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ComingSoon, Growth, Section } from "@/components/ui-bits";
import { ProductSales, SalesPerformance } from "@/components/charts";
import { npr, outlets } from "@/lib/dummy-data";
import { findOutletBySlug } from "@/lib/outlet-map";

export const Route = createFileRoute("/outlets/$outlet")({
  head: ({ params }) => {
    const found = findOutletBySlug(params.outlet);
    const name = found?.name ?? "Outlet";
    return {
      meta: [
        { title: `${name} | Himalayan Java Outlet` },
        {
          name: "description",
          content: `Sales, orders and product performance for the Himalayan Java outlet at ${name}.`,
        },
        { property: "og:title", content: `${name} | Himalayan Java Outlet` },
        {
          property: "og:description",
          content: `Outlet-level analytics for Himalayan Java ${name}.`,
        },
      ],
    };
  },
  component: OutletDetailPage,
  notFoundComponent: () => (
    <ComingSoon
      title="Outlet not found"
      message="We couldn't find that outlet. Head back to Outlet Performance to browse the network."
    />
  ),
  loader: ({ params }) => {
    const found = findOutletBySlug(params.outlet);
    if (!found) throw notFound();
    return null;
  },
});

function OutletDetailPage() {
  const { outlet: slug } = Route.useParams();
  const place = findOutletBySlug(slug)!;
  const data = outlets.find((o) => o.name === place.name);

  return (
    <div className="space-y-6">
      <Link
        to="/outlets"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-espresso"
      >
        <ArrowLeft className="h-4 w-4" /> All outlets
      </Link>

      {!data ? (
        <ComingSoon
          title={`${place.name} · ${place.city}`}
          message="This outlet is part of the Himalayan Java network, but its live analytics feed is not connected yet. Detailed sales, product and staff reporting is coming soon."
        />
      ) : (
        <>
          <Section
            title={place.name}
            subtitle={`${place.city}, Nepal · Peak ${data.peak}`}
            action={<Growth value={data.growth} />}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Today's Sales", value: npr(data.today) },
                { label: "Weekly Sales", value: npr(data.week) },
                { label: "Monthly Sales", value: npr(data.sales) },
                { label: "Orders (Month)", value: data.orders.toLocaleString() },
                { label: "Average Order Value", value: npr(data.aov) },
                { label: "Top Selling Product", value: data.topProduct },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <SalesPerformance outlet={place.name} />
          <ProductSales outlet={place.name} limit={6} />
        </>
      )}
    </div>
  );
}
