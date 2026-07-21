import type { Entity } from "../_shared";

export type AssetType = "image" | "video" | "json" | "text" | "audio";

export interface Asset extends Entity {
  type: AssetType;
  title: string;
  content: string;
}
