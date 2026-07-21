import { daysAgo } from "../_shared";
import type { Character } from "./types";

const seeds: Array<Omit<Character, "createdAt" | "updatedAt" | "images">> = [
  { id: "chr_sofia",  name: "Sofia Almeida",  description: "Creator de lifestyle.",       masterPrompt: "Mulher brasileira 28 anos, cabelo castanho...", appearance: "1.68m, castanha", personality: "Energética e empática", age: 28, gender: "female" },
  { id: "chr_diego",  name: "Diego Ramos",    description: "Personal trainer.",           masterPrompt: "Homem 32 anos atlético...",                    appearance: "1.85m, atlético", personality: "Motivador",              age: 32, gender: "male" },
  { id: "chr_yuki",   name: "Yuki Tanaka",    description: "Tech reviewer.",              masterPrompt: "Mulher asiática 25 anos...",                   appearance: "1.65m, cabelo preto", personality: "Analítica",          age: 25, gender: "female" },
  { id: "chr_marcus", name: "Marcus Weber",   description: "Chef gourmet.",               masterPrompt: "Homem europeu 40 anos...",                     appearance: "1.80m, grisalho",     personality: "Confiante",          age: 40, gender: "male" },
  { id: "chr_ana",    name: "Ana Costa",      description: "Educadora infantil.",         masterPrompt: "Mulher 35 anos...",                            appearance: "1.60m, ruiva",        personality: "Acolhedora",         age: 35, gender: "female" },
  { id: "chr_kai",    name: "Kai Nakamura",   description: "Gamer streamer.",             masterPrompt: "Homem 22 anos...",                             appearance: "1.75m, cabelo azul",  personality: "Carismático",        age: 22, gender: "male" },
  { id: "chr_lia",    name: "Lia Oliveira",   description: "UGC beauty.",                 masterPrompt: "Mulher 26 anos negra...",                      appearance: "1.70m, cacheada",     personality: "Autêntica",          age: 26, gender: "female" },
  { id: "chr_theo",   name: "Théo Rocha",     description: "Designer minimalista.",       masterPrompt: "Homem 30 anos...",                             appearance: "1.78m, barba curta",  personality: "Reflexivo",          age: 30, gender: "male" },
  { id: "chr_nina",   name: "Nina Ferraz",    description: "Fitness coach.",              masterPrompt: "Mulher 29 anos...",                            appearance: "1.72m, loira",        personality: "Direta",             age: 29, gender: "female" },
  { id: "chr_alex",   name: "Alex Mendes",    description: "Consultor B2B.",              masterPrompt: "Pessoa 38 anos...",                            appearance: "1.76m, terno",        personality: "Estratégico",        age: 38, gender: "non-binary" },
];

export const mockCharacters: Character[] = seeds.map((s, i) => ({
  ...s,
  images: [],
  createdAt: daysAgo(80 - i * 2),
  updatedAt: daysAgo(20 - i),
}));
