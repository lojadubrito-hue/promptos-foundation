import { daysAgo } from "../_shared";
import type { Tag } from "./types";

const names = [
  "seo","landing-page","email","cold-outreach","ugc","tiktok","instagram","youtube",
  "storytelling","hook","cta","json","structured","persona","onboarding","retention",
  "b2b","b2c","ecommerce","viral","short-form","longform","system-prompt","few-shot",
  "chain-of-thought","research","summarization","translation","refactor","review",
];

export const mockTags: Tag[] = names.map((name, i) => ({
  id: `tag_${name}`,
  name,
  createdAt: daysAgo(60 - i),
  updatedAt: daysAgo(30 - (i % 10)),
}));
