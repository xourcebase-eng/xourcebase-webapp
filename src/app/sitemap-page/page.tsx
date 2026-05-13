'use client';

// src/app/sitemap/page.tsx

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  MapPinned,
  Home,
  Info,
  Wrench,
  GraduationCap,
  Phone,
  BookOpen,
  LifeBuoy,
  Mic2,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
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

/* ── Sitemap data with icons + descriptions ── */
const CATEGORIES = [
  {
    id: 'main',
    label: 'Main Pages',
    description: 'Core navigation across XourceBase',
    pages: [
      { name: 'Home', path: '/', icon: Home, desc: 'Landing page & highlights' },
      { name: 'About Us', path: '/about-us', icon: Info, desc: 'Our story and mission' },
      { name: 'Workshops', path: '/workshops', icon: Wrench, desc: 'Hands-on skill sessions' },
      { name: 'Trainings', path: '/trainings', icon: GraduationCap, desc: 'In-depth learning programmes' },
      { name: 'Contact', path: '/contact', icon: Phone, desc: 'Get in touch with us' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Tools and support for learners',
    pages: [
      { name: 'Blog', path: '/blog', icon: BookOpen, desc: 'Articles, tips & insights' },
      { name: 'Help & Support', path: '/help-support', icon: LifeBuoy, desc: 'FAQs and assistance' },
      { name: 'Teach on XourceBase', path: '/teach-xourcebase', icon: Mic2, desc: 'Become an instructor' },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    description: 'Legal, business, and careers',
    pages: [
      { name: 'Careers', path: '/careers', icon: Briefcase, desc: 'Join our growing team' },
      { name: 'XourceBase for Business', path: '/xourcebase-business', icon: Building2, desc: 'Team & enterprise plans' },
      { name: 'Terms & Conditions', path: '/terms-conditions', icon: FileText, desc: 'Usage rules & policies' },
      { name: 'Privacy Policy', path: '/privacy-policy', icon: ShieldCheck, desc: 'How we handle your data' },
    ],
  },
];

export default function SitemapPage() {
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
              <MapPinned className="w-3.5 h-3.5" />
              Navigation
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Sitemap
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
              A complete overview of every page on XourceBase — find exactly what you're looking for, fast.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 lg:py-16">
        <div className="space-y-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              id={cat.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 scroll-mt-24"
            >
              {/* Category header */}
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-gray-900">{cat.label}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
              </div>

              {/* Page links grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.pages.map(({ name, path, icon: Icon, desc }) => (
                  <Link
                    key={path}
                    href={path}
                    className="group flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-red-50 transition-colors">
                      <Icon className="w-4 h-4 text-[#8B0000]" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-[#8B0000] transition-colors truncate">
                        {name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{desc}</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#8B0000] flex-shrink-0 transition-colors -translate-x-1 group-hover:translate-x-0 duration-200" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom XML sitemap note ── */}
        <motion.div
          custom={CATEGORIES.length}
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm px-7 py-5"
        >
          <div>
            <p className="text-sm font-bold text-gray-800">Looking for the XML sitemap?</p>
            <p className="text-xs text-gray-400 mt-0.5">
              For search engines and crawlers — available at the link below.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#8B0000] text-white text-xs font-bold rounded-xl hover:bg-[#6d0000] active:scale-95 transition-all flex-shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            sitemap.xml
          </a>
        </motion.div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 pt-8">
          © {new Date().getFullYear()} XourceBase, Inc. · Mumbai, India
        </p>
      </div>
    </div>
  );
}