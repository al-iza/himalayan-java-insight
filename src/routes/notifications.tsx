import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Sales alerts and outlet notifications for Himalayan Java management.",
      },
      { property: "og:title", content: "Notifications | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Alerts for sales spikes, drops and outlet issues.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Notifications"
      message="Live alerts for sales spikes, unusual drops and outlet issues are coming soon."
    />
  ),
});
