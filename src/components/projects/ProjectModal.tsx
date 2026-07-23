import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CategoryService, type Project } from "@/domain";
import { cn } from "@/lib/utils";

import {
  getProjectCoverClass,
  PROJECT_COVER_OPTIONS,
  PROJECT_STATUS_LABELS,
} from "./project-utils";

const EMOJI_OPTIONS = ["🚀", "✨", "🎬", "📝", "🎨", "🧠", "📈", "🛠️", "💡", "🎯"];

export interface ProjectFormValues {
  name: string;
  description: string;
  categoryId: string | null;
  cover: string;
  emoji: string;
  status: Project["status"];
  favorite: boolean;
}

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initial?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
}

const DEFAULTS: ProjectFormValues = {
  name: "",
  description: "",
  categoryId: null,
  cover: "gradient-1",
  emoji: "🚀",
  status: "active",
  favorite: false,
};

export function ProjectModal({
  open,
  onOpenChange,
  mode,
  initial,
  onSubmit,
}: ProjectModalProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    ...DEFAULTS,
    ...initial,
  });
  const categories = CategoryService.list();

  useEffect(() => {
    if (open) setValues({ ...DEFAULTS, ...initial });
  }, [open, initial]);

  const canSubmit = values.name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Novo Projeto" : "Editar Projeto"}
          </DialogTitle>
          <DialogDescription>
            Configure as informações do projeto. Você pode alterá-las depois.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">Nome</Label>
            <Input
              id="project-name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="Ex.: Lançamento Produto X"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-description">Descrição</Label>
            <Textarea
              id="project-description"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              placeholder="Do que se trata este projeto?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select
                value={values.categoryId ?? "none"}
                onValueChange={(v) =>
                  setValues({
                    ...values,
                    categoryId: v === "none" ? null : v,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem categoria</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={values.status}
                onValueChange={(v) =>
                  setValues({ ...values, status: v as Project["status"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.keys(PROJECT_STATUS_LABELS) as Project["status"][]
                  ).map((s) => (
                    <SelectItem key={s} value={s}>
                      {PROJECT_STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_COVER_OPTIONS.map((cover) => (
                <button
                  key={cover}
                  type="button"
                  onClick={() => setValues({ ...values, cover })}
                  className={cn(
                    "h-9 w-14 rounded-md bg-gradient-to-br ring-offset-2 ring-offset-background transition-all",
                    getProjectCoverClass(cover),
                    values.cover === cover
                      ? "ring-2 ring-accent"
                      : "hover:ring-1 hover:ring-border",
                  )}
                  aria-label={cover}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Ícone</Label>
            <div className="flex flex-wrap gap-1.5">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setValues({ ...values, emoji })}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-md border text-lg transition-all",
                    values.emoji === emoji
                      ? "border-accent bg-accent/10"
                      : "border-border/60 hover:bg-muted",
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/30 px-3 py-2">
            <div>
              <Label className="text-sm">Favorito</Label>
              <p className="text-xs text-muted-foreground">
                Aparecer nas listas rápidas.
              </p>
            </div>
            <Switch
              checked={values.favorite}
              onCheckedChange={(v) => setValues({ ...values, favorite: v })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={() => {
              onSubmit(values);
              onOpenChange(false);
            }}
          >
            {mode === "create" ? "Criar projeto" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}