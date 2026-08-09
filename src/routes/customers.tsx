import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Customer analytics for Himalayan Java is coming in a future phase.",
      },
      { property: "og:title", content: "Customers | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Customer analytics will arrive once customer-level data is available.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Customer Analytics"
      message="Customer analytics will be available once customer-level data becomes available."
    />
  ),
});
