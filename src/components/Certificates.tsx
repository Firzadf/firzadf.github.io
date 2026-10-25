'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import data from '@/content/certificates.json';

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
}

const certificates = ((data as { certificates: Certificate[] }).certificates || []).filter((c) => c && c.title);

/** Hidden automatically until at least one certificate is added through /admin. */
export const Certificates: React.FC = () => {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="px-5 py-16 md:px-10 md:py-24 max-w-[89.5rem] mx-auto">
      <div className="mb-12 border-b border-white/10 pb-8 flex items-end justify-between gap-6">
        <div>
          <span className="label-mono block mb-3">// CERTIFICATES &amp; AWARDS</span>
          <h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-light leading-[1.05] tracking-[-0.03em] text-white">
            Certificates
          </h2>
        </div>
        <span className="font-mono text-xs text-gray-500">{certificates.length} total</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((c, i) => {
          const Wrapper: React.ElementType = c.credentialUrl ? 'a' : 'div';
          return (
            <motion.div
              key={`${c.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05 }}
            >
              <Wrapper
                {...(c.credentialUrl ? { href: c.credentialUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#13161c]/80 transition-colors hover:border-purple-500/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1b1446] to-[#0b0d10]">
                  {c.image ? (
                    <img src={c.image} alt={`${c.title} certificate`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Award className="h-10 w-10 text-violet-300/70" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-light leading-snug text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{c.issuer}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] text-gray-500">
                    <span>{c.date}</span>
                    {c.credentialUrl && (
                      <span className="inline-flex items-center gap-1 text-violet-300">
                        Verify <ExternalLink className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
