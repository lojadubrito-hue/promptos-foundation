import { createFileRoute } from "@tanstack/react-router";
import { Film } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/veo3")({
  head: () => ({ meta: [{ title: "Veo 3 Studio — PromptOS" }] }),
  component: Veo3Page,
});

function Veo3Page() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Veo 3 Studio"
        description="Craft cinematic video prompts for Google Veo 3."
        icon={Film}
      />
    </AppLayout>
  );
}