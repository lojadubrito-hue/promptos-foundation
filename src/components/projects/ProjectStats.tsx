import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  LayoutTemplate,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/domain";

import { getProjectCounts } from "./project-utils";

interface ProjectStatsProps {
  project: Project;
}

export function ProjectStats({ project }: ProjectStatsProps) {
  const counts = getProjectCounts(project);
  const items: { icon: LucideIcon; label: string; value: number }[] = [
    { icon: FileText, label: "Prompts", value: counts.prompts },
    { icon: Users, label: "Characters", value: counts.characters },
    { icon: LayoutTemplate, label: "Templates", value: counts.templates },
    { icon: ImageIcon, label: "Assets", value: counts.assets },
    { icon: FolderOpen, label: "Collections", value: counts.collections },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <Card
          key={item.label}
          className="border-border/60 bg-card/60 transition-colors hover:border-border"
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted/60 text-muted-foreground">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-foreground">
                {item.value}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {item.label}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}