import { clone, nowISO, uid } from "../_shared";
import { mockPrompts, mockPromptVersions } from "./mock";
import type { Prompt, PromptVersion } from "./types";

const store: Prompt[] = clone(mockPrompts);
const versions: PromptVersion[] = clone(mockPromptVersions);

function bumpSemver(v: string): string {
  const m = v.match(/^v(\d+)\.(\d+)$/);
  if (!m) return "v1.1";
  return `v${m[1]}.${Number(m[2]) + 1}`;
}

export const PromptService = {
  list: (): Prompt[] => clone(store),
  get: (id: string): Prompt | undefined => clone(store.find((p) => p.id === id)),

  listByProject: (projectId: string): Prompt[] =>
    clone(store.filter((p) => p.projectId === projectId)),
  listByCategory: (categoryId: string): Prompt[] =>
    clone(store.filter((p) => p.categoryId === categoryId)),
  listByModel: (aiModelId: string): Prompt[] =>
    clone(store.filter((p) => p.aiModelId === aiModelId)),
  listByFramework: (frameworkId: string): Prompt[] =>
    clone(store.filter((p) => p.frameworkId === frameworkId)),
  listByTag: (tagId: string): Prompt[] =>
    clone(store.filter((p) => p.tags.includes(tagId))),

  listFavorites: (): Prompt[] => clone(store.filter((p) => p.favorite)),
  listRecent: (limit = 5): Prompt[] =>
    clone([...store].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit)),

  create: (input: Partial<Prompt> & Pick<Prompt, "title">): Prompt => {
    const created: Prompt = {
      id: uid("pmt"),
      title: input.title,
      description: input.description ?? "",
      objective: input.objective ?? "",
      content: input.content ?? "",
      expectedOutput: input.expectedOutput ?? "",
      notes: input.notes ?? "",
      projectId: input.projectId ?? null,
      categoryId: input.categoryId ?? null,
      frameworkId: input.frameworkId ?? null,
      aiModelId: input.aiModelId ?? null,
      language: input.language ?? "pt-BR",
      status: input.status ?? "draft",
      favorite: input.favorite ?? false,
      version: "v1.0",
      tags: input.tags ?? [],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    store.unshift(created);
    versions.push({
      id: `${created.id}_v1`,
      promptId: created.id,
      version: "v1.0",
      content: created.content,
      createdAt: created.createdAt,
    });
    return clone(created);
  },

  update: (id: string, patch: Partial<Prompt>): Prompt | undefined => {
    const i = store.findIndex((p) => p.id === id);
    if (i < 0) return undefined;
    store[i] = { ...store[i], ...patch, updatedAt: nowISO() };
    return clone(store[i]);
  },

  remove: (id: string): boolean => {
    const i = store.findIndex((p) => p.id === id);
    if (i < 0) return false;
    store.splice(i, 1);
    return true;
  },

  duplicate: (id: string): Prompt | undefined => {
    const src = store.find((p) => p.id === id);
    if (!src) return undefined;
    const copy: Prompt = {
      ...clone(src),
      id: uid("pmt"),
      title: `${src.title} (cópia)`,
      version: "v1.0",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    store.unshift(copy);
    return clone(copy);
  },

  toggleFavorite: (id: string): Prompt | undefined => {
    const p = store.find((x) => x.id === id);
    if (!p) return undefined;
    p.favorite = !p.favorite;
    p.updatedAt = nowISO();
    return clone(p);
  },

  bumpVersion: (id: string, note?: string): PromptVersion | undefined => {
    const p = store.find((x) => x.id === id);
    if (!p) return undefined;
    const next = bumpSemver(p.version);
    p.version = next;
    p.updatedAt = nowISO();
    const v: PromptVersion = {
      id: `${p.id}_${next}`,
      promptId: p.id,
      version: next,
      content: p.content,
      note,
      createdAt: nowISO(),
    };
    versions.push(v);
    return clone(v);
  },

  listVersions: (promptId: string): PromptVersion[] =>
    clone(versions.filter((v) => v.promptId === promptId)),
};
