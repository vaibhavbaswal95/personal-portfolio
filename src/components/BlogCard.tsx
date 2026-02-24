import React from "react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  slug: string;
}

export default function BlogCard({ title, date, tags, excerpt, slug }: BlogCardProps) {
  return (
    <div className="glass p-6 rounded-2xl shadow-lg flex flex-col gap-3 w-full max-w-xl">
      <h3 className="text-2xl font-bold text-galaxy-500 font-display mb-1">{title}</h3>
      <div className="flex gap-2 text-xs text-galaxy-400 mb-2">
        <span>{date}</span>
        {tags.map((tag) => (
          <span key={tag} className="bg-galaxy-500/30 px-2 py-0.5 rounded font-semibold ml-2">#{tag}</span>
        ))}
      </div>
      <p className="text-white/80 font-medium mb-2">{excerpt}</p>
      <Link href={`/blogs/${slug}`} className="text-galaxy-400 hover:underline font-semibold mt-auto">
        Read More →
      </Link>
    </div>
  );
}
