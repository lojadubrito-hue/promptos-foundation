import type { Project } from "@/domain";
import {
  AssetService,
  CharacterService,
  CollectionService,
  PromptService,
  TemplateService,
  findCategory,
} from "@/domain";

export type ProjectCounts = {
  prompts: number;
  characters: number;
  assets: number;
  templates: number;
  collections: number;
};

/**
 * Derives per-project counts from the Domain Layer.
 *
 * Prompts and Collections carry a real `projectId`, so those counts are
 * exact. Characters, Assets and Templates do not (yet) belong to a
 * project in the domain — until the schema evolves, we distribute the
 * mock data deterministically across projects by index, so counts stay
 * stable between renders and add up to the total across all projects.
 */
export function getProjectCounts(project: Project): ProjectCounts {
  const prompts = PromptService.listByProject(project.id).length;
  const collections = CollectionService.list().filter(
    (c) => c.promptIds.some((pid) => {
      const p = PromptService.get(pid);
      return p?.projectId === project.id;
    }),
  ).length;

  const allProjectsIds = [
    "prj_launch",
    "prj_tiktok",
    "prj_veo",
    "prj_blog",
    "prj_saas",
    "prj_chars",
    "prj_arch",
    "prj_dev",
  ];
  const idx = Math.max(0, allProjectsIds.indexOf(project.id));
  const bucket = allProjectsIds.length;

  const characters = CharacterService.list().filter(
    (_, i) => i % bucket === idx,
  ).length;
  const assets = AssetService.list().filter((_, i) => i % bucket === idx).length;
  const templates = TemplateService.list().filter(
    (_, i) => i % bucket === idx,
  ).length;

  return { prompts, characters, assets, templates, collections };
}

export function getProjectCategoryLabel(project: Project): string | null {
  const anyCategoryId = PromptService.listByProject(project.id)[0]?.categoryId;
  if (!anyCategoryId) return null;
  return findCategory(anyCategoryId)?.name ?? null;
}

export function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / day);
  if (days <= 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.floor(months / 12);
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}

export const PROJECT_COVER_GRADIENTS: Record<string, string> = {
  "gradient-1": "from-indigo-500/40 via-purple-500/30 to-fuchsia-500/40",
  "gradient-2": "from-rose-500/40 via-pink-500/30 to-orange-500/40",
  "gradient-3": "from-sky-500/40 via-cyan-500/30 to-blue-500/40",
  "gradient-4": "from-emerald-500/40 via-teal-500/30 to-cyan-500/40",
  "gradient-5": "from-amber-500/40 via-orange-500/30 to-red-500/40",
  "gradient-6": "from-violet-500/40 via-purple-500/30 to-indigo-500/40",
  "gradient-7": "from-slate-500/40 via-zinc-500/30 to-neutral-500/40",
  "gradient-8": "from-lime-500/40 via-green-500/30 to-emerald-500/40",
};

export function getProjectCoverClass(cover: string): string {
  return PROJECT_COVER_GRADIENTS[cover] ?? PROJECT_COVER_GRADIENTS["gradient-1"];
}

export const PROJECT_COVER_OPTIONS = Object.keys(PROJECT_COVER_GRADIENTS);

export const PROJECT_STATUS_LABELS: Record<Project["status"], string> = {
  active: "Ativo",
  draft: "Rascunho",
  archived: "Arquivado",
};