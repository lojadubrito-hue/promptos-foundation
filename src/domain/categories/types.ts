import type { Entity } from "../_shared";

export interface Category extends Entity {
  name: string;
  icon: string;
  color: string;
}
