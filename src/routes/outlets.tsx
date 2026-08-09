import { createFileRoute } from "@tanstack/react-router";
import { OutletPerformance } from "@/components/outlet-performance";

export const Route = createFileRoute("/outlets")({
  head: () => ({
    meta: [
      { title: "Outlet Performance | Himalayan Java" },
      {
        name: "description",
        content:
          "Compare Himalayan Java outlets by sales, orders and growth, then drill into any single outlet.",
      },
      { property: "og:title", content: "Outlet Performance | Himalayan Java" },
      {
        property: "og:description",
        content: "Outlet-by-outlet sales comparison and detail view for Himalayan Java.",
      },
    ],
  }),
  component: () => <OutletPerformance />,
});
