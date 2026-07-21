import { clone } from "../_shared";
import { mockCategories } from "./mock";
import type { Category } from "./types";

const store: Category[] = clone(mockCategories);

export const CategoryService = {
  list: (): Category[] => clone(store),
  get: (id: string): Category | undefined => clone(store.find((c) => c.id === id)),
  getByName: (name: string): Category | undefined =>
    clone(store.find((c) => c.name.toLowerCase() === name.toLowerCase())),
};
