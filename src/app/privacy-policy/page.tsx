'use client';

// src/app/privacy-policy/page.tsx
// Reskinned to Career Accelerator style

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Cookie, UserCheck, Mail, Eye, Database, Share2,
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
    id: 'collect',
    icon: Database,
    title: 'Information We Collect',
    intro: 'We collect information to provide and improve our services:',
    bullets: [
      { label: 'Registration Information', text: 'Full name, email, phone number, WhatsApp number, current role, and experience level when you register for a workshop.' },
      { label: 'Payment Information', text: 'For paid workshops, the amount paid and a payment/order reference from our payment processor. We never see or store your card, UPI, or bank details — those are handled entirely by Razorpay.' },
      { label: 'Account Information', text: 'If you sign in with Google or GitHub, we receive your name, email address, and profile picture from that provider.' },
      { label: 'Usage Data', text: 'How you interact with our platform, collected via Google Analytics, to improve experience.' },
      { label: 'Cookies', text: 'Small files used to keep you signed in and to analyse site performance.' },
    ],
    footer: 'We only collect what is necessary and never sell your data.',
  },
  {
    id: 'use',
    icon: Eye,
    title: 'How We Use Information',
    intro: 'Your information helps us:',
    bullets: [
      { label: null, text: 'Confirm your workshop registration and send you joining links, receipts, and reminders by email and WhatsApp.' },
      { label: null, text: 'Process payments for paid workshops.' },
      { label: null, text: 'Let you look up your own registration later using your Registration ID or email.' },
      { label: null, text: 'Improve our platform through analytics.' },
      { label: null, text: 'Comply with legal obligations.' },
    ],
    footer: 'Payments are processed securely — we do not store sensitive card details.',
  },
  {
    id: 'sharing',
    icon: Share2,
    title: 'Third-Party Services We Use',
    intro: 'We share the minimum information necessary with the following services in order to operate XourceBase. We do not sell your data to anyone.',
    bullets: [
      { label: 'Razorpay', text: 'Processes payments for paid workshops. Receives your name, email, phone, and payment amount.' },
      { label: 'Google (Sign-In & Analytics)', text: 'Provides "Sign in with Google" and anonymised usage analytics via Google Analytics.' },
      { label: 'GitHub', text: 'Provides "Sign in with GitHub" if you choose that option.' },
      { label: 'UltraMsg', text: 'A WhatsApp messaging provider we use to send registration confirmations. Receives your phone number and name.' },
      { label: 'EmailJS / Email Delivery', text: 'Used to deliver contact-form messages and confirmation/receipt emails.' },
      { label: 'Google Sheets', text: 'Workshop registrations (contact details, workshop, and payment status) are securely stored in a private Google Sheet accessible only to XourceBase staff, so we can manage seats and respond to support requests.' },
    ],
    footer: 'Each of these providers has its own privacy policy governing how it handles data on our behalf.',
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Data Security',
    intro: 'We take data protection seriously and implement:',
    bullets: [
      { label: 'Encryption', text: 'SSL/TLS for data in transit and at rest.' },
      { label: 'Access Controls', text: 'Regular audits and strict internal access.' },
      { label: 'Compliance', text: 'GDPR and Indian data protection laws.' },
    ],
    footer: 'We will notify you promptly in case of any security incident.',
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies Policy',
    intro: 'We use cookies to enhance your experience:',
    bullets: [
      { label: 'Essential', text: 'Required for core functionality, such as keeping you signed in.' },
      { label: 'Analytics', text: 'Google Analytics cookies help us understand usage patterns in aggregate.' },
    ],
    footer: 'You can disable cookies in your browser settings.',
  },
  {
    id: 'rights',
    icon: UserCheck,
    title: 'Your Rights',
    intro: 'You have full control over your data:',
    bullets: [
      { label: 'Access & Correction', text: 'View or update your information anytime.' },
      { label: 'Deletion', text: 'Request deletion (subject to legal requirements).' },
      { label: 'Opt-Out', text: 'Unsubscribe from marketing at any time.' },
    ],
    footer: 'We respond to data requests within 30 days.',
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Us',
    intro: 'Questions about this Privacy Policy?',
    bullets: [],
    isContact: true,
  },
];

export default function PrivacyPolicyPage() {
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
              <Shield className="inline w-3.5 h-3.5 mr-1" /> LEGAL
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl md:text-7xl leading-[0.95] font-extrabold mb-6"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              PRIVACY<br />POLICY
            </motion.h1>
            <p className="text-[#14141A]/60">Last updated: September 13, 2026</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="lg:grid lg:grid-cols-[240px_1fr] gap-12">

          {/* TOC */}
          <aside className="hidden lg:block sticky top-8 self-start">
            <p className="text-xs font-bold tracking-widest text-[#14141A]/50 mb-4">ON THIS PAGE</p>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`block px-4 py-2.5 text-sm border-l-2 transition-all ${
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
            {SECTIONS.map((s) => (
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

                <div className="pl-14 space-y-4 text-[#14141A]/80">
                  {s.intro && <p>{s.intro}</p>}

                  {s.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-[#C6FF3D] mt-1">•</span>
                          <span>
                            {b.label && <strong>{b.label}:</strong>} {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.isContact && (
                    <div className="mt-6 p-6 border border-[#14141A] bg-[#F5F5F2]">
                      <p className="font-bold mb-1">Privacy Team</p>
                      <a href="mailto:contact@xourcebase.com" className="text-[#FF3D57] hover:underline">
                        contact@xourcebase.com
                      </a>
                    </div>
                  )}

                  {s.footer && <p className="text-xs italic pt-2">{s.footer}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}