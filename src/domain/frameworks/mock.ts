import { daysAgo } from "../_shared";
import type { Framework } from "./types";

const raw: Array<Pick<Framework, "id" | "name" | "description">> = [
  { id: "fw_aida", name: "AIDA", description: "Attention, Interest, Desire, Action." },
  { id: "fw_pas", name: "PAS", description: "Problem, Agitate, Solution." },
  { id: "fw_bab", name: "BAB", description: "Before, After, Bridge." },
  { id: "fw_star", name: "STAR", description: "Situation, Task, Action, Result." },
  { id: "fw_rtf", name: "RTF", description: "Role, Task, Format." },
  { id: "fw_cot", name: "CoT", description: "Chain of Thought raciocínio explícito." },
  { id: "fw_fewshot", name: "Few Shot", description: "Aprendizado com poucos exemplos." },
  { id: "fw_zeroshot", name: "Zero Shot", description: "Instrução direta sem exemplos." },
  { id: "fw_tot", name: "Tree of Thoughts", description: "Exploração em árvore de raciocínio." },
  { id: "fw_custom", name: "Personalizado", description: "Estrutura definida pelo usuário." },
];

export const mockFrameworks: Framework[] = raw.map((r, i) => ({
  ...r,
  createdAt: daysAgo(90 - i),
  updatedAt: daysAgo(20 - i),
}));
