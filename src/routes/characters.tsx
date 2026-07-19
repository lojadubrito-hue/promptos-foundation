import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/characters")({
  head: () => ({ meta: [{ title: "Characters — PromptOS" }] }),
  component: CharactersPage,
});

function CharactersPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Characters"
        description="Define reusable personas and characters for your prompts."
        icon={Users}
      />
    </AppLayout>
  );
}