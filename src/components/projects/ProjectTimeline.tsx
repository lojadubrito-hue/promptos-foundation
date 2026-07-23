import {
  CircleDot,
  FileText,
  GitBranch,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

import type { Project } from "@/domain";
import { PromptService } from "@/domain";

import { formatRelativeDate } from "./project-utils";

interface TimelineEntry {
  id: string;
  icon: LucideIcon;
  title: string;
  meta: string;
  when: string;
}

interface ProjectTimelineProps {
  project: Project;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  const prompts = PromptService.listByProject(project.id);

  const entries: TimelineEntry[] = [
    {
      id: `${project.id}-created`,
      icon: CircleDot,
      title: "Projeto criado",
      meta: project.name,
      when: project.createdAt,
    },
    ...prompts.slice(0, 5).map((p) => ({
      id: `${p.id}-updated`,
      icon: FileText,
      title: `Prompt atualizado — ${p.title}`,
      meta: `${p.version} · ${p.status}`,
      when: p.updatedAt,
    })),
    ...prompts
      .filter((p) => p.favorite)
      .slice(0, 2)
      .map((p) => ({
        id: `${p.id}-fav`,
        icon: Star,
        title: `Marcado como favorito — ${p.title}`,
        meta: "Prompt",
        when: p.updatedAt,
      })),
    {
      id: `${project.id}-updated`,
      icon: GitBranch,
      title: "Última atividade do projeto",
      meta: "Metadados atualizados",
      when: project.updatedAt,
    },
  ].sort((a, b) => b.when.localeCompare(a.when));

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 bg-card/30 p-6 text-center text-sm text-muted-foreground">
        <Sparkles className="mx-auto mb-2 h-5 w-5" />
        Nenhuma atividade registrada ainda.
      </div>
    );
  }

  return (
    <ol className="relative space-y-4 border-l border-border/60 pl-6">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -left-[31px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border/60 bg-card text-muted-foreground">
            <entry.icon className="h-3 w-3" />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">{entry.title}</p>
            <p className="text-xs text-muted-foreground">{entry.meta}</p>
            <p className="text-[11px] text-muted-foreground/70">
              {formatRelativeDate(entry.when)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}