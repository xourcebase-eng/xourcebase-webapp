'use client';

// src/app/workshops/introduction-to-git-and-github/page.tsx

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
    <div className="rounded-2xl bg-[#0B0F1A] border border-white/10 shadow-2xl shadow-black/40 overflow-hidden font-mono text-[13px] leading-relaxed">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-white/40 text-xs">bash — git-workshop</span>
      </div>
      <div className="p-5 min-h-[220px] text-white/90">
        {done.map((l, i) => (
          <div key={i} className="mb-2">
            <p><span className="text-emerald-400">➜ </span><span className="text-indigo-300">~/project</span> <span className="text-white/90">git {l.prompt.replace(/^git /, '')}</span></p>
            {l.output && <p className="text-white/40 pl-4">{l.output}</p>}
          </div>
        ))}
        <p>
          <span className="text-emerald-400">➜ </span>
          <span className="text-indigo-300">~/project</span>{' '}
          <span className="text-white/90">git {current.prompt.replace(/^git /, '').slice(0, Math.max(0, charIdx))}</span>
          <span className="inline-block w-[7px] h-[15px] bg-white/70 align-middle ml-0.5 animate-pulse" />
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
      <line x1="16" y1="45" x2="304" y2="45" stroke="#6366F1" strokeWidth="2.5" />
      <path d="M 90 45 C 130 45, 130 15, 170 15 L 230 15" fill="none" stroke="#34D399" strokeWidth="2.5" />
      <path d="M 230 15 C 250 15, 250 45, 270 45" fill="none" stroke="#34D399" strokeWidth="2.5" strokeDasharray="4 4" />
      {[16, 90, 270, 304].map((x, i) => (
        <circle key={`m-${i}`} cx={x} cy={45} r="5.5" fill="#6366F1" />
      ))}
      {[170, 230].map((x, i) => (
        <circle key={`f-${i}`} cx={x} cy={15} r="5.5" fill="#34D399" />
      ))}
      <text x="16" y="68" fill="#94A3B8" fontSize="10" fontFamily="monospace">main</text>
      <text x="170" y="8" fill="#6EE7B7" fontSize="10" fontFamily="monospace">feature/navbar</text>
      <text x="250" y="68" fill="#94A3B8" fontSize="10" fontFamily="monospace">merge</text>
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

  // Phone input style overrides
  useEffect(() => {
    const styleId = 'phone-input-overrides-git';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .react-tel-input .form-control {
          width:100%!important; height:48px!important;
          padding:12px 14px 12px 56px!important;
          font-size:14px!important; color:#1f2937!important;
          background:#f9fafb!important; border:1px solid #e5e7eb!important;
          border-radius:12px!important; transition:all .2s!important;
        }
        .react-tel-input .form-control:focus {
          border-color:#6366f1!important; outline:none!important;
          box-shadow:0 0 0 3px rgba(99,102,241,.12)!important;
          background:#fff!important;
        }
        .react-tel-input .flag-dropdown {
          background:#f9fafb!important; border:1px solid #e5e7eb!important;
          border-right:none!important; border-radius:12px 0 0 12px!important;
        }
        .react-tel-input .selected-flag { padding:0 0 0 14px!important; width:48px!important; }
        .react-tel-input .country-list {
          background:#fff!important; border:1px solid #e5e7eb!important;
          border-radius:12px!important; box-shadow:0 8px 24px rgba(0,0,0,.1)!important;
          max-height:200px!important;
        }
        .react-tel-input .country-list .country:hover { background:#f3f4f6!important; }
        .react-tel-input .country-list .country.highlight { background:#eef2ff!important; }
        .phone-err .react-tel-input .form-control,
        .phone-err .react-tel-input .flag-dropdown { border-color:#ef4444!important; }
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
    { icon: <Zap className="w-5 h-5" />,          title: 'Live Interactive Session',       desc: '3 hours of hands-on learning with real repos' },
    { icon: <Video className="w-5 h-5" />,         title: 'Session Recording',              desc: 'Lifetime access to the full recording' },
    { icon: <FileText className="w-5 h-5" />,      title: 'Git Command Cheatsheet',         desc: 'A printable reference for everyday use' },
    { icon: <Award className="w-5 h-5" />,         title: 'Certificate of Participation',   desc: 'LinkedIn-shareable digital certificate' },
    { icon: <Users className="w-5 h-5" />,         title: 'Community Access',               desc: 'Join our exclusive Discord community' },
    { icon: <MessageCircle className="w-5 h-5" />, title: 'Live Doubt Clearing',            desc: 'Direct Q&A with the instructor' },
  ];

  const faqs: [string, string][] = [
    ['Do I need to know how to code?',        'No. This workshop starts from zero — if you can open a terminal and follow along, you can keep up.'],
    ['Is this workshop beginner-friendly?',   'Yes, it is designed for absolute beginners as well as students and professionals picking up Git for the first time.'],
    ['Will I get a certificate?',             'Yes — every participant receives a Certificate of Participation after the session.'],
    ['Will the recording be available?',      'Yes, the full recording is shared within 24 hours with lifetime access.'],
    ['What do I need to bring?',              'Just a laptop with Git installed (we will walk through setup together) and a free GitHub account.'],
  ];

  return (
    <div className="font-sans text-gray-900 antialiased">

      {/* ── Back ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Workshops
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-[#0B0F1A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }} />
        <div className="absolute -top-24 -left-16 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div>
              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <span className="inline-flex items-center gap-2 bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Free Live Workshop
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 font-mono tracking-tight">
                  Introduction to<br />
                  <span className="text-indigo-300">Git &amp; GitHub</span>
                </h1>
                <p className="text-lg text-white/70 mb-10 max-w-lg">
                  Go from your first <code className="text-emerald-300 font-mono text-base">git init</code> to opening real pull requests — a hands-on, beginner-friendly session on how teams actually ship code.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'Date',     value: 'May 18, 2025' },
                  { icon: <Clock className="w-4 h-4" />,    label: 'Time',     value: '10:00 AM IST' },
                  { icon: <Users className="w-4 h-4" />,    label: 'Duration', value: '3 Hours' },
                  { icon: <Award className="w-4 h-4" />,    label: 'Price',    value: 'FREE', highlight: true },
                ].map((m, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
                    <div className="text-indigo-300">{m.icon}</div>
                    <div>
                      <p className="text-xs text-white/50 font-medium">{m.label}</p>
                      <p className={`text-sm font-bold font-mono ${m.highlight ? 'text-emerald-400' : 'text-white'}`}>{m.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <button type="button" onClick={openModal}
                  className="inline-flex items-center gap-2 bg-white text-[#0B0F1A] font-bold text-base px-8 py-4 rounded-2xl hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-black/40">
                  <GitCommit className="w-4 h-4 text-indigo-600" />
                  Reserve My Free Spot
                </button>
              </motion.div>
            </div>

            {/* Right: signature — live terminal + branch graph */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="space-y-5">
              <TerminalDemo />
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4">
                <p className="text-xs text-white/40 font-mono mb-2">feature branch → merged to main</p>
                <BranchGraph />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2 font-mono">Curriculum</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What You Will Learn</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
            {topics.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <div className="w-8 h-8 flex-shrink-0 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-mono font-bold text-xs">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-800 font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Workshop Includes ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2 font-mono">What's Included</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Everything You Get — For Free</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Instructor ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2 font-mono">Your Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet Your Instructor</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-indigo-200 font-mono">
                RS
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Rahul Sharma</h3>
                <p className="text-indigo-600 font-semibold text-sm mb-1">Senior Software Engineer at Infosys</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-sm text-gray-500 ml-1">4.9 · 600+ students trained</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
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
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2 font-mono">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="space-y-4">
            {faqs.map(([q, a], i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-3">
                  <span className="text-indigo-500 font-extrabold flex-shrink-0 font-mono">Q.</span> {q}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed pl-6">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-[#0B0F1A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-indigo-300 font-semibold text-sm uppercase tracking-widest mb-3 font-mono">Limited Seats</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Commit to Learning Git?</h2>
          <p className="text-white/60 mb-8">Join hundreds of learners who picked up Git &amp; GitHub in a single afternoon.</p>
          <button type="button" onClick={openModal}
            className="inline-flex items-center gap-2 bg-white text-[#0B0F1A] font-bold px-10 py-4 rounded-2xl text-base hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-black/40">
            <GitPullRequest className="w-4 h-4" />
            Register Free for the Workshop
          </button>
        </div>
      </section>

      {/* ── Registration Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="relative bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {!submitted ? (
                <>
                  {/* ── Modal header ── */}
                  <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-100 px-6 py-5 rounded-t-3xl">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">Register for Workshop</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Introduction to Git &amp; GitHub · May 18, 2025</p>
                    </div>
                    <button type="button" onClick={closeModal}
                      className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* ── Countdown strip ── */}
                  <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3 flex items-center justify-between">
                    <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Seats confirm on a first-come basis
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 tabular-nums font-mono">
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="fullName" autoComplete="name"
                        placeholder="Rahul Sharma" value={form.fullName} onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition placeholder-gray-400 ${
                          errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-300 focus:border-indigo-400'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input type="email" name="email" autoComplete="email"
                          placeholder="you@example.com" value={form.email} onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition placeholder-gray-400 ${
                            errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-300 focus:border-indigo-400'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className={errors.phone ? 'phone-err' : ''}>
                        <PhoneInput country="in" value={form.phone}
                          onChange={(phone) => { setForm((p) => ({ ...p, phone })); setErrors((p) => ({ ...p, phone: undefined })); }}
                          inputProps={{ placeholder: '98765 43210' }}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        WhatsApp Number
                        <span className="text-gray-400 font-normal ml-1">(optional — for joining link)</span>
                      </label>
                      <PhoneInput country="in" value={form.whatsapp}
                        onChange={(whatsapp) => setForm((p) => ({ ...p, whatsapp }))}
                        inputProps={{ placeholder: 'Same or different number' }}
                      />
                    </div>

                    {/* Role + Experience row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Role</label>
                        <input type="text" name="currentRole"
                          placeholder="e.g., Student / SDE" value={form.currentRole} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Experience</label>
                        <select name="experience" value={form.experience} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition cursor-pointer">
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
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Total due today</p>
                        <p className="text-2xl font-extrabold text-emerald-600 mt-0.5">FREE</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Workshop date</p>
                        <p className="text-sm font-semibold text-gray-700">May 18, 2025</p>
                        <p className="text-xs text-gray-400">10:00 AM – 1:00 PM IST</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="button" onClick={handleRegister} disabled={saving}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70">
                      {saving ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Reserving…
                        </>
                      ) : (
                        <>
                          <GitCommit className="w-4 h-4" />
                          Reserve My Free Spot →
                        </>
                      )}
                    </button>

                    {/* Trust line */}
                    <p className="text-center text-xs text-gray-400 pb-1">
                      No payment required · No spam, ever.
                    </p>
                    <p className="text-center text-xs text-gray-400">
                      By registering you agree to our{' '}
                      <Link href="/terms-conditions" className="underline hover:text-gray-600">Terms</Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                    </p>
                  </div>
                </>
              ) : (
                /* ── Success state ── */
                <div className="p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">You're Registered! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Check your inbox at <span className="font-semibold text-gray-700">{form.email}</span> for a confirmation email with the joining link and pre-read resources.
                  </p>
                  <button onClick={closeModal}
                    className="bg-gray-900 text-white px-10 py-3 rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors">
                    Close
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