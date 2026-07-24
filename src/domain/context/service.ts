import { clone, nowISO, uid } from "../_shared";
import { mockContexts } from "./mock";
import type { ProjectContext, ProjectContextInput } from "./types";

const store: ProjectContext[] = clone(mockContexts);
const defaults: ProjectContext[] = clone(mockContexts);

function emptyContext(projectId: string): ProjectContext {
  return {
    id: uid("ctx"),
    projectId,
    product: "",
    brand: "",
    productDescription: "",
    targetAudience: "",
    platform: "",
    goal: "",
    language: "pt-BR",
    toneOfVoice: "",
    avatar: "",
    offer: "",
    defaultCTA: "",
    country: "",
    restrictions: "",
    additionalInformation: "",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
}

export const ContextService = {
  list: (): ProjectContext[] => clone(store),

  getByProject: (projectId: string): ProjectContext | undefined =>
    clone(store.find((c) => c.projectId === projectId)),

  create: (input: ProjectContextInput): ProjectContext => {
    const created: ProjectContext = {
      ...input,
      id: uid("ctx"),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    store.push(created);
    return clone(created);
  },

  update: (
    projectId: string,
    patch: Partial<ProjectContextInput>,
  ): ProjectContext => {
    const i = store.findIndex((c) => c.projectId === projectId);
    if (i < 0) {
      const created: ProjectContext = {
        ...emptyContext(projectId),
        ...patch,
        projectId,
        updatedAt: nowISO(),
      };
      store.push(created);
      return clone(created);
    }
    store[i] = { ...store[i], ...patch, updatedAt: nowISO() };
    return clone(store[i]);
  },

  reset: (projectId: string): ProjectContext => {
    const original = defaults.find((c) => c.projectId === projectId);
    const i = store.findIndex((c) => c.projectId === projectId);
    const next: ProjectContext = original
      ? { ...clone(original), updatedAt: nowISO() }
      : emptyContext(projectId);
    if (i < 0) store.push(next);
    else store[i] = next;
    return clone(next);
  },
};