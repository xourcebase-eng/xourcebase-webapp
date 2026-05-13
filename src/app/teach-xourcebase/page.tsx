'use client';

// src/app/teach-xourcebase/page.tsx

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Users, DollarSign, Calendar, Mail, CheckCircle2,
  GraduationCap, Zap, Star, ArrowRight,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const WHY = [
  'Global reach to aspiring Cloud & DevOps engineers',
  'Competitive revenue share — up to 70%',
  'Flexible scheduling and full platform tooling',
  'Dedicated instructor success support',
  'Your profile featured to 50K+ active learners',
  'Monthly payouts — no delays',
];

const STEPS = [
  { step: '01', title: 'Apply', desc: 'Submit your application with your LinkedIn, experience, and a sample topic you\'d teach.' },
  { step: '02', title: 'Review', desc: 'Our team reviews your credentials and schedules a 15-minute intro call — usually within 1–2 weeks.' },
  { step: '03', title: 'Onboard', desc: 'Get set up with our tools, templates, and instructor guidelines.' },
  { step: '04', title: 'Launch', desc: 'Publish your first workshop and start reaching thousands of motivated learners.' },
];

const STATS = [
  { value: '70%',   label: 'Revenue share' },
  { value: '50K+',  label: 'Active learners' },
  { value: '4.9★',  label: 'Avg instructor rating' },
  { value: '₹0',    label: 'Platform fee to join' },
];

export default function TeachOnXourceBasePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <GraduationCap className="w-3.5 h-3.5" />
                Become an Instructor
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Share your expertise.<br />
                <span className="text-[#8B0000]">Earn while you teach.</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Join XourceBase as an instructor and help shape the next generation of Cloud & DevOps engineers. Reach thousands, earn competitively, and build your brand.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#8B0000] hover:bg-[#700000] text-white font-bold px-8 py-4 rounded-2xl text-sm active:scale-[0.97] transition-all shadow-sm shadow-red-900/20"
              >
                Apply to Teach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20 space-y-20">

        {/* ── Stats ── */}
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

        {/* ── Why teach + Who can apply ── */}
        <section className="grid lg:grid-cols-2 gap-8">

          {/* Why */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
          >
            <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
              <DollarSign className="w-5 h-5 text-[#8B0000]" />
            </div>
            <p className="text-[#8B0000] font-bold text-xs uppercase tracking-widest mb-2">Benefits</p>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Why teach with us?</h2>
            <ul className="space-y-3">
              {WHY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
          >
            <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
              <Users className="w-5 h-5 text-[#8B0000]" />
            </div>
            <p className="text-[#8B0000] font-bold text-xs uppercase tracking-widest mb-2">Eligibility</p>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Who can apply?</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              We're looking for professionals with real-world experience who are passionate about teaching. You don't need to be a full-time trainer — industry practitioners make the best instructors.
            </p>
            <div className="space-y-3">
              {[
                '3+ years in Cloud, DevOps, or related tech domains',
                'Strong working knowledge of AWS, Azure, GCP, Kubernetes, or Terraform',
                'Ability to explain complex concepts clearly and practically',
                'Professional certification is a plus but not mandatory',
              ].map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{req}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── How to get started ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">How to get started</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 relative"
              >
                <span className="text-5xl font-extrabold text-gray-100 absolute top-5 right-6 select-none">{s.step}</span>
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-4 h-4 text-[#8B0000]" />
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="bg-[#8B0000] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full" />
          <div className="relative z-10">
            <Zap className="w-8 h-8 text-red-300 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to start teaching?</h2>
            <p className="text-red-200 text-sm mb-8 max-w-sm mx-auto">Drop us a message and our instructor success team will guide you through the application.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#8B0000] font-bold px-8 py-3.5 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}