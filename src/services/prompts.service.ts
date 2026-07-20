import type { Prompt } from "@/types/prompt";

/**
 * Mock service layer for prompts.
 * Replace the internal store with Supabase queries when integrating backend.
 * Component code MUST use this service — never hardcode prompt data.
 */

const now = new Date();
const daysAgo = (n: number) =>
  new Date(now.getTime() - n * 86_400_000).toISOString();

const seed: Prompt[] = [
  {
    id: "p_001",
    title: "Landing Page Hero — SaaS B2B",
    description: "Gera hero copy persuasivo para SaaS B2B.",
    objective: "Aumentar taxa de conversão do hero em landing pages.",
    category: "Copywriting",
    project: "Marketing Site",
    model: "GPT-5",
    language: "Português",
    framework: "AIDA",
    tags: ["hero", "saas", "conversão"],
    status: "Approved",
    version: "v1.2",
    prompt:
      "Você é um copywriter sênior especializado em SaaS B2B.\nEscreva um hero para {produto} com foco em {publico}.\nEstruture em: título (max 8 palavras), subtítulo (max 20 palavras) e CTA.",
    expectedResult:
      "Retorno em JSON com { title, subtitle, cta } prontos para uso.",
    notes: "Testar variação com prova social embutida no subtítulo.",
    favorite: true,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(1),
    history: [
      { id: "v1", label: "v1.0", createdAt: daysAgo(30), note: "Versão inicial" },
      { id: "v2", label: "v1.1", createdAt: daysAgo(10), note: "Ajuste de tom" },
      { id: "v3", label: "v1.2", createdAt: daysAgo(1), note: "Adicionado CTA" },
    ],
  },
  {
    id: "p_002",
    title: "Storyboard Cinematográfico — Veo 3",
    description: "Prompt estruturado para geração de vídeos no Veo 3.",
    objective: "Produzir clipes de 8s com direção de câmera detalhada.",
    category: "Vídeo",
    project: "Veo Studio",
    model: "Veo 3",
    language: "Inglês",
    framework: "STAR",
    tags: ["cinematic", "8s", "camera"],
    status: "Testing",
    version: "v2.0",
    prompt:
      "Cinematic shot, {subject} in {environment}.\nCamera: slow dolly in, 35mm anamorphic.\nLighting: golden hour, soft shadows.\nMood: {mood}.",
    expectedResult: "Clipe de 8s coerente com direção de câmera.",
    notes: "Reduzir descrição de ambiente para acelerar geração.",
    favorite: false,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(3),
    history: [
      { id: "v1", label: "v1.0", createdAt: daysAgo(20) },
      { id: "v2", label: "v2.0", createdAt: daysAgo(3), note: "Novo framework" },
    ],
  },
  {
    id: "p_003",
    title: "Code Review Sênior — TypeScript",
    description: "Revisa PRs em TypeScript com foco em performance.",
    objective: "Detectar antipadrões e sugerir refactors.",
    category: "Desenvolvimento",
    project: "Internal Tools",
    model: "Claude",
    language: "Português",
    framework: "Chain of Thought",
    tags: ["code-review", "typescript", "refactor"],
    status: "Approved",
    version: "v1.0",
    prompt:
      "Aja como um staff engineer.\nRevise o diff abaixo passo a passo.\nAponte: bugs, performance, legibilidade.\n\n```diff\n{diff}\n```",
    expectedResult: "Lista priorizada de sugestões com trechos de código.",
    notes: "",
    favorite: true,
    createdAt: daysAgo(45),
    updatedAt: daysAgo(7),
    history: [{ id: "v1", label: "v1.0", createdAt: daysAgo(45) }],
  },
  {
    id: "p_004",
    title: "Personagem Consistente — Flux",
    description: "Mantém consistência visual de personagem entre cenas.",
    objective: "Gerar mesmo personagem em múltiplos cenários.",
    category: "Imagem",
    project: "Character Studio",
    model: "Flux",
    language: "Inglês",
    framework: "Few Shot",
    tags: ["character", "consistency", "flux"],
    status: "Draft",
    version: "v0.3",
    prompt:
      "Portrait of {character_name}, {age}, {ethnicity}.\nSignature features: {features}.\nScene: {scene}.\nStyle: photorealistic, 85mm lens, natural light.",
    expectedResult: "Imagem coerente com prompts anteriores do personagem.",
    notes: "Testar seed fixo.",
    favorite: false,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(0),
    history: [
      { id: "v1", label: "v0.1", createdAt: daysAgo(5) },
      { id: "v2", label: "v0.2", createdAt: daysAgo(2) },
      { id: "v3", label: "v0.3", createdAt: daysAgo(0), note: "Ajuste de estilo" },
    ],
  },
  {
    id: "p_005",
    title: "Roteiro TikTok — Hook 3s",
    description: "Roteiros curtos otimizados para retenção nos 3s iniciais.",
    objective: "Maximizar retenção e watchtime.",
    category: "Marketing",
    project: "TikTok Studio",
    model: "GPT-5",
    language: "Português",
    framework: "PAS",
    tags: ["tiktok", "hook", "shortform"],
    status: "Testing",
    version: "v1.1",
    prompt:
      "Crie um roteiro de 30s para TikTok sobre {tema}.\nHook nos primeiros 3s.\nEstrutura: Problema → Agitação → Solução.",
    expectedResult: "Roteiro em blocos com timings.",
    notes: "",
    favorite: true,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(4),
    history: [
      { id: "v1", label: "v1.0", createdAt: daysAgo(12) },
      { id: "v2", label: "v1.1", createdAt: daysAgo(4) },
    ],
  },
  {
    id: "p_006",
    title: "Análise SWOT Estratégica",
    description: "Gera análises SWOT profundas para tomada de decisão.",
    objective: "Apoiar decisões estratégicas com framework SWOT.",
    category: "Pesquisa",
    project: "Consultoria",
    model: "Gemini",
    language: "Português",
    framework: "RTF",
    tags: ["swot", "estrategia"],
    status: "Archived",
    version: "v1.0",
    prompt:
      "Role: Consultor estratégico.\nTask: Faça análise SWOT sobre {empresa}.\nFormat: Tabela com 4 colunas.",
    expectedResult: "Tabela SWOT com bullets acionáveis.",
    notes: "",
    favorite: false,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(50),
    history: [{ id: "v1", label: "v1.0", createdAt: daysAgo(60) }],
  },
];

let store: Prompt[] = [...seed];

export const promptsService = {
  list(): Prompt[] {
    return [...store];
  },
  get(id: string): Prompt | undefined {
    return store.find((p) => p.id === id);
  },
  update(id: string, patch: Partial<Prompt>): Prompt | undefined {
    store = store.map((p) =>
      p.id === id
        ? { ...p, ...patch, updatedAt: new Date().toISOString() }
        : p,
    );
    return store.find((p) => p.id === id);
  },
  create(partial?: Partial<Prompt>): Prompt {
    const id = `p_${Math.random().toString(36).slice(2, 8)}`;
    const iso = new Date().toISOString();
    const created: Prompt = {
      id,
      title: "Novo Prompt",
      description: "",
      objective: "",
      category: "Marketing",
      project: "Sem Projeto",
      model: "GPT-5",
      language: "Português",
      framework: "RTF",
      tags: [],
      status: "Draft",
      version: "v1.0",
      prompt: "",
      expectedResult: "",
      notes: "",
      favorite: false,
      createdAt: iso,
      updatedAt: iso,
      history: [{ id: "v1", label: "v1.0", createdAt: iso, note: "Criado" }],
      ...partial,
    };
    store = [created, ...store];
    return created;
  },
  duplicate(id: string): Prompt | undefined {
    const src = store.find((p) => p.id === id);
    if (!src) return undefined;
    return this.create({ ...src, title: `${src.title} (cópia)`, favorite: false });
  },
  remove(id: string): void {
    store = store.filter((p) => p.id !== id);
  },
  toggleFavorite(id: string): Prompt | undefined {
    const p = store.find((x) => x.id === id);
    if (!p) return undefined;
    return this.update(id, { favorite: !p.favorite });
  },
  bumpVersion(id: string, note?: string): Prompt | undefined {
    const p = store.find((x) => x.id === id);
    if (!p) return undefined;
    const num = Number(p.version.replace(/[^\d.]/g, "")) || 1;
    const nextLabel = `v${(num + 0.1).toFixed(1)}`;
    const newVersion: import("@/types/prompt").PromptVersion = {
      id: `v_${Date.now()}`,
      label: nextLabel,
      createdAt: new Date().toISOString(),
      note,
    };
    return this.update(id, {
      version: nextLabel,
      history: [...p.history, newVersion],
    });
  },
};