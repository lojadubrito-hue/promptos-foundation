import { createFileRoute } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileJson,
  FolderKanban,
  FolderPlus,
  Plus,
  RefreshCw,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — PromptOS" }] }),
  component: DashboardPage,
});

type Stat = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Total Prompts", value: "1,284", delta: "+12.4%", icon: Sparkles },
  { label: "Templates", value: "86", delta: "+3", icon: FileJson },
  { label: "Recent Projects", value: "24", delta: "+2 this week", icon: FolderKanban },
  { label: "Favorite Prompts", value: "37", delta: "+5", icon: Star },
];

type QuickAction = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const quickActions: QuickAction[] = [
  { label: "Generate Prompt", description: "Compose a new prompt with AI assist.", icon: Wand2 },
  { label: "Convert Prompt", description: "Adapt a prompt between models.", icon: RefreshCw },
  { label: "Create JSON", description: "Turn a prompt into structured JSON.", icon: FileJson },
  { label: "New Character", description: "Define a reusable persona.", icon: UserPlus },
  { label: "New Project", description: "Group prompts by product or client.", icon: FolderPlus },
];

type RecentPrompt = {
  title: string;
  model: string;
  updatedAt: string;
  tag: string;
};

const recentPrompts: RecentPrompt[] = [
  { title: "Cinematic product reveal for TikTok", model: "Veo 3", updatedAt: "2m ago", tag: "Video" },
  { title: "Landing page hero copy — SaaS", model: "GPT-4o", updatedAt: "1h ago", tag: "Copy" },
  { title: "Character sheet — Aria the strategist", model: "Claude 3.5", updatedAt: "3h ago", tag: "Character" },
  { title: "Product photo, studio lighting", model: "Imagen 3", updatedAt: "Yesterday", tag: "Image" },
  { title: "Weekly newsletter outline", model: "GPT-4o", updatedAt: "2d ago", tag: "Copy" },
];

type Template = {
  title: string;
  category: string;
  uses: string;
  icon: LucideIcon;
};

const popularTemplates: Template[] = [
  { title: "TikTok Shop — Product Ad", category: "Marketing", uses: "1.2k uses", icon: TrendingUp },
  { title: "Veo 3 — Cinematic Scene", category: "Video", uses: "864 uses", icon: Sparkles },
  { title: "Persona Builder", category: "Character", uses: "612 uses", icon: Users },
  { title: "JSON Schema from Prompt", category: "Developer", uses: "489 uses", icon: FileJson },
];

function DashboardPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Your prompt workspace at a glance."
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Prompt
          </Button>
        }
      />

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="group relative overflow-hidden border-border/60 bg-card/60 transition-all hover:border-border hover:bg-card"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground">
                {s.label}
              </CardDescription>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <s.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground/80">{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick actions */}
      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Quick Actions
            </h2>
            <p className="text-xs text-muted-foreground">
              Jump straight into your next creation.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((a) => (
            <button
              key={a.label}
              type="button"
              className={cn(
                "group flex flex-col items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4 text-left",
                "transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:shadow-lg hover:shadow-accent/5",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <a.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{a.label}</div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent + Templates */}
      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-card/60 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold">Recent Prompts</CardTitle>
              <CardDescription className="text-xs">
                Your latest activity across all studios.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border/50">
              {recentPrompts.map((p) => (
                <li
                  key={p.title}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-foreground">
                        {p.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="shrink-0 rounded-md bg-muted/60 px-1.5 py-0 text-[10px] font-normal text-muted-foreground"
                      >
                        {p.tag}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {p.model} · {p.updatedAt}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold">Popular Templates</CardTitle>
              <CardDescription className="text-xs">
                Trending in your workspace.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {popularTemplates.map((t) => (
              <div
                key={t.title}
                className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-border/60 hover:bg-muted/40"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted/60 text-muted-foreground">
                  <t.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">
                    {t.title}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.category} · {t.uses}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}
