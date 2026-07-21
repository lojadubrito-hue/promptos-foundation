import { AIModelService } from "./ai-models";
import { CategoryService } from "./categories";
import { CharacterService } from "./characters";
import { FrameworkService } from "./frameworks";
import { ProjectService } from "./projects";
import { PromptService } from "./prompts";
import type { Prompt } from "./prompts";

export const findPrompt = (id: string) => PromptService.get(id);
export const findProject = (id: string) => ProjectService.get(id);
export const findCategory = (id: string) => CategoryService.get(id);
export const findCharacter = (id: string) => CharacterService.get(id);
export const findAIModel = (id: string) => AIModelService.get(id);
export const findFramework = (id: string) => FrameworkService.get(id);

export const listFavoritePrompts = (): Prompt[] => PromptService.listFavorites();
export const listRecentPrompts = (limit = 5): Prompt[] => PromptService.listRecent(limit);
export const listPromptsByCategory = (categoryId: string): Prompt[] =>
  PromptService.listByCategory(categoryId);
export const listPromptsByAIModel = (aiModelId: string): Prompt[] =>
  PromptService.listByModel(aiModelId);
export const listPromptsByFramework = (frameworkId: string): Prompt[] =>
  PromptService.listByFramework(frameworkId);
export const listPromptsByProject = (projectId: string): Prompt[] =>
  PromptService.listByProject(projectId);

export const listFavoriteProjects = () => ProjectService.listFavorites();
export const listRecentProjects = (limit = 5) => ProjectService.listRecent(limit);
