import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — PromptOS" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Analytics"
        description="Track usage, latency and quality across models."
        icon={BarChart3}
      />
    </AppLayout>
  );
}