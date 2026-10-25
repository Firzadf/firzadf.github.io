'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useProjects, whatsappLink, prettyUrl } from '@/context/ProjectContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personalInfo } = useProjects();
  const pathname = usePathname();

  const navLinks = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About & Skills' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] px-5 py-4 transition-all duration-300 md:px-10 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[#0B0D10]/80 before:backdrop-blur-xl before:border-b before:border-white/10">
      <div className="relative mx-auto flex max-w-[89.5rem] items-center justify-between">
        {/* Brand Name & Subtitle */}
        <div className="flex items-baseline gap-4 text-[15px] whitespace-nowrap">
          <Link
            href="/"
            className="text-[#FFFFFF] font-medium tracking-tight transition-opacity hover:opacity-80 font-sans"
            data-cursor="pointer"
          >
            {personalInfo.name}
          </Link>
          <span className="hidden text-[var(--color-text-muted)] text-sm md:inline border-l border-white/10 pl-4">
            {personalInfo.title}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-[15px] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 transition-colors ${
                  isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute inset-x-0 -bottom-px h-px bg-current transition-transform duration-300 ease-out ${
                    isActive ? 'scale-x-100 bg-purple-400' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}

          {/* Get in Touch CTA */}
          <a
            href={whatsappLink(personalInfo.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1 rounded-full border border-white bg-white px-4 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-200 hover:bg-transparent hover:text-white active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            data-cursor="pointer"
          >
            Get in touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-transform active:scale-90 md:hidden"
          data-cursor="pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[65px] z-40 bg-[#0B0D10]/98 backdrop-blur-2xl px-6 py-10 flex flex-col justify-between md:hidden border-t border-white/10"
          >
            <nav className="flex flex-col gap-6">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl font-light text-white hover:text-purple-300"
              >
                Home
              </Link>
              <Link
                href="/work"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl font-light text-white hover:text-purple-300"
              >
                Work Showcase
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl font-light text-white hover:text-purple-300"
              >
                About &amp; Skills
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl font-light text-white hover:text-purple-300"
              >
                Contact
              </Link>
            </nav>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <a href={`mailto:${personalInfo.email}`} className="text-xl font-serif text-gradient">
                {personalInfo.email}
              </a>
              <a
                href={whatsappLink(personalInfo.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white bg-white px-6 text-sm font-semibold uppercase tracking-wider text-black"
              >
                Hire me on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
