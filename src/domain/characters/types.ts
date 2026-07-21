import type { Entity } from "../_shared";

export type Gender = "female" | "male" | "non-binary" | "other";

export interface Character extends Entity {
  name: string;
  description: string;
  masterPrompt: string;
  appearance: string;
  personality: string;
  age: number;
  gender: Gender;
  images: string[];
}
