import { clone, nowISO, uid } from "../_shared";
import { mockTags } from "./mock";
import type { Tag } from "./types";

const store: Tag[] = clone(mockTags);

export const TagService = {
  list: (): Tag[] => clone(store),
  get: (id: string): Tag | undefined => clone(store.find((t) => t.id === id)),
  getByName: (name: string): Tag | undefined =>
    clone(store.find((t) => t.name.toLowerCase() === name.toLowerCase())),
  ensure: (name: string): Tag => {
    const found = store.find((t) => t.name.toLowerCase() === name.toLowerCase());
    if (found) return clone(found);
    const created: Tag = { id: uid("tag"), name, createdAt: nowISO(), updatedAt: nowISO() };
    store.push(created);
    return clone(created);
  },
};
