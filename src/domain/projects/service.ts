import { clone, nowISO, uid } from "../_shared";
import { mockProjects } from "./mock";
import type { Project } from "./types";

const store: Project[] = clone(mockProjects);

export const ProjectService = {
  list: (): Project[] => clone(store),
  get: (id: string): Project | undefined => clone(store.find((p) => p.id === id)),
  listFavorites: (): Project[] => clone(store.filter((p) => p.favorite)),
  listRecent: (limit = 5): Project[] =>
    clone([...store].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit)),
  create: (input: Partial<Project> & Pick<Project, "name">): Project => {
    const created: Project = {
      id: uid("prj"),
      name: input.name,
      description: input.description ?? "",
      cover: input.cover ?? "gradient-1",
      favorite: input.favorite ?? false,
      status: input.status ?? "active",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    store.unshift(created);
    return clone(created);
  },
  update: (id: string, patch: Partial<Project>): Project | undefined => {
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
  toggleFavorite: (id: string): Project | undefined => {
    const p = store.find((x) => x.id === id);
    if (!p) return undefined;
    p.favorite = !p.favorite;
    p.updatedAt = nowISO();
    return clone(p);
  },
};
