import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  actions,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-3 flex items-end justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}