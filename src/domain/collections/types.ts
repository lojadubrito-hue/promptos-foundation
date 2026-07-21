import type { Entity, ID } from "../_shared";

export interface Collection extends Entity {
  name: string;
  description: string;
  cover: string;
  promptIds: ID[];
}
