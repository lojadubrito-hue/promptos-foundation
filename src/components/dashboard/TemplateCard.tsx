import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export function TemplateCard({
  name,
  description,
  category,
  icon: Icon,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      className="group flex h-full flex-col items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:shadow-lg hover:shadow-accent/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex w-full items-start justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-colors group-hover:bg-accent/15 group-hover:text-accent">
          <Icon className="h-4 w-4" />
        </div>
        <Badge
          variant="secondary"
          className="rounded-md bg-muted/60 px-1.5 py-0 text-[10px] font-normal text-muted-foreground"
        >
          {category}
        </Badge>
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{name}</div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </button>
  );
}