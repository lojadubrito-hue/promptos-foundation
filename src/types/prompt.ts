export const AI_MODELS = [
  "GPT-5",
  "Claude",
  "Gemini",
  "Grok",
  "Veo 3",
  "Flux",
  "Kling",
  "Runway",
  "Cursor",
  "Lovable",
  "Outros",
] as const;
export type AIModel = (typeof AI_MODELS)[number];

export const FRAMEWORKS = [
  "AIDA",
  "PAS",
  "BAB",
  "STAR",
  "RTF",
  "CoT",
  "Few Shot",
  "Zero Shot",
  "Chain of Thought",
  "Tree of Thoughts",
  "Personalizado",
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const PROMPT_STATUSES = ["Draft", "Testing", "Approved", "Archived"] as const;
export type PromptStatus = (typeof PROMPT_STATUSES)[number];

export const CATEGORIES = [
  "Marketing",
  "Copywriting",
  "Desenvolvimento",
  "Design",
  "Vídeo",
  "Imagem",
  "Educação",
  "Pesquisa",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface PromptVersion {
  id: string;
  label: string;
  createdAt: string;
  note?: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  objective: string;
  category: Category;
  project: string;
  model: AIModel;
  language: string;
  framework: Framework;
  tags: string[];
  status: PromptStatus;
  version: string;
  prompt: string;
  expectedResult: string;
  notes: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  history: PromptVersion[];
}