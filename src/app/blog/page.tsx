'use client';

// src/app/blog/page.tsx
// Reskinned to match the "Career Accelerator" design system.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Rss, Bell } from 'lucide-react';

// ─── Design tokens ─────────────────────────────────────────────────────────────
// paper #F5F5F2 · ink #14141A · lime #C6FF3D · coral #FF3D57 · azure #3D5AFF · gold #FFB800

function useAcceleratorFonts() {
  useEffect(() => {
    const id = 'accelerator-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);
}

const DISPLAY = "'Archivo Black', sans-serif";
const MONO    = "'Space Grotesk', sans-serif";

// ── When you have real posts, replace this with your fetch logic ──
// type Post = { id: string; title: string; excerpt: string; date: string; tag: string; readTime: string; }
// const posts: Post[] = [];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  useAcceleratorFonts();

  useEffect(() => {
    // Replace with real data fetch — remove timeout
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#14141A] text-white border-b-2 border-[#14141A]">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-20 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>
              <Rss className="w-3.5 h-3.5" />
              XourceBase Blog
            </div>
            <h1 className="text-4xl md:text-5xl mb-4 leading-[0.98]" style={{ fontFamily: DISPLAY }}>
              INSIGHTS, TIPS<br />&amp; <span className="bg-[#FF3D57] px-2">STORIES</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              Career advice, cloud tutorials, and behind-the-scenes updates from the XourceBase team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14">
        {loading ? (
          /* ── Skeleton grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-[#14141A] overflow-hidden"
              >
                <div className="h-44 bg-[#F5F5F2] border-b-2 border-[#14141A] animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-[#F5F5F2] w-1/4 animate-pulse" />
                  <div className="h-5 bg-[#F5F5F2] w-3/4 animate-pulse" />
                  <div className="h-3 bg-[#F5F5F2] w-full animate-pulse" />
                  <div className="h-3 bg-[#F5F5F2] w-5/6 animate-pulse" />
                  <div className="pt-2 h-3 bg-[#F5F5F2] w-1/3 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto text-center py-24"
          >
            <div className="w-20 h-20 border-2 border-[#14141A]/20 flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-9 h-9 text-[#14141A]/40" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#14141A] mb-3" style={{ fontFamily: DISPLAY }}>NO POSTS YET</h2>
            <p className="text-[#14141A]/60 text-sm leading-relaxed mb-8">
              We're working on some great content — career tips, cloud tutorials, and team stories. Check back soon!
            </p>

            {/* Notify me strip */}
            <div className="bg-white border-2 border-[#14141A] p-6">
              <div className="flex items-center gap-2 justify-center mb-3">
                <Bell className="w-4 h-4 text-[#FF3D57]" />
                <p className="text-sm font-bold text-[#14141A]">Get notified when we publish</p>
              </div>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-[#F5F5F2] border-2 border-[#14141A] border-r-0 text-sm text-[#14141A] placeholder-[#14141A]/30 focus:outline-none focus:bg-white transition"
                />
                <button
                  type="button"
                  className="flex-shrink-0 bg-[#14141A] hover:bg-black text-white font-bold px-5 py-2.5 text-sm tracking-wide transition-all active:scale-95"
                  style={{ fontFamily: MONO }}
                >
                  NOTIFY ME
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}