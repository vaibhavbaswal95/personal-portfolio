import React from "react";
import Link from "next/link";

// Slugs that have full written content
const publishedSlugs = new Set([
  "computer-vision-to-llms-transition",
]);

interface BlogCardProps {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  slug: string;
}

export default function BlogCard({ title, date, tags, excerpt, slug }: BlogCardProps) {
  const isPublished = publishedSlugs.has(slug);

  return (
    <div className={`glass p-6 rounded-2xl shadow-lg flex flex-col gap-3 w-full max-w-xl ${!isPublished ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-2xl font-bold text-galaxy-500 font-display mb-1">{title}</h3>
        {!isPublished && (
          <span className="shrink-0 text-xs bg-white/10 text-white/50 px-2 py-1 rounded-full font-semibold mt-1">
            Coming Soon
          </span>
        )}
      </div>
      <div className="flex gap-2 text-xs text-galaxy-400 mb-2 flex-wrap">
        <span>{date}</span>
        {tags.map((tag) => (
          <span key={tag} className="bg-galaxy-500/30 px-2 py-0.5 rounded font-semibold ml-2">#{tag}</span>
        ))}
      </div>
      <p className="text-white/80 font-medium mb-2">{excerpt}</p>
      {isPublished ? (
        <Link href={`/blogs/${slug}`} className="text-galaxy-400 hover:underline font-semibold mt-auto">
          Read More →
        </Link>
      ) : (
        <span className="text-white/30 font-semibold mt-auto cursor-not-allowed">
          Read More →
        </span>
      )}
    </div>
  );
}
