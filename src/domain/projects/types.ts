import type { Entity, ID, Status } from "../_shared";

export interface Project extends Entity {
  name: string;
  description: string;
  cover: string;
  favorite: boolean;
  status: Status;
  ownerId?: ID;
}
