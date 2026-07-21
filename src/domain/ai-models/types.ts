import type { Entity } from "../_shared";

export interface AIModel extends Entity {
  name: string;
  provider: string;
  icon: string;
  supportsImage: boolean;
  supportsVideo: boolean;
  supportsJson: boolean;
}
