'use client';

// src/app/terms-conditions/page.tsx
// Reskinned to Career Accelerator style

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Scale, Shield, Gavel, AlertTriangle,
  Globe, Mail, XCircle, ChevronRight,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const SECTIONS = [
  {
    id: 'acceptance',
    icon: Scale,
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using XourceBase (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use the Service.',
      'These Terms form a legally binding agreement between you and XourceBase. We may update them periodically; continued use constitutes acceptance of any changes.',
    ],
  },
  {
    id: 'use',
    icon: Shield,
    title: 'Use of Services',
    content: ['You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:'],
    bullets: [
      'Copy, reproduce, or distribute content without explicit written permission.',
      'Engage in harassment, spam, or any form of unauthorized access.',
      'Use the Service for commercial resale purposes without our prior consent.',
      'Share account credentials — enrollment grants personal, non-transferable access only.',
    ],
  },
  {
    id: 'ip',
    icon: Gavel,
    title: 'Intellectual Property Rights',
    content: [
      'All content on the Service — including courses, materials, branding, and logos — is owned by XourceBase or its licensors and is protected by copyright, trademark, and applicable laws.',
      'You may not modify, distribute, or create derivative works without written permission.',
    ],
  },
  {
    id: 'liability',
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: [
      'XourceBase provides the Service "as is" without warranties of any kind. We disclaim all liability for indirect, incidental, or consequential damages.',
      'Our total aggregate liability shall not exceed the amount paid by you in the 12 months preceding the claim.',
    ],
  },
  {
    id: 'termination',
    icon: XCircle,
    title: 'Termination of Access',
    content: [
      'We may suspend or terminate your access for violations of these Terms, with or without notice.',
      'You may terminate by ceasing use or submitting an account deletion request.',
    ],
  },
  {
    id: 'governing',
    icon: Globe,
    title: 'Governing Law & Jurisdiction',
    content: [
      'These Terms are governed by the laws of India. Any disputes shall be resolved exclusively in the competent courts of Mumbai, Maharashtra.',
    ],
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Information',
    content: ['For questions or concerns about these Terms, please contact our legal team:'],
    contact: true,
  },
];

export default function TermsAndConditionsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[#F5F5F2] text-[#14141A]">

      {/* Hero */}
      <section className="bg-[#F5F5F2] pt-20 pb-14 lg:pt-28 lg:pb-20 px-6 border-b-2 border-[#14141A]">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Scale className="inline w-3.5 h-3.5 mr-1" /> LEGAL
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] font-extrabold mb-6"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              TERMS &amp;<br />CONDITIONS
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#14141A]/60 max-w-xl">
              Please read these terms carefully before using XourceBase.
            </motion.p>
            <p className="text-xs text-[#14141A]/50 mt-2">Last updated: December 15, 2025</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="lg:grid lg:grid-cols-[240px_1fr] gap-12">

          {/* TOC Sidebar */}
          <aside className="hidden lg:block sticky top-8 self-start">
            <p className="text-xs font-bold tracking-widest text-[#14141A]/50 mb-4">ON THIS PAGE</p>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all rounded-none border-l-2 ${
                    active === s.id ? 'border-[#14141A] font-bold' : 'border-transparent hover:border-[#14141A]/30'
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border-2 border-[#14141A] p-8 scroll-mt-20"
              >
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 border-2 border-[#14141A] flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                    {s.title}
                  </h2>
                </div>

                <div className="space-y-4 text-[#14141A]/80 pl-14">
                  {s.content.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}

                  {s.bullets && (
                    <ul className="space-y-2 mt-3">
                      {s.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-[#FF3D57] mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.contact && (
                    <div className="mt-6 p-6 border border-[#14141A] bg-[#F5F5F2]">
                      <p className="font-bold">Email</p>
                      <a href="mailto:legal@xourcebase.com" className="text-[#FF3D57] hover:underline">
                        legal@xourcebase.com
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}