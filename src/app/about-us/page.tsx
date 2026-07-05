'use client';

// src/app/about-us/page.tsx
// Reskinned to match the "Career Accelerator" design system.

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { Users, Heart, Lightbulb, Award, BookOpen, Target, ArrowRight } from 'lucide-react';

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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const VALUES = [
  { icon: Heart,      title: 'Empathy First',       desc: 'We listen to every learner and support their unique journey without judgement.', accentBg: '#FF3D57' },
  { icon: Lightbulb,  title: 'Innovation Driven',    desc: 'Fresh ideas meet practical skills to create real, lasting impact.', accentBg: '#FFB800' },
  { icon: Users,      title: 'Community Powered',    desc: 'Grow alongside peers and mentors who become lifelong allies.', accentBg: '#3D5AFF' },
  { icon: Award,      title: 'Results Oriented',     desc: 'Measurable growth — from interview prep to landing dream jobs.', accentBg: '#C6FF3D' },
];

// Initials used as avatar placeholders — replace src with real images when available
const TEAM = [
  { name: 'Abhijeet Vishwakarma', role: 'Lead Mentor', initials: 'AV', accentBg: '#FF3D57' },
  { name: 'Satyam Mishra',        role: 'Lead Mentor', initials: 'SM', accentBg: '#3D5AFF' },
  { name: 'Rehan Khan',           role: 'Lead Mentor', initials: 'RK', accentBg: '#C6FF3D' },
  { name: 'Priyanshu Prajapati',  role: 'Lead Mentor', initials: 'PP', accentBg: '#FFB800' },
];

const STATS = [
  { value: '50K+',  label: 'LEARNERS TRAINED' },
  { value: '200+',  label: 'WORKSHOPS DELIVERED' },
  { value: '4.9★',  label: 'AVERAGE RATING' },
  { value: '95%',   label: 'PLACEMENT RATE' },
];

export default function AboutPage() {
  useAcceleratorFonts();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#14141A] text-white border-b-2 border-[#14141A]">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[0.98] mb-6" style={{ fontFamily: DISPLAY }}>
                WE&apos;RE BUILDING THE<br />
                FUTURE OF <span className="bg-[#C6FF3D] text-[#14141A] px-2">TECH CAREERS</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                XourceBase is a next-generation career acceleration platform bridging the gap between education and employability — through industry-aligned training, hands-on learning, and personalized mentorship.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20 space-y-20">

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#14141A] divide-x-2 divide-y-2 sm:divide-y-0 divide-[#14141A]"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-white p-6 text-center">
              <p className="text-3xl font-bold text-[#14141A] mb-1" style={{ fontFamily: MONO }}>{value}</p>
              <p className="text-[10px] text-[#14141A]/50 font-bold tracking-widest">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Story ── */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>Who We Are</span>
            <h2 className="text-2xl md:text-3xl mb-5" style={{ fontFamily: DISPLAY }}>FROM CLASSROOM TO CAREER — WE CLOSE THE GAP.</h2>
            <div className="space-y-4 text-[#14141A]/60 text-sm leading-relaxed">
              <p>
                At XourceBase, we believe true growth begins with practical exposure. Our programs blend real-world projects, mock interviews, and expert-led sessions designed by experienced professionals from the tech and business world.
              </p>
              <p>
                Whether you&apos;re a student preparing for your first interview, a professional looking to upskill, or an organization seeking workforce readiness programs — XourceBase is your trusted partner in building a career that stands out.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Target,   label: 'Industry-aligned curriculum', accentBg: '#FF3D57' },
              { icon: Users,    label: 'Expert-led live sessions', accentBg: '#3D5AFF' },
              { icon: Award,    label: 'Recognised certifications', accentBg: '#FFB800' },
              { icon: BookOpen, label: 'Lifetime resource access', accentBg: '#C6FF3D' },
            ].map(({ icon: Icon, label, accentBg }) => (
              <div key={label} className="relative bg-white border-2 border-[#14141A] p-5 flex flex-col items-start gap-3 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accentBg }} />
                <div className="w-9 h-9 border-2 border-[#14141A] flex items-center justify-center" style={{ background: accentBg }}>
                  <Icon className="w-4 h-4 text-[#14141A]" />
                </div>
                <p className="text-xs font-bold text-[#14141A] leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen, accentBg: '#C6FF3D',
              label: 'Our Mission',
              text: 'To transform learning into an empowering journey that builds confidence, competence, and career success for every individual.',
            },
            {
              icon: Award, accentBg: '#3D5AFF',
              label: 'Our Vision',
              text: 'To become the most trusted platform for job readiness and professional growth, connecting talent with opportunity through innovation, skill, and mentorship.',
            },
          ].map(({ icon: Icon, accentBg, label, text }, i) => (
            <motion.div
              key={label}
              custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
              className="relative bg-white border-2 border-[#14141A] p-8 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accentBg }} />
              <div className="w-11 h-11 border-2 border-[#14141A] flex items-center justify-center mb-5" style={{ background: accentBg }}>
                <Icon className="w-5 h-5 text-[#14141A]" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2 text-[#14141A]/60" style={{ fontFamily: MONO }}>{label}</p>
              <p className="text-[#14141A]/70 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Values ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>What We Stand For</span>
            <h2 className="text-2xl md:text-3xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>OUR CORE VALUES</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="relative bg-white border-2 border-[#14141A] p-7 text-center overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-full h-1.5" style={{ background: v.accentBg }} />
                <div className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mx-auto mb-4 mt-1" style={{ background: v.accentBg }}>
                  <v.icon className="w-5 h-5 text-[#14141A]" />
                </div>
                <h3 className="font-extrabold text-[#14141A] mb-2 text-base" style={{ fontFamily: MONO }}>{v.title.toUpperCase()}</h3>
                <p className="text-[#14141A]/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#3D5AFF] text-white px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>The People</span>
            <h2 className="text-2xl md:text-3xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>MEET THE TEAM</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                className="bg-white border-2 border-[#14141A] p-6 text-center"
              >
                <div className="w-16 h-16 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-xl font-extrabold mx-auto mb-4" style={{ background: member.accentBg, fontFamily: MONO }}>
                  {member.initials}
                </div>
                <h3 className="font-extrabold text-[#14141A] text-sm leading-snug mb-1">{member.name}</h3>
                <p className="text-xs text-[#14141A]/60 font-bold tracking-wide" style={{ fontFamily: MONO }}>{member.role.toUpperCase()}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-[#14141A]/40 mt-4 font-semibold">Profile photos coming soon.</p>
        </section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="bg-[#14141A] p-10 sm:p-14 text-center relative overflow-hidden border-2 border-[#14141A]"
        >
          <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-white/10 hidden md:block" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-white/10 hidden md:block" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: DISPLAY }}>READY TO UNLOCK YOUR POTENTIAL?</h2>
            <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto">Join thousands of learners building future-ready careers with XourceBase.</p>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold px-8 py-3.5 text-sm tracking-wide hover:brightness-95 active:scale-[0.97] transition-all"
              style={{ fontFamily: MONO }}
            >
              <BookOpen className="w-4 h-4" />
              BROWSE WORKSHOPS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}