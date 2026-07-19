import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RecentItemProps {
  title: string;
  meta?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function RecentItem({
  title,
  meta,
  badge,
  actions,
  className,
}: RecentItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {title}
          </span>
          {badge}
        </div>
        {meta && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{meta}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-1">{actions}</div>
      )}
    </div>
  );
}