'use client';

// src/app/xourcebase-business/page.tsx
// Fully reskinned to match "Career Accelerator" design

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2, Users, TrendingUp, Shield, Mail,
  CheckCircle2, ArrowRight, Briefcase,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const BENEFITS = [
  {
    icon: Users,
    title: 'Talent Pipeline Development',
    desc: 'Build a steady stream of skilled, job-ready professionals trained specifically for your industry needs.',
    accent: '#C6FF3D',
  },
  {
    icon: TrendingUp,
    title: 'Custom Upskilling Programs',
    desc: 'Tailored training modules designed with your team for Cloud, DevOps, and emerging technologies.',
    accent: '#3D5AFF',
  },
  {
    icon: Shield,
    title: 'Certified & Verified Talent',
    desc: 'Access pre-vetted candidates with industry-recognised certifications and real project experience.',
    accent: '#FF3D57',
  },
  {
    icon: Building2,
    title: 'Reduced Hiring Cost',
    desc: 'Cut recruitment costs by up to 40% with direct access to trained, motivated professionals.',
    accent: '#FFB800',
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
  { value: '40%', label: 'AVG COST REDUCTION' },
  { value: '200+', label: 'CORPORATE CLIENTS' },
  { value: '95%', label: 'SATISFACTION RATE' },
  { value: '2 WK', label: 'AVG TIME TO HIRE' },
];

export default function XourceBaseForBusinessPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[#F5F5F2] text-[#14141A]">

      {/* ── Hero ── */}
      <section className="relative bg-[#F5F5F2] pt-20 pb-14 lg:pt-28 lg:pb-20 px-6 border-b-2 border-[#14141A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Briefcase className="inline w-3.5 h-3.5 mr-1" /> ENTERPRISE SOLUTIONS
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] font-extrabold mb-6"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              BUILD YOUR<br />FUTURE-READY<br />
              <span className="bg-[#C6FF3D] px-2">WORKFORCE</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/70 max-w-2xl">
              Partner with XourceBase to access top Cloud & DevOps talent, custom training programs, and accelerate your digital transformation.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#14141A] hover:bg-black text-white font-bold px-8 py-4 text-sm tracking-wide transition-all"
              >
                PARTNER WITH US
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

        {/* Benefits */}
        <section>
          <motion.div initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#FF3D57] text-xs font-bold tracking-widest mb-2">WHY PARTNER WITH US</p>
            <h2 className="text-4xl font-extrabold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              WHAT WE BRING TO YOUR ORGANISATION
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white border-2 border-[#14141A] p-8 relative flex flex-col"
              >
                <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: b.accent }} />
                <b.icon className="w-10 h-10 mb-6" style={{ color: b.accent }} />
                <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {b.title}
                </h3>
                <p className="text-sm text-[#14141A]/70 flex-1">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hire Talent + Corporate Training */}
        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'HIRE TALENT',
              desc: 'Connect with certified, job-ready graduates',
              points: HIRE_POINTS,
              accent: '#FF3D57',
            },
            {
              title: 'CORPORATE TRAINING',
              desc: 'Upskill your existing teams with custom programs',
              points: TRAINING_POINTS,
              accent: '#3D5AFF',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border-2 border-[#14141A] p-8"
            >
              <div className="w-12 h-12 border-2 border-[#14141A] mb-6" style={{ background: item.accent }} />
              <h3 className="text-2xl font-extrabold mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-[#14141A]/70 mb-6">{item.desc}</p>

              <ul className="space-y-3">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#14141A] text-white py-20 px-6 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              READY TO TRANSFORM YOUR WORKFORCE?
            </h2>
            <p className="text-white/70 mb-10">
              Let’s discuss how XourceBase can support your hiring and training goals.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#C6FF3D] text-[#14141A] font-bold px-10 py-4 hover:brightness-110 transition-all text-sm tracking-wide"
            >
              <Mail className="w-4 h-4" />
              GET IN TOUCH TODAY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}