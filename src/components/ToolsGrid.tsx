"use client";
import React, { useState, useEffect } from "react";

const tools = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Pytorch", icon: "https://cdn.simpleicons.org/pytorch/F24E1E" },
  { name: "Tensorflow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "Apache Spark", icon: "https://cdn.simpleicons.org/apacheSpark/E25A1C" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "Ableton Live", icon: "/images/tools/ableton.svg" },
  { name: "Rekordbox", icon: "/images/tools/rekordbox.svg" },
  { name: "Traktor", icon: "/images/tools/traktor.svg" },
  { name: "Touchdesigner", icon: "/images/tools/touchdesigner.svg" },
  { name: "Premiere Pro", icon: "/images/tools/pp.png" },
  { name: "After Effects", icon: "/images/tools/ae.png" },
];

export default function ToolsGrid() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default fallback icon for when custom icons can't be loaded
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://placehold.co/40x40/purple/white?text=" + e.currentTarget.alt?.charAt(0);
  };

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 mb-20">
      <div className="glass max-w-4xl w-full px-8 py-12 rounded-2xl">
        <h2 className="text-4xl font-bold mb-20 pb-5 text-center text-[rgb(165,100,180)] font-display">
          Tech Bucket
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center border border-white/20 justify-center p-6 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-100 hover:shadow-lg hover:transform hover:scale-105"
            >
              <img 
                src={tool.icon} 
                alt={tool.name} 
                className="w-12 mb-3 object-contain" 
                onError={handleImageError}
              />
              <span className="text-white font-medium text-sm mt-2 text-center">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 