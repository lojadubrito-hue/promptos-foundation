import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Copy, Save, Star, X } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PromptTextArea } from "@/components/prompts/PromptTextArea";
import { TagSelector } from "@/components/prompts/TagSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AIModelService,
  CategoryService,
  FrameworkService,
  ProjectService,
  PromptService,
  TagService,
  type Language,
  type PromptStatus,
} from "@/domain";

export const Route = createFileRoute("/prompts/new")({
  head: () => ({
    meta: [
      { title: "Novo Prompt — PromptOS" },
      {
        name: "description",
        content: "Crie um prompt reutilizável para qualquer modelo de IA.",
      },
    ],
  }),
  component: CreatePromptPage,
});

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "pt-BR", label: "Português (BR)" },
  { value: "en-US", label: "Inglês (US)" },
  { value: "es-ES", label: "Espanhol (ES)" },
  { value: "fr-FR", label: "Francês (FR)" },
];

const STATUSES: { value: PromptStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "testing", label: "Testing" },
  { value: "approved", label: "Approved" },
  { value: "archived", label: "Archived" },
];

type FormState = {
  title: string;
  description: string;
  objective: string;
  projectId: string | null;
  categoryId: string | null;
  aiModelId: string | null;
  frameworkId: string | null;
  language: Language;
  status: PromptStatus;
  favorite: boolean;
  tags: string[];
  content: string;
  expectedOutput: string;
  notes: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  objective: "",
  projectId: null,
  categoryId: null,
  aiModelId: null,
  frameworkId: null,
  language: "pt-BR",
  status: "draft",
  favorite: false,
  tags: [],
  content: "",
  expectedOutput: "",
  notes: "",
};

const NONE = "__none__";

function CreatePromptPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const projects = useMemo(() => ProjectService.list(), []);
  const categories = useMemo(() => CategoryService.list(), []);
  const models = useMemo(() => AIModelService.list(), []);
  const frameworks = useMemo(() => FrameworkService.list(), []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const wordCount = useMemo(
    () => (form.content.trim() ? form.content.trim().split(/\s+/).length : 0),
    [form.content],
  );
  const charCount = form.content.length;

  const projectName =
    projects.find((p) => p.id === form.projectId)?.name ?? "—";
  const categoryName =
    categories.find((c) => c.id === form.categoryId)?.name ?? "—";
  const modelName = models.find((m) => m.id === form.aiModelId)?.name ?? "—";
  const frameworkName =
    frameworks.find((f) => f.id === form.frameworkId)?.name ?? "—";

  const validate = () => {
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Título é obrigatório.";
    if (!form.content.trim()) next.content = "Prompt é obrigatório.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const tagIds = form.tags.map((name) => TagService.ensure(name).id);
    const created = PromptService.create({
      title: form.title.trim(),
      description: form.description,
      objective: form.objective,
      content: form.content,
      expectedOutput: form.expectedOutput,
      notes: form.notes,
      projectId: form.projectId,
      categoryId: form.categoryId,
      aiModelId: form.aiModelId,
      frameworkId: form.frameworkId,
      language: form.language,
      status: form.status,
      favorite: form.favorite,
      tags: tagIds,
    });
    setSavedAt(created.createdAt);
    navigate({ to: "/prompts" });
  };

  const handleDuplicate = () => {
    setForm((f) => ({ ...f, title: f.title ? `${f.title} (cópia)` : "" }));
  };

  const handleCancel = () => {
    navigate({ to: "/prompts" });
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-border/60 pb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              to="/prompts"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Prompts
            </Link>
            <span>/</span>
            <span className="text-foreground">Novo Prompt</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Novo Prompt
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Crie um prompt reutilizável para qualquer modelo de IA.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-border/60"
                onClick={handleDuplicate}
              >
                <Copy className="h-4 w-4" />
                Duplicar
              </Button>
              <Button size="sm" className="gap-1.5" onClick={handleSave}>
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
          {/* LEFT — General info */}
          <aside className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4">
            <SectionLabel>Informações</SectionLabel>

            <Field label="Título" required error={errors.title}>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Ex: TikTok UGC Hook 3s"
                className={cn(
                  "h-9 border-border/60 bg-muted/30",
                  errors.title && "border-destructive/60",
                )}
              />
            </Field>

            <Field label="Descrição">
              <Textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Breve descrição do prompt..."
                rows={3}
                className="resize-none border-border/60 bg-muted/30 text-sm"
              />
            </Field>

            <Field label="Projeto">
              <SelectBox
                value={form.projectId}
                onChange={(v) => set("projectId", v)}
                placeholder="Selecionar projeto"
                options={projects.map((p) => ({ value: p.id, label: p.name }))}
              />
            </Field>

            <Field label="Categoria">
              <SelectBox
                value={form.categoryId}
                onChange={(v) => set("categoryId", v)}
                placeholder="Selecionar categoria"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
              />
            </Field>

            <Field label="Modelo IA">
              <SelectBox
                value={form.aiModelId}
                onChange={(v) => set("aiModelId", v)}
                placeholder="Selecionar modelo"
                options={models.map((m) => ({ value: m.id, label: m.name }))}
              />
            </Field>

            <Field label="Framework">
              <SelectBox
                value={form.frameworkId}
                onChange={(v) => set("frameworkId", v)}
                placeholder="Selecionar framework"
                options={frameworks.map((f) => ({ value: f.id, label: f.name }))}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
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
              <Field label="Status">
                <Select
                  value={form.status}
                  onValueChange={(v) => set("status", v as PromptStatus)}
                >
                  <SelectTrigger className="h-9 border-border/60 bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Star
                  className={cn(
                    "h-4 w-4",
                    form.favorite
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground",
                  )}
                />
                Favorito
              </div>
              <Switch
                checked={form.favorite}
                onCheckedChange={(v) => set("favorite", v)}
              />
            </div>

            <Field label="Tags">
              <TagSelector
                value={form.tags}
                onChange={(t) => set("tags", t)}
              />
            </Field>
          </aside>

          {/* CENTER — Editor */}
          <section className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card/40 p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <SectionLabel>Objetivo</SectionLabel>
              </div>
              <Textarea
                value={form.objective}
                onChange={(e) => set("objective", e.target.value)}
                placeholder="O que este prompt deve alcançar?"
                rows={2}
                className="resize-none border-border/60 bg-muted/30 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <SectionLabel>
                  Prompt {errors.content && (
                    <span className="ml-2 text-[11px] font-normal normal-case text-destructive">
                      {errors.content}
                    </span>
                  )}
                </SectionLabel>
                <div className="text-[11px] tabular-nums text-muted-foreground">
                  {wordCount} palavras · {charCount} caracteres
                </div>
              </div>
              <div
                className={cn(
                  errors.content && "rounded-lg ring-1 ring-destructive/60",
                )}
              >
                <PromptTextArea
                  value={form.content}
                  onChange={(v) => set("content", v)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <SectionLabel>Resultado Esperado</SectionLabel>
              <Textarea
                value={form.expectedOutput}
                onChange={(e) => set("expectedOutput", e.target.value)}
                placeholder="Descreva o formato ou tipo de resposta esperada..."
                rows={4}
                className="resize-none border-border/60 bg-muted/30 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <SectionLabel>Notas</SectionLabel>
              <Textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Anotações internas, contexto, referências..."
                rows={3}
                className="resize-none border-border/60 bg-muted/30 text-sm"
              />
            </div>
          </section>

          {/* RIGHT — Properties */}
          <aside className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4">
            <SectionLabel>Propriedades</SectionLabel>
            <PropRow label="Projeto" value={projectName} />
            <PropRow label="Categoria" value={categoryName} />
            <PropRow label="Framework" value={frameworkName} />
            <PropRow label="Modelo IA" value={modelName} />
            <PropRow label="Versão" value="v1.0" />
            <Separator className="bg-border/60" />
            <PropRow
              label="Criado em"
              value={savedAt ? new Date(savedAt).toLocaleString() : "—"}
            />
            <PropRow
              label="Última edição"
              value={savedAt ? new Date(savedAt).toLocaleString() : "—"}
            />
            <Separator className="bg-border/60" />
            <PropRow label="Palavras" value={String(wordCount)} />
            <PropRow label="Caracteres" value={String(charCount)} />
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <span className="text-[11px] text-destructive">{error}</span>
      )}
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <Select
      value={value ?? NONE}
      onValueChange={(v) => onChange(v === NONE ? null : v)}
    >
      <SelectTrigger className="h-9 border-border/60 bg-muted/30">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE}>—</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function PropRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate text-right font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}