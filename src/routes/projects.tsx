import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — PromptOS" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Projects"
        description="Group prompts by product, team or client."
        icon={FolderKanban}
      />
    </AppLayout>
  );
}