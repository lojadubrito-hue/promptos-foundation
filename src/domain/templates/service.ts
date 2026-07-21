import { clone } from "../_shared";
import { mockTemplates } from "./mock";
import type { Template } from "./types";

const store: Template[] = clone(mockTemplates);

export const TemplateService = {
  list: (): Template[] => clone(store),
  get: (id: string): Template | undefined => clone(store.find((t) => t.id === id)),
  listByCategory: (categoryId: string): Template[] =>
    clone(store.filter((t) => t.category === categoryId)),
  listByFramework: (frameworkId: string): Template[] =>
    clone(store.filter((t) => t.framework === frameworkId)),
};
