import { Link } from "@tanstack/react-router";
import {
  Archive,
  Copy,
  Edit,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  MoreHorizontal,
  Star,
  Trash2,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/domain";
import { cn } from "@/lib/utils";

import {
  formatRelativeDate,
  getProjectCategoryLabel,
  getProjectCounts,
  getProjectCoverClass,
  PROJECT_STATUS_LABELS,
} from "./project-utils";

interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onArchive: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({
  project,
  onToggleFavorite,
  onDuplicate,
  onArchive,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const counts = getProjectCounts(project);
  const category = getProjectCategoryLabel(project);

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border/60 bg-card/60 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/20">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className="block"
      >
        <div
          className={cn(
            "relative h-24 w-full bg-gradient-to-br",
            getProjectCoverClass(project.cover),
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {project.favorite && (
              <Badge
                variant="secondary"
                className="gap-1 border-amber-500/40 bg-amber-500/15 text-amber-300"
              >
                <Star className="h-3 w-3 fill-current" />
                Favorito
              </Badge>
            )}
            <Badge
              variant="outline"
              className={cn(
                "border-border/60 bg-background/60 backdrop-blur",
                project.status === "active" && "text-emerald-300",
                project.status === "draft" && "text-sky-300",
                project.status === "archived" && "text-muted-foreground",
              )}
            >
              {PROJECT_STATUS_LABELS[project.status]}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              className="block"
            >
              <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {project.name}
              </h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {project.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(project)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFavorite(project)}>
                <Star
                  className={cn(
                    "mr-2 h-4 w-4",
                    project.favorite && "fill-current text-amber-400",
                  )}
                />
                {project.favorite ? "Remover favorito" : "Favoritar"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive(project)}>
                <Archive className="mr-2 h-4 w-4" />
                {project.status === "archived" ? "Reativar" : "Arquivar"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(project)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-lg border border-border/60 bg-muted/30 p-2">
          <CountCell icon={FileText} label="Prompts" value={counts.prompts} />
          <CountCell icon={Users} label="Chars" value={counts.characters} />
          <CountCell icon={ImageIcon} label="Assets" value={counts.assets} />
        </div>

        <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{category ?? "Sem categoria"}</span>
          <span>Atualizado {formatRelativeDate(project.updatedAt)}</span>
        </div>
      </div>
    </Card>
  );
}

function CountCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}