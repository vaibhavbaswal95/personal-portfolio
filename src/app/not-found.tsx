"use client";
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="glass max-w-xl p-8 rounded-2xl">
        <h1 className="text-5xl font-bold text-white mb-6 font-display">404</h1>
        <h2 className="text-2xl font-semibold text-white/90 mb-4">Page Not Found</h2>
        <p className="text-white/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 