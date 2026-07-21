import { daysAgo } from "../_shared";
import type { AIModel } from "./types";

export const mockAIModels: AIModel[] = [
  { id: "ai_gpt5", name: "GPT-5", provider: "OpenAI", icon: "Sparkles", supportsImage: true, supportsVideo: false, supportsJson: true, createdAt: daysAgo(60), updatedAt: daysAgo(2) },
  { id: "ai_claude", name: "Claude 4", provider: "Anthropic", icon: "Bot", supportsImage: true, supportsVideo: false, supportsJson: true, createdAt: daysAgo(60), updatedAt: daysAgo(2) },
  { id: "ai_gemini", name: "Gemini 2.5", provider: "Google", icon: "Gem", supportsImage: true, supportsVideo: true, supportsJson: true, createdAt: daysAgo(60), updatedAt: daysAgo(3) },
  { id: "ai_grok", name: "Grok 3", provider: "xAI", icon: "Zap", supportsImage: true, supportsVideo: false, supportsJson: true, createdAt: daysAgo(50), updatedAt: daysAgo(3) },
  { id: "ai_veo3", name: "Veo 3", provider: "Google", icon: "Film", supportsImage: false, supportsVideo: true, supportsJson: true, createdAt: daysAgo(50), updatedAt: daysAgo(4) },
  { id: "ai_flux", name: "Flux", provider: "Black Forest Labs", icon: "Image", supportsImage: true, supportsVideo: false, supportsJson: false, createdAt: daysAgo(45), updatedAt: daysAgo(4) },
  { id: "ai_kling", name: "Kling", provider: "Kuaishou", icon: "Video", supportsImage: false, supportsVideo: true, supportsJson: false, createdAt: daysAgo(45), updatedAt: daysAgo(5) },
  { id: "ai_runway", name: "Runway Gen-4", provider: "Runway", icon: "Clapperboard", supportsImage: true, supportsVideo: true, supportsJson: false, createdAt: daysAgo(45), updatedAt: daysAgo(5) },
  { id: "ai_cursor", name: "Cursor", provider: "Anysphere", icon: "MousePointer", supportsImage: false, supportsVideo: false, supportsJson: true, createdAt: daysAgo(40), updatedAt: daysAgo(6) },
  { id: "ai_lovable", name: "Lovable", provider: "Lovable", icon: "Heart", supportsImage: false, supportsVideo: false, supportsJson: true, createdAt: daysAgo(40), updatedAt: daysAgo(6) },
  { id: "ai_mistral", name: "Mistral Large", provider: "Mistral", icon: "Wind", supportsImage: false, supportsVideo: false, supportsJson: true, createdAt: daysAgo(35), updatedAt: daysAgo(7) },
  { id: "ai_other", name: "Outros", provider: "Custom", icon: "Boxes", supportsImage: false, supportsVideo: false, supportsJson: false, createdAt: daysAgo(30), updatedAt: daysAgo(8) },
];
