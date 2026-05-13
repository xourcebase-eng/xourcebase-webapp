'use client';

// src/app/blog/page.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Rss, Bell } from 'lucide-react';

// ── When you have real posts, replace this with your fetch logic ──
// type Post = { id: string; title: string; excerpt: string; date: string; tag: string; readTime: string; }
// const posts: Post[] = [];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with real data fetch — remove timeout
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Rss className="w-3.5 h-3.5" />
              XourceBase Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Insights, tips & stories
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
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
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="h-44 bg-gray-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 rounded-full w-1/4 animate-pulse" />
                  <div className="h-5 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded-full w-full animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                  <div className="pt-2 h-3 bg-gray-100 rounded-full w-1/3 animate-pulse" />
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
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-9 h-9 text-gray-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">No posts yet</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We're working on some great content — career tips, cloud tutorials, and team stories. Check back soon!
            </p>

            {/* Notify me strip */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 justify-center mb-3">
                <Bell className="w-4 h-4 text-[#8B0000]" />
                <p className="text-sm font-bold text-gray-900">Get notified when we publish</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition"
                />
                <button
                  type="button"
                  className="flex-shrink-0 bg-[#8B0000] hover:bg-[#700000] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}