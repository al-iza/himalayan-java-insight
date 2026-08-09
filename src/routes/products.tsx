import { createFileRoute } from "@tanstack/react-router";
import { ProductSales } from "@/components/charts";
import { Growth, Section } from "@/components/ui-bits";
import { npr, products } from "@/lib/dummy-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Analytics | Himalayan Java" },
      {
        name: "description",
        content:
          "Top selling, lowest selling, highest revenue and fastest growing products across Himalayan Java outlets.",
      },
      { property: "og:title", content: "Product Analytics | Himalayan Java" },
      {
        property: "og:description",
        content: "See which Himalayan Java menu items sell best and which need attention.",
      },
    ],
  }),
  component: ProductsPage,
});

function list(sorter: (a: (typeof products)[number], b: (typeof products)[number]) => number) {
  return [...products].sort(sorter).slice(0, 4);
}

function MiniList({
  title,
  items,
  metric,
}: {
  title: string;
  items: typeof products;
  metric: (p: (typeof products)[number]) => string;
}) {
  return (
    <div className="card-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((p, i) => (
          <li key={p.name} className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">#{i + 1}</span>
            <span className="truncate font-medium">{p.name}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">{metric(p)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MiniList
          title="Top Selling Products"
          items={list((a, b) => b.qty - a.qty)}
          metric={(p) => `${p.qty}`}
        />
        <MiniList
          title="Lowest Selling Products"
          items={list((a, b) => a.qty - b.qty)}
          metric={(p) => `${p.qty}`}
        />
        <MiniList
          title="Highest Revenue Products"
          items={list((a, b) => b.revenue - a.revenue)}
          metric={(p) => npr(p.revenue)}
        />
        <MiniList
          title="Fastest Growing Products"
          items={list((a, b) => b.growth - a.growth)}
          metric={(p) => `+${p.growth}%`}
        />
      </div>

      <ProductSales limit={8} />

      <Section title="Full Product List" subtitle="All menu items in the selected period">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="pb-3 pr-4 font-semibold">Product</th>
                <th className="pb-3 pr-4 text-right font-semibold">Quantity</th>
                <th className="pb-3 pr-4 text-right font-semibold">Revenue</th>
                <th className="pb-3 text-right font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{p.qty}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{npr(p.revenue)}</td>
                  <td className="py-3 text-right">
                    <Growth value={p.growth} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
