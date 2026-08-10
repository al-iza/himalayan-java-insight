import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Dashboard settings, preferences and access control for Himalayan Java analytics.",
      },
      { property: "og:title", content: "Settings | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Preferences and access control for Himalayan Java analytics.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Settings"
      message="Preferences, alert thresholds and team access control are being prepared for the next phase."
    />
  ),
});
