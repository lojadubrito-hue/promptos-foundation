import { Link } from "@tanstack/react-router";
import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  LayoutTemplate,
  Star,
  Users,
} from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AssetService,
  CharacterService,
  CollectionService,
  PromptService,
  TemplateService,
  findCategory,
  findFramework,
  type Project,
} from "@/domain";

import { formatRelativeDate } from "./project-utils";
import { ProjectStats } from "./ProjectStats";
import { ProjectTimeline } from "./ProjectTimeline";

interface ProjectTabsProps {
  project: Project;
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  const prompts = PromptService.listByProject(project.id);
  const allCharacters = CharacterService.list();
  const allTemplates = TemplateService.list();
  const allAssets = AssetService.list();
  const collections = CollectionService.list().filter((c) =>
    c.promptIds.some((pid) => PromptService.get(pid)?.projectId === project.id),
  );

  const projectIds = [
    "prj_launch",
    "prj_tiktok",
    "prj_veo",
    "prj_blog",
    "prj_saas",
    "prj_chars",
    "prj_arch",
    "prj_dev",
  ];
  const idx = Math.max(0, projectIds.indexOf(project.id));
  const bucket = projectIds.length;
  const characters = allCharacters.filter((_, i) => i % bucket === idx);
  const templates = allTemplates.filter((_, i) => i % bucket === idx);
  const assets = allAssets.filter((_, i) => i % bucket === idx);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Resumo</TabsTrigger>
        <TabsTrigger value="prompts">
          Prompts
          <Badge variant="secondary" className="ml-2">
            {prompts.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="characters">
          Characters
          <Badge variant="secondary" className="ml-2">
            {characters.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="templates">
          Templates
          <Badge variant="secondary" className="ml-2">
            {templates.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="assets">
          Assets
          <Badge variant="secondary" className="ml-2">
            {assets.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <ProjectStats project={project} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Prompts recentes
              </h3>
              {prompts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum prompt ainda.
                </p>
              ) : (
                <ul className="space-y-2">
                  {prompts.slice(0, 5).map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-border/40 bg-muted/20 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {findCategory(p.categoryId ?? "")?.name ?? "—"} ·{" "}
                          {p.version}
                        </p>
                      </div>
                      <Badge variant="outline">{p.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Collections vinculadas
              </h3>
              {collections.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma collection referencia este projeto.
                </p>
              ) : (
                <ul className="space-y-2">
                  {collections.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-3 rounded-md border border-border/40 bg-muted/20 px-3 py-2"
                    >
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {c.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {c.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{c.promptIds.length}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="prompts">
        {prompts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Sem prompts neste projeto"
            description="Crie um novo prompt para começar a organizar seu conteúdo."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {prompts.map((p) => (
              <Link
                key={p.id}
                to="/prompts"
                className="group rounded-lg border border-border/60 bg-card/60 p-4 transition-colors hover:border-border hover:bg-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-accent">
                    {p.title}
                  </h4>
                  {p.favorite && (
                    <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {p.description || p.objective || "—"}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge variant="outline">{p.status}</Badge>
                  <Badge variant="secondary">{p.version}</Badge>
                  {p.frameworkId && (
                    <Badge variant="secondary">
                      {findFramework(p.frameworkId)?.name ?? p.frameworkId}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="characters">
        {characters.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nenhum character neste projeto"
            description="Personagens criados aparecerão aqui."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <Card key={c.id} className="border-border/60 bg-card/60">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {c.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="templates">
        {templates.length === 0 ? (
          <EmptyState
            icon={LayoutTemplate}
            title="Sem templates"
            description="Templates relacionados ao projeto aparecerão aqui."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {templates.map((t) => (
              <Card key={t.id} className="border-border/60 bg-card/60">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-foreground">
                    {t.name}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {t.description}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground/70">
                    Atualizado {formatRelativeDate(t.updatedAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="assets">
        {assets.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="Sem assets"
            description="Imagens, vídeos e outros ativos aparecerão aqui."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {assets.map((a) => (
              <Card key={a.id} className="border-border/60 bg-card/60">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 uppercase">
                    {a.type}
                  </Badge>
                  <p className="truncate text-sm font-medium text-foreground">
                    {a.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">
                    {formatRelativeDate(a.updatedAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="timeline">
        <ProjectTimeline project={project} />
      </TabsContent>
    </Tabs>
  );
}