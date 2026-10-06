'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CosmicCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = !!target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );
      setIsPointer(clickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Global CSS Override to Hide Default OS Arrow Cursor */}
      <style jsx global>{`
        @media (min-width: 768px) {
          *, html, body, a, button, input, textarea, select, [role="button"], [data-cursor="pointer"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* 1. Primary Outer Cosmic Nebula Light Glow (Highest z-index 9999 to stay ABOVE navbar) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block rounded-full mix-blend-screen opacity-90 blur-xl"
        animate={{
          x: mousePosition.x - (isPointer ? 130 : 90),
          y: mousePosition.y - (isPointer ? 130 : 90),
          width: isPointer ? 260 : 180,
          height: isPointer ? 260 : 180,
          background: isPointer
            ? 'radial-gradient(circle, rgba(255,99,34,0.55) 0%, rgba(174,168,254,0.4) 40%, rgba(139,92,246,0.15) 60%, rgba(0,0,0,0) 80%)'
            : 'radial-gradient(circle, rgba(174,168,254,0.45) 0%, rgba(99,102,241,0.3) 45%, rgba(255,99,34,0.1) 65%, rgba(0,0,0,0) 80%)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 240, mass: 0.1 }}
      />

      {/* 2. Inner Intense Starlight Core Flare (Highest z-index 9999, NO hard border ring!) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_35px_#aea8fe]"
        animate={{
          x: mousePosition.x - (isPointer ? 6 : 4),
          y: mousePosition.y - (isPointer ? 6 : 4),
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          scale: isPointer ? 1.4 : 1,
          backgroundColor: isPointer ? '#FFF' : '#FFFFFF',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.02 }}
      />
    </>
  );
};
