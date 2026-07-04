'use client';

// src/app/trainings/page.tsx

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Clock, Users, Zap, ArrowRight, CheckCircle2,
  BookOpen, Award, BarChart3, Filter, Search,
  Star, Tag,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Level    = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type Category = 'All' | 'Cloud & DevOps' | 'Communication' | 'Data' | 'Programming';

interface Training {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<Category, 'All'>;
  level: Exclude<Level, 'All'>;
  duration: string;
  enrolled: number;
  rating: number;
  reviews: number;
  accent: string;
  badgeColor: string;
  tag: string;
  tagColor: string;
  description: string;
  topics: string[];
  outcomes: string[];
  price: string;
  originalPrice?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const trainings: Training[] = [
  {
    id: 1,
    title: 'Cloud & DevOps Career Accelerator',
    subtitle: 'AWS · Azure · Kubernetes · Terraform · CI/CD',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    duration: '12 Weeks',
    enrolled: 128,
    rating: 4.9,
    reviews: 84,
    accent: 'from-indigo-500 to-purple-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    tag: 'Bestseller',
    tagColor: 'bg-amber-100 text-amber-700',
    description:
      'A comprehensive cohort program covering AWS, Azure, Kubernetes, Terraform, and CI/CD pipelines. Real-world capstone project, placement assistance, and 1:1 mentorship included.',
    topics: ['AWS / Azure', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Docker', 'Monitoring & Logging', 'Linux', 'Networking'],
    outcomes: [
      'Deploy production-grade cloud infrastructure',
      'Build CI/CD pipelines from scratch',
      'Clear AWS Solutions Architect / Azure Administrator certifications',
      'Get placement-ready with resume & mock interviews',
    ],
    price: '₹24,999',
    originalPrice: '₹39,999',
  },
  {
    id: 2,
    title: 'BPO & Communication Excellence',
    subtitle: 'Voice · Non-Voice · Soft Skills · Interview Prep',
    category: 'Communication',
    level: 'Beginner',
    duration: '6 Weeks',
    enrolled: 214,
    rating: 4.8,
    reviews: 152,
    accent: 'from-teal-500 to-green-600',
    badgeColor: 'bg-teal-100 text-teal-700',
    tag: 'New Batch',
    tagColor: 'bg-emerald-100 text-emerald-700',
    description:
      'Launch your BPO or communication career with expert voice training, email etiquette, personality development, and live mock interviews. Perfect for freshers and career switchers.',
    topics: ['Voice & Accent', 'Email Etiquette', 'STAR Method', 'Personality Development', 'Soft Skills', 'Mock Interviews'],
    outcomes: [
      'Communicate confidently in professional environments',
      'Clear international BPO interviews',
      'Build a strong personal brand',
      'Master customer handling and conflict resolution',
    ],
    price: '₹8,999',
    originalPrice: '₹14,999',
  },
  {
    id: 3,
    title: 'Data Engineering Foundations',
    subtitle: 'Python · SQL · Spark · AWS Redshift · ETL',
    category: 'Data',
    level: 'Intermediate',
    duration: '8 Weeks',
    enrolled: 76,
    rating: 4.7,
    reviews: 41,
    accent: 'from-rose-500 to-orange-500',
    badgeColor: 'bg-rose-100 text-rose-700',
    tag: 'Upcoming',
    tagColor: 'bg-rose-100 text-rose-700',
    description:
      'Master the data pipeline stack — Python, SQL, Apache Spark, and AWS Redshift. Build a portfolio-ready ETL project and learn to work with large-scale distributed datasets.',
    topics: ['Python', 'SQL', 'Apache Spark', 'AWS Redshift', 'ETL Pipelines', 'Airflow', 'Data Modeling'],
    outcomes: [
      'Build end-to-end ETL pipelines',
      'Work with real-world big data sets',
      'Deploy data solutions on AWS',
      'Portfolio-ready capstone project',
    ],
    price: '₹18,999',
    originalPrice: '₹29,999',
  },
  {
    id: 4,
    title: 'Python for Professionals',
    subtitle: 'Core Python · OOP · Automation · APIs · Projects',
    category: 'Programming',
    level: 'Beginner',
    duration: '6 Weeks',
    enrolled: 189,
    rating: 4.8,
    reviews: 113,
    accent: 'from-yellow-500 to-orange-500',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    tag: 'Popular',
    tagColor: 'bg-yellow-100 text-yellow-700',
    description:
      'Go from zero to job-ready Python developer. Covers core Python, OOP, REST APIs, automation scripts, and 3 hands-on projects. Great foundation for DevOps and Data paths.',
    topics: ['Core Python', 'OOP', 'File Handling', 'REST APIs', 'Automation', 'Git & GitHub', 'Project Portfolio'],
    outcomes: [
      'Write clean, production-grade Python code',
      'Automate repetitive tasks',
      'Build and consume REST APIs',
      'Contribute to open-source or freelance projects',
    ],
    price: '₹11,999',
    originalPrice: '₹19,999',
  },
  {
    id: 5,
    title: 'AWS Solutions Architect – Certification Track',
    subtitle: 'SAA-C03 Exam Prep · Practice Tests · Labs',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    duration: '5 Weeks',
    enrolled: 97,
    rating: 4.9,
    reviews: 68,
    accent: 'from-sky-500 to-indigo-600',
    badgeColor: 'bg-sky-100 text-sky-700',
    tag: 'Certification',
    tagColor: 'bg-sky-100 text-sky-700',
    description:
      'A focused exam-prep track for the AWS Solutions Architect Associate (SAA-C03). Includes video lectures, 500+ practice questions, hands-on labs, and a strategy session with a certified mentor.',
    topics: ['IAM', 'EC2 & ECS', 'S3 & Storage', 'RDS & DynamoDB', 'CloudFront & Route 53', 'VPC & Security', 'Well-Architected Framework'],
    outcomes: [
      'Clear AWS SAA-C03 on first attempt',
      'Design resilient, cost-effective architectures',
      'Access 500+ curated practice questions',
      '1-on-1 exam strategy session',
    ],
    price: '₹13,999',
    originalPrice: '₹21,999',
  },
  {
    id: 6,
    title: 'Leadership & Corporate Communication',
    subtitle: 'Executive Presence · Negotiation · Presentation Skills',
    category: 'Communication',
    level: 'Intermediate',
    duration: '4 Weeks',
    enrolled: 61,
    rating: 4.6,
    reviews: 29,
    accent: 'from-violet-500 to-pink-500',
    badgeColor: 'bg-violet-100 text-violet-700',
    tag: 'New',
    tagColor: 'bg-violet-100 text-violet-700',
    description:
      'Designed for working professionals aiming at managerial roles. Build executive presence, negotiation skills, and persuasive presentation techniques used in boardrooms.',
    topics: ['Executive Presence', 'Negotiation Tactics', 'Storytelling', 'Public Speaking', 'Email & Proposal Writing', 'Conflict Resolution'],
    outcomes: [
      'Command attention in meetings and presentations',
      'Negotiate effectively with stakeholders',
      'Write crisp, impactful business communication',
      'Build a personal leadership brand',
    ],
    price: '₹9,999',
    originalPrice: '₹16,999',
  },
];

const CATEGORIES: Category[] = ['All', 'Cloud & DevOps', 'Communication', 'Data', 'Programming'];
const LEVELS: Level[]         = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// ─── Animation (module-level — same pattern as workshops) ─────────────────────

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Beginner:     'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced:     'bg-red-100   text-red-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${map[level] ?? 'bg-gray-100 text-gray-600'}`}>
      <Zap className="w-3 h-3" />
      {level}
    </span>
  );
}

// ── EnrolModal ─────────────────────────────────────────────────────────────────
function EnrolModal({ training, onClose }: { training: Training; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className={`h-1.5 bg-gradient-to-r ${training.accent} rounded-full mb-6`} />
        <h3 className="text-xl font-extrabold text-gray-900 mb-1">Enrol in Program</h3>
        <p className="text-sm font-semibold text-gray-700 mb-1">{training.title}</p>
        <p className="text-xs text-gray-400 mb-6">{training.subtitle}</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Program fee</span>
            <span className="font-bold text-gray-900">{training.price}</span>
          </div>
          {training.originalPrice && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Original price</span>
              <span className="text-gray-400 line-through">{training.originalPrice}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Duration</span>
            <span className="font-semibold text-gray-700">{training.duration}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className={`flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r ${training.accent} text-white font-bold text-sm rounded-xl transition-opacity hover:opacity-90`}
          >
            Proceed to Enrolment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── TrainingCard ───────────────────────────────────────────────────────────────

function TrainingCard({ t }: { t: Training }) {
  // Isolated state per card — same pattern as WorkshopCard
  const [expanded, setExpanded]     = useState(false);
  const [showEnrol, setShowEnrol]   = useState(false);

  const discount = t.originalPrice
    ? Math.round((1 - parseInt(t.price.replace(/[^\d]/g, '')) / parseInt(t.originalPrice.replace(/[^\d]/g, ''))) * 100)
    : 0;

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-100 overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Gradient stripe — matches workshop card */}
        <div className={`h-1.5 bg-gradient-to-r ${t.accent}`} />

        <div className="p-7 flex flex-col flex-1">

          {/* Top row: tags + level badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.tagColor}`}>
                <Tag className="w-3 h-3 inline mr-1" />
                {t.tag}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.badgeColor}`}>
                {t.category}
              </span>
            </div>
            <LevelBadge level={t.level} />
          </div>

          {/* Title + subtitle */}
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-300 leading-snug">
            {t.title}
          </h3>
          <p className="text-xs text-gray-400 mb-4 font-medium">{t.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5">{t.description}</p>

          {/* Topics chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {t.topics.slice(0, 5).map((topic) => (
              <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                {topic}
              </span>
            ))}
            {t.topics.length > 5 && (
              <span className="text-xs bg-gray-100 text-gray-400 px-2.5 py-1 rounded-lg font-medium">
                +{t.topics.length - 5} more
              </span>
            )}
          </div>

          {/* Expandable outcomes — AnimatePresence matches workshops */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                key={`outcomes-${t.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 mb-5 overflow-hidden"
              >
                {t.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {o}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-xs text-indigo-600 font-semibold mb-5 text-left hover:underline"
          >
            {expanded ? "▲ Hide outcomes" : "▼ What you'll learn"}
          </button>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-gray-600 mb-5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>{t.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>{t.enrolled.toLocaleString()} enrolled</span>
            </div>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-bold text-gray-800">{t.rating}</span>
            <StarRating rating={t.rating} />
            <span className="text-xs text-gray-400">({t.reviews} reviews)</span>
          </div>

          {/* Price + CTA — same layout as workshop card */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div>
              <span className="text-xl font-bold text-gray-900">{t.price}</span>
              {t.originalPrice && (
                <>
                  <span className="ml-2 text-sm text-gray-400 line-through">{t.originalPrice}</span>
                  <span className="ml-1.5 text-xs font-bold text-emerald-600">{discount}% off</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowEnrol(true)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${t.accent} hover:opacity-90 transition-opacity duration-300 shadow-md whitespace-nowrap`}
            >
              Enrol Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Enrol modal — per card, only when triggered */}
      <AnimatePresence>
        {showEnrol && (
          <EnrolModal training={t} onClose={() => setShowEnrol(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainingsPage() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [level,    setLevel]    = useState<Level>('All');

  const filtered = trainings.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch   = t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    const matchCategory = category === 'All' || t.category === category;
    const matchLevel    = level    === 'All' || t.level    === level;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <>
      {/* ── Hero — same structure as workshops hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-rose-500 text-white py-24 lg:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center max-w-4xl mx-auto">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-6">
              Structured Programs
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Training Programs Built for{' '}
              <span className="text-yellow-300">Real Careers</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Multi-week cohort programs with 1:1 mentorship, capstone projects, and placement support — designed for students, freshers, and working professionals.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 text-sm">
              {[
                { icon: BookOpen,  label: `${trainings.length} Programs` },
                { icon: Users,     label: '600+ Students Enrolled' },
                { icon: Award,     label: 'Placement Assistance' },
                { icon: BarChart3, label: 'Industry-Aligned Curriculum' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 opacity-90">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky filter bar — same structure as workshops ── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-wrap">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs or topics…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    category === c ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Level */}
            <div className="flex items-center gap-2 flex-wrap">
              {LEVELS.map((l) => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    level === l ? 'bg-rose-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {l}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Cards grid — same bg and structure as workshops ── */}
      <section className="py-16 px-6 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto max-w-7xl">

          {/* Result count */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of {trainings.length} programs
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No programs match your filters.</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
                className="mt-4 text-indigo-600 text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${search}-${category}-${level}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            >
              {filtered.map((t) => (
                <TrainingCard key={t.id} t={t} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA — same as workshops ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Program to Choose?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8">
              Book a free 1:1 career guidance call with our mentors and get a personalised learning roadmap.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold bg-white text-[#8B0000] rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl">
                Book Free Counselling
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/workshops"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300">
                Explore Workshops
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}