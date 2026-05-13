'use client';

// src/app/careers/page.tsx

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Users, Zap, Heart, Mail, ArrowRight } from 'lucide-react';

const PERKS = [
  { icon: Zap,    title: 'Move Fast',          desc: 'Small team, big impact. Ship things that matter to thousands of learners.' },
  { icon: Heart,  title: 'Mission-Driven',     desc: 'Every role here directly accelerates careers in Cloud & DevOps.' },
  { icon: Users,  title: 'Remote Friendly',    desc: 'Work from anywhere in India. Async-first culture with clear ownership.' },
  { icon: Briefcase, title: 'Grow Rapidly',   desc: 'Early-stage means real ownership, fast growth, and visible impact.' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              We're Hiring
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 leading-tight">
              Careers at XourceBase
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              We're building something ambitious. Join a small team on a mission to make world-class tech education accessible to every Indian learner.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20 space-y-20">

        {/* ── Perks ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">Culture</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Why work with us?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: 'easeOut' }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7"
              >
                <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <perk.icon className="w-5 h-5 text-[#8B0000]" />
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{perk.desc}</p>
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
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Briefcase className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">No open roles right now</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              We're a small team and roles open up quickly. Leave your details and we'll reach out when something fits.
            </p>
          </div>

          {/* Express interest */}
          <div className="bg-[#8B0000] rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/10 rounded-full" />
            <div className="relative z-10">
              <Users className="w-7 h-7 text-red-300 mx-auto mb-3" />
              <h3 className="text-lg font-extrabold text-white mb-1">Interested in joining?</h3>
              <p className="text-red-200 text-sm mb-6">Drop us a message — we're always keen to meet talented people.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#8B0000] font-bold px-7 py-3 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all"
              >
                <Mail className="w-4 h-4" />
                Express Interest
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}