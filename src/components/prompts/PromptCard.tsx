import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Prompt } from "@/types/prompt";

import { StatusPill } from "./StatusSelector";
import { VersionBadge } from "./VersionBadge";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86_400_000);
  if (d <= 0) return "hoje";
  if (d === 1) return "ontem";
  if (d < 30) return `há ${d}d`;
  return `há ${Math.floor(d / 30)}mês`;
}

export function PromptCard({
  prompt,
  active,
  onSelect,
  onToggleFavorite,
}: {
  prompt: Prompt;
  active?: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group w-full rounded-lg border border-transparent p-3 text-left transition-all",
        "hover:border-border/60 hover:bg-muted/40",
        active &&
          "border-border bg-muted/60 shadow-sm hover:border-border hover:bg-muted/60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-medium text-foreground">
              {prompt.title}
            </h3>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {prompt.description || prompt.objective || "Sem descrição"}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            "shrink-0 rounded p-0.5 transition-colors",
            prompt.favorite
              ? "text-amber-400"
              : "text-muted-foreground/40 opacity-0 hover:text-amber-400 group-hover:opacity-100",
          )}
          aria-label="Favoritar"
        >
          <Star
            className="h-3.5 w-3.5"
            fill={prompt.favorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <StatusPill status={prompt.status} />
        <Badge
          variant="outline"
          className="border-border/50 bg-transparent text-[10px] font-normal text-muted-foreground"
        >
          {prompt.model}
        </Badge>
        <Badge
          variant="outline"
          className="border-border/50 bg-transparent text-[10px] font-normal text-muted-foreground"
        >
          {prompt.category}
        </Badge>
        <VersionBadge version={prompt.version} />
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/70">
        <span className="truncate">{prompt.project}</span>
        <span>{timeAgo(prompt.updatedAt)}</span>
      </div>
    </button>
  );
}