import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Library, FolderKanban, BarChart3 } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const overviewCards = [
  {
    title: "Prompts",
    description: "Design, iterate, and version your prompts.",
    icon: Sparkles,
  },
  {
    title: "Library",
    description: "Curated blocks, templates and system messages.",
    icon: Library,
  },
  {
    title: "Projects",
    description: "Group prompts by product, team or client.",
    icon: FolderKanban,
  },
  {
    title: "Analytics",
    description: "Track usage, latency and quality across models.",
    icon: BarChart3,
  },
];

function DashboardPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Welcome to PromptOS"
        description="Your foundation is ready. Start shaping the AI prompt workspace."
        actions={<Button size="sm">New prompt</Button>}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Card
            key={card.title}
            className="border-border/60 bg-card/50 transition-colors hover:border-border hover:bg-card"
          >
            <CardHeader className="space-y-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted/60 text-muted-foreground">
                <card.icon className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <CardDescription className="mt-1 text-xs leading-relaxed">
                  {card.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground/70">
                Module scaffold ready.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </AppLayout>
  );
}
