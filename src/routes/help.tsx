import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help — PromptOS" }] }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Help & Support"
        description="Docs, guides and ways to reach the PromptOS team."
        icon={LifeBuoy}
      />
    </AppLayout>
  );
}