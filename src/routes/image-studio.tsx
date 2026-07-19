import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/image-studio")({
  head: () => ({ meta: [{ title: "Image Studio — PromptOS" }] }),
  component: ImageStudioPage,
});

function ImageStudioPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Image Studio"
        description="Design, iterate and manage image prompts."
        icon={ImageIcon}
      />
    </AppLayout>
  );
}