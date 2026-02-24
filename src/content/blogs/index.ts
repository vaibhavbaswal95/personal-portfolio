import { post as cvToLlms } from "./computer-vision-to-llms-transition";
import { post as loraFineTuning } from "./finetuning-llama-lora-what-actually-works";

export const allPosts = [
  loraFineTuning,
  cvToLlms,
];

export function getPostBySlug(slug: string) {
  return allPosts.find((p) => p.slug === slug) || null;
}
