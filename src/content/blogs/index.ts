import { post as cvToLlms } from "./computer-vision-to-llms-transition";

export const allPosts = [
  cvToLlms,
];

export function getPostBySlug(slug: string) {
  return allPosts.find((p) => p.slug === slug) || null;
}
