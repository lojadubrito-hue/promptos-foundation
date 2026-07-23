import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/domain";
import { cn } from "@/lib/utils";

import {
  formatRelativeDate,
  getProjectCoverClass,
  PROJECT_STATUS_LABELS,
} from "./project-utils";

interface ProjectHeaderProps {
  project: Project;
  onEdit: () => void;
  onToggleFavorite: () => void;
}

export function ProjectHeader({
  project,
  onEdit,
  onToggleFavorite,
}: ProjectHeaderProps) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
      <div
        className={cn(
          "h-32 w-full bg-gradient-to-br",
          getProjectCoverClass(project.cover),
        )}
      />
      <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="mt-1 h-8 w-8 shrink-0"
          >
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {project.name}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  "border-border/60",
                  project.status === "active" && "text-emerald-300",
                  project.status === "draft" && "text-sky-300",
                  project.status === "archived" && "text-muted-foreground",
                )}
              >
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
              {project.favorite && (
                <Badge
                  variant="secondary"
                  className="gap-1 border-amber-500/40 bg-amber-500/15 text-amber-300"
                >
                  <Star className="h-3 w-3 fill-current" />
                  Favorito
                </Badge>
              )}
            </div>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Atualizado {formatRelativeDate(project.updatedAt)} · Criado{" "}
              {formatRelativeDate(project.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleFavorite}>
            <Star
              className={cn(
                "mr-2 h-4 w-4",
                project.favorite && "fill-current text-amber-400",
              )}
            />
            {project.favorite ? "Favorito" : "Favoritar"}
          </Button>
          <Button size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}