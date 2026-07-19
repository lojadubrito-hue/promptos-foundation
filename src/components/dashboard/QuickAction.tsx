import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuickActionProps {
  label: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function QuickAction({
  label,
  description,
  icon: Icon,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex flex-col items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4 text-left",
        "transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:shadow-lg hover:shadow-accent/5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </button>
  );
}