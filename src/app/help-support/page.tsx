'use client';

// src/app/help-support/page.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  MessageCircle, Mail, BookOpen, Users, ChevronDown,
  Phone, Search, LifeBuoy,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const SUPPORT_CARDS = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get personalized help from our team — we reply within 24 hours.',
    action: 'Contact Us',
    path: '/contact',
    color: 'bg-red-50 text-[#8B0000]',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Step-by-step guides, FAQs, and setup tutorials for every feature.',
    action: 'Browse Docs',
    path: '/docs',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Ask questions and get answers from thousands of fellow learners.',
    action: 'Join Forum',
    path: '/community-forum',
    color: 'bg-emerald-50 text-emerald-700',
  },
];

const FAQS = [
  {
    question: 'How do I join a workshop?',
    answer: 'Visit the workshop page, click "Join Now", fill in your details, and complete payment. You\'ll receive instant access and joining instructions via email.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major cards, UPI, net banking, and wallets through Razorpay — India\'s most secure payment gateway. All transactions are encrypted.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes! We offer a 100% refund if you\'re not satisfied after attending the workshop. Just email us within 7 days of the session — no questions asked.',
  },
  {
    question: 'Will I get a recording if I miss the live workshop?',
    answer: 'Yes! All paid workshops include lifetime access to the high-quality recording, plus bonus materials and resources.',
  },
  {
    question: 'How soon can I access the workshop after payment?',
    answer: 'Instantly! As soon as payment is successful, you\'ll get a confirmation email with Zoom link, calendar invite, and access to any pre-work materials.',
  },
  {
    question: 'Can I get an invoice or certificate?',
    answer: 'Yes. Invoices are sent automatically. Participation certificates are issued upon completion for most workshops.',
  },
  {
    question: 'Do you offer group or corporate discounts?',
    answer: 'Absolutely! Contact us for special rates on bulk enrollments for teams, colleges, or organizations.',
  },
  {
    question: 'How do I apply a coupon code?',
    answer: 'On the checkout page, enter your coupon code in the "Coupon Code" field and click "Apply". The discount will reflect instantly.',
  },
];

export default function HelpAndSupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <LifeBuoy className="w-3.5 h-3.5" />
              We're here to help
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Help & Support</h1>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8">
              Browse our FAQ, explore docs, or reach out — we'll get you sorted.
            </p>
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search FAQs…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] shadow-sm transition"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-16 space-y-20">

        {/* ── Support Cards ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">How Can We Help?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SUPPORT_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{card.description}</p>
                <Link
                  href={card.path}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B0000] hover:underline transition-colors"
                >
                  {card.action} →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <p className="text-[#8B0000] font-semibold text-xs uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No results for "{search}"</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-3">
              {filtered.map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-gray-50">
                          <p className="text-sm text-gray-500 leading-relaxed pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── Still need help CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="bg-[#8B0000] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Still need help?</h3>
            <p className="text-red-200 text-sm mb-8 max-w-sm mx-auto">Our support team replies within 24 business hours. Don't hesitate to reach out.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#8B0000] font-bold px-7 py-3.5 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </Link>
              <a
                href="tel:+918767765307"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-7 py-3.5 rounded-2xl text-sm hover:bg-white/20 active:scale-[0.97] transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}