import { daysAgo } from "../_shared";
import type { Prompt, PromptVersion } from "./types";

type Seed = {
  id: string;
  title: string;
  category: string;
  framework: string;
  model: string;
  project: string | null;
  status: Prompt["status"];
  favorite: boolean;
  tags: string[];
  daysOld: number;
};

const seeds: Seed[] = [
  { id: "pmt_ugc_hook",       title: "TikTok UGC Hook 3s",           category: "cat_social",   framework: "fw_aida",    model: "ai_gpt5",    project: "prj_tiktok", status: "approved", favorite: true,  tags: ["tag_hook","tag_tiktok","tag_ugc"], daysOld: 1 },
  { id: "pmt_veo_cine",       title: "Veo 3 Cena Cinematográfica",   category: "cat_video",    framework: "fw_rtf",     model: "ai_veo3",    project: "prj_veo",    status: "approved", favorite: true,  tags: ["tag_json","tag_structured"], daysOld: 2 },
  { id: "pmt_landing",        title: "Landing Page SaaS",            category: "cat_copy",     framework: "fw_pas",     model: "ai_claude",  project: "prj_saas",   status: "testing",  favorite: false, tags: ["tag_landing-page","tag_cta"], daysOld: 3 },
  { id: "pmt_cold_email",     title: "Cold Email B2B",               category: "cat_sales",    framework: "fw_bab",     model: "ai_gpt5",    project: "prj_launch", status: "approved", favorite: true,  tags: ["tag_email","tag_cold-outreach","tag_b2b"], daysOld: 4 },
  { id: "pmt_seo_article",    title: "Artigo SEO 2000 palavras",     category: "cat_edu",      framework: "fw_star",    model: "ai_claude",  project: "prj_blog",   status: "draft",    favorite: false, tags: ["tag_seo","tag_longform"], daysOld: 5 },
  { id: "pmt_refactor",       title: "Code Review TypeScript",       category: "cat_dev",      framework: "fw_cot",     model: "ai_cursor",  project: "prj_dev",    status: "approved", favorite: true,  tags: ["tag_refactor","tag_review"], daysOld: 6 },
  { id: "pmt_persona",        title: "Persona ICP B2B",              category: "cat_marketing",framework: "fw_rtf",     model: "ai_gpt5",    project: "prj_launch", status: "testing",  favorite: false, tags: ["tag_persona","tag_b2b"], daysOld: 7 },
  { id: "pmt_flux_portrait",  title: "Flux Portrait Cinemático",     category: "cat_image",    framework: "fw_zeroshot",model: "ai_flux",    project: null,         status: "approved", favorite: false, tags: ["tag_json"], daysOld: 8 },
  { id: "pmt_summarize",      title: "Sumarização Long Context",     category: "cat_research", framework: "fw_cot",     model: "ai_claude",  project: null,         status: "approved", favorite: false, tags: ["tag_summarization","tag_research"], daysOld: 9 },
  { id: "pmt_translate",      title: "Tradução PT-EN Tom Técnico",   category: "cat_edu",      framework: "fw_zeroshot",model: "ai_gemini",  project: "prj_blog",   status: "draft",    favorite: false, tags: ["tag_translation"], daysOld: 10 },
  { id: "pmt_yt_script",      title: "YouTube Script Curto",         category: "cat_video",    framework: "fw_aida",    model: "ai_gpt5",    project: "prj_tiktok", status: "testing",  favorite: false, tags: ["tag_youtube","tag_storytelling"], daysOld: 11 },
  { id: "pmt_onboarding",     title: "Email Onboarding Dia 1",       category: "cat_product",  framework: "fw_bab",     model: "ai_claude",  project: "prj_saas",   status: "approved", favorite: true,  tags: ["tag_onboarding","tag_email"], daysOld: 12 },
  { id: "pmt_retention",      title: "Winback Sequence",             category: "cat_marketing",framework: "fw_pas",     model: "ai_gpt5",    project: "prj_saas",   status: "draft",    favorite: false, tags: ["tag_retention","tag_email"], daysOld: 13 },
  { id: "pmt_ig_carousel",    title: "Instagram Carrossel Educativo",category: "cat_social",   framework: "fw_aida",    model: "ai_gpt5",    project: "prj_blog",   status: "testing",  favorite: false, tags: ["tag_instagram","tag_hook"], daysOld: 14 },
  { id: "pmt_kling_dance",    title: "Kling Dance Motion",           category: "cat_video",    framework: "fw_rtf",     model: "ai_kling",   project: "prj_veo",    status: "draft",    favorite: false, tags: ["tag_short-form"], daysOld: 15 },
  { id: "pmt_runway_intro",   title: "Runway Intro Corporativa",     category: "cat_video",    framework: "fw_rtf",     model: "ai_runway",  project: "prj_veo",    status: "approved", favorite: false, tags: ["tag_json"], daysOld: 16 },
  { id: "pmt_lovable_ui",     title: "Lovable Landing Prompt",       category: "cat_design",   framework: "fw_custom",  model: "ai_lovable", project: "prj_dev",    status: "approved", favorite: true,  tags: ["tag_landing-page"], daysOld: 17 },
  { id: "pmt_data_sql",       title: "SQL Analytics Explainer",      category: "cat_data",     framework: "fw_cot",     model: "ai_gpt5",    project: "prj_dev",    status: "testing",  favorite: false, tags: ["tag_review"], daysOld: 18 },
  { id: "pmt_grok_meme",      title: "Grok Meme Marketing",          category: "cat_social",   framework: "fw_zeroshot",model: "ai_grok",    project: null,         status: "draft",    favorite: false, tags: ["tag_viral","tag_short-form"], daysOld: 19 },
  { id: "pmt_ecom_desc",      title: "Ecommerce Product Copy",       category: "cat_sales",    framework: "fw_bab",     model: "ai_claude",  project: "prj_launch", status: "approved", favorite: true,  tags: ["tag_ecommerce","tag_b2c"], daysOld: 20 },
];

export const mockPrompts: Prompt[] = seeds.map((s) => ({
  id: s.id,
  title: s.title,
  description: `Prompt profissional para ${s.title}.`,
  objective: `Gerar resultado consistente para ${s.title}.`,
  content: `# ${s.title}\n\nVocê é um especialista.\n\nContexto:\n{{contexto}}\n\nInstrução:\n1. Analise o objetivo\n2. Aplique o framework\n3. Retorne no formato solicitado.`,
  expectedOutput: "Resposta estruturada, clara e reutilizável.",
  notes: "",
  projectId: s.project,
  categoryId: s.category,
  frameworkId: s.framework,
  aiModelId: s.model,
  language: "pt-BR",
  status: s.status,
  favorite: s.favorite,
  version: "v1.0",
  tags: s.tags,
  createdAt: daysAgo(s.daysOld + 10),
  updatedAt: daysAgo(s.daysOld),
}));

export const mockPromptVersions: PromptVersion[] = mockPrompts.flatMap((p, i) => [
  { id: `${p.id}_v1`, promptId: p.id, version: "v1.0", content: p.content, note: "Versão inicial.", createdAt: p.createdAt },
  ...(i % 3 === 0
    ? [{ id: `${p.id}_v2`, promptId: p.id, version: "v1.1", content: p.content + "\n\n[refinado]", note: "Refinamento de tom.", createdAt: p.updatedAt }]
    : []),
]);
