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
  const [prevPathname, setPrevPathname] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initial mounting effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle path changes only after mounting
  useEffect(() => {
    if (!mounted) return;
    
    // Only run transition effect if component is mounted and there was a previous path
    if (prevPathname && prevPathname !== pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Match this with the animation duration
      
      return () => clearTimeout(timer);
    }
    
    // Update the previous pathname
    setPrevPathname(pathname);
  }, [pathname, mounted, prevPathname]);

  function handleLinkClick() {
    setMenuOpen(false);
  }

  // Render a placeholder during SSR
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const wasActive = prevPathname === link.href && isTransitioning;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold text-lg px-5 py-2 rounded-full relative ${
                  isActive 
                    ? "text-galaxy-500 bg-white/90 border border-white/50 shadow-lg transform -translate-y-0.5 drop-shadow-white-glow z-10 bg-gradient-to-r from-white via-white/95 to-white animate-button-active" 
                    : wasActive
                      ? "text-white/80 animate-nav-out"
                      : isTransitioning && pathname === link.href
                        ? "text-galaxy-500 animate-nav-in"
                        : "text-white/80 hover:text-white hover:bg-galaxy-500/10 transition-all duration-300 ease-in-out"
                }`}
              >
                {link.name}
                {isActive && (
                  <span 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-white/95 to-white opacity-0"
                    style={{
                      animation: isTransitioning ? 'none' : 'flowAnimation 8s ease-in-out infinite'
                    }}
                  ></span>
                )}
              </Link>
            );
          })}
        </div>
        {/* Mobile Hamburger */}
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
      {/* Mobile Menu Drawer */}
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
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-semibold text-xl px-5 py-2 rounded-full relative ${
                    isActive 
                      ? "text-galaxy-500 bg-white/90 border border-white/50 shadow-lg drop-shadow-white-glow bg-gradient-to-r from-white via-white/95 to-white animate-flow" 
                      : "text-white/80 hover:text-white hover:bg-galaxy-500/10 transition-all duration-300 ease-in-out"
                  }`}
                  onClick={handleLinkClick}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: menuOpen ? 'navItemSlideIn 0.5s ease-out forwards' : 'none',
                    opacity: 0
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
} 