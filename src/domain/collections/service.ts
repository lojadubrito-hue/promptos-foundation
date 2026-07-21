import { clone } from "../_shared";
import { mockCollections } from "./mock";
import type { Collection } from "./types";

const store: Collection[] = clone(mockCollections);

export const CollectionService = {
  list: (): Collection[] => clone(store),
  get: (id: string): Collection | undefined => clone(store.find((c) => c.id === id)),
};
