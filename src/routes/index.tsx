import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bot,
  Brain,
  Check,
  CircleDot,
  Copy,
  ExternalLink,
  FileJson,
  Film,
  FolderKanban,
  FolderPlus,
  Image as ImageIcon,
  Library,
  Plus,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UploadCloud,
  UserPlus,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { RecentItem } from "@/components/dashboard/RecentItem";
import { TemplateCard } from "@/components/dashboard/TemplateCard";
import { TimelineItem } from "@/components/dashboard/TimelineItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — PromptOS" }] }),
  component: DashboardPage,
});

type Stat = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Prompts", value: "1.284", description: "+12,4% este mês", icon: Sparkles },
  { label: "Projetos", value: "24", description: "+2 nesta semana", icon: FolderKanban },
  { label: "Templates", value: "86", description: "+3 novos", icon: FileJson },
  { label: "Favoritos", value: "37", description: "+5 recentes", icon: Star },
];

type QuickActionItem = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const quickActions: QuickActionItem[] = [
  { label: "Novo Prompt", description: "Comece com um prompt em branco.", icon: Wand2 },
  { label: "Novo Projeto", description: "Agrupe prompts por produto ou cliente.", icon: FolderPlus },
  { label: "Abrir Veo Studio", description: "Crie cenas cinematográficas com Veo 3.", icon: Film },
  { label: "Novo Personagem", description: "Defina uma persona reutilizável.", icon: UserPlus },
  { label: "Converter Prompt", description: "Adapte um prompt entre modelos.", icon: RefreshCw },
];

type ProjectStatus = "Ativo" | "Rascunho" | "Arquivado";

type RecentProject = {
  name: string;
  category: string;
  updatedAt: string;
  status: ProjectStatus;
};

const recentProjects: RecentProject[] = [
  { name: "Lançamento Q4 — TikTok Shop", category: "Marketing", updatedAt: "há 12 min", status: "Ativo" },
  { name: "Playbook de Onboarding", category: "Interno", updatedAt: "há 2h", status: "Ativo" },
  { name: "Campanha Veo 3 — Nova coleção", category: "Vídeo", updatedAt: "ontem", status: "Rascunho" },
  { name: "Documentação de personagens", category: "Character", updatedAt: "há 3d", status: "Arquivado" },
];

const statusStyles: Record<ProjectStatus, string> = {
  Ativo: "text-emerald-400",
  Rascunho: "text-amber-400",
  Arquivado: "text-muted-foreground",
};

type RecentPrompt = {
  title: string;
  model: string;
  category: string;
  date: string;
};

const recentPrompts: RecentPrompt[] = [
  { title: "Revelação cinematográfica de produto", model: "Veo 3", category: "Vídeo", date: "há 2 min" },
  { title: "Hero de landing page — SaaS", model: "GPT-4o", category: "Copy", date: "há 1h" },
  { title: "Ficha de personagem — Aria", model: "Claude 3.5", category: "Character", date: "há 3h" },
  { title: "Foto de produto em estúdio", model: "Imagen 3", category: "Imagem", date: "ontem" },
  { title: "Roteiro de newsletter semanal", model: "GPT-4o", category: "Copy", date: "há 2d" },
];

type Template = {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
};

const popularTemplates: Template[] = [
  { name: "TikTok Shop UGC", description: "Anúncios curtos e nativos para creators.", category: "Marketing", icon: ShoppingBag },
  { name: "Veo 3 JSON", description: "Cenas cinematográficas em JSON estruturado.", category: "Vídeo", icon: Film },
  { name: "ChatGPT Expert", description: "Persona sênior para respostas técnicas.", category: "Chat", icon: Bot },
  { name: "Claude Long Context", description: "Análise profunda de documentos extensos.", category: "Análise", icon: Brain },
  { name: "Gemini Research", description: "Pesquisa multi-fonte com citações.", category: "Pesquisa", icon: Search },
  { name: "Flux Image", description: "Geração fotorrealista com Flux.", category: "Imagem", icon: ImageIcon },
];

type ActivityItem = {
  title: string;
  meta: string;
  icon: LucideIcon;
};

const activity: ActivityItem[] = [
  { title: "Prompt criado — “Hero de landing page”", meta: "GPT-4o · há 12 min", icon: Sparkles },
  { title: "Projeto atualizado — “Lançamento Q4”", meta: "Marketing · há 1h", icon: FolderKanban },
  { title: "Template favoritado — “Veo 3 JSON”", meta: "Vídeo · há 3h", icon: Star },
  { title: "JSON exportado — “Ficha de Aria”", meta: "Character · ontem", icon: UploadCloud },
];

function DashboardPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Seu workspace de prompts em um só lugar."
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card/80 to-background p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <Badge
            variant="secondary"
            className="mb-3 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent"
          >
            PromptOS · v0.2
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Bem-vindo ao PromptOS
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Seu ambiente completo para criar, organizar e reutilizar prompts
            profissionais em todos os seus modelos e projetos.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Criar Prompt
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5 border-border/60"
            >
              <Link to="/library">
                <Library className="h-4 w-4" />
                Explorar Biblioteca
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <DashboardCard
            key={s.label}
            label={s.label}
            value={s.value}
            description={s.description}
            icon={s.icon}
          />
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mt-8">
        <SectionTitle
          title="Ações rápidas"
          description="Comece sua próxima criação em um clique."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((a) => (
            <QuickAction
              key={a.label}
              label={a.label}
              description={a.description}
              icon={a.icon}
            />
          ))}
        </div>
      </section>

      {/* Recent projects + prompts */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold">
                Projetos recentes
              </CardTitle>
              <CardDescription className="text-xs">
                Últimos espaços em que você trabalhou.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link to="/projects">
                Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border/50">
              {recentProjects.map((p) => (
                <li key={p.name}>
                  <RecentItem
                    title={p.name}
                    meta={`${p.category} · ${p.updatedAt}`}
                    badge={
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${statusStyles[p.status]}`}
                      >
                        <CircleDot className="h-3 w-3" />
                        {p.status}
                      </span>
                    }
                    actions={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-xs"
                      >
                        Abrir <ExternalLink className="h-3 w-3" />
                      </Button>
                    }
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold">
                Prompts recentes
              </CardTitle>
              <CardDescription className="text-xs">
                Sua atividade mais recente em todos os studios.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link to="/library">
                Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border/50">
              {recentPrompts.map((p) => (
                <li key={p.title}>
                  <RecentItem
                    title={p.title}
                    meta={`${p.model} · ${p.category} · ${p.date}`}
                    actions={
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          aria-label="Copiar prompt"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-xs"
                        >
                          Abrir <ExternalLink className="h-3 w-3" />
                        </Button>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Templates + activity */}
      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle
            title="Templates populares"
            description="Modelos usados por todo o workspace."
            actions={
              <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
                <Link to="/library">
                  Ver biblioteca <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {popularTemplates.map((t) => (
              <TemplateCard
                key={t.name}
                name={t.name}
                description={t.description}
                category={t.category}
                icon={t.icon}
              />
            ))}
          </div>
        </div>

        <Card className="border-border/60 bg-card/60">
          <CardHeader className="space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold">
              Atividade recente
            </CardTitle>
            <CardDescription className="text-xs">
              O que aconteceu no seu workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {activity.map((a, i) => (
                <TimelineItem
                  key={a.title}
                  title={a.title}
                  meta={a.meta}
                  icon={a.icon}
                  isLast={i === activity.length - 1}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full justify-center gap-1 text-xs"
            >
              Ver histórico completo <Check className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  );
}