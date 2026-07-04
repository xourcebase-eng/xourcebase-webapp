'use client';

// src/app/workshops/page.tsx
// Same "Career Accelerator" visual system as /trainings — bold, color-blocked, hard-edged.
// Signature element here is a live "Session Board" (departure-board style) since workshops
// are single dated events, not multi-week journeys like the trainings' Sprint Track.

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Wifi, MapPin, Tag, ArrowRight, ArrowUpRight,
  Search, Filter, CheckCircle2, BookOpen, Bell, CheckCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'All' | 'Online' | 'Offline' | 'Hybrid';
type WCategory = 'All' | 'Cloud & DevOps' | 'Communication' | 'Data' | 'Programming' | 'Career';
type WorkshopStatus = 'open' | 'coming_soon' | 'full';

interface Workshop {
  id: number;
  title: string;
  host: string;
  hostRole: string;
  date: string;
  time: string;
  duration: string;
  mode: Omit<Mode, 'All'>;
  category: Exclude<WCategory, 'All'>;
  tag: string;
  price: string;
  isFree: boolean;
  status: WorkshopStatus;
  opensOn?: string;
  description: string;
  agenda: string[];
  // If set → clicking CTA goes to this page. If not set → falls back to /contact.
  detailPage?: string;
}

// ─── Design tokens ─────────────────────────────────────────────────────────────
// paper #F5F5F2 · ink #14141A · lime #C6FF3D · coral #FF3D57 · azure #3D5AFF · gold #FFB800 · violet #7C5CFF

const TRACK_STYLE: Record<Exclude<WCategory, 'All'>, { bg: string; text: string }> = {
  'Cloud & DevOps': { bg: '#C6FF3D', text: '#14141A' },
  'Communication':  { bg: '#FF3D57', text: '#FFFFFF' },
  'Data':           { bg: '#3D5AFF', text: '#FFFFFF' },
  'Programming':    { bg: '#FFB800', text: '#14141A' },
  'Career':         { bg: '#7C5CFF', text: '#FFFFFF' },
};

const STATUS_STYLE: Record<WorkshopStatus, { label: string; bg: string; text: string }> = {
  open:         { label: 'OPEN', bg: '#C6FF3D', text: '#14141A' },
  coming_soon:  { label: 'SOON', bg: '#14141A', text: '#FFFFFF' },
  full:         { label: 'FULL', bg: '#FF3D57', text: '#FFFFFF' },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const workshops: Workshop[] = [
  {
    id: 1,
    title: 'Introduction to Git & GitHub for Beginners',
    host: 'Rahul Sharma',
    hostRole: 'Senior Software Engineer at Infosys',
    date: 'May 18, 2025',
    time: '10:00 AM – 1:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Programming',
    tag: 'Free',
    isFree: true,
    price: 'Free',
    status: 'open',
    detailPage: '/workshops/introduction-to-git-and-github',
    description:
      'A beginner-friendly, hands-on introduction to version control with Git and collaboration on GitHub. Covers repos, commits, branching, merging, pull requests, and real-world team workflows.',
    agenda: [
      'Why version control? Git vs other VCS tools',
      'Git basics: init, add, commit, status, log',
      'Branching, merging & resolving conflicts',
      'Working with GitHub: repos, issues, pull requests',
      'Real-world team workflow + Q&A',
    ],
  },
  {
    id: 2,
    title: 'DevOps CI/CD Pipeline — Build to Deploy',
    host: 'Priya Desai',
    hostRole: 'DevOps Lead at TCS',
    date: 'May 24, 2025',
    time: '11:00 AM – 2:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Cloud & DevOps',
    tag: '₹299',
    isFree: false,
    price: '₹299',
    status: 'coming_soon',
    opensOn: 'May 10, 2025',
    description:
      'Hands-on workshop: build a full CI/CD pipeline using GitHub Actions, Docker, and Kubernetes. Participants leave with a working pipeline deployed to AWS EKS.',
    agenda: [
      'CI/CD concepts and pipeline anatomy',
      'GitHub Actions: workflows & triggers',
      'Dockerising a Node.js application',
      'Kubernetes deployment on AWS EKS',
      'Monitoring with Prometheus & Grafana',
    ],
  },
  {
    id: 3,
    title: 'Communication & Interview Masterclass',
    host: 'Anita Rao',
    hostRole: 'Senior HR at Capgemini',
    date: 'June 1, 2025',
    time: '3:00 PM – 5:00 PM IST',
    duration: '2 hrs',
    mode: 'Hybrid',
    category: 'Communication',
    tag: 'Free',
    isFree: true,
    price: 'Free',
    status: 'coming_soon',
    opensOn: 'May 15, 2025',
    description:
      'Master the STAR method, voice modulation, body language, and structured storytelling. Ends with a live mock interview and individual feedback.',
    agenda: [
      'Common interview mistakes (and fixes)',
      'STAR method: story structure that wins',
      'Voice modulation & body language',
      'Live mock interview round',
      'Personalised feedback session',
    ],
  },
  {
    id: 4,
    title: 'Python for Automation — Zero to Script',
    host: 'Vikram Nair',
    hostRole: 'Software Engineer at Google',
    date: 'June 7, 2025',
    time: '10:00 AM – 12:00 PM IST',
    duration: '2 hrs',
    mode: 'Online',
    category: 'Programming',
    tag: '₹199',
    isFree: false,
    price: '₹199',
    status: 'coming_soon',
    opensOn: 'May 25, 2025',
    description:
      'Learn Python basics to intermediate scripting in a single focused session. Automate file operations, web scraping, and basic API calls — all live-coded.',
    agenda: [
      'Python setup and environment',
      'Core syntax: loops, functions, modules',
      'File automation (renaming, sorting, moving)',
      'Web scraping with BeautifulSoup',
      'Calling REST APIs with requests',
    ],
  },
  {
    id: 5,
    title: 'Resume & LinkedIn for Tech Roles',
    host: 'Sneha Kulkarni',
    hostRole: 'Technical Recruiter at Wipro',
    date: 'June 12, 2025',
    time: '6:00 PM – 8:00 PM IST',
    duration: '2 hrs',
    mode: 'Online',
    category: 'Career',
    tag: 'Free',
    isFree: true,
    price: 'Free',
    status: 'coming_soon',
    opensOn: 'May 30, 2025',
    description:
      "A recruiter-led session on crafting ATS-friendly resumes and LinkedIn profiles that get callbacks. Includes live critique of volunteer participants' profiles.",
    agenda: [
      'What recruiters actually look at (3-second rule)',
      "ATS dos and don'ts",
      'Writing measurable bullet points',
      'LinkedIn headline, summary & skills optimization',
      'Live resume critique (volunteers)',
    ],
  },
  {
    id: 6,
    title: 'Data Pipelines on AWS — Hands-On Lab',
    host: 'Arun Mehta',
    hostRole: 'Data Engineer at Amazon',
    date: 'June 20, 2025',
    time: '2:00 PM – 5:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Data',
    tag: '₹499',
    isFree: false,
    price: '₹499',
    status: 'coming_soon',
    opensOn: 'June 5, 2025',
    description:
      'Build a real-time data pipeline on AWS using Kinesis, Lambda, and Redshift. Every participant builds and runs their own pipeline during the session.',
    agenda: [
      'AWS data services overview',
      'Streaming data with Kinesis',
      'Processing with AWS Lambda',
      'Loading into Redshift',
      'Dashboarding with QuickSight',
    ],
  },
  {
    id: 7,
    title: 'Generative AI & Prompt Engineering',
    host: 'Kavya Menon',
    hostRole: 'AI Engineer at Microsoft',
    date: 'July 5, 2025',
    time: '11:00 AM – 2:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Programming',
    tag: '₹399',
    isFree: false,
    price: '₹399',
    status: 'coming_soon',
    opensOn: 'June 20, 2025',
    description:
      'Dive into practical prompt engineering, fine-tuning strategies, and building LLM-powered apps with OpenAI, LangChain, and vector databases.',
    agenda: [
      'LLM fundamentals & model landscape',
      'Prompt engineering patterns',
      'Building with LangChain',
      'Vector databases & RAG',
      'Deploying AI apps to production',
    ],
  },
  {
    id: 8,
    title: 'System Design for Interviews',
    host: 'Rohan Verma',
    hostRole: 'Staff Engineer at Flipkart',
    date: 'July 12, 2025',
    time: '10:00 AM – 1:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Career',
    tag: '₹499',
    isFree: false,
    price: '₹499',
    status: 'coming_soon',
    opensOn: 'June 25, 2025',
    description:
      'Crack system design rounds at top product companies. Covers scalability, load balancing, databases, caching, and live design walkthroughs.',
    agenda: [
      'System design interview framework',
      'Scalability & load balancing patterns',
      'SQL vs NoSQL trade-offs',
      'Caching strategies (Redis, CDN)',
      'Live: design a URL shortener end-to-end',
    ],
  },
];

const MODES: Mode[] = ['All', 'Online', 'Offline', 'Hybrid'];
const WCATEGORIES: WCategory[] = ['All', 'Cloud & DevOps', 'Communication', 'Data', 'Programming', 'Career'];

// ─── Animation ─────────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

// ─── Fonts (self-contained, same family set as /trainings) ────────────────────

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

// ─── Session Board (hero signature element) ───────────────────────────────────
// A departure-board style list of the next few live sessions — fits "live events"
// the way the Sprint Track fits multi-week "journeys" on the trainings page.

function SessionBoard() {
  const upcoming = workshops.slice(0, 4);
  return (
    <div className="border-2 border-[#14141A] bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14141A] text-white">
        <span className="text-[11px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          NEXT SESSIONS
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#C6FF3D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-pulse" />
          LIVE SCHEDULE
        </span>
      </div>
      {upcoming.map((w, i) => {
        const s = STATUS_STYLE[w.status];
        return (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.35 }}
            className={`flex items-center gap-3 px-4 py-3 ${i !== upcoming.length - 1 ? 'border-b border-[#14141A]/10' : ''}`}
          >
            <span className="text-xs font-bold text-[#14141A]/50 w-20 flex-shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {w.date.replace(', 2025', '').toUpperCase()}
            </span>
            <span className="text-sm text-[#14141A] font-semibold truncate flex-1">{w.title}</span>
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-0.5 flex-shrink-0"
              style={{ background: s.bg, color: s.text, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {s.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModeTag({ mode }: { mode: string }) {
  const Icon = mode === 'Online' ? Wifi : MapPin;
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <Icon className="w-3 h-3" />
      {mode}
    </span>
  );
}

// ── Notify Me modal ───────────────────────────────────────────────────────────

function NotifyModal({ workshop, onClose }: { workshop: Workshop; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const accent = TRACK_STYLE[workshop.category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST /api/notify { email, workshopId: workshop.id }
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
            <p className="text-sm text-[#14141A]/80 mb-1 font-semibold">{workshop.title}</p>
            <p className="text-xs text-[#14141A]/50 mb-5">
              Registration opens on <span className="font-bold text-[#14141A]">{workshop.opensOn}</span>. We'll email you the moment seats open.
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
              We'll notify <span className="font-semibold text-[#14141A]">{email}</span> when registration opens for this workshop.
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

// ── WorkshopCard — "mission brief" ticket ──────────────────────────────────────

function WorkshopCard({ w }: { w: Workshop }) {
  const [expanded, setExpanded]     = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const isComingSoon = w.status === 'coming_soon';
  const isFull        = w.status === 'full';
  const accent        = TRACK_STYLE[w.category];
  const status         = STATUS_STYLE[w.status];
  const ctaHref        = w.detailPage ?? '/contact';

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

        {/* Status ribbon — only call out Coming Soon / Full, not Open */}
        {!w.status.startsWith('open') && (
          <div
            className="absolute -right-11 top-4 w-40 py-1 text-center text-[10px] font-bold tracking-widest rotate-45 select-none"
            style={{ background: status.bg, color: status.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {isComingSoon ? 'COMING SOON' : 'SEATS FULL'}
          </div>
        )}

        <div className="pl-8 pr-7 pt-7 pb-6 flex flex-col flex-1">

          {/* Top row: tag + category, mode */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              {!isComingSoon && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 bg-[#14141A] text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Tag className="w-3 h-3" />
                  {w.tag}
                </span>
              )}
              <ModeTag mode={w.mode as string} />
            </div>
          </div>

          {/* Category label */}
          <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: accent.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
            {w.category}
          </p>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-[#14141A] mb-3 leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {w.title.toUpperCase()}
          </h3>

          {/* Host */}
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 border-[#14141A]"
              style={{ background: accent.bg, color: accent.text }}
            >
              {w.host.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="text-xs text-[#14141A]/60 leading-tight">
              <span className="font-bold text-[#14141A]">{w.host}</span>
              <br />
              {w.hostRole}
            </div>
          </div>

          <p className="text-sm text-[#14141A]/70 leading-relaxed mb-5">{w.description}</p>

          {/* Expandable agenda */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                key={`agenda-${w.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 mb-5 overflow-hidden"
              >
                {w.agenda.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#14141A]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#14141A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-xs font-bold tracking-wide mb-5 text-left hover:underline"
            style={{ color: '#14141A', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {expanded ? '− HIDE AGENDA' : '+ VIEW AGENDA'}
          </button>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-[#14141A]/60 mb-6 font-semibold">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#14141A]/40 flex-shrink-0" />
              <span>{w.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#14141A]/40 flex-shrink-0" />
              <span>{w.time}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div>
              {!isComingSoon && (
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: w.isFree ? '#14141A' : '#14141A' }}
                >
                  {w.price}
                  {!w.isFree && <span className="ml-1.5 text-[10px] font-semibold text-[#14141A]/40 tracking-wide">ONE-TIME</span>}
                </span>
              )}
            </div>

            {isComingSoon ? (
              <button
                type="button"
                onClick={() => setShowNotify(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide text-white bg-[#14141A] hover:bg-black transition-colors whitespace-nowrap"
              >
                <Bell className="w-4 h-4" />
                NOTIFY ME
              </button>
            ) : isFull ? (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide text-[#14141A]/40 border-2 border-[#14141A]/20 cursor-not-allowed whitespace-nowrap">
                SEATS FULL
              </span>
            ) : (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all whitespace-nowrap group/btn"
              >
                {w.isFree ? 'REGISTER FREE' : 'REGISTER NOW'}
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showNotify && (
          <NotifyModal workshop={w} onClose={() => setShowNotify(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkshopsPage() {
  useAcceleratorFonts();

  const [search,        setSearch]        = useState('');
  const [mode,          setMode]          = useState<Mode>('All');
  const [category,      setCategory]      = useState<WCategory>('All');
  const [freeOnly,      setFreeOnly]      = useState(false);
  const [comingSoonOnly, setComingSoonOnly] = useState(false);

  const filtered = workshops.filter((w) => {
    const q = search.toLowerCase();
    const matchSearch     = w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.host.toLowerCase().includes(q);
    const matchMode       = mode     === 'All' || w.mode     === mode;
    const matchCategory   = category === 'All' || w.category === category;
    const matchFree       = !freeOnly       || w.isFree;
    const matchComingSoon = !comingSoonOnly || w.status === 'coming_soon';
    return matchSearch && matchMode && matchCategory && matchFree && matchComingSoon;
  });

  const freeCount       = workshops.filter((w) => w.isFree).length;
  const comingSoonCount = workshops.filter((w) => w.status === 'coming_soon').length;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#F5F5F2] pt-20 pb-14 lg:pt-28 lg:pb-20 px-6">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#14141A]/15 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#14141A]/15 hidden md:block" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.span
                variants={fadeInUp}
                className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Live Events
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-[12vw] sm:text-5xl md:text-6xl leading-[0.95] text-[#14141A] mb-6"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                WORKSHOPS THAT<br />
                <span className="bg-[#C6FF3D] px-2">ACCELERATE</span> CAREERS
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/60 mb-9 max-w-lg">
                Focused live sessions led by industry practitioners. Learn, build, and network — many are completely free.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-3 max-w-lg border-2 border-[#14141A] divide-x-2 divide-[#14141A]">
                {[
                  { value: String(workshops.length).padStart(2, '0'), label: 'WORKSHOPS' },
                  { value: String(freeCount).padStart(2, '0'),        label: 'FREE' },
                  { value: String(comingSoonCount).padStart(2, '0'),  label: 'COMING SOON' },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-3 text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-[#14141A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
                    <p className="text-[10px] font-bold tracking-widest text-[#14141A]/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: signature — live session board */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
              <SessionBoard />
            </motion.div>
          </div>
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
                placeholder="Search workshops..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-[#14141A] placeholder-[#14141A]/40 border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] bg-white transition-colors"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#14141A]/40 flex-shrink-0" />
              {WCATEGORIES.map((c) => (
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

            {/* Mode */}
            <div className="flex items-center gap-2 flex-wrap">
              {MODES.map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`text-xs font-bold tracking-wide px-3 py-1.5 border-2 transition-colors duration-150 ${
                    mode === m ? 'bg-[#3D5AFF] text-white border-[#14141A]' : 'bg-white text-[#14141A] border-[#14141A]/20 hover:border-[#14141A]'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Free only */}
            <button onClick={() => setFreeOnly(!freeOnly)}
              className={`text-xs font-bold tracking-wide px-3 py-1.5 border-2 transition-colors duration-150 ${
                freeOnly ? 'bg-[#C6FF3D] text-[#14141A] border-[#14141A]' : 'bg-white text-[#14141A] border-[#14141A]/20 hover:border-[#14141A]'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              FREE ONLY
            </button>

            {/* Coming soon toggle */}
            <button onClick={() => setComingSoonOnly(!comingSoonOnly)}
              className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1.5 border-2 transition-colors duration-150 ${
                comingSoonOnly ? 'bg-[#14141A] text-white border-[#14141A]' : 'bg-white text-[#14141A] border-[#14141A]/20 hover:border-[#14141A]'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Bell className="w-3 h-3" />
              COMING SOON
            </button>
          </div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section className="py-16 px-6 bg-[#F5F5F2] min-h-[60vh]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-[#14141A]/60">
              Showing <span className="font-bold text-[#14141A]">{filtered.length}</span> of {workshops.length} workshops
            </p>
            {filtered.some((w) => w.status === 'coming_soon') && (
              <p className="text-xs text-[#14141A] font-bold flex items-center gap-1.5 tracking-wide">
                <Bell className="w-3.5 h-3.5" />
                SOME AREN'T OPEN YET — CLICK "NOTIFY ME"
              </p>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[#14141A]/40">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No workshops match your filters.</p>
              <button
                onClick={() => { setSearch(''); setMode('All'); setCategory('All'); setFreeOnly(false); setComingSoonOnly(false); }}
                className="mt-4 text-[#14141A] text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${search}-${mode}-${category}-${freeOnly}-${comingSoonOnly}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
            >
              {filtered.map((w) => (
                <WorkshopCard key={w.id} w={w} />
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
              WANT A DEEPER DIVE?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/60 mb-9 max-w-lg mx-auto">
              Explore our full training programs for structured, mentor-led learning with placement support.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trainings"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all">
                EXPLORE TRAINING PROGRAMS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-white hover:bg-white/10 transition-all">
                BOOK FREE COUNSELLING
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}