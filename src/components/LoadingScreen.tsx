'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable body scroll while loader is active
    document.body.style.overflow = 'hidden';

    const duration = 1800;
    const interval = 18;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'unset';
          if (onComplete) onComplete();
        }, 500);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // Format progress as double digit string (e.g. 00, 09, 99, 100)
  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#0B0D10] p-8 md:p-16 text-white select-none pointer-events-auto overflow-hidden"
        >
          {/* Ambient Cosmic Background Glow inside Loader */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-amber-500/10 to-indigo-600/20 blur-3xl pointer-events-none"
          />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              Firza Duta Fauzan
            </span>
            <span className="font-mono text-[11px] text-gray-500">
              SOFTWARE ENGINEERING &bull; CREATIVE UI
            </span>
          </div>

          {/* Center Luxurious Display Typography */}
          <div className="relative z-10 my-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-[clamp(44px,7.5vw,96px)] font-light tracking-tight text-white leading-none">
                Shaping Digital Experiences
              </h1>
              <p className="text-xs uppercase tracking-[0.35em] text-gradient font-medium">
                Clarified &bull; Elevated &bull; Executed
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-6">
            <div className="flex flex-col gap-1 text-xs text-gray-400 font-mono uppercase tracking-widest">
              <span>DESIGN &amp; ENGINEERING</span>
              <span className="text-[10px] text-gray-500">&copy; 2026 EDITION</span>
            </div>

            <div className="flex items-baseline gap-1 font-serif text-6xl md:text-8xl font-light text-white tracking-tighter">
              <span>{formattedProgress}</span>
              <span className="text-lg md:text-2xl font-light text-purple-400 font-sans">%</span>
            </div>
          </div>

          {/* Bottom Glowing Gradient Progress Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-amber-200 via-orange-500 to-indigo-400 shadow-[0_0_15px_#aea8fe]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
