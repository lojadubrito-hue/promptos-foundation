import type { Entity, ID } from "../_shared";

export interface Template extends Entity {
  name: string;
  description: string;
  category: ID;
  framework: ID;
  prompt: string;
}
