import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectContext } from "@/domain";

interface ContextCardProps {
  context: ProjectContext;
  projectName?: string;
}

export function ContextCard({ context, projectName }: ContextCardProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Produto", value: context.product },
    { label: "Público", value: context.targetAudience },
    { label: "Plataforma", value: context.platform },
    { label: "Idioma", value: context.language },
    { label: "Tom de voz", value: context.toneOfVoice },
    { label: "Objetivo", value: context.goal },
  ];

  return (
    <Card className="border-border/60 bg-card/40">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-foreground">
              Project Context
            </h4>
          </div>
          <Badge variant="outline" className="border-border/60 text-[10px]">
            Somente leitura
          </Badge>
        </div>
        {projectName && (
          <p className="text-xs text-muted-foreground">{projectName}</p>
        )}
        <dl className="grid grid-cols-1 gap-2 text-xs">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-3 border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="max-w-[65%] truncate text-right font-medium text-foreground">
                {row.value || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}