import { ScrollArea } from "@/components/ui/scroll-area";
import type { Prompt } from "@/types/prompt";

import { PromptCard } from "./PromptCard";

export function PromptList({
  prompts,
  selectedId,
  onSelect,
  onToggleFavorite,
}: {
  prompts: Prompt[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  if (!prompts.length) {
    return (
      <div className="grid h-full place-items-center p-6 text-center text-xs text-muted-foreground">
        Nenhum prompt encontrado.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 p-2">
        {prompts.map((p) => (
          <PromptCard
            key={p.id}
            prompt={p}
            active={selectedId === p.id}
            onSelect={() => onSelect(p.id)}
            onToggleFavorite={() => onToggleFavorite(p.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}