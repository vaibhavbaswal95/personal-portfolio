import React from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
}

export default function ProjectCard({ name, description, tech, image, github, demo }: ProjectCardProps) {
  return (
    <div className="glass p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-md">
      {image && (
        <img src={image} alt={name} className="rounded-xl w-full h-40 object-cover mb-2" />
      )}
      <h3 className="text-2xl font-bold text-galaxy-500 font-display text-white">{name}</h3>
      <p className="text-white/80 font-medium text-white">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2 text-white">
        {tech.map((t) => (
          <span key={t} className="bg-galaxy-500/30 text-galaxy-400 px-2 py-1 rounded text-xs font-semibold">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-galaxy-400 underline">GitHub</a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-galaxy-400 underline">Live Demo</a>
        )}
      </div>
    </div>
  );
} 