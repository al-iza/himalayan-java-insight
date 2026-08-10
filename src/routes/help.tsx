import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ui-bits";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support | Himalayan Java Analytics" },
      {
        name: "description",
        content: "Help centre and support for the Himalayan Java analytics dashboard.",
      },
      { property: "og:title", content: "Help & Support | Himalayan Java Analytics" },
      {
        property: "og:description",
        content: "Guides and support for Himalayan Java analytics users.",
      },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Help & Support"
      message="Guides, FAQs and a direct support channel for the analytics team will land here soon."
    />
  ),
});
