import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, type Prompt } from "@/types/prompt";

import { AIModelSelector } from "./AIModelSelector";
import { FrameworkSelector } from "./FrameworkSelector";
import { PromptTextArea } from "./PromptTextArea";
import { StatusSelector } from "./StatusSelector";
import { TagSelector } from "./TagSelector";

const LANGUAGES = ["Português", "Inglês", "Espanhol", "Francês"] as const;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function PromptEditor({
  prompt,
  onChange,
}: {
  prompt: Prompt;
  onChange: (patch: Partial<Prompt>) => void;
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      <Field label="Descrição">
        <Input
          value={prompt.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Descrição curta do prompt"
          className="border-border/60 bg-muted/30"
        />
      </Field>

      <Field label="Objetivo">
        <Textarea
          value={prompt.objective}
          onChange={(e) => onChange({ objective: e.target.value })}
          rows={2}
          placeholder="O que este prompt deve alcançar?"
          className="resize-none border-border/60 bg-muted/30"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Categoria">
          <Select
            value={prompt.category}
            onValueChange={(v) => onChange({ category: v as Prompt["category"] })}
          >
            <SelectTrigger className="h-9 border-border/60 bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Projeto">
          <Input
            value={prompt.project}
            onChange={(e) => onChange({ project: e.target.value })}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>

        <Field label="Modelo IA">
          <AIModelSelector
            value={prompt.model}
            onChange={(v) => onChange({ model: v })}
          />
        </Field>

        <Field label="Idioma">
          <Select
            value={prompt.language}
            onValueChange={(v) => onChange({ language: v })}
          >
            <SelectTrigger className="h-9 border-border/60 bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Framework">
          <FrameworkSelector
            value={prompt.framework}
            onChange={(v) => onChange({ framework: v })}
          />
        </Field>

        <Field label="Status">
          <StatusSelector
            value={prompt.status}
            onChange={(v) => onChange({ status: v })}
          />
        </Field>
      </div>

      <Field label="Tags">
        <TagSelector
          value={prompt.tags}
          onChange={(tags) => onChange({ tags })}
        />
      </Field>

      <Field label="Prompt">
        <PromptTextArea
          value={prompt.prompt}
          onChange={(v) => onChange({ prompt: v })}
        />
      </Field>

      <Field label="Resultado Esperado">
        <Textarea
          value={prompt.expectedResult}
          onChange={(e) => onChange({ expectedResult: e.target.value })}
          rows={3}
          placeholder="Descreva o resultado ideal deste prompt"
          className="resize-none border-border/60 bg-muted/30"
        />
      </Field>

      <Field label="Notas">
        <Textarea
          value={prompt.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={3}
          placeholder="Observações internas, ideias, iterações..."
          className="resize-none border-border/60 bg-muted/30"
        />
      </Field>
    </div>
  );
}