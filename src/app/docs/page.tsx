'use client';

// src/app/docs/page.tsx
// Documentation page — linked from the "Browse Docs" card on /help-support.
// Matches the "Career Accelerator" design system.

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BookOpen, Search, Rocket, GraduationCap, CreditCard, User,
  Wrench, ShieldCheck, ArrowRight, ChevronRight, LifeBuoy, FileText,
} from 'lucide-react';

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' as const },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Article {
  title: string;
  desc: string;
}

interface DocCategory {
  id: string;
  label: string;
  icon: typeof Rocket;
  accentBg: string;
  articles: Article[];
}

const CATEGORIES: DocCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: Rocket,
    accentBg: '#C6FF3D',
    articles: [
      { title: 'Creating your XourceBase account', desc: 'Sign up, verify your email, and set up your learner profile.' },
      { title: 'Navigating the dashboard', desc: 'A quick tour of workshops, trainings, and your progress tracker.' },
      { title: 'Joining your first live workshop', desc: 'Step-by-step: from registration to the Zoom joining link.' },
    ],
  },
  {
    id: 'workshops-trainings',
    label: 'Workshops & Trainings',
    icon: GraduationCap,
    accentBg: '#3D5AFF',
    articles: [
      { title: 'How workshop registration works', desc: 'What happens after you click Register — email, calendar invite, and pre-reads.' },
      { title: 'Accessing session recordings', desc: 'Where to find recordings and how long you have access.' },
      { title: 'Understanding training program cohorts', desc: 'Batch schedules, mentorship sessions, and capstone projects explained.' },
      { title: 'Certificates of participation', desc: 'How and when certificates are issued after a workshop or program.' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing & Payments',
    icon: CreditCard,
    accentBg: '#FFB800',
    articles: [
      { title: 'Accepted payment methods', desc: 'Cards, UPI, net banking, and wallets via Razorpay.' },
      { title: 'Applying a coupon code', desc: 'Where to enter discount codes at checkout.' },
      { title: 'Requesting an invoice', desc: 'Invoices are auto-generated — here is where to find them.' },
      { title: 'Refund policy', desc: 'Our 7-day, no-questions-asked refund process explained.' },
    ],
  },
  {
    id: 'account',
    label: 'Account & Profile',
    icon: User,
    accentBg: '#FF3D57',
    articles: [
      { title: 'Updating your profile details', desc: 'Change your name, photo, role, and experience level.' },
      { title: 'Managing email notifications', desc: 'Control what updates you receive and how often.' },
      { title: 'Deleting your account', desc: 'What happens to your data and progress if you delete your account.' },
    ],
  },
  {
    id: 'technical',
    label: 'Technical Issues',
    icon: Wrench,
    accentBg: '#3D5AFF',
    articles: [
      { title: "Can't join a live session", desc: 'Common Zoom/browser fixes for joining issues.' },
      { title: 'Video or audio not working', desc: 'Troubleshooting steps for playback and recording issues.' },
      { title: 'Payment failed but amount deducted', desc: 'What to do if your payment status looks stuck.' },
    ],
  },
  {
    id: 'policies',
    label: 'Policies & Privacy',
    icon: ShieldCheck,
    accentBg: '#C6FF3D',
    articles: [
      { title: 'Privacy Policy overview', desc: 'A plain-language summary of how we handle your data.' },
      { title: 'Terms & Conditions overview', desc: 'Key points from our terms, explained simply.' },
      { title: 'Data retention & deletion', desc: 'How long we keep your information and how to request removal.' },
    ],
  },
];

const POPULAR = [
  'How do I join a workshop?',
  'What payment methods do you accept?',
  'Will I get a certificate?',
  "Can't join a live session",
  'Requesting a refund',
];

export default function DocsPage() {
  useAcceleratorFonts();

  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.articles.length > 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#14141A] text-white border-b-2 border-[#14141A]">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-16 lg:py-20 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>
              <BookOpen className="w-3.5 h-3.5" />
              Documentation
            </div>
            <h1 className="text-4xl sm:text-5xl leading-[1.05] mb-4" style={{ fontFamily: DISPLAY }}>
              HOW CAN WE<br />
              <span className="bg-[#3D5AFF] px-2">HELP YOU BUILD?</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8">
              Guides, how-tos, and answers for everything on XourceBase — workshops, trainings, billing, and your account.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search documentation…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-[#14141A] text-sm text-[#14141A] placeholder-[#14141A]/30 focus:outline-none transition"
              />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {POPULAR.map((q) => (
                <button
                  key={q}
                  onClick={() => setSearch(q)}
                  className="text-[11px] font-semibold text-white/70 bg-white/5 border border-white/15 px-3 py-1.5 hover:border-white/40 hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20">

        {search && filteredCategories.length === 0 ? (
          <div className="text-center py-20 text-[#14141A]/40">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No results for &quot;{search}&quot;</p>
            <button onClick={() => setSearch('')} className="mt-3 text-[#14141A] text-sm font-bold hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(search ? filteredCategories : CATEGORIES).map((cat, i) => (
              <motion.div
                key={cat.id}
                id={cat.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                className="relative bg-white border-2 border-[#14141A] p-6 sm:p-7 overflow-hidden scroll-mt-24"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: cat.accentBg }} />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 border-2 border-[#14141A] flex items-center justify-center flex-shrink-0" style={{ background: cat.accentBg }}>
                    <cat.icon className="w-5 h-5 text-[#14141A]" />
                  </div>
                  <h2 className="text-lg font-extrabold text-[#14141A]" style={{ fontFamily: MONO }}>{cat.label.toUpperCase()}</h2>
                </div>

                <ul className="space-y-1">
                  {cat.articles.map((article) => (
                    <li key={article.title}>
                      <button
                        type="button"
                        className="group w-full flex items-center justify-between gap-3 text-left px-3 py-3 hover:bg-[#F5F5F2] transition-colors border-b border-[#14141A]/8 last:border-b-0"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-[#14141A] group-hover:underline">{article.title}</span>
                          <span className="block text-xs text-[#14141A]/50 mt-0.5">{article.desc}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#14141A]/30 group-hover:text-[#14141A] flex-shrink-0 transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Still need help CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="relative bg-[#14141A] p-8 sm:p-12 text-center overflow-hidden border-2 border-[#14141A] mt-14"
        >
          <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-white/10 hidden md:block" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-white/10 hidden md:block" />
          <div className="relative z-10">
            <FileText className="w-7 h-7 text-[#C6FF3D] mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: DISPLAY }}>CAN&apos;T FIND WHAT YOU NEED?</h3>
            <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto">
              Our support team replies within 24 business hours — happy to help with anything not covered here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold px-7 py-3.5 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
                style={{ fontFamily: MONO }}
              >
                <LifeBuoy className="w-4 h-4" />
                CONTACT SUPPORT
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/help-support"
                className="inline-flex items-center gap-2 bg-white/5 border-2 border-white/30 text-white font-bold px-7 py-3.5 text-sm tracking-wide hover:bg-white/10 active:scale-[0.97] transition-all"
                style={{ fontFamily: MONO }}
              >
                BACK TO HELP & SUPPORT
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}