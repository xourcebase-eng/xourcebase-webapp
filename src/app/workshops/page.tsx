'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Wifi,
  MapPin,
  Tag,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Mic,
  Star,
  BookOpen,
  Zap,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'All' | 'Online' | 'Offline' | 'Hybrid';
type WCategory = 'All' | 'Cloud & DevOps' | 'Communication' | 'Data' | 'Programming' | 'Career';

interface Workshop {
  id: number;
  title: string;
  host: string;
  hostRole: string;
  date: string;
  time: string;
  duration: string;
  mode: Omit<Mode, 'All'>;
  category: WCategory;
  seats: number;
  seatsLeft: number;
  tag: string;
  tagColor: string;
  accent: string;
  description: string;
  agenda: string[];
  price: string;
  isFree: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const workshops: Workshop[] = [
  {
    id: 1,
    title: 'AWS Cloud Foundations Bootcamp',
    host: 'Rahul Sharma',
    hostRole: 'AWS Solutions Architect at Infosys',
    date: 'May 18, 2025',
    time: '10:00 AM – 1:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Cloud & DevOps',
    seats: 50,
    seatsLeft: 12,
    tag: 'Free',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: 'from-indigo-500 to-purple-600',
    isFree: true,
    price: 'Free',
    description:
      'Kickstart your cloud journey with AWS fundamentals. Covers IAM, EC2, S3, VPC, and billing basics with live demos and interactive Q&A.',
    agenda: [
      'Why Cloud? Industry landscape 2025',
      'AWS Core Services: IAM, EC2, S3',
      'VPC & Networking basics',
      'Live demo: deploying your first EC2',
      'Q&A + Career roadmap discussion',
    ],
  },
  {
    id: 2,
    title: 'DevOps CI/CD Pipeline — Build to Deploy',
    host: 'Priya Desai',
    hostRole: 'DevOps Lead at TCS',
    date: 'May 24, 2025',
    time: '11:00 AM – 2:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Cloud & DevOps',
    seats: 40,
    seatsLeft: 7,
    tag: '₹299',
    tagColor: 'bg-amber-100 text-amber-700',
    accent: 'from-orange-500 to-rose-600',
    isFree: false,
    price: '₹299',
    description:
      'Hands-on workshop: build a full CI/CD pipeline using GitHub Actions, Docker, and Kubernetes. Participants leave with a working pipeline deployed to AWS EKS.',
    agenda: [
      'CI/CD concepts and pipeline anatomy',
      'GitHub Actions: workflows & triggers',
      'Dockerising a Node.js application',
      'Kubernetes deployment on AWS EKS',
      'Monitoring with Prometheus & Grafana',
    ],
  },
  {
    id: 3,
    title: 'Communication & Interview Masterclass',
    host: 'Anita Rao',
    hostRole: 'Senior HR at Capgemini',
    date: 'June 1, 2025',
    time: '3:00 PM – 5:00 PM IST',
    duration: '2 hrs',
    mode: 'Hybrid',
    category: 'Communication',
    seats: 60,
    seatsLeft: 25,
    tag: 'Free',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: 'from-teal-500 to-green-600',
    isFree: true,
    price: 'Free',
    description:
      'Master the STAR method, voice modulation, body language, and structured storytelling. Ends with a live mock interview and individual feedback.',
    agenda: [
      'Common interview mistakes (and fixes)',
      'STAR method: story structure that wins',
      'Voice modulation & body language',
      'Live mock interview round',
      'Personalised feedback session',
    ],
  },
  {
    id: 4,
    title: 'Python for Automation — Zero to Script',
    host: 'Vikram Nair',
    hostRole: 'Software Engineer at Google',
    date: 'June 7, 2025',
    time: '10:00 AM – 12:00 PM IST',
    duration: '2 hrs',
    mode: 'Online',
    category: 'Programming',
    seats: 45,
    seatsLeft: 30,
    tag: '₹199',
    tagColor: 'bg-amber-100 text-amber-700',
    accent: 'from-yellow-500 to-orange-500',
    isFree: false,
    price: '₹199',
    description:
      'Learn Python basics to intermediate scripting in a single focused session. Automate file operations, web scraping, and basic API calls — all live-coded.',
    agenda: [
      'Python setup and environment',
      'Core syntax: loops, functions, modules',
      'File automation (renaming, sorting, moving)',
      'Web scraping with BeautifulSoup',
      'Calling REST APIs with requests',
    ],
  },
  {
    id: 5,
    title: 'Resume & LinkedIn for Tech Roles',
    host: 'Sneha Kulkarni',
    hostRole: 'Technical Recruiter at Wipro',
    date: 'June 12, 2025',
    time: '6:00 PM – 8:00 PM IST',
    duration: '2 hrs',
    mode: 'Online',
    category: 'Career',
    seats: 80,
    seatsLeft: 46,
    tag: 'Free',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: 'from-violet-500 to-pink-500',
    isFree: true,
    price: 'Free',
    description:
      'A recruiter-led session on crafting ATS-friendly resumes and LinkedIn profiles that get callbacks. Includes live critique of volunteer participants\' profiles.',
    agenda: [
      'What recruiters actually look at (3-second rule)',
      'ATS dos and don\'ts',
      'Writing measurable bullet points',
      'LinkedIn headline, summary & skills optimization',
      'Live resume critique (volunteers)',
    ],
  },
  {
    id: 6,
    title: 'Data Pipelines on AWS — Hands-On Lab',
    host: 'Arun Mehta',
    hostRole: 'Data Engineer at Amazon',
    date: 'June 20, 2025',
    time: '2:00 PM – 5:00 PM IST',
    duration: '3 hrs',
    mode: 'Online',
    category: 'Data',
    seats: 35,
    seatsLeft: 20,
    tag: '₹499',
    tagColor: 'bg-amber-100 text-amber-700',
    accent: 'from-rose-500 to-orange-500',
    isFree: false,
    price: '₹499',
    description:
      'Build a real-time data pipeline on AWS using Kinesis, Lambda, and Redshift. Every participant builds and runs their own pipeline during the session.',
    agenda: [
      'AWS data services overview',
      'Streaming data with Kinesis',
      'Processing with AWS Lambda',
      'Loading into Redshift',
      'Dashboarding with QuickSight',
    ],
  },
];

const MODES: Mode[] = ['All', 'Online', 'Offline', 'Hybrid'];
const WCATEGORIES: WCategory[] = ['All', 'Cloud & DevOps', 'Communication', 'Data', 'Programming', 'Career'];

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModeBadge({ mode }: { mode: string }) {
  const map: Record<string, string> = {
    Online: 'bg-sky-100 text-sky-700',
    Offline: 'bg-gray-100 text-gray-700',
    Hybrid: 'bg-violet-100 text-violet-700',
  };
  const Icon = mode === 'Online' ? Wifi : MapPin;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${map[mode] ?? 'bg-gray-100 text-gray-600'}`}>
      <Icon className="w-3 h-3" />
      {mode}
    </span>
  );
}

function SeatBar({ seatsLeft, seats }: { seatsLeft: number; seats: number }) {
  const pct = Math.max(0, Math.min(100, (seatsLeft / seats) * 100));
  const color = pct < 25 ? 'bg-red-500' : pct < 60 ? 'bg-amber-400' : 'bg-emerald-500';
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{seatsLeft} seats left</span>
        <span>{seats} total</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function WorkshopCard({ w }: { w: Workshop }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-100 overflow-hidden flex flex-col transition-all duration-400"
    >
      {/* Gradient stripe */}
      <div className={`h-1.5 bg-gradient-to-r ${w.accent}`} />

      <div className="p-7 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${w.tagColor}`}>
              <Tag className="w-3 h-3 inline mr-1" />
              {w.tag}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
              {w.category}
            </span>
          </div>
          <ModeBadge mode={w.mode as string} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-300 leading-snug">
          {w.title}
        </h3>

        {/* Host */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${w.accent} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {w.host.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="text-xs text-gray-500 leading-tight">
            <span className="font-semibold text-gray-700">{w.host}</span>
            <br />
            {w.hostRole}
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{w.description}</p>

        {/* Agenda toggle */}
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 mb-5"
          >
            {w.agenda.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </motion.ul>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-indigo-600 font-semibold mb-5 text-left hover:underline"
        >
          {expanded ? '▲ Hide agenda' : '▼ View agenda'}
        </button>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-gray-600 mb-5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>{w.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>{w.time}</span>
          </div>
        </div>

        {/* Seat bar */}
        <div className="mb-6">
          <SeatBar seatsLeft={w.seatsLeft} seats={w.seats} />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className={`text-xl font-bold ${w.isFree ? 'text-emerald-600' : 'text-gray-900'}`}>
              {w.price}
            </span>
            {!w.isFree && (
              <span className="ml-2 text-xs text-gray-400">one-time</span>
            )}
          </div>
          <Link
            href="/workshop-checkout"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${w.accent} hover:opacity-90 transition-opacity duration-300 shadow-md whitespace-nowrap`}
          >
            {w.isFree ? 'Register Free' : 'Register Now'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkshopsPage() {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<Mode>('All');
  const [category, setCategory] = useState<WCategory>('All');
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = workshops.filter((w) => {
    const matchSearch =
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase()) ||
      w.host.toLowerCase().includes(search.toLowerCase());
    const matchMode = mode === 'All' || w.mode === mode;
    const matchCategory = category === 'All' || w.category === category;
    const matchFree = !freeOnly || w.isFree;
    return matchSearch && matchMode && matchCategory && matchFree;
  });

  const freeCount = workshops.filter((w) => w.isFree).length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 text-white py-24 lg:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-6"
            >
              Live Events
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Workshops That{' '}
              <span className="text-yellow-300">Accelerate Careers</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
            >
              Focused live sessions led by industry practitioners. Learn, build, and network — many are completely free.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 text-sm"
            >
              {[
                { icon: Mic, label: `${workshops.length} Upcoming Workshops` },
                { icon: Users, label: 'Expert-Led Sessions' },
                { icon: Star, label: `${freeCount} Free Workshops` },
                { icon: Zap, label: 'Hands-On Learning' },
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

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-wrap">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workshops or hosts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {WCATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    category === c
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Mode */}
            <div className="flex items-center gap-2 flex-wrap">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    mode === m
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Free only toggle */}
            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all duration-200 ${
                freeOnly
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow'
                  : 'border-emerald-400 text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Free Only
            </button>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-16 px-6 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of {workshops.length} workshops
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No workshops match your filters.</p>
              <button
                onClick={() => { setSearch(''); setMode('All'); setCategory('All'); setFreeOnly(false); }}
                className="mt-4 text-rose-600 text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${search}-${mode}-${category}-${freeOnly}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((w) => (
                <WorkshopCard key={w.id} w={w} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Want a Deeper Dive?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8">
              Explore our full training programs for structured, mentor-led learning with placement support.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trainings"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold bg-white text-[#8B0000] rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Explore Training Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/plans-pricing"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Pricing Plans
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}