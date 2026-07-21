import { clone } from "../_shared";
import { mockFrameworks } from "./mock";
import type { Framework } from "./types";

const store: Framework[] = clone(mockFrameworks);

export const FrameworkService = {
  list: (): Framework[] => clone(store),
  get: (id: string): Framework | undefined => clone(store.find((f) => f.id === id)),
  getByName: (name: string): Framework | undefined =>
    clone(store.find((f) => f.name.toLowerCase() === name.toLowerCase())),
};
