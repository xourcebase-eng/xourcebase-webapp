'use client';

// src/app/sitemap/page.tsx
// Reskinned to match the "Career Accelerator" design system.

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
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
  Search,
} from 'lucide-react';

// ─── Design tokens ─────────────────────────────────────────────────────────────
// paper #F5F5F2 · ink #14141A · lime #C6FF3D · coral #FF3D57 · azure #3D5AFF · gold #FFB800

function useAcceleratorFonts() {
  useEffect(() => {
    const id = 'accelerator-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);
}

const DISPLAY = "'Archivo Black', sans-serif";
const MONO    = "'Space Grotesk', sans-serif";

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
    accentBg: '#C6FF3D',
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
    accentBg: '#3D5AFF',
    pages: [
      { name: 'Blog', path: '/blog', icon: BookOpen, desc: 'Articles, tips & insights' },
      { name: 'Help & Support', path: '/help-support', icon: LifeBuoy, desc: 'FAQs and assistance' },
      { name: 'Teach on XourceBase', path: '/teach-xourcebase', icon: Mic2, desc: 'Become an instructor' },
      { name: 'Check Registration', path: '/check-registration', icon: Search, desc: 'Look up a workshop registration' },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    description: 'Legal, business, and careers',
    accentBg: '#FF3D57',
    pages: [
      { name: 'Careers', path: '/careers', icon: Briefcase, desc: 'Join our growing team' },
      { name: 'XourceBase for Business', path: '/xourcebase-business', icon: Building2, desc: 'Team & enterprise plans' },
      { name: 'Terms & Conditions', path: '/terms-conditions', icon: FileText, desc: 'Usage rules & policies' },
      { name: 'Privacy Policy', path: '/privacy-policy', icon: ShieldCheck, desc: 'How we handle your data' },
    ],
  },
];

export default function SitemapPage() {
  useAcceleratorFonts();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#14141A] text-white border-b-2 border-[#14141A]">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-14 lg:py-18 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>
              <MapPinned className="w-3.5 h-3.5" />
              Navigation
            </div>
            <h1 className="text-3xl md:text-5xl mb-3" style={{ fontFamily: DISPLAY }}>
              SITEMAP
            </h1>
            <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">
              A complete overview of every page on XourceBase — find exactly what you&apos;re looking for, fast.
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
              className="relative bg-white border-2 border-[#14141A] p-7 scroll-mt-24 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: cat.accentBg }} />

              {/* Category header */}
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-[#14141A]" style={{ fontFamily: MONO }}>{cat.label.toUpperCase()}</h2>
                <p className="text-xs text-[#14141A]/50 mt-0.5">{cat.description}</p>
              </div>

              {/* Page links grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.pages.map(({ name, path, icon: Icon, desc }) => (
                  <Link
                    key={path}
                    href={path}
                    className="group flex items-center gap-3 p-4 bg-[#F5F5F2] border-2 border-[#14141A]/10 hover:border-[#14141A] transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 border-2 border-[#14141A]/20 group-hover:border-[#14141A] flex items-center justify-center flex-shrink-0 bg-white transition-colors">
                      <Icon className="w-4 h-4 text-[#14141A]" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#14141A] truncate">
                        {name}
                      </p>
                      <p className="text-xs text-[#14141A]/50 truncate">{desc}</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-3.5 h-3.5 text-[#14141A]/30 group-hover:text-[#14141A] flex-shrink-0 transition-colors -translate-x-1 group-hover:translate-x-0 duration-200" />
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
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-2 border-[#14141A] px-7 py-5"
        >
          <div>
            <p className="text-sm font-bold text-[#14141A]">Looking for the XML sitemap?</p>
            <p className="text-xs text-[#14141A]/50 mt-0.5">
              For search engines and crawlers — available at the link below.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#14141A] text-white text-xs font-bold tracking-wide hover:bg-black active:scale-95 transition-all flex-shrink-0"
            style={{ fontFamily: MONO }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            SITEMAP.XML
          </a>
        </motion.div>

        {/* Bottom note */}
        <p className="text-center text-xs text-[#14141A]/40 pt-8">
          © {new Date().getFullYear()} XourceBase, Inc. · Mumbai, India
        </p>
      </div>
    </div>
  );
}