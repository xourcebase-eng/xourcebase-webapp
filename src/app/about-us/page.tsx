'use client';

// src/app/about-us/page.tsx

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { Users, Heart, Lightbulb, Award, BookOpen, Target, ArrowRight } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const VALUES = [
  { icon: Heart,      title: 'Empathy First',       desc: 'We listen to every learner and support their unique journey without judgement.' },
  { icon: Lightbulb,  title: 'Innovation Driven',    desc: 'Fresh ideas meet practical skills to create real, lasting impact.' },
  { icon: Users,      title: 'Community Powered',    desc: 'Grow alongside peers and mentors who become lifelong allies.' },
  { icon: Award,      title: 'Results Oriented',     desc: 'Measurable growth — from interview prep to landing dream jobs.' },
];

// Initials used as avatar placeholders — replace src with real images when available
const TEAM = [
  { name: 'Abhijeet Vishwakarma', role: 'Lead Mentor',    initials: 'AV', color: 'from-[#8B0000] to-red-400' },
  { name: 'Satyam Mishra',        role: 'Lead Mentor',    initials: 'SM', color: 'from-indigo-600 to-indigo-400' },
  { name: 'Rehan Khan',           role: 'Lead Mentor',    initials: 'RK', color: 'from-emerald-700 to-emerald-400' },
  { name: 'Priyanshu Prajapati',  role: 'Lead Mentor',    initials: 'PP', color: 'from-amber-600 to-amber-400' },
];

const STATS = [
  { value: '50K+',  label: 'Learners Trained' },
  { value: '200+',  label: 'Workshops Delivered' },
  { value: '4.9★',  label: 'Average Rating' },
  { value: '95%',   label: 'Placement Rate' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                We're building the future of{' '}
                <span className="text-[#8B0000]">tech careers.</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center">
              <p className="text-3xl font-extrabold text-[#8B0000] mb-1">{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Story ── */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-3">Who We Are</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">From classroom to career — we close the gap.</h2>
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
              <p>
                At XourceBase, we believe true growth begins with practical exposure. Our programs blend real-world projects, mock interviews, and expert-led sessions designed by experienced professionals from the tech and business world.
              </p>
              <p>
                Whether you're a student preparing for your first interview, a professional looking to upskill, or an organization seeking workforce readiness programs — XourceBase is your trusted partner in building a career that stands out.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Target,   label: 'Industry-aligned curriculum' },
              { icon: Users,    label: 'Expert-led live sessions' },
              { icon: Award,    label: 'Recognised certifications' },
              { icon: BookOpen, label: 'Lifetime resource access' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-start gap-3">
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#8B0000]" />
                </div>
                <p className="text-xs font-semibold text-gray-700 leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen, accent: 'text-[#8B0000]', bg: 'bg-red-50',
              label: 'Our Mission',
              text: 'To transform learning into an empowering journey that builds confidence, competence, and career success for every individual.',
            },
            {
              icon: Award, accent: 'text-indigo-700', bg: 'bg-indigo-50',
              label: 'Our Vision',
              text: 'To become the most trusted platform for job readiness and professional growth, connecting talent with opportunity through innovation, skill, and mentorship.',
            },
          ].map(({ icon: Icon, accent, bg, label, text }, i) => (
            <motion.div
              key={label}
              custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center mb-5`}>
                <Icon className={`w-5 h-5 ${accent}`} />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${accent}`}>{label}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Values ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 text-center"
              >
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-[#8B0000]" />
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2 text-base">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">The People</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Meet the Team</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-4 shadow-sm`}>
                  {member.initials}
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-1">{member.name}</h3>
                <p className="text-xs text-[#8B0000] font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Profile photos coming soon.</p>
        </section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="bg-[#8B0000] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to unlock your potential?</h2>
            <p className="text-red-200 text-sm mb-8 max-w-sm mx-auto">Join thousands of learners building future-ready careers with XourceBase.</p>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 bg-white text-[#8B0000] font-bold px-8 py-3.5 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Browse Workshops
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}