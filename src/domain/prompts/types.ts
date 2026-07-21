import type { Entity, ID, Language } from "../_shared";

export type PromptStatus = "draft" | "testing" | "approved" | "archived";

export interface PromptVersion {
  id: ID;
  promptId: ID;
  version: string;
  content: string;
  note?: string;
  createdAt: string;
}

export interface Prompt extends Entity {
  title: string;
  description: string;
  objective: string;
  content: string;
  expectedOutput: string;
  notes: string;
  projectId: ID | null;
  categoryId: ID | null;
  frameworkId: ID | null;
  aiModelId: ID | null;
  language: Language;
  status: PromptStatus;
  favorite: boolean;
  version: string;
  tags: ID[];
}
