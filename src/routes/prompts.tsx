import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PromptEditor } from "@/components/prompts/PromptEditor";
import { PromptHeader } from "@/components/prompts/PromptHeader";
import { PromptList } from "@/components/prompts/PromptList";
import { PromptSidebar } from "@/components/prompts/PromptSidebar";
import { PromptTabs } from "@/components/prompts/PromptTabs";
import {
  PromptToolbar,
  type SortKey,
  type StatusFilter,
} from "@/components/prompts/PromptToolbar";
import { promptsService } from "@/services/prompts.service";
import type { Prompt } from "@/types/prompt";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "Prompt Engine — PromptOS" },
      {
        name: "description",
        content: "Crie, organize e evolua prompts profissionais.",
      },
    ],
  }),
  component: PromptsPage,
});

function PromptsPage() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>(() => promptsService.list());
  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => promptsService.list()[0]?.id,
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const refresh = (nextSelectedId?: string) => {
    const list = promptsService.list();
    setPrompts(list);
    if (nextSelectedId !== undefined) setSelectedId(nextSelectedId);
    else if (!list.find((p) => p.id === selectedId)) {
      setSelectedId(list[0]?.id);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = prompts.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.project.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    if (sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "status")
      list = [...list].sort((a, b) => a.status.localeCompare(b.status));
    else
      list = [...list].sort(
        (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
      );
    return list;
  }, [prompts, query, status, sort]);

  const selected = prompts.find((p) => p.id === selectedId);

  const handleCreate = () => {
    navigate({ to: "/prompts/new" });
  };

  const handlePatch = (patch: Partial<Prompt>) => {
    if (!selected) return;
    promptsService.update(selected.id, patch);
    refresh();
  };

  const handleDuplicate = () => {
    if (!selected) return;
    const p = promptsService.duplicate(selected.id);
    if (p) refresh(p.id);
  };

  const handleDelete = () => {
    if (!selected) return;
    promptsService.remove(selected.id);
    refresh(undefined);
  };

  const handleBumpVersion = () => {
    if (!selected) return;
    promptsService.bumpVersion(selected.id, "Nova iteração");
    refresh();
  };

  const handleToggleFavorite = (id: string) => {
    promptsService.toggleFavorite(id);
    refresh();
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <PromptToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          sort={sort}
          onSortChange={setSort}
          onCreate={handleCreate}
        />

        <div className="grid min-h-[calc(100vh-16rem)] gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40">
            <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Prompts
              </span>
              <span className="text-[11px] text-muted-foreground/70">
                {filtered.length}
              </span>
            </div>
            <div className="h-[calc(100%-2.25rem)]">
              <PromptList
                prompts={filtered}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>

          <div className="grid overflow-hidden rounded-xl border border-border/60 bg-card/40 lg:grid-cols-[minmax(0,1fr)_280px]"
               style={sidebarOpen ? undefined : { gridTemplateColumns: "minmax(0,1fr)" }}
          >
            <div className="flex min-h-[520px] flex-col overflow-hidden">
              {selected ? (
                <>
                  <PromptHeader
                    prompt={selected}
                    onTitleChange={(v) => handlePatch({ title: v })}
                    onSave={() => refresh()}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    onExport={() => {
                      /* mock */
                    }}
                    onToggleFavorite={() => handleToggleFavorite(selected.id)}
                    onBumpVersion={handleBumpVersion}
                    onToggleSidebar={() => setSidebarOpen((v) => !v)}
                    sidebarOpen={sidebarOpen}
                  />
                  <PromptTabs
                    prompt={selected}
                    editor={
                      <PromptEditor prompt={selected} onChange={handlePatch} />
                    }
                  />
                </>
              ) : (
                <div className="grid flex-1 place-items-center p-8 text-center text-sm text-muted-foreground">
                  Selecione um prompt para começar.
                </div>
              )}
            </div>

            {sidebarOpen && selected && (
              <div className="hidden border-l border-border/60 lg:block">
                <PromptSidebar prompt={selected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}