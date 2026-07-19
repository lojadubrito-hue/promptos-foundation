import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Library — PromptOS" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Library"
        description="Reusable blocks, templates and system messages."
        icon={Library}
      />
    </AppLayout>
  );
}