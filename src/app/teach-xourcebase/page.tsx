'use client';

// src/app/teach-xourcebase/page.tsx
// Reskinned to match "Career Accelerator" design

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, DollarSign, Calendar, Mail, CheckCircle2,
  GraduationCap, Zap, Star, ArrowRight,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
  { value: '70%', label: 'REVENUE SHARE' },
  { value: '50K+', label: 'ACTIVE LEARNERS' },
  { value: '4.9★', label: 'AVG RATING' },
  { value: '₹0', label: 'JOINING FEE' },
];

export default function TeachOnXourceBasePage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[#F5F5F2] text-[#14141A]">

      {/* ── Hero ── */}
      <section className="relative bg-[#F5F5F2] pt-20 pb-14 lg:pt-28 lg:pb-20 px-6 overflow-hidden border-b-2 border-[#14141A]">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <GraduationCap className="inline w-3.5 h-3.5 mr-1" /> BECOME AN INSTRUCTOR
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] font-extrabold mb-6 max-w-5xl"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              SHARE YOUR EXPERTISE.<br />
              <span className="bg-[#C6FF3D] px-2">EARN WHILE YOU TEACH.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/70 max-w-2xl mb-10">
              Join XourceBase as an instructor and help shape the next generation of Cloud & DevOps professionals.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#14141A] hover:bg-black text-white font-bold px-8 py-4 text-sm tracking-wide transition-all"
              >
                APPLY TO TEACH NOW
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Scoreboard ── */}
      <section className="py-12 px-6 bg-[#F5F5F2] border-b-2 border-[#14141A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#14141A] divide-x-2 divide-[#14141A]">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-8 text-center"
              >
                <p className="text-4xl font-bold text-[#14141A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold tracking-widest text-[#14141A]/60 mt-1 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 py-16 space-y-20">

        {/* Why Teach + Eligibility */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Why Teach */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border-2 border-[#14141A] p-8 flex flex-col"
          >
            <div className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mb-6" style={{ background: '#C6FF3D' }}>
              <DollarSign className="w-6 h-6 text-[#14141A]" />
            </div>
            <p className="text-xs font-bold tracking-widest text-[#C6FF3D] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              BENEFITS
            </p>
            <h2 className="text-3xl font-extrabold mb-8" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              WHY TEACH WITH US?
            </h2>

            <ul className="space-y-4 flex-1">
              {WHY.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#C6FF3D] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who Can Apply */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border-2 border-[#14141A] p-8 flex flex-col"
          >
            <div className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold tracking-widest text-[#FF3D57] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ELIGIBILITY
            </p>
            <h2 className="text-3xl font-extrabold mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              WHO CAN APPLY?
            </h2>

            <p className="text-[#14141A]/70 mb-8">
              Industry professionals with real-world experience who are passionate about teaching.
            </p>

            <div className="space-y-4">
              {[
                '3+ years in Cloud, DevOps, or related domains',
                'Strong working knowledge of AWS, Azure, Kubernetes, Terraform etc.',
                'Ability to explain complex topics clearly',
                'Professional certification is a plus',
              ].map((req, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <Star className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* How to Get Started */}
        <section>
          <div className="text-center mb-12">
            <p className="text-[#FF3D57] font-bold text-xs tracking-widest mb-3">PROCESS</p>
            <h2 className="text-4xl font-extrabold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              HOW TO GET STARTED
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative bg-white border-2 border-[#14141A] p-8 h-full flex flex-col"
              >
                <span className="absolute top-6 right-6 text-6xl font-bold text-[#14141A]/10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.step}
                </span>

                <div className="w-10 h-10 border-2 border-[#14141A] flex items-center justify-center mb-6">
                  <Calendar className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[#14141A]/70 flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#14141A] text-white rounded-none py-20 px-6 text-center border-t-4 border-[#C6FF3D]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Zap className="w-10 h-10 text-[#C6FF3D] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              READY TO START TEACHING?
            </h2>
            <p className="text-white/70 max-w-md mx-auto mb-10">
              Our instructor success team will guide you through the entire application process.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#C6FF3D] text-[#14141A] font-bold px-10 py-4 hover:brightness-110 transition-all text-sm tracking-wide"
            >
              <Mail className="w-4 h-4" />
              APPLY NOW — GET IN TOUCH
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}