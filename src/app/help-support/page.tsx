'use client';

// src/app/help-support/page.tsx
// Fully reskinned to match "Career Accelerator" design

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MessageCircle, Mail, BookOpen, Users, ChevronDown,
  Phone, Search, LifeBuoy, CheckCircle2,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const SUPPORT_CARDS = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get personalized help from our team — we reply within 24 hours.',
    action: 'Contact Us',
    path: '/contact',
    accent: '#FF3D57',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Step-by-step guides, FAQs, and setup tutorials for every feature.',
    action: 'Browse Docs',
    path: '/docs',
    accent: '#3D5AFF',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Ask questions and get answers from thousands of fellow learners.',
    action: 'Join Forum',
    path: '/community-forum',
    accent: '#C6FF3D',
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
              <LifeBuoy className="inline w-3.5 h-3.5 mr-1" /> WE'RE HERE TO HELP
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] font-extrabold mb-6"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              HELP &amp;<br />SUPPORT
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/60 max-w-xl">
              Get fast answers, expert guidance, and everything you need to succeed in your learning journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Support Cards ── */}
      <section className="py-16 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              HOW CAN WE HELP YOU?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPORT_CARDS.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="relative bg-white border-2 border-[#14141A] flex flex-col p-8 group overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: card.accent }} />

                <div
                  className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mb-6"
                  style={{ background: card.accent === '#C6FF3D' ? '#C6FF3D' : 'white' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: card.accent === '#C6FF3D' ? '#14141A' : '#14141A' }} />
                </div>

                <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  {card.title.toUpperCase()}
                </h3>

                <p className="text-sm text-[#14141A]/70 flex-1 mb-8">{card.description}</p>

                <Link
                  href={card.path}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold tracking-wide border-2 border-[#14141A] hover:bg-[#14141A] hover:text-white px-6 py-3 transition-all"
                >
                  {card.action} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 px-6 bg-white border-t-2 border-[#14141A]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-end mb-12">
            <div>
              <p className="text-[#FF3D57] font-bold tracking-widest text-xs mb-2">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-[#14141A] bg-white focus:outline-none text-sm placeholder:text-[#14141A]/40"
                />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#14141A]/40">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <p>No matching questions found.</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {filtered.map((faq, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="border-2 border-[#14141A] bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F5F2] transition-colors"
                  >
                    <span className="font-bold pr-6 text-left">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-[#14141A]"
                      >
                        <div className="px-6 py-6 text-[#14141A]/80 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 bg-[#14141A] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              STILL NEED HELP?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
              Our support team usually replies within 24 business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C6FF3D] text-[#14141A] font-bold px-8 py-4 text-sm tracking-wide hover:brightness-110 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                CONTACT SUPPORT
              </Link>

              <a
                href="tel:+918767765307"
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:bg-white/10 font-bold px-8 py-4 text-sm tracking-wide transition-all"
              >
                <Phone className="w-4 h-4" />
                CALL US
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}