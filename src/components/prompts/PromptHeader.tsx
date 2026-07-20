import {
  Copy,
  Download,
  MoreHorizontal,
  PanelRightClose,
  PanelRightOpen,
  Save,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Prompt } from "@/types/prompt";

import { VersionBadge } from "./VersionBadge";

export function PromptHeader({
  prompt,
  onTitleChange,
  onSave,
  onDuplicate,
  onDelete,
  onExport,
  onToggleFavorite,
  onBumpVersion,
  onToggleSidebar,
  sidebarOpen,
}: {
  prompt: Prompt;
  onTitleChange: (v: string) => void;
  onSave: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExport: () => void;
  onToggleFavorite: () => void;
  onBumpVersion: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
      <Input
        value={prompt.title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="h-9 flex-1 border-transparent bg-transparent px-2 text-base font-semibold shadow-none focus-visible:border-border/60 focus-visible:bg-muted/30"
      />

      <VersionBadge version={prompt.version} />
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={onBumpVersion}
      >
        Nova versão
      </Button>

      <div className="mx-1 h-5 w-px bg-border/60" />

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 text-muted-foreground hover:text-foreground",
          prompt.favorite && "text-amber-400 hover:text-amber-300",
        )}
        onClick={onToggleFavorite}
        aria-label="Favoritar"
      >
        <Star
          className="h-4 w-4"
          fill={prompt.favorite ? "currentColor" : "none"}
        />
      </Button>

      <Button size="sm" className="h-8 gap-1.5" onClick={onSave}>
        <Save className="h-3.5 w-3.5" />
        Salvar
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Mais ações"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={onToggleSidebar}
        aria-label="Alternar painel"
      >
        {sidebarOpen ? (
          <PanelRightClose className="h-4 w-4" />
        ) : (
          <PanelRightOpen className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}