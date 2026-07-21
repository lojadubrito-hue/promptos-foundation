import { clone } from "../_shared";
import { mockAIModels } from "./mock";
import type { AIModel } from "./types";

const store: AIModel[] = clone(mockAIModels);

export const AIModelService = {
  list: (): AIModel[] => clone(store),
  get: (id: string): AIModel | undefined => clone(store.find((m) => m.id === id)),
  byProvider: (provider: string): AIModel[] =>
    clone(store.filter((m) => m.provider.toLowerCase() === provider.toLowerCase())),
  supportingVideo: (): AIModel[] => clone(store.filter((m) => m.supportsVideo)),
  supportingImage: (): AIModel[] => clone(store.filter((m) => m.supportsImage)),
  supportingJson: (): AIModel[] => clone(store.filter((m) => m.supportsJson)),
};
