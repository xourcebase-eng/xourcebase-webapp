'use client';

// src/app/workshops/introduction-to-git-and-github/page.tsx
// Reskinned to match the "Career Accelerator" design system (trainings/page.tsx, homepage page.tsx).
//
// Mobile-hardening pass (this file already avoided the main vw+overflow-hidden
// clipping bug found on other pages — headline already used fixed breakpoint
// sizes). Remaining small fixes:
// - Section padding standardized to px-4 sm:px-6 (was flat px-6) so content
//   doesn't sit flush against the edge on narrow phones.
// - Meta stat grid (DATE/TIME/DURATION/PRICE) given tighter mobile padding
//   and smaller mobile text so values don't awkwardly wrap in a small box.
// - Countdown strip in the modal now allows wrapping instead of squeezing
//   "SEATS CONFIRM ON A FIRST-COME BASIS" + timer into one tight row.
// - Modal's Role/Experience row stacks on the smallest screens instead of
//   staying 2-column at every width.

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, Award, ArrowLeft,
  Zap, Video, FileText, MessageCircle, Star,
  GitCommit, GitPullRequest,
} from 'lucide-react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';
import WorkshopRegistrationModal from '@/components/WorkshopRegistrationModal';

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

// ─── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Terminal demo (signature hero element) ──────────────────────────────────
// Types out a short, realistic git session, one keystroke at a time, then loops.
// Kept as a hard-edged onyx "mission console" rather than a soft glassy terminal.

const TERMINAL_LINES: { prompt: string; output?: string }[] = [
  { prompt: 'git init', output: 'Initialized empty Git repository in ~/project/.git/' },
  { prompt: 'git add .' },
  { prompt: 'git commit -m "first commit"', output: '[main a1b2c3d] first commit — 4 files changed' },
  { prompt: 'git checkout -b feature/navbar', output: "Switched to a new branch 'feature/navbar'" },
  { prompt: 'git push origin feature/navbar', output: 'Branch published — open a pull request →' },
];

function TerminalDemo() {
  const [lineIdx, setLineIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [done, setDone]           = useState<{ prompt: string; output?: string }[]>([]);

  useEffect(() => {
    const current = TERMINAL_LINES[lineIdx];

    if (charIdx < current.prompt.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 38);
      return () => clearTimeout(t);
    }
    if (!showOutput && current.output) {
      const t = setTimeout(() => setShowOutput(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, current]);
      if (lineIdx + 1 < TERMINAL_LINES.length) {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setShowOutput(false);
      } else {
        setTimeout(() => { setDone([]); setLineIdx(0); setCharIdx(0); setShowOutput(false); }, 1600);
      }
    }, current.output ? 900 : 500);
    return () => clearTimeout(t);
  }, [charIdx, showOutput, lineIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="bg-[#14141A] border-2 border-[#14141A] overflow-hidden font-mono text-[12px] sm:text-[13px] leading-relaxed">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b-2 border-white/10">
        <span className="w-2.5 h-2.5 bg-[#FF3D57] flex-shrink-0" />
        <span className="w-2.5 h-2.5 bg-[#FFB800] flex-shrink-0" />
        <span className="w-2.5 h-2.5 bg-[#C6FF3D] flex-shrink-0" />
        <span className="ml-3 text-white/40 text-xs truncate" style={{ fontFamily: MONO }}>bash — git-workshop</span>
      </div>
      <div className="p-4 sm:p-5 min-h-[220px] text-white/90 break-words">
        {done.map((l, i) => (
          <div key={i} className="mb-2">
            <p className="break-words"><span className="text-[#C6FF3D]">➜ </span><span className="text-[#3D5AFF]">~/project</span> <span className="text-white/90">git {l.prompt.replace(/^git /, '')}</span></p>
            {l.output && <p className="text-white/40 pl-4 break-words">{l.output}</p>}
          </div>
        ))}
        <p className="break-words">
          <span className="text-[#C6FF3D]">➜ </span>
          <span className="text-[#3D5AFF]">~/project</span>{' '}
          <span className="text-white/90">git {current.prompt.replace(/^git /, '').slice(0, Math.max(0, charIdx))}</span>
          <span className="inline-block w-[7px] h-[15px] bg-[#C6FF3D] align-middle ml-0.5 animate-pulse" />
        </p>
        {showOutput && current.output && (
          <p className="text-white/40 pl-4 mt-1 break-words">{current.output}</p>
        )}
      </div>
    </div>
  );
}

// ─── Branch graph (signature hero element, part two) ─────────────────────────

function BranchGraph() {
  return (
    <svg viewBox="0 0 320 90" className="w-full h-auto">
      <line x1="16" y1="45" x2="304" y2="45" stroke="#3D5AFF" strokeWidth="2.5" />
      <path d="M 90 45 C 130 45, 130 15, 170 15 L 230 15" fill="none" stroke="#C6FF3D" strokeWidth="2.5" />
      <path d="M 230 15 C 250 15, 250 45, 270 45" fill="none" stroke="#C6FF3D" strokeWidth="2.5" strokeDasharray="4 4" />
      {[16, 90, 270, 304].map((x, i) => (
        <circle key={`m-${i}`} cx={x} cy={45} r="5.5" fill="#3D5AFF" stroke="#14141A" strokeWidth="1" />
      ))}
      {[170, 230].map((x, i) => (
        <circle key={`f-${i}`} cx={x} cy={15} r="5.5" fill="#C6FF3D" stroke="#14141A" strokeWidth="1" />
      ))}
      <text x="16" y="68" fill="#14141A" fontSize="10" fontFamily="'Space Grotesk', monospace" fontWeight="700">main</text>
      <text x="170" y="8" fill="#14141A" fontSize="10" fontFamily="'Space Grotesk', monospace" fontWeight="700">feature/navbar</text>
      <text x="250" y="68" fill="#14141A" fontSize="10" fontFamily="'Space Grotesk', monospace" fontWeight="700">merge</text>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntroToGitGithubPage() {
  useAcceleratorFonts();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // ─── Content data ───────────────────────────────────────────────────────────

  const topics = [
    'Why Version Control? Git vs Other VCS Tools',
    'Installing & Configuring Git Locally',
    'Core Commands: init, add, commit, status, log',
    'Branching Strategies & Resolving Merge Conflicts',
    'Working with GitHub: Repos, Remotes & Clones',
    'Pull Requests & the Code Review Workflow',
    '.gitignore, Undoing Mistakes & Best Practices',
    'Live Demo: A Real Team Workflow, End to End',
  ];

  const includes = [
    { icon: <Zap className="w-5 h-5" />,          title: 'Live Interactive Session',       desc: '3 hours of hands-on learning with real repos', accentBg: '#C6FF3D' },
    { icon: <Video className="w-5 h-5" />,         title: 'Session Recording',              desc: 'Lifetime access to the full recording', accentBg: '#FFB800' },
    { icon: <FileText className="w-5 h-5" />,      title: 'Git Command Cheatsheet',         desc: 'A printable reference for everyday use', accentBg: '#FF3D57' },
    { icon: <Award className="w-5 h-5" />,         title: 'Certificate of Participation',   desc: 'LinkedIn-shareable digital certificate', accentBg: '#3D5AFF' },
    { icon: <Users className="w-5 h-5" />,         title: 'Community Access',               desc: 'Join our exclusive Discord community', accentBg: '#C6FF3D' },
    { icon: <MessageCircle className="w-5 h-5" />, title: 'Live Doubt Clearing',            desc: 'Direct Q&A with the instructor', accentBg: '#FFB800' },
  ];

  const faqs: [string, string][] = [
    ['Do I need to know how to code?',        'No. This workshop starts from zero — if you can open a terminal and follow along, you can keep up.'],
    ['Is this workshop beginner-friendly?',   'Yes, it is designed for absolute beginners as well as students and professionals picking up Git for the first time.'],
    ['Will I get a certificate?',             'Yes — every participant receives a Certificate of Participation after the session.'],
    ['Will the recording be available?',      'Yes, the full recording is shared within 24 hours with lifetime access.'],
    ['What do I need to bring?',              'Just a laptop with Git installed (we will walk through setup together) and a free GitHub account.'],
  ];

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Introduction to Git & GitHub for Beginners',
    description: 'A hands-on, beginner-friendly live workshop on version control with Git and collaboration on GitHub — commits, branching, merging, pull requests, and real-world team workflows.',
    provider: { '@type': 'Organization', name: 'XourceBase', sameAs: 'https://xourcebase.com' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      instructor: { '@type': 'Person', name: 'Rahul Sharma' },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xourcebase.com/' },
      { '@type': 'ListItem', position: 2, name: 'Workshops', item: 'https://xourcebase.com/workshops' },
      { '@type': 'ListItem', position: 3, name: 'Introduction to Git & GitHub for Beginners', item: 'https://xourcebase.com/workshops/introduction-to-git-and-github' },
    ],
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#14141A] antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Back ── */}
      <div className="bg-[#F5F5F2] border-b-2 border-[#14141A] px-4 sm:px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#14141A] hover:text-[#14141A]/70 transition-colors group" style={{ fontFamily: MONO }}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
            BACK TO WORKSHOPS
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-[#14141A] text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left: copy */}
            <div>
              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <span className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14141A] animate-pulse flex-shrink-0" />
                  Free Live Workshop
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 break-words" style={{ fontFamily: DISPLAY }}>
                  INTRODUCTION TO<br />
                  <span className="inline-block bg-[#3D5AFF] px-2">GIT &amp; GITHUB</span>
                </h1>
                <p className="text-base sm:text-lg text-white/70 mb-10 max-w-lg break-words">
                  Go from your first <code className="text-[#C6FF3D] font-mono text-sm sm:text-base">git init</code> to opening real pull requests — a hands-on, beginner-friendly session on how teams actually ship code.
                </p>
              </motion.div>

              {/*
                Meta stat grid — tightened for mobile: smaller padding, smaller
                text at the base breakpoint, so "10:00 AM IST" etc. sit on one
                line instead of awkwardly wrapping inside a cramped 2-column box.
              */}
              <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-10">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'DATE',     value: 'OCT 17, 2026' },
                  { icon: <Clock className="w-4 h-4" />,    label: 'TIME',     value: '10:00 AM IST' },
                  { icon: <Users className="w-4 h-4" />,    label: 'DURATION', value: '3 HOURS' },
                  { icon: <Award className="w-4 h-4" />,    label: 'PRICE',    value: 'FREE', highlight: true },
                ].map((m, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-2 sm:gap-3 bg-white/5 px-2.5 sm:px-3 py-2.5 sm:py-3 border-2 border-white/10 min-w-0">
                    <div className="text-[#C6FF3D] flex-shrink-0">{m.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] text-white/50 font-bold tracking-widest truncate" style={{ fontFamily: MONO }}>{m.label}</p>
                      <p className={`text-xs sm:text-sm font-bold truncate ${m.highlight ? 'text-[#C6FF3D]' : 'text-white'}`} style={{ fontFamily: MONO }}>{m.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <button type="button" onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#C6FF3D] text-[#14141A] font-bold text-sm tracking-wide px-8 py-4 hover:brightness-95 active:scale-[0.97] transition-all"
                  style={{ fontFamily: MONO }}>
                  <GitCommit className="w-4 h-4 flex-shrink-0" />
                  RESERVE MY FREE SPOT
                </button>
              </motion.div>
            </div>

            {/* Right: signature — mission console terminal + branch graph */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="space-y-5">
              <TerminalDemo />
              <div className="bg-white border-2 border-[#14141A] px-4 sm:px-5 py-4">
                <p className="text-xs text-[#14141A]/50 font-bold tracking-wide mb-2" style={{ fontFamily: MONO }}>FEATURE BRANCH → MERGED TO MAIN</p>
                <BranchGraph />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>Curriculum</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A] break-words" style={{ fontFamily: DISPLAY }}>WHAT YOU WILL LEARN</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
            {topics.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-white border-2 border-[#14141A]/15 hover:border-[#14141A] p-5 transition-colors">
                <div className="w-9 h-9 flex-shrink-0 bg-[#14141A] text-white flex items-center justify-center font-bold text-xs" style={{ fontFamily: MONO }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[#14141A] font-medium min-w-0 break-words">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Workshop Includes ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-y-2 border-[#14141A]">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>What&apos;s Included</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A] break-words" style={{ fontFamily: DISPLAY }}>EVERYTHING YOU GET — FOR FREE</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="relative bg-[#F5F5F2] p-6 sm:p-7 border-2 border-[#14141A] overflow-hidden transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: item.accentBg }} />
                <div className="w-11 h-11 border-2 border-[#14141A] flex items-center justify-center mb-4" style={{ background: item.accentBg }}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-[#14141A] text-lg mb-1 break-words" style={{ fontFamily: MONO }}>{item.title}</h3>
                <p className="text-[#14141A]/60 text-sm leading-relaxed break-words">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Instructor ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#3D5AFF] text-white px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>Your Guide</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>MEET YOUR INSTRUCTOR</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="relative bg-white border-2 border-[#14141A] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 sm:gap-8 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C6FF3D]" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-2xl sm:text-3xl font-extrabold" style={{ background: '#C6FF3D', fontFamily: MONO }}>
                RS
              </div>
              <div className="min-w-0 text-center md:text-left">
                <h3 className="text-2xl font-extrabold text-[#14141A] mb-1 break-words" style={{ fontFamily: DISPLAY }}>RAHUL SHARMA</h3>
                <p className="text-[#14141A]/70 font-bold text-sm mb-2" style={{ fontFamily: MONO }}>Senior Software Engineer at Infosys</p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4 flex-wrap">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800] flex-shrink-0" />)}
                  <span className="text-sm text-[#14141A]/50 ml-1 font-semibold">4.9 · 600+ students trained</span>
                </div>
                <p className="text-[#14141A]/70 leading-relaxed text-sm break-words">
                  Rahul has spent years reviewing pull requests and mentoring new engineers on real production
                  codebases. He built this session around the mistakes he sees beginners make most often —
                  and how to avoid them from day one.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t-2 border-[#14141A]">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FFB800] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>FAQ</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>FREQUENTLY ASKED QUESTIONS</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="space-y-4">
            {faqs.map(([q, a], i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#F5F5F2] border-2 border-[#14141A]/15 hover:border-[#14141A] p-5 sm:p-7 transition-colors">
                <h4 className="font-extrabold text-[#14141A] text-base mb-2 flex items-start gap-3">
                  <span className="text-[#FF3D57] font-extrabold flex-shrink-0" style={{ fontFamily: MONO }}>Q.</span>
                  <span className="min-w-0 break-words">{q}</span>
                </h4>
                <p className="text-[#14141A]/60 text-sm leading-relaxed pl-6 break-words">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#14141A] text-white text-center relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-white/10 hidden md:block" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>Limited Seats</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4 break-words" style={{ fontFamily: DISPLAY }}>READY TO COMMIT TO LEARNING GIT?</h2>
          <p className="text-white/60 mb-8">Join hundreds of learners who picked up Git &amp; GitHub in a single afternoon.</p>
          <button type="button" onClick={openModal}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#C6FF3D] text-[#14141A] font-bold px-10 py-4 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
            style={{ fontFamily: MONO }}>
            <GitPullRequest className="w-4 h-4 flex-shrink-0" />
            REGISTER FREE FOR THE WORKSHOP
          </button>
        </div>
      </section>


      {/* ── Registration Modal ── */}
      <WorkshopRegistrationModal
        isOpen={modalOpen}
        onClose={closeModal}
        workshop={{
          title: 'Introduction to Git & GitHub for Beginners',
          dateLabel: 'Oct 17, 2026',
          timeLabel: '10:00 AM – 1:00 PM IST',
          durationLabel: '3 Hours',
          host: 'Rahul Sharma',
          isFree: true,
        }}
      />
    </div>
  );
}