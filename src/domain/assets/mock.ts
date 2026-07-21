import { daysAgo } from "../_shared";
import type { Asset } from "./types";

export const mockAssets: Asset[] = [
  { id: "ast_1", type: "image", title: "Portrait Sofia",       content: "https://placehold.co/512", createdAt: daysAgo(5), updatedAt: daysAgo(5) },
  { id: "ast_2", type: "video", title: "Veo 3 Intro",          content: "https://placehold.co/720", createdAt: daysAgo(6), updatedAt: daysAgo(6) },
  { id: "ast_3", type: "json",  title: "Veo Scene JSON",       content: "{\"scene\":\"cine\"}",     createdAt: daysAgo(7), updatedAt: daysAgo(7) },
  { id: "ast_4", type: "text",  title: "Cold Email Draft",     content: "Olá {{nome}}...",          createdAt: daysAgo(8), updatedAt: daysAgo(8) },
];
