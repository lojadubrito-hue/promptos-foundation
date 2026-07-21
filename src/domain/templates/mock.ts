import { daysAgo } from "../_shared";
import type { Template } from "./types";

const seeds: Array<Omit<Template, "createdAt" | "updatedAt">> = [
  { id: "tpl_tiktok_ugc",   name: "TikTok Shop UGC",       description: "Roteiro UGC de 30s pronto para creators.", category: "cat_social",   framework: "fw_aida",     prompt: "Você é um criador de UGC..." },
  { id: "tpl_veo3_json",    name: "Veo 3 JSON Cine",       description: "JSON cinematográfico para Veo 3.",         category: "cat_video",    framework: "fw_rtf",      prompt: '{ "scene": "..." }' },
  { id: "tpl_chatgpt_expert",name: "ChatGPT Expert",       description: "System prompt de especialista.",           category: "cat_edu",      framework: "fw_rtf",      prompt: "Aja como um especialista..." },
  { id: "tpl_claude_long",  name: "Claude Long Context",   description: "Sumarização de documentos extensos.",      category: "cat_research", framework: "fw_cot",      prompt: "Analise o documento..." },
  { id: "tpl_gemini_res",   name: "Gemini Research",       description: "Pesquisa multi-fonte estruturada.",        category: "cat_research", framework: "fw_cot",      prompt: "Pesquise sobre..." },
  { id: "tpl_flux_image",   name: "Flux Image",            description: "Prompt de imagem cinematográfica.",        category: "cat_image",    framework: "fw_zeroshot", prompt: "Cinematic portrait of..." },
  { id: "tpl_seo_article",  name: "SEO Article 2000w",     description: "Artigo otimizado para SEO em PT-BR.",      category: "cat_edu",      framework: "fw_star",     prompt: "Escreva um artigo..." },
  { id: "tpl_cold_email",   name: "Cold Email B2B",        description: "Email frio de alta conversão.",            category: "cat_sales",    framework: "fw_bab",      prompt: "Escreva um cold email..." },
  { id: "tpl_landing_saas", name: "Landing SaaS",          description: "Copy de landing page SaaS.",               category: "cat_copy",     framework: "fw_pas",      prompt: "Crie uma landing page..." },
  { id: "tpl_yt_short",     name: "YouTube Short Script",  description: "Roteiro para Shorts.",                     category: "cat_video",    framework: "fw_aida",     prompt: "Roteiro em 3 blocos..." },
  { id: "tpl_ig_carousel",  name: "Instagram Carousel",    description: "Carrossel educativo em 8 slides.",         category: "cat_social",   framework: "fw_aida",     prompt: "Slide 1 - Hook..." },
  { id: "tpl_persona_icp",  name: "Persona ICP",           description: "Persona detalhada de ICP.",                category: "cat_marketing",framework: "fw_rtf",      prompt: "Crie uma persona..." },
  { id: "tpl_kling_motion", name: "Kling Motion",          description: "Prompt de motion para Kling.",             category: "cat_video",    framework: "fw_rtf",      prompt: "Motion smooth of..." },
  { id: "tpl_code_review",  name: "Code Review TS",        description: "Review de código TypeScript.",             category: "cat_dev",      framework: "fw_cot",      prompt: "Faça review de..." },
  { id: "tpl_sql_explain",  name: "SQL Explainer",         description: "Explicação didática de queries SQL.",      category: "cat_data",     framework: "fw_cot",      prompt: "Explique a query..." },
];

export const mockTemplates: Template[] = seeds.map((s, i) => ({
  ...s,
  createdAt: daysAgo(60 - i),
  updatedAt: daysAgo(30 - i),
}));
