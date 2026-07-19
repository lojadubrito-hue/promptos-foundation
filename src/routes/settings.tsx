import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — PromptOS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Settings"
        description="Workspace preferences, members and billing."
        icon={Settings}
      />
    </AppLayout>
  );
}