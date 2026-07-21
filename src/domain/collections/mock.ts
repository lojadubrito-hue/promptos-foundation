import { daysAgo } from "../_shared";
import type { Collection } from "./types";

export const mockCollections: Collection[] = [
  { id: "col_launch",   name: "Launch Kit",     description: "Prompts para lançamentos.",       cover: "gradient-1", promptIds: ["pmt_landing","pmt_cold_email","pmt_persona"], createdAt: daysAgo(40), updatedAt: daysAgo(2) },
  { id: "col_video",    name: "Video Toolkit",  description: "Prompts de vídeo e motion.",     cover: "gradient-3", promptIds: ["pmt_veo_cine","pmt_kling_dance","pmt_runway_intro"], createdAt: daysAgo(35), updatedAt: daysAgo(3) },
  { id: "col_social",   name: "Social Growth",  description: "UGC, hooks e carrosséis.",       cover: "gradient-2", promptIds: ["pmt_ugc_hook","pmt_ig_carousel","pmt_yt_script"], createdAt: daysAgo(30), updatedAt: daysAgo(4) },
  { id: "col_dev",      name: "Dev Essentials", description: "Prompts para desenvolvedores.",  cover: "gradient-8", promptIds: ["pmt_refactor","pmt_data_sql"], createdAt: daysAgo(25), updatedAt: daysAgo(5) },
];
