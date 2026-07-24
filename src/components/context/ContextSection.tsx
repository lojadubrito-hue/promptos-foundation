import type { ReactNode } from "react";

interface ContextSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ContextSection({
  title,
  description,
  children,
}: ContextSectionProps) {
  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-5">
      <header className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}