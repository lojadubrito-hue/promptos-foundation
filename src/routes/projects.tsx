import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import {
  ProjectModal,
  type ProjectFormValues,
} from "@/components/projects/ProjectModal";
import { PROJECT_STATUS_LABELS } from "@/components/projects/project-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectService, type Project } from "@/domain";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — PromptOS" },
      {
        name: "description",
        content:
          "Organize seus trabalhos de IA em projetos: prompts, characters, templates e assets.",
      },
      { property: "og:title", content: "Projects — PromptOS" },
      {
        property: "og:description",
        content: "Organize seus trabalhos de IA em projetos.",
      },
    ],
  }),
  component: ProjectsPage,
});

type SortKey = "recent" | "name" | "favorites";
type StatusFilter = "all" | Project["status"];

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(() =>
    ProjectService.list(),
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const refresh = () => setProjects(ProjectService.list());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
    const sorted = [...base];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "favorites")
      sorted.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    else sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return sorted;
  }, [projects, search, status, sort]);

  return (
    <AppLayout>
      <PageHeader
        title="Projects"
        description="Organize seus trabalhos de IA em projetos."
        actions={
          <Button onClick={() => setModalOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Novo Projeto
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar projetos..."
            className="h-9 pl-9"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as StatusFilter)}
        >
          <SelectTrigger className="h-9 w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            {(Object.keys(PROJECT_STATUS_LABELS) as Project["status"][]).map(
              (s) => (
                <SelectItem key={s} value={s}>
                  {PROJECT_STATUS_LABELS[s]}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="h-9 w-full sm:w-44">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais recentes</SelectItem>
            <SelectItem value="name">Nome (A–Z)</SelectItem>
            <SelectItem value="favorites">Favoritos primeiro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="Nenhum projeto encontrado"
          description="Ajuste os filtros ou crie um novo projeto para começar."
          action={
            <Button onClick={() => setModalOpen(true)} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Projeto
            </Button>
          }
        />
      ) : (
        <ProjectGrid
          projects={filtered}
          onToggleFavorite={(p) => {
            ProjectService.toggleFavorite(p.id);
            refresh();
          }}
          onDuplicate={(p) => {
            ProjectService.create({
              name: `${p.name} (cópia)`,
              description: p.description,
              cover: p.cover,
              status: p.status,
              favorite: false,
            });
            refresh();
          }}
          onArchive={(p) => {
            ProjectService.update(p.id, {
              status: p.status === "archived" ? "active" : "archived",
            });
            refresh();
          }}
          onEdit={(p) => setEditing(p)}
          onDelete={(p) => {
            ProjectService.remove(p.id);
            refresh();
          }}
        />
      )}

      <ProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode="create"
        onSubmit={(values) => {
          ProjectService.create({
            name: values.name.trim(),
            description: values.description.trim(),
            cover: values.cover,
            status: values.status,
            favorite: values.favorite,
          });
          refresh();
        }}
      />
      <ProjectModal
        open={editing !== null}
        onOpenChange={(o) => !o && setEditing(null)}
        mode="edit"
        initial={
          editing
            ? {
                name: editing.name,
                description: editing.description,
                cover: editing.cover,
                status: editing.status,
                favorite: editing.favorite,
              }
            : undefined
        }
        onSubmit={(values) => {
          if (!editing) return;
          ProjectService.update(editing.id, {
            name: values.name.trim(),
            description: values.description.trim(),
            cover: values.cover,
            status: values.status,
            favorite: values.favorite,
          });
          setEditing(null);
          refresh();
        }}
      />
    </AppLayout>
  );
}