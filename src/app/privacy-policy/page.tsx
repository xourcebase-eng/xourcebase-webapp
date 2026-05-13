'use client';

// src/app/privacy-policy/page.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Cookie,
  UserCheck,
  Mail,
  Eye,
  ChevronRight,
  Database,
} from 'lucide-react';

/* ── Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' },
  }),
};

/* ── Section data ── */
const SECTIONS = [
  {
    id: 'collect',
    icon: Database,
    title: 'Information We Collect',
    intro: 'We collect information to provide and improve our services. This includes:',
    bullets: [
      {
        label: 'Personal Information',
        text: 'Name, email address, phone number, and payment details when you enrol in programmes or contact us.',
      },
      {
        label: 'Usage Data',
        text: 'Information about how you interact with our site — pages visited and time spent — to enhance user experience.',
      },
      {
        label: 'Cookies & Tracking',
        text: 'Small data files to remember preferences and analyse site performance (see Cookies Policy below).',
      },
    ],
    footer: 'We only collect what is necessary and do not sell your data to third parties.',
  },
  {
    id: 'use',
    icon: Eye,
    title: 'How We Use Information',
    intro: 'Your information helps us:',
    bullets: [
      {
        label: null,
        text: 'Process enrolments and provide personalised programme recommendations.',
      },
      {
        label: null,
        text: 'Send updates, newsletters, and promotional content — you can opt out at any time.',
      },
      {
        label: null,
        text: 'Improve our platform through analytics and feedback.',
      },
      {
        label: null,
        text: 'Comply with legal obligations, such as fraud prevention.',
      },
    ],
    footer: 'We use secure processors for payments and do not store sensitive financial details.',
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Data Security',
    intro: 'Protecting your data is essential. We implement:',
    bullets: [
      {
        label: 'Encryption',
        text: 'Industry-standard SSL/TLS encryption for data in transit and at rest.',
      },
      {
        label: 'Access Controls',
        text: 'Regular security audits and strict access controls to prevent unauthorised access.',
      },
      {
        label: 'Compliance',
        text: 'Full compliance with GDPR and Indian data protection laws.',
      },
    ],
    footer: 'In the unlikely event of a breach, we will notify affected users promptly.',
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies Policy',
    intro: 'We use cookies to enhance your experience:',
    bullets: [
      {
        label: 'Essential Cookies',
        text: 'Necessary for core site functionality, such as session management.',
      },
      {
        label: 'Analytics Cookies',
        text: 'To understand usage patterns (e.g. Google Analytics — anonymised data only).',
      },
      {
        label: 'Marketing Cookies',
        text: 'For personalised ads. You can manage or disable these via your browser settings.',
      },
    ],
    footer: 'You can disable cookies in your browser, though this may affect certain site features. Cookie Settings coming soon.',
  },
  {
    id: 'rights',
    icon: UserCheck,
    title: 'Your Rights & Choices',
    intro: 'You have full control over your data:',
    bullets: [
      {
        label: 'Access & Update',
        text: 'View or edit your information at any time via your account dashboard.',
      },
      {
        label: 'Deletion',
        text: 'Request data deletion, subject to any legal retention requirements.',
      },
      {
        label: 'Opt-Out',
        text: 'Unsubscribe from marketing emails or disable cookies at any point.',
      },
      {
        label: 'Complaints',
        text: 'Contact us or the relevant data authority if you have concerns about data handling.',
      },
    ],
    footer: 'We respond to all data requests within 30 days.',
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Information',
    intro: 'Questions about this policy? Reach out to our privacy team:',
    bullets: [],
    footer: null,
    isContact: true,
  },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-14 lg:py-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Shield className="w-3.5 h-3.5" />
              Legal
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed mb-4">
              At XourceBase, your privacy is our priority. We are committed to protecting your personal information and being fully transparent about how your data is handled.
            </p>
            <p className="text-xs text-gray-400">Last updated: December 15, 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 items-start">

          {/* ── Sticky TOC (desktop) ── */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              On this page
            </p>
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
              <p className="text-xs text-gray-500 mb-2">
                Our team is happy to clarify any part of this policy.
              </p>
              <Link
                href="/contact"
                className="text-xs font-bold text-[#8B0000] hover:underline"
              >
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
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 scroll-mt-24"
              >
                {/* Section header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900 pt-1.5">{s.title}</h2>
                </div>

                <div className="space-y-4 text-sm text-gray-600 leading-relaxed pl-14">
                  {s.intro && <p>{s.intro}</p>}

                  {/* Bullets */}
                  {s.bullets.length > 0 && (
                    <ul className="space-y-2.5 mt-1">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] flex-shrink-0 mt-1.5" />
                          <span>
                            {b.label && (
                              <strong className="text-gray-800">{b.label}: </strong>
                            )}
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact block */}
                  {s.isContact && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="font-semibold text-gray-800 text-xs mb-1">Email</p>
                      <a
                        href="mailto:contact@xourcebase.com"
                        className="text-[#8B0000] font-semibold hover:underline text-sm"
                      >
                        contact@xourcebase.com
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        We respond within 48 hours.
                      </p>
                    </div>
                  )}

                  {s.footer && (
                    <p className="text-gray-500 italic text-xs pt-1">{s.footer}</p>
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