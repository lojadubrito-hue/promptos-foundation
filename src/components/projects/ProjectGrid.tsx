import type { Project } from "@/domain";

import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onToggleFavorite: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onArchive: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectGrid({ projects, ...handlers }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} {...handlers} />
      ))}
    </div>
  );
}