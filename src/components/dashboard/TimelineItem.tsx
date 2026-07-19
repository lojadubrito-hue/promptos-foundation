import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  meta: string;
  icon: LucideIcon;
  isLast?: boolean;
}

export function TimelineItem({
  title,
  meta,
  icon: Icon,
  isLast,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-3 pb-4 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[15px] top-8 bottom-0 w-px bg-border/60"
        />
      )}
      <div
        className={cn(
          "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full",
          "border border-border/60 bg-card text-muted-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p>
      </div>
    </div>
  );
}