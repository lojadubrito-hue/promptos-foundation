import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favorites — PromptOS" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="Favorites"
        description="Your starred prompts, templates and characters."
        icon={Star}
      />
    </AppLayout>
  );
}