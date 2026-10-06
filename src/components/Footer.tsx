'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-5 py-8 md:px-10 max-w-[89.5rem] mx-auto border-t border-white/10 text-xs text-gray-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Firza Duta Fauzan</span>
          <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <span>UBSI Bogor Graduate &amp; Student</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
            data-cursor="pointer"
          >
            Back to Top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
