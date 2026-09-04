'use client';

// src/app/workshops/devops-cicd-pipeline/page.tsx
// Same "Career Accelerator" visual system and page structure as
// /workshops/introduction-to-git-and-github — dedicated detail page + the
// shared WorkshopRegistrationModal, just wired for a paid workshop.

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, Award, ArrowLeft,
  Zap, Video, FileText, MessageCircle, Star,
  Rocket, GitBranch, CheckCircle2, ArrowRight,
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

// ─── Pipeline console (signature hero element) ────────────────────────────────
// Same "mission console" typewriter pattern as the Git workshop's terminal,
// re-themed with a CI/CD run instead of a git session.

const PIPELINE_LINES: { prompt: string; output?: string }[] = [
  { prompt: 'git push origin main', output: 'Triggered workflow: ci-cd-pipeline.yml' },
  { prompt: 'docker build -t app:latest .', output: 'Successfully built and tagged app:latest' },
  { prompt: 'docker push registry/app:latest', output: 'Image pushed — 4 layers, 128MB' },
  { prompt: 'kubectl apply -f deployment.yaml', output: 'deployment.apps/app configured' },
  { prompt: 'kubectl rollout status deployment/app', output: 'deployment "app" successfully rolled out ✓' },
];

function PipelineConsole() {
  const [lineIdx, setLineIdx]       = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [done, setDone]             = useState<{ prompt: string; output?: string }[]>([]);

  useEffect(() => {
    const current = PIPELINE_LINES[lineIdx];

    if (charIdx < current.prompt.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 32);
      return () => clearTimeout(t);
    }
    if (!showOutput && current.output) {
      const t = setTimeout(() => setShowOutput(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, current]);
      if (lineIdx + 1 < PIPELINE_LINES.length) {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setShowOutput(false);
      } else {
        setTimeout(() => { setDone([]); setLineIdx(0); setCharIdx(0); setShowOutput(false); }, 1800);
      }
    }, current.output ? 900 : 500);
    return () => clearTimeout(t);
  }, [charIdx, showOutput, lineIdx]);

  const current = PIPELINE_LINES[lineIdx];

  return (
    <div className="bg-[#14141A] border-2 border-[#14141A] overflow-hidden font-mono text-[12px] sm:text-[13px] leading-relaxed">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b-2 border-white/10">
        <span className="w-2.5 h-2.5 bg-[#FF3D57] flex-shrink-0" />
        <span className="w-2.5 h-2.5 bg-[#FFB800] flex-shrink-0" />
        <span className="w-2.5 h-2.5 bg-[#C6FF3D] flex-shrink-0" />
        <span className="ml-3 text-white/40 text-xs truncate" style={{ fontFamily: MONO }}>bash — cicd-pipeline</span>
      </div>
      <div className="p-4 sm:p-5 min-h-[220px] text-white/90 break-words">
        {done.map((l, i) => (
          <div key={i} className="mb-2">
            <p className="break-words"><span className="text-[#C6FF3D]">➜ </span><span className="text-[#3D5AFF]">~/app</span> <span className="text-white/90">{l.prompt}</span></p>
            {l.output && <p className="text-white/40 pl-4 break-words">{l.output}</p>}
          </div>
        ))}
        <p className="break-words">
          <span className="text-[#C6FF3D]">➜ </span>
          <span className="text-[#3D5AFF]">~/app</span>{' '}
          <span className="text-white/90">{current.prompt.slice(0, Math.max(0, charIdx))}</span>
          <span className="inline-block w-[7px] h-[15px] bg-[#C6FF3D] align-middle ml-0.5 animate-pulse" />
        </p>
        {showOutput && current.output && (
          <p className="text-white/40 pl-4 mt-1 break-words">{current.output}</p>
        )}
      </div>
    </div>
  );
}

// ─── Pipeline stages (signature hero element, part two) ───────────────────────

function PipelineStages() {
  const stages = ['BUILD', 'TEST', 'DEPLOY'];
  return (
    <div className="flex items-center justify-between gap-2">
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-9 h-9 border-2 border-[#14141A] bg-[#C6FF3D] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#14141A]" />
            </div>
            <p className="text-[10px] font-bold tracking-widest text-[#14141A]" style={{ fontFamily: MONO }}>{stage}</p>
          </div>
          {i < stages.length - 1 && (
            <div className="flex-1 h-0.5 bg-[#14141A]/20 mx-1.5 sm:mx-2 mb-4" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DevOpsCiCdPipelinePage() {
  useAcceleratorFonts();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // ─── Content data ───────────────────────────────────────────────────────────

  const topics = [
    'CI/CD Concepts & Pipeline Anatomy',
    'GitHub Actions: Workflows, Jobs & Triggers',
    'Dockerising a Node.js Application',
    'Pushing Images to a Container Registry',
    'Kubernetes Deployments on AWS EKS',
    'Rolling Updates & Zero-Downtime Releases',
    'Monitoring with Prometheus & Grafana',
    'Live Demo: Push-to-Deploy, End to End',
  ];

  const includes = [
    { icon: <Zap className="w-5 h-5" />,          title: 'Live Interactive Session',       desc: '3 hours of hands-on learning, building a real pipeline', accentBg: '#C6FF3D' },
    { icon: <Video className="w-5 h-5" />,         title: 'Session Recording',              desc: 'Lifetime access to the full recording', accentBg: '#FFB800' },
    { icon: <FileText className="w-5 h-5" />,      title: 'Pipeline Config Templates',      desc: 'Ready-to-adapt GitHub Actions & Kubernetes YAML', accentBg: '#FF3D57' },
    { icon: <Award className="w-5 h-5" />,         title: 'Certificate of Participation',   desc: 'LinkedIn-shareable digital certificate', accentBg: '#3D5AFF' },
    { icon: <Users className="w-5 h-5" />,         title: 'Community Access',               desc: 'Join our exclusive Discord community', accentBg: '#C6FF3D' },
    { icon: <MessageCircle className="w-5 h-5" />, title: 'Live Doubt Clearing',            desc: 'Direct Q&A with the instructor', accentBg: '#FFB800' },
  ];

  const faqs: [string, string][] = [
    ['Do I need prior DevOps experience?',    'Basic command-line and Git familiarity helps, but the session builds up from CI/CD fundamentals before getting hands-on.'],
    ['What tools do I need installed?',       'Docker Desktop, kubectl, and a free AWS account — setup instructions are emailed ahead of the session.'],
    ['Will I get a certificate?',             'Yes — every participant receives a Certificate of Participation after the session.'],
    ['Will the recording be available?',      'Yes, the full recording is shared within 24 hours with lifetime access.'],
    ['Is there a refund policy?',             'Yes — full refund if you’re not satisfied, no questions asked. Just email contact@xourcebase.com.'],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#14141A] antialiased">

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
                <span className="inline-flex items-center gap-2 bg-[#FFB800] text-[#14141A] text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14141A] animate-pulse flex-shrink-0" />
                  Live Workshop
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 break-words" style={{ fontFamily: DISPLAY }}>
                  DEVOPS CI/CD<br />
                  <span className="inline-block bg-[#3D5AFF] px-2">PIPELINE</span>
                </h1>
                <p className="text-base sm:text-lg text-white/70 mb-10 max-w-lg break-words">
                  Go from <code className="text-[#C6FF3D] font-mono text-sm sm:text-base">git push</code> to a live deployment — build a full CI/CD pipeline with GitHub Actions, Docker, and Kubernetes on AWS EKS.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-10">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'DATE',     value: 'NOV 7, 2026' },
                  { icon: <Clock className="w-4 h-4" />,    label: 'TIME',     value: '11:00 AM IST' },
                  { icon: <Users className="w-4 h-4" />,    label: 'DURATION', value: '3 HOURS' },
                  { icon: <Award className="w-4 h-4" />,    label: 'PRICE',    value: '₹299', highlight: true },
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
                  <Rocket className="w-4 h-4 flex-shrink-0" />
                  REGISTER & PAY ₹299
                </button>
              </motion.div>
            </div>

            {/* Right: signature — pipeline console + stage tracker */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="space-y-5">
              <PipelineConsole />
              <div className="bg-white border-2 border-[#14141A] px-4 sm:px-5 py-4">
                <p className="text-xs text-[#14141A]/50 font-bold tracking-wide mb-3" style={{ fontFamily: MONO }}>PUSH → BUILD → TEST → DEPLOY</p>
                <PipelineStages />
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
            <h2 className="text-3xl md:text-4xl text-[#14141A] break-words" style={{ fontFamily: DISPLAY }}>EVERYTHING YOU GET</h2>
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
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FFB800]" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-2xl sm:text-3xl font-extrabold" style={{ background: '#FFB800', fontFamily: MONO }}>
                PD
              </div>
              <div className="min-w-0 text-center md:text-left">
                <h3 className="text-2xl font-extrabold text-[#14141A] mb-1 break-words" style={{ fontFamily: DISPLAY }}>PRIYA DESAI</h3>
                <p className="text-[#14141A]/70 font-bold text-sm mb-2" style={{ fontFamily: MONO }}>DevOps Lead at TCS</p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4 flex-wrap">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800] flex-shrink-0" />)}
                  <span className="text-sm text-[#14141A]/50 ml-1 font-semibold">4.9 · 400+ engineers trained</span>
                </div>
                <p className="text-[#14141A]/70 leading-relaxed text-sm break-words">
                  Priya has spent years running production pipelines that ship dozens of times a day. She built this
                  session around the pipeline mistakes that actually cause outages — and how to design around them
                  from day one.
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
          <h2 className="text-3xl md:text-4xl text-white mb-4 break-words" style={{ fontFamily: DISPLAY }}>READY TO SHIP LIKE A PRO?</h2>
          <p className="text-white/60 mb-8">Join engineers who went from manual deploys to a real push-to-production pipeline in one session.</p>
          <button type="button" onClick={openModal}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#C6FF3D] text-[#14141A] font-bold px-10 py-4 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
            style={{ fontFamily: MONO }}>
            <GitBranch className="w-4 h-4 flex-shrink-0" />
            REGISTER & PAY ₹299
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      </section>

      {/* ── Registration Modal ── */}
      <WorkshopRegistrationModal
        isOpen={modalOpen}
        onClose={closeModal}
        workshop={{
          title: 'DevOps CI/CD Pipeline — Build to Deploy',
          dateLabel: 'Nov 7, 2026',
          timeLabel: '11:00 AM – 2:00 PM IST',
          durationLabel: '3 Hours',
          host: 'Priya Desai',
          isFree: false,
          price: 299,
        }}
      />
    </div>
  );
}
