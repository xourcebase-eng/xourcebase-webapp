'use client';

// src/app/workshops/introduction-to-git-and-github/page.tsx
// Reskinned to match the "Career Accelerator" design system (trainings/page.tsx, homepage page.tsx).

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, Award, CheckCircle2, ArrowLeft, X,
  Zap, Video, FileText, MessageCircle, Star, Mail, AlertCircle,
  GitCommit, GitPullRequest,
} from 'lucide-react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, showOutput, lineIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="bg-[#14141A] border-2 border-[#14141A] overflow-hidden font-mono text-[13px] leading-relaxed">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b-2 border-white/10">
        <span className="w-2.5 h-2.5 bg-[#FF3D57]" />
        <span className="w-2.5 h-2.5 bg-[#FFB800]" />
        <span className="w-2.5 h-2.5 bg-[#C6FF3D]" />
        <span className="ml-3 text-white/40 text-xs" style={{ fontFamily: MONO }}>bash — git-workshop</span>
      </div>
      <div className="p-5 min-h-[220px] text-white/90">
        {done.map((l, i) => (
          <div key={i} className="mb-2">
            <p><span className="text-[#C6FF3D]">➜ </span><span className="text-[#3D5AFF]">~/project</span> <span className="text-white/90">git {l.prompt.replace(/^git /, '')}</span></p>
            {l.output && <p className="text-white/40 pl-4">{l.output}</p>}
          </div>
        ))}
        <p>
          <span className="text-[#C6FF3D]">➜ </span>
          <span className="text-[#3D5AFF]">~/project</span>{' '}
          <span className="text-white/90">git {current.prompt.replace(/^git /, '').slice(0, Math.max(0, charIdx))}</span>
          <span className="inline-block w-[7px] h-[15px] bg-[#C6FF3D] align-middle ml-0.5 animate-pulse" />
        </p>
        {showOutput && current.output && (
          <p className="text-white/40 pl-4 mt-1">{current.output}</p>
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

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  currentRole: string;
  experience: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validate(f: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (!f.fullName.trim())  e.fullName = 'Full name is required.';
  if (!f.email)            e.email    = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email.';
  if (!f.phone || f.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number is required.';
  return e;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntroToGitGithubPage() {
  useAcceleratorFonts();

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [errors,    setErrors]    = useState<FieldErrors>({});

  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', whatsapp: '',
    currentRole: '', experience: '',
  });

  // Countdown timer (15 min) — creates gentle urgency for a free, seat-limited session
  const [timeLeft, setTimeLeft] = useState(900);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Phone input style overrides — squared off to match the hard-edge system
  useEffect(() => {
    const styleId = 'phone-input-overrides-git';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .react-tel-input .form-control {
          width:100%!important; height:48px!important;
          padding:12px 14px 12px 56px!important;
          font-size:14px!important; color:#14141A!important;
          background:#F5F5F2!important; border:2px solid #14141A33!important;
          border-radius:0!important; transition:all .2s!important;
        }
        .react-tel-input .form-control:focus {
          border-color:#14141A!important; outline:none!important;
          box-shadow:none!important;
          background:#fff!important;
        }
        .react-tel-input .flag-dropdown {
          background:#F5F5F2!important; border:2px solid #14141A33!important;
          border-right:none!important; border-radius:0!important;
        }
        .react-tel-input .selected-flag { padding:0 0 0 14px!important; width:48px!important; }
        .react-tel-input .country-list {
          background:#fff!important; border:2px solid #14141A!important;
          border-radius:0!important; box-shadow:none!important;
          max-height:200px!important;
        }
        .react-tel-input .country-list .country:hover { background:#F5F5F2!important; }
        .react-tel-input .country-list .country.highlight { background:#C6FF3D33!important; }
        .phone-err .react-tel-input .form-control,
        .phone-err .react-tel-input .flag-dropdown { border-color:#FF3D57!important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const openModal  = () => { setModalOpen(true); setSubmitted(false); setSaving(false); };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSubmitted(false); setErrors({});
      setForm({ fullName: '', email: '', phone: '', whatsapp: '', currentRole: '', experience: '' });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleRegister = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/register-workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshop: 'Introduction to Git & GitHub for Beginners',
          fullName:    form.fullName,
          email:       form.email,
          phone:       form.phone,
          whatsapp:    form.whatsapp || form.phone,
          currentRole: form.currentRole,
          experience:  form.experience,
        }),
      });
      const data = await res.json();
      if (!data?.success) {
        alert('Could not complete registration. Please try again.');
        setSaving(false);
        return;
      }
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again in a moment.');
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#14141A] antialiased">

      {/* ── Back ── */}
      <div className="bg-[#F5F5F2] border-b-2 border-[#14141A] px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#14141A] hover:text-[#14141A]/70 transition-colors group" style={{ fontFamily: MONO }}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO WORKSHOPS
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-[#14141A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div>
              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <span className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14141A] animate-pulse" />
                  Free Live Workshop
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[0.98] mb-5" style={{ fontFamily: DISPLAY }}>
                  INTRODUCTION TO<br />
                  <span className="bg-[#3D5AFF] px-2">GIT &amp; GITHUB</span>
                </h1>
                <p className="text-lg text-white/70 mb-10 max-w-lg">
                  Go from your first <code className="text-[#C6FF3D] font-mono text-base">git init</code> to opening real pull requests — a hands-on, beginner-friendly session on how teams actually ship code.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'DATE',     value: 'MAY 18, 2025' },
                  { icon: <Clock className="w-4 h-4" />,    label: 'TIME',     value: '10:00 AM IST' },
                  { icon: <Users className="w-4 h-4" />,    label: 'DURATION', value: '3 HOURS' },
                  { icon: <Award className="w-4 h-4" />,    label: 'PRICE',    value: 'FREE', highlight: true },
                ].map((m, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-white/5 px-3 py-3 border-2 border-white/10">
                    <div className="text-[#C6FF3D]">{m.icon}</div>
                    <div>
                      <p className="text-[10px] text-white/50 font-bold tracking-widest" style={{ fontFamily: MONO }}>{m.label}</p>
                      <p className={`text-sm font-bold ${m.highlight ? 'text-[#C6FF3D]' : 'text-white'}`} style={{ fontFamily: MONO }}>{m.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <button type="button" onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold text-sm tracking-wide px-8 py-4 hover:brightness-95 active:scale-[0.97] transition-all"
                  style={{ fontFamily: MONO }}>
                  <GitCommit className="w-4 h-4" />
                  RESERVE MY FREE SPOT
                </button>
              </motion.div>
            </div>

            {/* Right: signature — mission console terminal + branch graph */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="space-y-5">
              <TerminalDemo />
              <div className="bg-white border-2 border-[#14141A] px-5 py-4">
                <p className="text-xs text-[#14141A]/50 font-bold tracking-wide mb-2" style={{ fontFamily: MONO }}>FEATURE BRANCH → MERGED TO MAIN</p>
                <BranchGraph />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-20 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>Curriculum</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>WHAT YOU WILL LEARN</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
            {topics.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-white border-2 border-[#14141A]/15 hover:border-[#14141A] p-5 transition-colors">
                <div className="w-9 h-9 flex-shrink-0 bg-[#14141A] text-white flex items-center justify-center font-bold text-xs" style={{ fontFamily: MONO }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[#14141A] font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Workshop Includes ── */}
      <section className="py-20 px-6 bg-white border-y-2 border-[#14141A]">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>What's Included</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>EVERYTHING YOU GET — FOR FREE</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="relative bg-[#F5F5F2] p-7 border-2 border-[#14141A] overflow-hidden transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: item.accentBg }} />
                <div className="w-11 h-11 border-2 border-[#14141A] flex items-center justify-center mb-4" style={{ background: item.accentBg }}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-[#14141A] text-lg mb-1" style={{ fontFamily: MONO }}>{item.title}</h3>
                <p className="text-[#14141A]/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Instructor ── */}
      <section className="py-20 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#3D5AFF] text-white px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>Your Guide</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>MEET YOUR INSTRUCTOR</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="relative bg-white border-2 border-[#14141A] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C6FF3D]" />
              <div className="w-28 h-28 flex-shrink-0 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-3xl font-extrabold" style={{ background: '#C6FF3D', fontFamily: MONO }}>
                RS
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#14141A] mb-1" style={{ fontFamily: DISPLAY }}>RAHUL SHARMA</h3>
                <p className="text-[#14141A]/70 font-bold text-sm mb-2" style={{ fontFamily: MONO }}>Senior Software Engineer at Infosys</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />)}
                  <span className="text-sm text-[#14141A]/50 ml-1 font-semibold">4.9 · 600+ students trained</span>
                </div>
                <p className="text-[#14141A]/70 leading-relaxed text-sm">
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
      <section className="py-20 px-6 bg-white border-t-2 border-[#14141A]">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FFB800] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>FAQ</span>
            <h2 className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>FREQUENTLY ASKED QUESTIONS</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="space-y-4">
            {faqs.map(([q, a], i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#F5F5F2] border-2 border-[#14141A]/15 hover:border-[#14141A] p-7 transition-colors">
                <h4 className="font-extrabold text-[#14141A] text-base mb-2 flex items-start gap-3">
                  <span className="text-[#FF3D57] font-extrabold flex-shrink-0" style={{ fontFamily: MONO }}>Q.</span> {q}
                </h4>
                <p className="text-[#14141A]/60 text-sm leading-relaxed pl-6">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-[#14141A] text-white text-center relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-white/10 hidden md:block" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>Limited Seats</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: DISPLAY }}>READY TO COMMIT TO LEARNING GIT?</h2>
          <p className="text-white/60 mb-8">Join hundreds of learners who picked up Git &amp; GitHub in a single afternoon.</p>
          <button type="button" onClick={openModal}
            className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold px-10 py-4 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
            style={{ fontFamily: MONO }}>
            <GitPullRequest className="w-4 h-4" />
            REGISTER FREE FOR THE WORKSHOP
          </button>
        </div>
      </section>

      {/* ── Registration Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal} className="absolute inset-0 bg-[#14141A]/70" />

            {/* Panel */}
            <motion.div key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="relative bg-white border-2 border-[#14141A] w-full max-w-lg max-h-[92vh] overflow-y-auto"
            >
              {!submitted ? (
                <>
                  {/* ── Modal header ── */}
                  <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b-2 border-[#14141A] px-6 py-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#14141A]" style={{ fontFamily: DISPLAY }}>REGISTER FOR WORKSHOP</h3>
                      <p className="text-xs text-[#14141A]/50 mt-0.5 font-semibold">Introduction to Git &amp; GitHub · May 18, 2025</p>
                    </div>
                    <button type="button" onClick={closeModal}
                      className="w-8 h-8 flex items-center justify-center border-2 border-[#14141A]/20 text-[#14141A]/60 hover:text-[#14141A] hover:border-[#14141A] transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* ── Countdown strip ── */}
                  <div className="bg-[#C6FF3D] border-b-2 border-[#14141A] px-6 py-3 flex items-center justify-between">
                    <span className="text-xs text-[#14141A] font-bold flex items-center gap-1.5" style={{ fontFamily: MONO }}>
                      <Clock className="w-3.5 h-3.5" />
                      SEATS CONFIRM ON A FIRST-COME BASIS
                    </span>
                    <span className="text-sm font-extrabold text-[#14141A] tabular-nums" style={{ fontFamily: MONO }}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                        Full Name <span className="text-[#FF3D57]">*</span>
                      </label>
                      <input type="text" name="fullName" autoComplete="name"
                        placeholder="Rahul Sharma" value={form.fullName} onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 focus:outline-none transition placeholder-[#14141A]/30 ${
                          errors.fullName ? 'border-[#FF3D57]' : 'border-[#14141A]/20 focus:border-[#14141A]'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                        Email Address <span className="text-[#FF3D57]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40 pointer-events-none" />
                        <input type="email" name="email" autoComplete="email"
                          placeholder="you@example.com" value={form.email} onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 focus:outline-none transition placeholder-[#14141A]/30 ${
                            errors.email ? 'border-[#FF3D57]' : 'border-[#14141A]/20 focus:border-[#14141A]'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                        Phone Number <span className="text-[#FF3D57]">*</span>
                      </label>
                      <div className={errors.phone ? 'phone-err' : ''}>
                        <PhoneInput country="in" value={form.phone}
                          onChange={(phone) => { setForm((p) => ({ ...p, phone })); setErrors((p) => ({ ...p, phone: undefined })); }}
                          inputProps={{ placeholder: '98765 43210' }}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                        WhatsApp Number
                        <span className="text-[#14141A]/40 font-normal ml-1">(optional — for joining link)</span>
                      </label>
                      <PhoneInput country="in" value={form.whatsapp}
                        onChange={(whatsapp) => setForm((p) => ({ ...p, whatsapp }))}
                        inputProps={{ placeholder: 'Same or different number' }}
                      />
                    </div>

                    {/* Role + Experience row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#14141A] mb-1.5">Current Role</label>
                        <input type="text" name="currentRole"
                          placeholder="e.g., Student / SDE" value={form.currentRole} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] transition placeholder-[#14141A]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#14141A] mb-1.5">Experience</label>
                        <select name="experience" value={form.experience} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] transition cursor-pointer">
                          <option value="">Select…</option>
                          <option value="0-1">0–1 Year</option>
                          <option value="1-3">1–3 Years</option>
                          <option value="3-5">3–5 Years</option>
                          <option value="5-10">5–10 Years</option>
                          <option value="10+">10+ Years</option>
                        </select>
                      </div>
                    </div>

                    {/* Price summary */}
                    <div className="bg-[#F5F5F2] border-2 border-[#14141A] px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#14141A]/50 font-bold tracking-wide" style={{ fontFamily: MONO }}>TOTAL DUE TODAY</p>
                        <p className="text-2xl font-extrabold text-[#14141A] mt-0.5" style={{ fontFamily: MONO }}>FREE</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#14141A]/50 font-semibold">Workshop date</p>
                        <p className="text-sm font-bold text-[#14141A]">May 18, 2025</p>
                        <p className="text-xs text-[#14141A]/50">10:00 AM – 1:00 PM IST</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="button" onClick={handleRegister} disabled={saving}
                      className="w-full flex items-center justify-center gap-2 bg-[#14141A] text-white font-bold py-3.5 text-sm tracking-wide hover:bg-black active:scale-[0.98] transition-all disabled:opacity-70"
                      style={{ fontFamily: MONO }}>
                      {saving ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          RESERVING…
                        </>
                      ) : (
                        <>
                          <GitCommit className="w-4 h-4" />
                          RESERVE MY FREE SPOT →
                        </>
                      )}
                    </button>

                    {/* Trust line */}
                    <p className="text-center text-xs text-[#14141A]/40 pb-1">
                      No payment required · No spam, ever.
                    </p>
                    <p className="text-center text-xs text-[#14141A]/40">
                      By registering you agree to our{' '}
                      <Link href="/terms-conditions" className="underline hover:text-[#14141A]">Terms</Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="underline hover:text-[#14141A]">Privacy Policy</Link>.
                    </p>
                  </div>
                </>
              ) : (
                /* ── Success state ── */
                <div className="p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-20 h-20 mx-auto border-2 border-[#14141A] flex items-center justify-center mb-6" style={{ background: '#C6FF3D' }}>
                      <CheckCircle2 className="w-10 h-10 text-[#14141A]" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-[#14141A] mb-2" style={{ fontFamily: DISPLAY }}>YOU'RE REGISTERED!</h3>
                  <p className="text-[#14141A]/60 text-sm mb-8 leading-relaxed">
                    Check your inbox at <span className="font-bold text-[#14141A]">{form.email}</span> for a confirmation email with the joining link and pre-read resources.
                  </p>
                  <button onClick={closeModal}
                    className="bg-[#14141A] text-white px-10 py-3 font-bold text-sm tracking-wide hover:bg-black transition-colors"
                    style={{ fontFamily: MONO }}>
                    CLOSE
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}