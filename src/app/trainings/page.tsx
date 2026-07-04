'use client';

// src/app/trainings/page.tsx
// Redesign concept: "Career Accelerator" — bold, color-blocked, momentum-driven.

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Clock, ArrowRight, ArrowUpRight, CheckCircle2,
  BookOpen, Filter, Search, Tag, Bell, CheckCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Level    = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type Category = 'All' | 'Cloud & DevOps' | 'Communication' | 'Data' | 'Programming';

interface Training {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<Category, 'All'>;
  level: Exclude<Level, 'All'>;
  durationWeeks: number;
  tag: string;
  opensOn: string;
  description: string;
  topics: string[];
  outcomes: string[];
}

// ─── Design tokens ─────────────────────────────────────────────────────────────
// paper #F5F5F2 · ink #14141A · lime #C6FF3D · coral #FF3D57 · azure #3D5AFF · gold #FFB800

const TRACK_STYLE: Record<Exclude<Category, 'All'>, { bg: string; text: string; border: string }> = {
  'Cloud & DevOps': { bg: '#C6FF3D', text: '#14141A', border: '#14141A' },
  'Communication':  { bg: '#FF3D57', text: '#FFFFFF', border: '#14141A' },
  'Data':           { bg: '#3D5AFF', text: '#FFFFFF', border: '#14141A' },
  'Programming':    { bg: '#FFB800', text: '#14141A', border: '#14141A' },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// All programs are currently coming soon — none are open for enrolment yet.

const trainings: Training[] = [
  {
    id: 1,
    title: 'Cloud & DevOps Career Accelerator',
    subtitle: 'AWS · Azure · Kubernetes · Terraform · CI/CD',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    durationWeeks: 12,
    tag: 'Bestseller',
    opensOn: 'August 2025',
    description:
      'A comprehensive cohort program covering AWS, Azure, Kubernetes, Terraform, and CI/CD pipelines. Real-world capstone project, placement assistance, and 1:1 mentorship included.',
    topics: ['AWS / Azure', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Docker', 'Monitoring & Logging', 'Linux', 'Networking'],
    outcomes: [
      'Deploy production-grade cloud infrastructure',
      'Build CI/CD pipelines from scratch',
      'Clear AWS Solutions Architect / Azure Administrator certifications',
      'Get placement-ready with resume & mock interviews',
    ],
  },
  {
    id: 2,
    title: 'BPO & Communication Excellence',
    subtitle: 'Voice · Non-Voice · Soft Skills · Interview Prep',
    category: 'Communication',
    level: 'Beginner',
    durationWeeks: 6,
    tag: 'New Batch',
    opensOn: 'August 2025',
    description:
      'Launch your BPO or communication career with expert voice training, email etiquette, personality development, and live mock interviews. Perfect for freshers and career switchers.',
    topics: ['Voice & Accent', 'Email Etiquette', 'STAR Method', 'Personality Development', 'Soft Skills', 'Mock Interviews'],
    outcomes: [
      'Communicate confidently in professional environments',
      'Clear international BPO interviews',
      'Build a strong personal brand',
      'Master customer handling and conflict resolution',
    ],
  },
  {
    id: 3,
    title: 'Data Engineering Foundations',
    subtitle: 'Python · SQL · Spark · AWS Redshift · ETL',
    category: 'Data',
    level: 'Intermediate',
    durationWeeks: 8,
    tag: 'Upcoming',
    opensOn: 'September 2025',
    description:
      'Master the data pipeline stack — Python, SQL, Apache Spark, and AWS Redshift. Build a portfolio-ready ETL project and learn to work with large-scale distributed datasets.',
    topics: ['Python', 'SQL', 'Apache Spark', 'AWS Redshift', 'ETL Pipelines', 'Airflow', 'Data Modeling'],
    outcomes: [
      'Build end-to-end ETL pipelines',
      'Work with real-world big data sets',
      'Deploy data solutions on AWS',
      'Portfolio-ready capstone project',
    ],
  },
  {
    id: 4,
    title: 'Python for Professionals',
    subtitle: 'Core Python · OOP · Automation · APIs · Projects',
    category: 'Programming',
    level: 'Beginner',
    durationWeeks: 6,
    tag: 'Popular',
    opensOn: 'August 2025',
    description:
      'Go from zero to job-ready Python developer. Covers core Python, OOP, REST APIs, automation scripts, and 3 hands-on projects. Great foundation for DevOps and Data paths.',
    topics: ['Core Python', 'OOP', 'File Handling', 'REST APIs', 'Automation', 'Git & GitHub', 'Project Portfolio'],
    outcomes: [
      'Write clean, production-grade Python code',
      'Automate repetitive tasks',
      'Build and consume REST APIs',
      'Contribute to open-source or freelance projects',
    ],
  },
  {
    id: 5,
    title: 'AWS Solutions Architect – Certification Track',
    subtitle: 'SAA-C03 Exam Prep · Practice Tests · Labs',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    durationWeeks: 5,
    tag: 'Certification',
    opensOn: 'September 2025',
    description:
      'A focused exam-prep track for the AWS Solutions Architect Associate (SAA-C03). Includes video lectures, 500+ practice questions, hands-on labs, and a strategy session with a certified mentor.',
    topics: ['IAM', 'EC2 & ECS', 'S3 & Storage', 'RDS & DynamoDB', 'CloudFront & Route 53', 'VPC & Security', 'Well-Architected Framework'],
    outcomes: [
      'Clear AWS SAA-C03 on first attempt',
      'Design resilient, cost-effective architectures',
      'Access 500+ curated practice questions',
      '1-on-1 exam strategy session',
    ],
  },
  {
    id: 6,
    title: 'Leadership & Corporate Communication',
    subtitle: 'Executive Presence · Negotiation · Presentation Skills',
    category: 'Communication',
    level: 'Intermediate',
    durationWeeks: 4,
    tag: 'New',
    opensOn: 'October 2025',
    description:
      'Designed for working professionals aiming at managerial roles. Build executive presence, negotiation skills, and persuasive presentation techniques used in boardrooms.',
    topics: ['Executive Presence', 'Negotiation Tactics', 'Storytelling', 'Public Speaking', 'Email & Proposal Writing', 'Conflict Resolution'],
    outcomes: [
      'Command attention in meetings and presentations',
      'Negotiate effectively with stakeholders',
      'Write crisp, impactful business communication',
      'Build a personal leadership brand',
    ],
  },
];

const CATEGORIES: Category[] = ['All', 'Cloud & DevOps', 'Communication', 'Data', 'Programming'];
const LEVELS: Level[]         = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const STAGES = ['ENROLL', 'SPRINT', 'BUILD', 'LAUNCH'];

// ─── Animation ─────────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

// ─── Fonts (self-contained — injects the three families this design relies on) ─

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

// ─── Sprint Track (hero signature element) ─────────────────────────────────────

function SprintTrack() {
  return (
    <div className="relative py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-black/10 rounded-full" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: 'easeInOut' as const, delay: 0.2 }}
          style={{ originX: 0 }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#14141A] rounded-full"
        />
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-[#14141A] ${i === 0 ? 'bg-[#C6FF3D]' : 'bg-[#F5F5F2]'}`}
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#14141A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stage}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LevelTag({ level }: { level: string }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-bold tracking-wide px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {level}
    </span>
  );
}

// ── NotifyModal ────────────────────────────────────────────────────────────────

function NotifyModal({ training, onClose }: { training: Training; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const accent = TRACK_STYLE[training.category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST /api/notify { email, trainingId: training.id }
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F5F5F2] border-2 border-[#14141A] p-8 w-full max-w-md"
      >
        {!submitted ? (
          <>
            <div className="h-2 w-14 mb-6" style={{ background: accent.bg }} />
            <div className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mb-4">
              <Bell className="w-5 h-5 text-[#14141A]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#14141A] mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              GET NOTIFIED
            </h3>
            <p className="text-sm text-[#14141A]/80 mb-1 font-semibold">{training.title}</p>
            <p className="text-xs text-[#14141A]/50 mb-5">
              Enrolment opens in <span className="font-bold text-[#14141A]">{training.opensOn}</span>. We'll email you the moment seats open.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#14141A]/20 text-sm bg-white focus:border-[#14141A] outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#14141A] hover:bg-black text-white text-sm font-bold tracking-wide transition-colors"
              >
                NOTIFY ME WHEN OPEN
              </button>
              <button type="button" onClick={onClose}
                className="w-full py-2 text-xs text-[#14141A]/50 hover:text-[#14141A] transition-colors">
                Cancel
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 border-2 border-[#14141A] mx-auto mb-4 flex items-center justify-center" style={{ background: '#C6FF3D' }}>
              <CheckCircle className="w-7 h-7 text-[#14141A]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#14141A] mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              YOU'RE ON THE LIST
            </h3>
            <p className="text-sm text-[#14141A]/60 mb-5">
              We'll notify <span className="font-semibold text-[#14141A]">{email}</span> when enrolment opens for this program.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#14141A] text-white text-sm font-bold hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── TrainingCard — "mission brief" ticket ──────────────────────────────────────

function TrainingCard({ t }: { t: Training }) {
  const [expanded, setExpanded]     = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const accent = TRACK_STYLE[t.category];

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white border-2 border-[#14141A] flex flex-col overflow-hidden"
      >
        {/* Category color edge */}
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: accent.bg }} />

        {/* Diagonal "Coming Soon" ribbon */}
        <div
          className="absolute -right-11 top-4 w-40 py-1 text-center text-[10px] font-bold tracking-widest text-white rotate-45 select-none"
          style={{ background: '#14141A', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          COMING SOON
        </div>

        <div className="pl-8 pr-7 pt-7 pb-6 flex flex-col flex-1">

          {/* Top row: tag + level, and scoreboard weeks */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 bg-[#14141A] text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Tag className="w-3 h-3" />
                {t.tag}
              </span>
              <LevelTag level={t.level} />
            </div>

            <div className="flex flex-col items-center leading-none flex-shrink-0 pr-6">
              <span className="text-3xl font-bold text-[#14141A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {String(t.durationWeeks).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#14141A]/50">WEEKS</span>
            </div>
          </div>

          {/* Category label */}
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: accent.bg === '#FFFFFF' ? '#14141A' : accent.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.category}
          </p>

          {/* Title + subtitle */}
          <h3 className="text-xl font-extrabold text-[#14141A] mb-1 leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {t.title.toUpperCase()}
          </h3>
          <p className="text-xs text-[#14141A]/50 mb-4 font-medium">{t.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-[#14141A]/70 leading-relaxed mb-5">{t.description}</p>

          {/* Topics chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {t.topics.slice(0, 5).map((topic) => (
              <span key={topic} className="text-[11px] bg-[#F5F5F2] border border-[#14141A]/15 text-[#14141A]/70 px-2 py-1 font-medium">
                {topic}
              </span>
            ))}
            {t.topics.length > 5 && (
              <span className="text-[11px] text-[#14141A]/40 px-2 py-1 font-medium">
                +{t.topics.length - 5} more
              </span>
            )}
          </div>

          {/* Expandable outcomes */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                key={`outcomes-${t.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 mb-5 overflow-hidden"
              >
                {t.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-[#14141A]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#14141A] flex-shrink-0 mt-0.5" />
                    {o}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-xs font-bold tracking-wide mb-5 text-left hover:underline flex items-center gap-1"
            style={{ color: '#14141A', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {expanded ? '− HIDE OUTCOMES' : '+ WHAT YOU\'LL LEARN'}
          </button>

          {/* Meta row */}
          <div className="flex items-center gap-1.5 text-xs text-[#14141A]/50 mb-6 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Opens {t.opensOn}</span>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setShowNotify(true)}
            className="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold tracking-wide text-white bg-[#14141A] hover:bg-black transition-colors group/btn"
          >
            NOTIFY ME
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showNotify && (
          <NotifyModal training={t} onClose={() => setShowNotify(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainingsPage() {
  useAcceleratorFonts();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [level,    setLevel]    = useState<Level>('All');

  const filtered = trainings.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch   = t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    const matchCategory = category === 'All' || t.category === category;
    const matchLevel    = level    === 'All' || t.level    === level;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#F5F5F2] pt-20 pb-14 lg:pt-28 lg:pb-20 px-6">
        {/* Scattered corner marks for texture, not decoration-for-its-own-sake — echoes a track/field marking */}
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#14141A]/15 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#14141A]/15 hidden md:block" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Structured Programs
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] text-[#14141A] mb-6 max-w-4xl"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              BUILT FOR<br />
              REAL <span className="text-[#14141A] bg-[#C6FF3D] px-2">CAREERS</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/60 mb-10 max-w-xl">
              Multi-week cohort sprints with 1:1 mentorship, capstone projects, and placement support — for students, freshers, and working professionals ready to move.
            </motion.p>

            {/* Sprint track */}
            <motion.div variants={fadeInUp} className="max-w-xl mb-10">
              <SprintTrack />
            </motion.div>

            {/* Scoreboard stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 max-w-xl border-2 border-[#14141A] divide-x-2 divide-[#14141A]">
              {[
                { value: String(trainings.length).padStart(2, '0'), label: 'PROGRAMS' },
                { value: '4', label: 'TRACKS' },
                { value: '100%', label: 'PLACEMENT SUPPORT' },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[#14141A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#14141A]/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky filter bar ── */}
      <section className="sticky top-0 z-30 bg-[#F5F5F2] border-y-2 border-[#14141A] py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-wrap">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40" />
              <input
                type="text"
                placeholder="Search programs or topics…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-[#14141A] placeholder-[#14141A]/40 border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] bg-white transition-colors"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#14141A]/40 flex-shrink-0" />
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`text-xs font-bold tracking-wide px-3 py-1.5 border-2 border-[#14141A] transition-colors duration-150 ${
                    category === c ? 'bg-[#14141A] text-white' : 'bg-white text-[#14141A] hover:bg-[#14141A]/5'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Level */}
            <div className="flex items-center gap-2 flex-wrap">
              {LEVELS.map((l) => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`text-xs font-bold tracking-wide px-3 py-1.5 border-2 transition-colors duration-150 ${
                    level === l ? 'bg-[#FF3D57] text-white border-[#14141A]' : 'bg-white text-[#14141A] border-[#14141A]/20 hover:border-[#14141A]'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section className="py-16 px-6 bg-[#F5F5F2] min-h-[60vh]">
        <div className="container mx-auto max-w-6xl">

          <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-[#14141A]/60">
              Showing <span className="font-bold text-[#14141A]">{filtered.length}</span> of {trainings.length} programs
            </p>
            <p className="text-xs text-[#14141A] font-bold flex items-center gap-1.5 tracking-wide">
              <Bell className="w-3.5 h-3.5" />
              ALL PROGRAMS OPENING SOON
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[#14141A]/40">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No programs match your filters.</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
                className="mt-4 text-[#14141A] text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${search}-${category}-${level}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
            >
              {filtered.map((t) => (
                <TrainingCard key={t.id} t={t} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 bg-[#14141A] text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl mb-5" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              NOT SURE WHICH<br />PROGRAM TO CHOOSE?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/60 mb-9 max-w-lg mx-auto">
              Book a free 1:1 career guidance call with our mentors and get a personalised learning roadmap.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all">
                BOOK FREE COUNSELLING
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/workshops"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-white hover:bg-white/10 transition-all">
                EXPLORE WORKSHOPS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}