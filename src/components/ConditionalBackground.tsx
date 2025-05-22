"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThreeBackground from './ThreeBackground';

export default function ConditionalBackground() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMounted, setIsMounted] = useState(false);
  
  // First effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Second effect to handle class changes - only runs after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    // Add or remove the galaxy-bg class based on the current page
    if (!isHomePage) {
      document.body.classList.remove('galaxy-bg');
    } else {
      document.body.classList.remove('galaxy-bg');
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('galaxy-bg');
    };
  }, [isHomePage, isMounted]);
  
  // During SSR and initial render, don't attempt to add/remove classes
  if (!isMounted) {
    return null;
  }
  
  // Return logic after all hooks are called and we've mounted
  return isHomePage ? <ThreeBackground /> : null;
} 