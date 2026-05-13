'use client';

// src/app/xourcebase-business/page.tsx

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Building2, Users, TrendingUp, Shield, Mail,
  CheckCircle2, ArrowRight, Briefcase,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const BENEFITS = [
  {
    icon: Users,
    title: 'Talent Pipeline Development',
    desc: 'Build a steady stream of skilled, job-ready professionals trained specifically for your industry needs.',
    color: 'bg-red-50 text-[#8B0000]',
  },
  {
    icon: TrendingUp,
    title: 'Custom Upskilling Programs',
    desc: 'Tailored training modules designed with your team for Cloud, DevOps, and emerging technologies.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Shield,
    title: 'Certified & Verified Talent',
    desc: 'Access pre-vetted candidates with industry-recognised certifications and real project experience.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Building2,
    title: 'Reduced Hiring Cost',
    desc: 'Cut recruitment costs by up to 40% with direct access to trained, motivated professionals.',
    color: 'bg-amber-50 text-amber-700',
  },
];

const HIRE_POINTS = [
  'Pre-screened and interview-ready candidates',
  'Specialized in AWS, Azure, Kubernetes, Terraform, CI/CD',
  'Guaranteed skill alignment with your tech stack',
  'Transparent hiring process with no hidden fees',
];

const TRAINING_POINTS = [
  'Fully customised curriculum built around your stack',
  'Flexible delivery: online, onsite, or hybrid',
  'Measurable outcomes and certification',
  'Dedicated account manager throughout the engagement',
];

const STATS = [
  { value: '40%',  label: 'Avg cost reduction' },
  { value: '200+', label: 'Corporate clients' },
  { value: '95%',  label: 'Satisfaction rate' },
  { value: '2 wk', label: 'Avg time to hire' },
];

export default function XourceBaseForBusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Briefcase className="w-3.5 h-3.5" />
                Enterprise Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Build your future-ready<br />
                <span className="text-[#8B0000]">workforce.</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Partner with XourceBase to access top Cloud & DevOps talent, customise training for your teams, and accelerate your organisation's digital transformation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#8B0000] hover:bg-[#700000] text-white font-bold px-8 py-4 rounded-2xl text-sm active:scale-[0.97] transition-all shadow-sm shadow-red-900/20"
              >
                <Building2 className="w-4 h-4" />
                Partner with Us
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

        {/* ── Benefits cards ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">Why XourceBase</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">What we bring to your organisation</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${b.color}`}>
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2 text-base leading-snug">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Hire talent + Corporate training ── */}
        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Users, color: 'bg-red-50 text-[#8B0000]',
              label: 'Hire Talent', title: 'Connect with certified graduates',
              desc: 'Our graduates complete rigorous, project-based training and are ready to contribute from day one.',
              points: HIRE_POINTS,
            },
            {
              icon: TrendingUp, color: 'bg-blue-50 text-blue-700',
              label: 'Corporate Training', title: 'Upskill your existing teams',
              desc: 'Customised programs delivered by industry experts — from beginner workshops to advanced certifications.',
              points: TRAINING_POINTS,
            },
          ].map(({ icon: Icon, color, label, title, desc, points }, i) => (
            <motion.div
              key={label}
              custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="bg-[#8B0000] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to transform your workforce?</h2>
            <p className="text-red-200 text-sm mb-8 max-w-sm mx-auto">Let's talk about how XourceBase can support your talent and training goals.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#8B0000] font-bold px-8 py-3.5 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}