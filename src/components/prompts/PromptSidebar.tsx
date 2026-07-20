import type { Prompt } from "@/types/prompt";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] truncate text-right font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

export function PromptSidebar({ prompt }: { prompt: Prompt }) {
  const chars = prompt.prompt.length;
  const words = prompt.prompt.trim() ? prompt.prompt.trim().split(/\s+/).length : 0;

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden">
      <div className="border-b border-border/60 px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Informações
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="divide-y divide-border/40">
          <Row label="Data de criação" value={fmtDate(prompt.createdAt)} />
          <Row label="Última edição" value={fmtDate(prompt.updatedAt)} />
          <Row label="Projeto" value={prompt.project} />
          <Row label="Categoria" value={prompt.category} />
          <Row label="Modelo IA" value={prompt.model} />
          <Row label="Framework" value={prompt.framework} />
          <Row label="Idioma" value={prompt.language} />
          <Row label="Caracteres" value={chars.toLocaleString("pt-BR")} />
          <Row label="Palavras" value={words.toLocaleString("pt-BR")} />
          <Row label="Versão atual" value={prompt.version} />
        </div>
      </div>
    </aside>
  );
}