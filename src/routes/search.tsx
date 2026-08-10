import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Global search across Himalayan Java outlets, products and reports.",
      },
      { property: "og:title", content: "Search | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Search outlets, products and reports across Himalayan Java.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Global Search"
      message="Searching across outlets, products and reports will be enabled once data sources are connected."
    />
  ),
});
