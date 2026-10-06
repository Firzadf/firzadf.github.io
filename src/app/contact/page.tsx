'use client';

import React, { useState } from 'react';
import { ProjectProvider, useProjects } from '@/context/ProjectContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CosmicCursor } from '@/components/CosmicCursor';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Mail, MessageSquare, Send, CheckCircle, ArrowUpRight, Sparkles } from 'lucide-react';

function ContactContent() {
  const { personalInfo } = useProjects();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0D10] text-white selection:bg-[#AEA8FE] selection:text-[#0B0D10] overflow-x-hidden">
      <CosmicBackground />
      <CosmicCursor />
      <Header />
      <main className="relative z-10 pt-28 pb-20">
        <PageTransition>
          <div className="px-5 pt-12 pb-16 md:px-10 max-w-[89.5rem] mx-auto">
            {/* Header Section */}
            <div className="mb-16 border-b border-white/10 pb-12">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block font-mono">
                // Get In Touch
              </span>
              <h1 className="font-serif text-[clamp(44px,6.5vw,84px)] font-light leading-[1.03] tracking-tight text-white mb-6">
                Let&apos;s shape digital solutions<br />
                <span className="font-serif italic text-gradient">together.</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl leading-relaxed font-sans">
                Available for full-time Software Engineer positions, web application development, and technical consulting.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Direct Links & Profile Card */}
              <div className="lg:col-span-5 space-y-8">
                {/* Contact Channels Card */}
                <div className="p-8 rounded-3xl border border-white/10 bg-[#13161c]/80 backdrop-blur-xl space-y-6">
                  <h2 className="font-serif text-2xl font-light text-white border-b border-white/10 pb-4">
                    Contact Channels
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-400 block font-mono mb-1">
                        WhatsApp (Direct Chat)
                      </span>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${personalInfo.whatsapp}&text=Hello%20Firza!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg text-emerald-400 font-medium hover:underline"
                        data-cursor="pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        +{personalInfo.whatsapp}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-400 block font-mono mb-1">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex items-center gap-2 text-lg text-purple-300 font-medium hover:underline"
                        data-cursor="pointer"
                      >
                        <Mail className="w-4 h-4" />
                        {personalInfo.email}
                      </a>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-400 block font-mono mb-1">
                        Location
                      </span>
                      <span className="text-base text-white font-sans">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Photo Banner Card (contact-profile.jpg) */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#13161c] group shadow-2xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/images/contact-profile.jpg"
                      alt="Firza Duta Fauzan Outdoor Profile"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>// READY FOR NEW COLLABORATIONS</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      Based in Bogor, Indonesia. Open for remote contracts, relocation, and innovative full-stack projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Message Form */}
              <div className="lg:col-span-7">
                <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-[#13161c]/80 backdrop-blur-xl">
                  <h2 className="font-serif text-2xl font-light text-white mb-6 border-b border-white/10 pb-4">
                    Send a Direct Message
                  </h2>

                  {submitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                      <CheckCircle className="w-10 h-10 mx-auto text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">Message Sent Successfully!</h3>
                      <p className="text-sm text-gray-300 font-sans">
                        Thank you for reaching out. Firza will respond to your message shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-mono font-semibold mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-mono font-semibold mb-2">
                          Your Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@company.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-mono font-semibold mb-2">
                          Message / Inquiry *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell me about your project, software engineering opportunity, or technical inquiry..."
                          className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-300 transition-all duration-300 shadow-lg"
                        data-cursor="pointer"
                      >
                        <Send className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <ProjectProvider>
      <LoadingScreen />
      <ContactContent />
    </ProjectProvider>
  );
}
