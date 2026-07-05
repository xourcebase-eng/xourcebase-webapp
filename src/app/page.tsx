'use client';

// src/app/page.tsx
// Reskinned to match trainings/page.tsx's "Career Accelerator" design system.

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Rocket, Zap, Users, ArrowRight, BookOpen, FileText,
  Brain, Clock, Star, Map, Mic, ArrowLeft,
  Calendar, Wifi, Tag, ChevronRight, CheckCircle2,
  TrendingUp, ShieldCheck, Briefcase, GraduationCap,
  BadgeCheck, Lightbulb, HeartHandshake, BarChart2,
  Quote, Bell, ArrowUpRight,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Static Feature Card — "mission brief" tile ───────────────────────────────
function StaticFeatureCard({ icon: Icon, title, desc, accentBg = '#C6FF3D' }: any) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="relative aspect-square w-full max-w-[220px] mx-auto bg-white border-2 border-[#14141A] flex flex-col items-center justify-center text-center p-5 overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accentBg }} />
      <div className="w-11 h-11 border-2 border-[#14141A] flex items-center justify-center mb-3 shrink-0" style={{ background: accentBg }}>
        <Icon className="w-5 h-5 text-[#14141A]" />
      </div>
      <h3 className="text-[13px] font-extrabold text-[#14141A] leading-tight mb-2 px-1" style={{ fontFamily: MONO }}>{title.toUpperCase()}</h3>
      <p className="text-[11.5px] text-[#14141A]/60 leading-relaxed px-1 line-clamp-4">{desc}</p>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: 1200, suffix: '+', label: 'STUDENTS TRAINED' },
  { value: 94,   suffix: '%', label: 'PLACEMENT RATE' },
  { value: 40,   suffix: '+', label: 'INDUSTRY MENTORS' },
  { value: 180,  suffix: '%', label: 'AVG. SALARY HIKE' },
];

const whyChooseFeatures = [
  { icon: GraduationCap,  title: 'Industry Experts',           desc: 'Learn from seasoned professionals actively working in tech and communication roles.', accentBg: '#C6FF3D' },
  { icon: Rocket,         title: 'Hands-On Projects',          desc: 'Build real-world projects using tools like AWS, Kubernetes, and Terraform.', accentBg: '#FFB800' },
  { icon: HeartHandshake, title: '1:1 Mentorship',             desc: 'Personal guidance, code reviews, and career advice from industry mentors.', accentBg: '#FF3D57' },
  { icon: Briefcase,      title: 'Career & Placement Support', desc: 'Resume building, mock interviews, and dedicated placement assistance.', accentBg: '#3D5AFF' },
  { icon: Users,          title: 'Strong Learning Community',  desc: 'Network with peers, mentors, and alumni through an active learning community.', accentBg: '#C6FF3D' },
  { icon: TrendingUp,     title: 'Job-Ready Outcomes',         desc: 'Gain practical, interview-ready skills aligned with current industry needs.', accentBg: '#FFB800' },
];

const valueProps = [
  { icon: ShieldCheck,    title: 'Real Interview Simulations',     desc: 'Live mocks that mirror actual company interview panels — format, pressure, and all.', accentBg: '#FF3D57' },
  { icon: HeartHandshake, title: 'One-on-One Mentorship',          desc: 'Dedicated guidance from industry veterans who have been through it themselves.', accentBg: '#3D5AFF' },
  { icon: FileText,       title: 'Resume & LinkedIn Optimization', desc: 'Craft profiles that pass ATS filters and get noticed by top recruiters.', accentBg: '#C6FF3D' },
  { icon: BarChart2,      title: 'Technical & Behavioral Training',desc: 'Balanced prep for both coding rounds and HR/managerial interview stages.', accentBg: '#FFB800' },
  { icon: Map,            title: 'Cloud & DevOps Career Roadmaps', desc: 'Personalized learning paths mapped to your target role and timeline.', accentBg: '#FF3D57' },
  { icon: Star,           title: 'Lifetime Community Access',      desc: 'Stay connected with alumni, ask questions, and get support long after you graduate.', accentBg: '#3D5AFF' },
];

const interviewKit = [
  { icon: Mic,        title: 'Mock Interviews',          desc: 'Real-time practice with expert feedback to simulate high-stakes interview scenarios.', accentBg: '#C6FF3D' },
  { icon: Brain,      title: 'Technical Assessments',    desc: 'Hands-on coding challenges and quizzes calibrated to top IT company standards.', accentBg: '#FFB800' },
  { icon: Lightbulb,  title: 'Communication Mastery',    desc: 'Voice modulation, storytelling, and the STAR method for impactful answers.', accentBg: '#FF3D57' },
  { icon: FileText,   title: 'Resume & Portfolio Review',desc: 'Personalized critiques to make your profile ATS-friendly and recruiter-compelling.', accentBg: '#3D5AFF' },
  { icon: BadgeCheck, title: 'Confidence Coaching',      desc: 'Mindset sessions to overcome anxiety and build lasting interview poise.', accentBg: '#C6FF3D' },
];

const testimonials = [
  {
    initials: 'AV', accentBg: '#C6FF3D',
    quote: "XourceBase's Career Accelerator completely changed my trajectory. Hands-on DevOps projects and certification guidance helped me land a Cloud Engineer role with a 180% salary hike.",
    name: 'Ankush Vishwakarma', role: 'DevOps Engineer at Capgemini',
    outcome: '180% Salary Hike',
  },
  {
    initials: 'ST', accentBg: '#3D5AFF',
    quote: "As a fresher I was terrified of interviews. The Communication program rebuilt my confidence. Placed in an international BPO within just 2 months of completing the course.",
    name: 'Sachin Tiwari', role: 'Process Associate at Concentrix',
    outcome: 'Placed in 2 Months',
  },
  {
    initials: 'GP', accentBg: '#FF3D57',
    quote: "Switching careers to DevOps seemed impossible until I joined XourceBase. The mentors guided me step by step. Cleared my AWS certification on the very first attempt.",
    name: 'Ganesh Pawar', role: 'DevOps Engineer at Gigmos',
    outcome: 'AWS Certified',
  },
  {
    initials: 'PR', accentBg: '#FFB800',
    quote: "The 1:1 mentorship is what sets XourceBase apart. My mentor reviewed my code weekly and helped me build a portfolio that impressed every interviewer. Got 3 offers in a single month.",
    name: 'Priya Ramteke', role: 'Cloud Support Engineer at TCS',
    outcome: '3 Offers in 30 Days',
  },
];

const upcomingWorkshops = [
  {
    id: 1,
    title: 'Introduction to Git & GitHub for Beginners',
    date: 'May 18, 2025',
    time: '10:00 AM – 1:00 PM IST',
    mode: 'Online',
    tag: 'Free',
    accentBg: '#C6FF3D',
    description: 'A hands-on introduction to version control with Git and collaboration on GitHub — commits, branching, merging, and pull requests.',
    isFree: true,
    status: 'open',
    slug: 'introduction-to-git-and-github',
  },
  {
    id: 2,
    title: 'DevOps CI/CD Pipeline Workshop',
    date: 'May 24, 2025', time: '11:00 AM – 2:00 PM IST', mode: 'Online',
    tag: '₹299', accentBg: '#FFB800',
    description: 'Build a full CI/CD pipeline with GitHub Actions, Docker, and Kubernetes. Hands-on project included.',
    isFree: false,
    status: 'coming_soon',
    opensOn: 'May 10, 2025',
  },
  {
    id: 3,
    title: 'Communication & Interview Masterclass',
    date: 'June 1, 2025', time: '3:00 PM – 5:00 PM IST', mode: 'Hybrid',
    tag: 'Free', accentBg: '#FF3D57',
    description: 'Master the STAR method, voice modulation, and body language. Live mock interview at the end.',
    isFree: true,
    status: 'coming_soon',
    opensOn: 'May 15, 2025',
  },
];

const upcomingTrainings = [
  {
    id: 1, title: 'Cloud & DevOps Career Accelerator',
    duration: '12 Weeks', level: 'Intermediate',
    accentBg: '#C6FF3D',
    description: 'AWS, Azure, Kubernetes, Terraform, and CI/CD with real-world capstone projects and placement support.',
    topics: ['AWS / Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    opensOn: 'June 15, 2025',
  },
  {
    id: 2, title: 'BPO & Communication Excellence',
    duration: '6 Weeks', level: 'Beginner',
    accentBg: '#FF3D57',
    description: 'Voice & non-voice training, soft skills, and personality development to launch your BPO career.',
    topics: ['Voice Support', 'Email Etiquette', 'Soft Skills', 'Mock Interviews'],
    opensOn: 'June 20, 2025',
  },
  {
    id: 3, title: 'Data Engineering Foundations',
    duration: '8 Weeks', level: 'Intermediate',
    accentBg: '#3D5AFF',
    description: 'Learn SQL, Python, Spark, and cloud data pipelines. Build a portfolio-ready project on AWS Redshift.',
    topics: ['Python', 'SQL', 'Apache Spark', 'AWS Redshift', 'ETL'],
    opensOn: 'July 1, 2025',
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STAGES = ['DISCOVER', 'REGISTER', 'ATTEND', 'ADVANCE'];

// ─── Sprint Track (signature element, reused from trainings) ──────────────────
function SprintTrack() {
  return (
    <div className="relative py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-white/15 rounded-full" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: 'easeInOut' as const, delay: 0.2 }}
          style={{ originX: 0 }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#C6FF3D] rounded-full"
        />
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div className={`w-4 h-4 rounded-full border-2 border-white ${i === 0 ? 'bg-[#C6FF3D]' : 'bg-transparent'}`} />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/80" style={{ fontFamily: MONO }}>
              {stage}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ badge, badgeBg, badgeText = '#14141A', title, subtitle }: {
  badge: string; badgeBg: string; badgeText?: string; title: string; subtitle: string;
}) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-14">
      <motion.span
        variants={fadeInUp}
        className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 mb-5"
        style={{ background: badgeBg, color: badgeText, fontFamily: MONO }}
      >
        {badge}
      </motion.span>
      <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl text-[#14141A] mb-4" style={{ fontFamily: DISPLAY }}>{title}</motion.h2>
      <motion.p variants={fadeInUp} className="text-lg text-[#14141A]/60 max-w-2xl mx-auto">{subtitle}</motion.p>
    </motion.div>
  );
}

// ─── Workshop Card — "mission brief" ticket ───────────────────────────────────
function WorkshopPreviewCard({ w }: { w: typeof upcomingWorkshops[0] }) {
  const isComingSoon = w.status === 'coming_soon';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white border-2 border-[#14141A] overflow-hidden flex flex-col"
    >
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: w.accentBg }} />

      {isComingSoon && (
        <div
          className="absolute -right-11 top-4 w-40 py-1 text-center text-[10px] font-bold tracking-widest text-white rotate-45 select-none"
          style={{ background: '#14141A', fontFamily: MONO }}
        >
          COMING SOON
        </div>
      )}

      <div className="pl-8 pr-7 pt-7 pb-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 gap-2">
          {!isComingSoon && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 bg-[#14141A] text-white uppercase" style={{ fontFamily: MONO }}>
              <Tag className="w-3 h-3" />{w.tag}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase ml-auto" style={{ fontFamily: MONO }}>
            <Wifi className="w-3 h-3" />{w.mode}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-[#14141A] mb-2 leading-snug" style={{ fontFamily: DISPLAY }}>
          {w.title.toUpperCase()}
        </h3>
        <p className="text-sm text-[#14141A]/60 leading-relaxed mb-5 flex-1">{w.description}</p>

        <div className="space-y-1.5 mb-6 text-xs text-[#14141A]/60 font-semibold">
          <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{w.date}</div>
          <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{w.time}</div>
        </div>

        {isComingSoon ? (
          <Link
            href="/workshops"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold tracking-wide text-white bg-[#14141A] hover:bg-black transition-colors group/btn"
          >
            NOTIFY ME <Bell className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={w.slug ? `/workshops/${w.slug}` : '/workshops'}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold tracking-wide text-[#14141A] hover:brightness-95 transition-all group/btn"
            style={{ background: w.accentBg }}
          >
            {w.isFree ? 'REGISTER FREE' : 'REGISTER NOW'} <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Training Card — "mission brief" ticket ───────────────────────────────────
function TrainingPreviewCard({ t }: { t: typeof upcomingTrainings[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white border-2 border-[#14141A] overflow-hidden flex flex-col"
    >
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: t.accentBg }} />

      <div
        className="absolute -right-11 top-4 w-40 py-1 text-center text-[10px] font-bold tracking-widest text-white rotate-45 select-none"
        style={{ background: '#14141A', fontFamily: MONO }}
      >
        COMING SOON
      </div>

      <div className="pl-8 pr-7 pt-7 pb-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase" style={{ fontFamily: MONO }}>
            <Zap className="w-3 h-3" />{t.level}
          </span>
          <div className="flex flex-col items-center leading-none flex-shrink-0 pr-6">
            <span className="text-2xl font-bold text-[#14141A]" style={{ fontFamily: MONO }}>
              {t.duration.split(' ')[0].padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#14141A]/50">WEEKS</span>
          </div>
        </div>

        <h3 className="text-lg font-extrabold text-[#14141A] mb-2 leading-snug" style={{ fontFamily: DISPLAY }}>{t.title.toUpperCase()}</h3>
        <p className="text-sm text-[#14141A]/60 leading-relaxed mb-5 flex-1">{t.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {t.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="text-[11px] bg-[#F5F5F2] border border-[#14141A]/15 text-[#14141A]/70 px-2 py-1 font-medium">{topic}</span>
          ))}
          {t.topics.length > 4 && <span className="text-[11px] text-[#14141A]/40 px-2 py-1 font-medium">+{t.topics.length - 4}</span>}
        </div>

        <div className="mt-auto">
          <Link
            href="/trainings"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold tracking-wide text-white bg-[#14141A] hover:bg-black transition-colors"
          >
            NOTIFY ME <Bell className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useAcceleratorFonts();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#14141A] text-white pt-24 pb-20 lg:pt-32 lg:pb-28 px-6">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: MONO }}
            >
              Workshops & Professional Trainings
            </motion.span>

            <motion.h1 variants={fadeInUp} className="text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] mb-6 max-w-4xl" style={{ fontFamily: DISPLAY }}>
              LAND HIGH-PAYING<br />
              <span className="bg-[#C6FF3D] text-[#14141A] px-2">JOBS FASTER</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/60 mb-10 max-w-xl">
              Industry-expert workshops and hands-on training in Cloud, DevOps, Data & Communication — with real projects, mock interviews, and placement support.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/workshops" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all">
                JOIN LIVE WORKSHOP <Rocket className="w-4 h-4" />
              </Link>
              <Link href="/trainings" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-white hover:bg-white/10 transition-all">
                EXPLORE TRAINING <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Sprint track */}
            <motion.div variants={fadeInUp} className="max-w-xl mb-10">
              <SprintTrack />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              {['Industry Mentors', 'Real Projects', 'Placement Support', 'Limited Seats'].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" /><span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Scoreboard Stats ── */}
      <section className="bg-[#F5F5F2] border-b-2 border-[#14141A] py-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 border-2 border-[#14141A] divide-x-2 md:divide-x-2 divide-y-2 md:divide-y-0 divide-[#14141A]"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center px-4 py-6">
                <span className="text-3xl md:text-4xl font-bold text-[#14141A] leading-none" style={{ fontFamily: MONO }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#14141A]/50 mt-2">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Workshops ── */}
      <section className="py-20 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <motion.span variants={fadeInUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>Live Events</motion.span>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>UPCOMING WORKSHOPS</motion.h2>
                <motion.p variants={fadeInUp} className="mt-3 text-base text-[#14141A]/60 max-w-xl">Free and paid live sessions led by industry experts. Limited seats — register before they fill up.</motion.p>
              </div>
              <motion.div variants={fadeInUp} className="hidden sm:block">
                <Link href="/workshops" className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wide border-2 border-[#14141A] text-[#14141A] hover:bg-[#14141A] hover:text-white transition-all whitespace-nowrap" style={{ fontFamily: MONO }}>
                  VIEW ALL WORKSHOPS <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {upcomingWorkshops.map((w) => <WorkshopPreviewCard key={w.id} w={w} />)}
            </motion.div>
            <div className="mt-10 flex justify-center sm:hidden">
              <Link href="/workshops" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold tracking-wide bg-[#14141A] text-white hover:bg-black transition-all">
                VIEW ALL WORKSHOPS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Training Programs ── */}
      <section className="py-20 px-6 bg-white border-y-2 border-[#14141A]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <motion.span variants={fadeInUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-4" style={{ fontFamily: MONO }}>Coming Soon</motion.span>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>UPCOMING TRAINING PROGRAMS</motion.h2>
                <motion.p variants={fadeInUp} className="mt-3 text-base text-[#14141A]/60 max-w-xl">Multi-week cohort programs with mentorship, capstone projects, and placement support — opening soon.</motion.p>
              </div>
              <motion.div variants={fadeInUp} className="hidden sm:block">
                <Link href="/trainings" className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wide border-2 border-[#14141A] text-[#14141A] hover:bg-[#14141A] hover:text-white transition-all whitespace-nowrap" style={{ fontFamily: MONO }}>
                  VIEW ALL TRAINING <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {upcomingTrainings.map((t) => <TrainingPreviewCard key={t.id} t={t} />)}
            </motion.div>
            <div className="mt-10 flex justify-center sm:hidden">
              <Link href="/trainings" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold tracking-wide bg-[#14141A] text-white hover:bg-black transition-all">
                VIEW ALL TRAINING <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose XourceBase ── */}
      <section className="py-20 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Why XourceBase" badgeBg="#C6FF3D" title="REAL SKILLS. REAL RESULTS. REAL JOBS." subtitle="We don't just teach — we prepare you to succeed in today's competitive job market." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {whyChooseFeatures.map((item, i) => <StaticFeatureCard key={i} {...item} />)}
          </motion.div>
        </div>
      </section>

      {/* ── Everything You Need ── */}
      <section className="py-20 px-6 bg-white border-y-2 border-[#14141A]">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Value You Get" badgeBg="#FF3D57" badgeText="#FFFFFF" title="EVERYTHING YOU NEED TO GET HIRED" subtitle="Practical support that actually moves you closer to your dream job — not just coursework." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center">
            {valueProps.map((item, i) => <StaticFeatureCard key={i} {...item} />)}
          </motion.div>
        </div>
      </section>

      {/* ── Interview Mastery Kit ── */}
      <section className="py-20 px-6 bg-[#F5F5F2]">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Interview Success System" badgeBg="#3D5AFF" badgeText="#FFFFFF" title="CLEAR INTERVIEWS WITH CONFIDENCE" subtitle="Master every stage of the interview process with our proven 5-pillar system." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center max-w-5xl mx-auto">
            {interviewKit.map((item, i) => <StaticFeatureCard key={i} {...item} />)}
          </motion.div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="py-24 px-6 bg-[#14141A] overflow-hidden relative border-y-2 border-[#14141A]">
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-white/10 text-white/70 px-3 py-1.5 mb-5" style={{ fontFamily: MONO }}>
              Student Outcomes
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl text-white mb-4" style={{ fontFamily: DISPLAY }}>
              LIVES CHANGED. CAREERS BUILT.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
              Real results from real students — not just numbers, but stories of transformation.
            </motion.p>
          </motion.div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              grabCursor={true}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={700}
              loop={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
                bulletClass: 'swiper-pagination-bullet !bg-white/30 !opacity-100 !w-2 !h-2 !rounded-none',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#C6FF3D] !w-5',
              }}
              navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
              breakpoints={{
                640:  { slidesPerView: 1.15, centeredSlides: true, spaceBetween: 16 },
                768:  { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
                1280: { slidesPerView: 4, centeredSlides: false },
              }}
              className="pb-14"
            >
              {testimonials.map((s) => (
                <SwiperSlide key={s.name} className="h-auto">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative bg-white/5 border border-white/15 hover:border-white/30 transition-all duration-300 p-7 h-full flex flex-col overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: s.accentBg }} />
                    <Quote className="w-7 h-7 text-white/20 mb-4 shrink-0" />
                    <p className="text-gray-300 text-[14.5px] leading-relaxed flex-1 mb-5">"{s.quote}"</p>
                    <span
                      className="self-start text-[11px] font-bold tracking-wide px-2.5 py-1 mb-4 text-[#14141A]"
                      style={{ background: s.accentBg, fontFamily: MONO }}
                    >
                      ✦ {s.outcome.toUpperCase()}
                    </span>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#FFB800] fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: s.accentBg, color: '#14141A' }}>
                        {s.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{s.name}</h4>
                        <p className="text-xs text-gray-400">{s.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 bg-white/10 border border-white/20 items-center justify-center hover:bg-white/20 transition-all duration-300 md:flex hidden">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 bg-white/10 border border-white/20 items-center justify-center hover:bg-white/20 transition-all duration-300 md:flex hidden">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <div className="swiper-pagination-custom flex justify-center items-center gap-2 mt-2" />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 px-6 bg-[#F5F5F2] overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-[#14141A]/15 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-[#14141A]/15 hidden md:block" />

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.span variants={fadeInUp} className="inline-block bg-[#FF3D57] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
              Limited Seats Available
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-6xl text-[#14141A] mb-5 leading-tight" style={{ fontFamily: DISPLAY }}>
              YOUR DREAM CAREER<br />STARTS TODAY
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#14141A]/60 mb-3 max-w-lg mx-auto">
              Join thousands of students who accelerated their careers with XourceBase.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-[#14141A]/40 mb-9 font-semibold">
              New batches begin every month — secure your spot before seats run out.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#14141A] text-white hover:bg-black transition-all">
                <BookOpen className="w-4 h-4" /> JOIN A WORKSHOP FREE
              </Link>
              <Link href="/trainings" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-[#14141A] text-[#14141A] hover:bg-[#14141A] hover:text-white transition-all">
                EXPLORE TRAINING <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#14141A]/50 font-semibold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No upfront commitment</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Free workshops available</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Placement-guaranteed programs</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}