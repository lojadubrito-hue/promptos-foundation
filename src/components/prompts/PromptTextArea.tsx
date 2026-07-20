import { Copy, Maximize2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function PromptTextArea({
  value,
  onChange,
  minRows = 12,
}: {
  value: string;
  onChange: (v: string) => void;
  minRows?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lineCount = useMemo(
    () => Math.max(minRows, value.split("\n").length),
    [value, minRows],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border/60 bg-muted/20">
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-3 py-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Prompt
          </span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={copy}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copiado" : "Copiar"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded(true)}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Expandir
            </Button>
          </div>
        </div>
        <LineNumberedEditor value={value} onChange={onChange} rows={lineCount} />
      </div>

      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editor de prompt</DialogTitle>
          </DialogHeader>
          <div className="overflow-hidden rounded-lg border border-border/60 bg-muted/20">
            <LineNumberedEditor
              value={value}
              onChange={onChange}
              rows={Math.max(20, value.split("\n").length)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function LineNumberedEditor({
  value,
  onChange,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  rows: number;
}) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const lines = value.split("\n");

  // Auto resize
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="flex">
      <div
        ref={gutterRef}
        aria-hidden
        className="select-none border-r border-border/60 bg-muted/20 py-3 pl-3 pr-2 text-right font-mono text-[11px] leading-6 text-muted-foreground/60"
        style={{ minWidth: `${String(lines.length).length + 1}ch` }}
      >
        {Array.from({ length: Math.max(rows, lines.length) }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        spellCheck={false}
        className={cn(
          "flex-1 resize-none bg-transparent p-3 font-mono text-[13px] leading-6 text-foreground outline-none",
          "placeholder:text-muted-foreground/50",
        )}
        placeholder="Escreva seu prompt aqui..."
      />
    </div>
  );
}