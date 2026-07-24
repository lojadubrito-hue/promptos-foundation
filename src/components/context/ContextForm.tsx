import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Language, ProjectContext, ProjectContextInput } from "@/domain";

import { ContextSection } from "./ContextSection";

interface ContextFormProps {
  context: ProjectContext;
  onSave: (values: ProjectContextInput) => void;
  onReset: () => void;
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "pt-BR", label: "Português (BR)" },
  { value: "en-US", label: "Inglês (US)" },
  { value: "es-ES", label: "Espanhol (ES)" },
  { value: "fr-FR", label: "Francês (FR)" },
];

function toInput(ctx: ProjectContext): ProjectContextInput {
  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...rest
  } = ctx;
  void _id;
  void _createdAt;
  void _updatedAt;
  return rest;
}

export function ContextForm({ context, onSave, onReset }: ContextFormProps) {
  const [form, setForm] = useState<ProjectContextInput>(() => toInput(context));

  useEffect(() => {
    setForm(toInput(context));
  }, [context]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(toInput(context)),
    [form, context],
  );

  const set = <K extends keyof ProjectContextInput>(
    key: K,
    value: ProjectContextInput[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="flex flex-col gap-5">
      <ContextSection
        title="1. Produto"
        description="Dados essenciais sobre o que está sendo comunicado."
      >
        <Field label="Nome do produto">
          <Input
            value={form.product}
            onChange={(e) => set("product", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
        <Field label="Marca">
          <Input
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
        <Field label="Descrição" full>
          <Textarea
            value={form.productDescription}
            onChange={(e) => set("productDescription", e.target.value)}
            rows={3}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
      </ContextSection>

      <ContextSection
        title="2. Público"
        description="Para quem o conteúdo é produzido."
      >
        <Field label="Público-alvo" full>
          <Textarea
            value={form.targetAudience}
            onChange={(e) => set("targetAudience", e.target.value)}
            rows={2}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
        <Field label="País">
          <Input
            value={form.country}
            onChange={(e) => set("country", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
        <Field label="Idioma">
          <Select
            value={form.language}
            onValueChange={(v) => set("language", v as Language)}
          >
            <SelectTrigger className="h-9 border-border/60 bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </ContextSection>

      <ContextSection
        title="3. Comunicação"
        description="Como a mensagem deve soar."
      >
        <Field label="Tom de voz">
          <Input
            value={form.toneOfVoice}
            onChange={(e) => set("toneOfVoice", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
        <Field label="Plataforma">
          <Input
            value={form.platform}
            onChange={(e) => set("platform", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
        <Field label="Avatar" full>
          <Textarea
            value={form.avatar}
            onChange={(e) => set("avatar", e.target.value)}
            rows={2}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
        <Field label="Objetivo" full>
          <Textarea
            value={form.goal}
            onChange={(e) => set("goal", e.target.value)}
            rows={2}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
      </ContextSection>

      <ContextSection title="4. Oferta" description="Proposta e chamada padrão.">
        <Field label="Oferta principal" full>
          <Textarea
            value={form.offer}
            onChange={(e) => set("offer", e.target.value)}
            rows={2}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
        <Field label="CTA padrão" full>
          <Input
            value={form.defaultCTA}
            onChange={(e) => set("defaultCTA", e.target.value)}
            className="h-9 border-border/60 bg-muted/30"
          />
        </Field>
      </ContextSection>

      <ContextSection
        title="5. Restrições"
        description="O que evitar ao gerar conteúdo."
      >
        <Field label="Restrições" full>
          <Textarea
            value={form.restrictions}
            onChange={(e) => set("restrictions", e.target.value)}
            rows={3}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
      </ContextSection>

      <ContextSection
        title="6. Informações adicionais"
        description="Qualquer contexto extra relevante para o projeto."
      >
        <Field label="Notas" full>
          <Textarea
            value={form.additionalInformation}
            onChange={(e) => set("additionalInformation", e.target.value)}
            rows={4}
            className="resize-none border-border/60 bg-muted/30 text-sm"
          />
        </Field>
      </ContextSection>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => setForm(toInput(context))}
          disabled={!dirty}
        >
          <X className="h-4 w-4" />
          Cancelar alterações
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-border/60"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          Restaurar padrão
        </Button>
        <Button
          size="sm"
          className="gap-1.5"
          onClick={() => onSave(form)}
          disabled={!dirty}
        >
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}