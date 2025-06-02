"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Music", href: "/music" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLinkClick() {
    setMenuOpen(false);
  }

  const renderNavLinks = (isMobile = false) => {
    return navLinks.map((link) => {
      // For home page
      const isHome = link.href === "/" && pathname === "/";
      // For other pages, remove trailing slashes for comparison
      const currentPath = pathname?.replace(/\/$/, "");
      const linkPath = link.href.replace(/\/$/, "");
      const isCurrentPage = currentPath === linkPath;
      
      const isActive = isHome || isCurrentPage;
      
      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={isMobile ? handleLinkClick : undefined}
          className={`font-semibold text-lg px-5 py-2 rounded-full relative ${
            isActive 
              ? "text-black bg-white shadow-lg transform -translate-y-0.5" 
              : "text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 ease-in-out"
          }`}
        >
          {isActive && (
            <span 
              className="absolute inset-0 rounded-full bg-white -z-10"
            ></span>
          )}
          <span className="relative z-10">{link.name}</span>
        </Link>
      );
    });
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full flex items-center justify-center py-5 px-6">
        <div className="flex items-center justify-between w-full max-w-6xl px-8 py-4 rounded-2xl bg-transparent backdrop-blur-sm border border-white/5">
          <div className="font-extrabold text-2xl font-display tracking-tight text-[rgb(165,100,180)]">
            vb.
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <span 
                key={link.name}
                className="font-semibold text-lg px-5 py-2 rounded-full relative text-white/80"
              >
                {link.name}
              </span>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <span className="text-white text-2xl px-2 py-1 rounded">
              ☰
            </span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-center py-5 px-6">
      <div className="flex items-center justify-between w-full max-w-6xl px-8 py-4 rounded-2xl bg-transparent backdrop-blur-sm border border-white/5">
        <div className="font-extrabold text-2xl font-display tracking-tight text-[rgb(165,100,180)]">
          vb.
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {renderNavLinks()}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white text-2xl px-2 py-1 rounded hover:bg-galaxy-500/20 transition-all duration-300"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="bg-black/90 w-2/3 max-w-xs h-full flex flex-col p-8 gap-6 shadow-2xl backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-white text-2xl mb-4 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            {renderNavLinks(true)}
          </div>
        </div>
      )}
    </nav>
  );
} 