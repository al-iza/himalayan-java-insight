import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Inventory analytics for Himalayan Java is coming in a future phase.",
      },
      { property: "og:title", content: "Inventory | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Inventory analytics will arrive once inventory data is integrated.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Inventory Analytics"
      message="Inventory analytics will be available once inventory data is integrated."
    />
  ),
});
