import { useState } from "react";

import { ContextService, type Project, type ProjectContext } from "@/domain";

import { ContextForm } from "./ContextForm";

interface ProjectContextTabProps {
  project: Project;
}

export function ProjectContextTab({ project }: ProjectContextTabProps) {
  const [context, setContext] = useState<ProjectContext>(() => {
    const existing = ContextService.getByProject(project.id);
    if (existing) return existing;
    return ContextService.update(project.id, {});
  });

  return (
    <ContextForm
      context={context}
      onSave={(values) => {
        const next = ContextService.update(project.id, values);
        setContext(next);
      }}
      onReset={() => {
        const next = ContextService.reset(project.id);
        setContext(next);
      }}
    />
  );
}