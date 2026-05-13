'use client';

// src/app/terms-conditions/page.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Scale, Shield, Gavel, AlertTriangle,
  Globe, Mail, XCircle, ChevronRight,
} from 'lucide-react';

/* ── Variants (module-level, not inside component) ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' as const },
  }),
};

/* ── Section data ── */
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
    content: [
      'You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:',
    ],
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
      'You may not modify, distribute, or create derivative works without written permission. User-generated content grants us a non-exclusive, royalty-free licence for use within the platform.',
    ],
  },
  {
    id: 'liability',
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: [
      'XourceBase provides the Service "as is" without warranties of any kind. We disclaim all liability for indirect, incidental, or consequential damages arising from use of the Service.',
      'Our total aggregate liability shall not exceed the amount paid by you in the 12 months preceding the claim. This applies to errors in content and service interruptions.',
    ],
  },
  {
    id: 'termination',
    icon: XCircle,
    title: 'Termination of Access',
    content: [
      'We may suspend or terminate your access for violations of these Terms, with or without notice. Upon termination, your right to use the Service ceases immediately.',
      'You may terminate by ceasing use or submitting an account deletion request. Provisions relating to IP rights, liability, and governing law survive termination.',
    ],
  },
  {
    id: 'governing',
    icon: Globe,
    title: 'Governing Law & Jurisdiction',
    content: [
      'These Terms are governed by the laws of India. Any disputes shall be resolved exclusively in the competent courts of Mumbai, Maharashtra, India.',
      'We reserve the right to seek injunctive relief in any jurisdiction for intellectual property violations without waiving other available remedies.',
    ],
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Information',
    content: [
      'For questions or concerns about these Terms, please contact our legal team:',
    ],
    contact: true,
  },
];

export default function TermsAndConditionsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-14 lg:py-18">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Scale className="w-3.5 h-3.5" />
              Legal
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">Terms & Conditions</h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed mb-4">
              Please read these terms carefully before using XourceBase. They govern your access to and use of our services.
            </p>
            <p className="text-xs text-gray-400">Last updated: December 15, 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 items-start">

          {/* ── Sticky TOC (desktop) ── */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">On this page</p>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                    active === s.id
                      ? 'bg-red-50 text-[#8B0000] font-semibold'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-xs text-[#8B0000] font-semibold mb-1">Questions?</p>
              <p className="text-xs text-gray-500 mb-2">Our team is happy to clarify any clause.</p>
              <Link href="/contact" className="text-xs font-bold text-[#8B0000] hover:underline">
                Contact us →
              </Link>
            </div>
          </aside>

          {/* ── Sections ── */}
          <div className="space-y-5">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 scroll-mt-24"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900 pt-1.5">{s.title}</h2>
                </div>

                <div className="space-y-3 text-sm text-gray-600 leading-relaxed pl-14">
                  {s.content.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}

                  {s.bullets && (
                    <ul className="space-y-2 mt-1">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] flex-shrink-0 mt-1.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.contact && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="font-semibold text-gray-800 text-xs mb-1">Email</p>
                      <a href="mailto:contact@xourcebase.com" className="text-[#8B0000] font-semibold hover:underline text-sm">
                        contact@xourcebase.com
                      </a>
                      <p className="text-xs text-gray-400 mt-1">We respond within 48 business hours.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Bottom note */}
            <p className="text-center text-xs text-gray-400 pt-4">
              Last updated: December 15, 2025 · © {new Date().getFullYear()} XourceBase, Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}