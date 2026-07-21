import { clone } from "../_shared";
import { mockCharacters } from "./mock";
import type { Character } from "./types";

const store: Character[] = clone(mockCharacters);

export const CharacterService = {
  list: (): Character[] => clone(store),
  get: (id: string): Character | undefined => clone(store.find((c) => c.id === id)),
};
