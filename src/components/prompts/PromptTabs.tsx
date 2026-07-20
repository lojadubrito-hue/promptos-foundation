import { Clock, FileText, Terminal } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Prompt } from "@/types/prompt";

export function PromptTabs({
  prompt,
  editor,
}: {
  prompt: Prompt;
  editor: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="editor" className="flex flex-1 flex-col overflow-hidden">
      <TabsList className="mx-4 mt-3 h-9 w-fit gap-1 bg-muted/40 p-1">
        <TabsTrigger value="editor" className="gap-1.5 px-3 text-xs">
          <FileText className="h-3.5 w-3.5" />
          Editor
        </TabsTrigger>
        <TabsTrigger value="outputs" className="gap-1.5 px-3 text-xs">
          <Terminal className="h-3.5 w-3.5" />
          Outputs
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-1.5 px-3 text-xs">
          <Clock className="h-3.5 w-3.5" />
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="editor"
        className="flex-1 overflow-y-auto p-4 focus-visible:outline-none"
      >
        {editor}
      </TabsContent>

      <TabsContent
        value="outputs"
        className="flex-1 overflow-y-auto p-4 focus-visible:outline-none"
      >
        <div className="grid h-full min-h-64 place-items-center rounded-lg border border-dashed border-border/60 bg-muted/10 p-8 text-center">
          <div className="max-w-sm">
            <Terminal className="mx-auto h-6 w-6 text-muted-foreground/60" />
            <p className="mt-3 text-sm font-medium text-foreground">
              Nenhum output ainda
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Os resultados executados por este prompt aparecerão aqui.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="history"
        className="flex-1 overflow-y-auto p-4 focus-visible:outline-none"
      >
        <ol className="relative ml-2 border-l border-border/60">
          {[...prompt.history].reverse().map((v) => (
            <li key={v.id} className="mb-4 ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-border bg-background" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-foreground">
                  {v.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {new Date(v.createdAt).toLocaleString("pt-BR")}
                </span>
              </div>
              {v.note && (
                <p className="mt-1 text-xs text-muted-foreground">{v.note}</p>
              )}
            </li>
          ))}
        </ol>
      </TabsContent>
    </Tabs>
  );
}