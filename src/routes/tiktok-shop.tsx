import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const Route = createFileRoute("/tiktok-shop")({
  head: () => ({ meta: [{ title: "TikTok Shop — PromptOS" }] }),
  component: TikTokShopPage,
});

function TikTokShopPage() {
  return (
    <AppLayout>
      <PlaceholderPage
        title="TikTok Shop"
        description="Prompts and templates tailored for TikTok Shop content."
        icon={ShoppingBag}
      />
    </AppLayout>
  );
}