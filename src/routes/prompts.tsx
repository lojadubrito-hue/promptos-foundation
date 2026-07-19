import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/prompts")({
  head: () => ({ meta: [{ title: "Prompts — PromptOS" }] }),
  component: PromptsPage,
});

function PromptsPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Prompts"
        description="Author, version and organize your AI prompts."
        icon={Sparkles}
      />
    </AppLayout>
  );
}