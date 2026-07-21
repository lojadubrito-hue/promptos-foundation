import { daysAgo } from "../_shared";
import type { Project } from "./types";

export const mockProjects: Project[] = [
  { id: "prj_launch", name: "Lançamento Produto X", description: "Campanha completa de go-to-market.", cover: "gradient-1", favorite: true,  status: "active",   createdAt: daysAgo(45), updatedAt: daysAgo(1) },
  { id: "prj_tiktok", name: "TikTok Shop UGC",       description: "Roteiros de UGC para creators.",       cover: "gradient-2", favorite: true,  status: "active",   createdAt: daysAgo(30), updatedAt: daysAgo(2) },
  { id: "prj_veo",    name: "Veo 3 Cinematic",       description: "JSONs cinematográficos para Veo 3.",  cover: "gradient-3", favorite: false, status: "active",   createdAt: daysAgo(28), updatedAt: daysAgo(3) },
  { id: "prj_blog",   name: "Blog SEO PT-BR",        description: "Artigos otimizados para SEO.",         cover: "gradient-4", favorite: false, status: "active",   createdAt: daysAgo(60), updatedAt: daysAgo(4) },
  { id: "prj_saas",   name: "SaaS Onboarding",       description: "Fluxos de ativação e retenção.",       cover: "gradient-5", favorite: true,  status: "active",   createdAt: daysAgo(20), updatedAt: daysAgo(5) },
  { id: "prj_chars",  name: "Personagens IA",        description: "Casting de avatares reutilizáveis.",   cover: "gradient-6", favorite: false, status: "draft",    createdAt: daysAgo(15), updatedAt: daysAgo(6) },
  { id: "prj_arch",   name: "Legacy 2024",           description: "Projetos históricos arquivados.",      cover: "gradient-7", favorite: false, status: "archived", createdAt: daysAgo(200), updatedAt: daysAgo(90) },
  { id: "prj_dev",    name: "DevRel Content",        description: "Docs e tutoriais para desenvolvedores.", cover: "gradient-8", favorite: false, status: "active",   createdAt: daysAgo(12), updatedAt: daysAgo(1) },
];
