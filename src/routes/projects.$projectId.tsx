import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import {
  ProjectModal,
  type ProjectFormValues,
} from "@/components/projects/ProjectModal";
import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { ProjectService, type Project } from "@/domain";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ loaderData }) => {
    const project = (loaderData as { project?: Project } | undefined)?.project;
    return {
      meta: [
        {
          title: project ? `${project.name} — PromptOS` : "Projeto — PromptOS",
        },
        {
          name: "description",
          content: project?.description || "Detalhes do projeto no PromptOS.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const project = ProjectService.get(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectDetailPage() {
  const initial = Route.useLoaderData().project;
  const [project, setProject] = useState<Project>(initial);
  const [editing, setEditing] = useState(false);

  const refresh = () => {
    const next = ProjectService.get(project.id);
    if (next) setProject(next);
  };

  const handleEdit = (values: ProjectFormValues) => {
    ProjectService.update(project.id, {
      name: values.name.trim(),
      description: values.description.trim(),
      cover: values.cover,
      status: values.status,
      favorite: values.favorite,
    });
    refresh();
  };

  return (
    <AppLayout>
      <ProjectHeader
        project={project}
        onEdit={() => setEditing(true)}
        onToggleFavorite={() => {
          ProjectService.toggleFavorite(project.id);
          refresh();
        }}
      />
      <ProjectTabs project={project} />
      <ProjectModal
        open={editing}
        onOpenChange={setEditing}
        mode="edit"
        initial={{
          name: project.name,
          description: project.description,
          cover: project.cover,
          status: project.status,
          favorite: project.favorite,
        }}
        onSubmit={handleEdit}
      />
    </AppLayout>
  );
}

function ProjectNotFound() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Projeto não encontrado
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ele pode ter sido excluído ou movido.
        </p>
        <button
          onClick={() => navigate({ to: "/projects" })}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voltar para Projects
        </button>
      </div>
    </AppLayout>
  );
}