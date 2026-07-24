import type { Entity, ID, Language } from "../_shared";

export interface ProjectContext extends Entity {
  projectId: ID;
  product: string;
  brand: string;
  productDescription: string;
  targetAudience: string;
  platform: string;
  goal: string;
  language: Language;
  toneOfVoice: string;
  avatar: string;
  offer: string;
  defaultCTA: string;
  country: string;
  restrictions: string;
  additionalInformation: string;
}

export type ProjectContextInput = Omit<
  ProjectContext,
  "id" | "createdAt" | "updatedAt"
>;