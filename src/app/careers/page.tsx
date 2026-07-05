'use client';

// src/app/careers/page.tsx
// Reskinned to match the "Career Accelerator" design system.

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { Briefcase, Users, Zap, Heart, Mail, ArrowRight } from 'lucide-react';

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

const PERKS = [
  { icon: Zap,       title: 'Move Fast',       desc: 'Small team, big impact. Ship things that matter to thousands of learners.', accentBg: '#C6FF3D' },
  { icon: Heart,     title: 'Mission-Driven',  desc: 'Every role here directly accelerates careers in Cloud & DevOps.', accentBg: '#FF3D57' },
  { icon: Users,     title: 'Remote Friendly', desc: 'Work from anywhere in India. Async-first culture with clear ownership.', accentBg: '#3D5AFF' },
  { icon: Briefcase, title: 'Grow Rapidly',    desc: 'Early-stage means real ownership, fast growth, and visible impact.', accentBg: '#FFB800' },
];

export default function CareersPage() {
  useAcceleratorFonts();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#14141A] text-white border-b-2 border-[#14141A]">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
              <Briefcase className="w-3.5 h-3.5" />
              We're Hiring
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 leading-[0.98]" style={{ fontFamily: DISPLAY }}>
              CAREERS AT<br />
              <span className="bg-[#3D5AFF] px-2">XOURCEBASE</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              We're building something ambitious. Join a small team on a mission to make world-class tech education accessible to every Indian learner.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20 space-y-20">

        {/* ── Perks ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>Culture</span>
            <h2 className="text-2xl md:text-3xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>WHY WORK WITH US?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: 'easeOut' }}
                className="relative bg-white border-2 border-[#14141A] p-7 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: perk.accentBg }} />
                <div className="w-11 h-11 border-2 border-[#14141A] flex items-center justify-center mb-4" style={{ background: perk.accentBg }}>
                  <perk.icon className="w-5 h-5 text-[#14141A]" />
                </div>
                <h3 className="font-extrabold text-[#14141A] mb-2" style={{ fontFamily: MONO }}>{perk.title.toUpperCase()}</h3>
                <p className="text-sm text-[#14141A]/60 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── No open roles + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto"
        >
          {/* Coming soon card */}
          <div className="bg-white border-2 border-[#14141A] p-10 text-center mb-6">
            <div className="w-16 h-16 border-2 border-[#14141A]/20 flex items-center justify-center mx-auto mb-5">
              <Briefcase className="w-7 h-7 text-[#14141A]/40" />
            </div>
            <h3 className="text-xl font-extrabold text-[#14141A] mb-2" style={{ fontFamily: DISPLAY }}>NO OPEN ROLES RIGHT NOW</h3>
            <p className="text-sm text-[#14141A]/60 leading-relaxed max-w-xs mx-auto">
              We're a small team and roles open up quickly. Leave your details and we'll reach out when something fits.
            </p>
          </div>

          {/* Express interest */}
          <div className="relative bg-[#14141A] p-8 text-center overflow-hidden border-2 border-[#14141A]">
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />
            <div className="relative z-10">
              <Users className="w-7 h-7 text-[#C6FF3D] mx-auto mb-3" />
              <h3 className="text-lg font-extrabold text-white mb-1" style={{ fontFamily: DISPLAY }}>INTERESTED IN JOINING?</h3>
              <p className="text-white/60 text-sm mb-6">Drop us a message — we're always keen to meet talented people.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold px-7 py-3 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
                style={{ fontFamily: MONO }}
              >
                <Mail className="w-4 h-4" />
                EXPRESS INTEREST
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}