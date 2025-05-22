"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // First effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Second effect to handle transitions - only runs after component is mounted
  useEffect(() => {
    if (!isMounted) return;
    
    // Only run transition effect if there was a previous path
    if (prevPathname && prevPathname !== pathname) {
      setIsTransitioning(true);
      
      // Disable scrolling during transition
      document.body.style.overflow = "hidden";
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.overflow = "";
      }, 800); // Slightly longer than the animation duration
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    
    // Update the previous pathname
    setPrevPathname(pathname);
  }, [pathname, prevPathname, isMounted]);

  // Don't render anything during SSR or before mounting
  if (!isMounted || !isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Exit animation */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          animation: "pageExit 0.8s forwards",
          opacity: 0
        }}
      />
      
      {/* Entry animation */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          animation: "pageEnter 0.8s forwards",
          opacity: 1
        }}
      />
    </div>
  );
}

// Add these animations to globals.css
// @keyframes pageExit {
//   0% { opacity: 0; }
//   50% { opacity: 0.8; }
//   100% { opacity: 0; }
// }
// 
// @keyframes pageEnter {
//   0% { opacity: 1; }
//   100% { opacity: 0; }
// } 