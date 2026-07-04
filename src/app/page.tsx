'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Rocket, Zap, Users, Award, ArrowRight, BookOpen, FileText,
  Brain, Clock, Star, Map, Mic, ArrowLeft,
  Calendar, Wifi, Tag, ChevronRight, CheckCircle2,
  TrendingUp, ShieldCheck, Briefcase, GraduationCap,
  BadgeCheck, Lightbulb, HeartHandshake, BarChart2,
  Quote, Bell,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

// ─── Static Feature Card ──────────────────────────────────────────────────────
function StaticFeatureCard({ icon: Icon, title, desc, accentColor = 'text-indigo-600', bgColor = 'bg-indigo-50', borderHover = 'hover:border-indigo-200' }: any) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`aspect-square w-full max-w-[220px] mx-auto bg-white rounded-2xl border border-gray-100 ${borderHover} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center p-5 cursor-default`}
    >
      <div className={`p-3 ${bgColor} rounded-xl mb-3 shrink-0`}>
        <Icon className={`w-6 h-6 ${accentColor}`} />
      </div>
      <h3 className="text-[13px] font-bold text-gray-900 leading-tight mb-2 px-1">{title}</h3>
      <p className="text-[11.5px] text-gray-500 leading-relaxed px-1 line-clamp-4">{desc}</p>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: 1200, suffix: '+', label: 'Students Trained' },
  { value: 94,   suffix: '%', label: 'Placement Rate' },
  { value: 40,   suffix: '+', label: 'Industry Mentors' },
  { value: 180,  suffix: '%', label: 'Avg. Salary Hike' },
];

const whyChooseFeatures = [
  { icon: GraduationCap,  title: 'Industry Experts',           desc: 'Learn from seasoned professionals actively working in tech and communication roles.' },
  { icon: Rocket,         title: 'Hands-On Projects',          desc: 'Build real-world projects using tools like AWS, Kubernetes, and Terraform.' },
  { icon: HeartHandshake, title: '1:1 Mentorship',             desc: 'Personal guidance, code reviews, and career advice from industry mentors.' },
  { icon: Briefcase,      title: 'Career & Placement Support', desc: 'Resume building, mock interviews, and dedicated placement assistance.' },
  { icon: Users,          title: 'Strong Learning Community',  desc: 'Network with peers, mentors, and alumni through an active learning community.' },
  { icon: TrendingUp,     title: 'Job-Ready Outcomes',         desc: 'Gain practical, interview-ready skills aligned with current industry needs.' },
];

const valueProps = [
  { icon: ShieldCheck,    title: 'Real Interview Simulations',     desc: 'Live mocks that mirror actual company interview panels — format, pressure, and all.' },
  { icon: HeartHandshake, title: 'One-on-One Mentorship',          desc: 'Dedicated guidance from industry veterans who have been through it themselves.' },
  { icon: FileText,       title: 'Resume & LinkedIn Optimization', desc: 'Craft profiles that pass ATS filters and get noticed by top recruiters.' },
  { icon: BarChart2,      title: 'Technical & Behavioral Training',desc: 'Balanced prep for both coding rounds and HR/managerial interview stages.' },
  { icon: Map,            title: 'Cloud & DevOps Career Roadmaps', desc: 'Personalized learning paths mapped to your target role and timeline.' },
  { icon: Star,           title: 'Lifetime Community Access',      desc: 'Stay connected with alumni, ask questions, and get support long after you graduate.' },
];

const interviewKit = [
  { icon: Mic,        title: 'Mock Interviews',          desc: 'Real-time practice with expert feedback to simulate high-stakes interview scenarios.' },
  { icon: Brain,      title: 'Technical Assessments',    desc: 'Hands-on coding challenges and quizzes calibrated to top IT company standards.' },
  { icon: Lightbulb,  title: 'Communication Mastery',    desc: 'Voice modulation, storytelling, and the STAR method for impactful answers.' },
  { icon: FileText,   title: 'Resume & Portfolio Review',desc: 'Personalized critiques to make your profile ATS-friendly and recruiter-compelling.' },
  { icon: BadgeCheck, title: 'Confidence Coaching',      desc: 'Mindset sessions to overcome anxiety and build lasting interview poise.' },
];

const testimonials = [
  {
    initials: 'AV', gradient: 'from-indigo-500 to-purple-600', border: 'hover:border-indigo-400/30',
    quote: "XourceBase's Career Accelerator completely changed my trajectory. Hands-on DevOps projects and certification guidance helped me land a Cloud Engineer role with a 180% salary hike.",
    name: 'Ankush Vishwakarma', role: 'DevOps Engineer at Capgemini',
    outcome: '180% Salary Hike', outcomeColor: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    initials: 'ST', gradient: 'from-teal-500 to-green-600', border: 'hover:border-teal-400/30',
    quote: "As a fresher I was terrified of interviews. The Communication program rebuilt my confidence. Placed in an international BPO within just 2 months of completing the course.",
    name: 'Sachin Tiwari', role: 'Process Associate at Concentrix',
    outcome: 'Placed in 2 Months', outcomeColor: 'bg-teal-500/20 text-teal-300',
  },
  {
    initials: 'GP', gradient: 'from-rose-500 to-orange-500', border: 'hover:border-rose-400/30',
    quote: "Switching careers to DevOps seemed impossible until I joined XourceBase. The mentors guided me step by step. Cleared my AWS certification on the very first attempt.",
    name: 'Ganesh Pawar', role: 'DevOps Engineer at Gigmos',
    outcome: 'AWS Certified', outcomeColor: 'bg-rose-500/20 text-rose-300',
  },
  {
    initials: 'PR', gradient: 'from-amber-500 to-yellow-500', border: 'hover:border-amber-400/30',
    quote: "The 1:1 mentorship is what sets XourceBase apart. My mentor reviewed my code weekly and helped me build a portfolio that impressed every interviewer. Got 3 offers in a single month.",
    name: 'Priya Ramteke', role: 'Cloud Support Engineer at TCS',
    outcome: '3 Offers in 30 Days', outcomeColor: 'bg-amber-500/20 text-amber-300',
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
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: 'from-indigo-500 to-purple-600',
    description: 'A hands-on introduction to version control with Git and collaboration on GitHub — commits, branching, merging, and pull requests.',
    isFree: true,
    status: 'open',
    slug: 'introduction-to-git-and-github',
  },
  {
    id: 2,
    title: 'DevOps CI/CD Pipeline Workshop',
    date: 'May 24, 2025', time: '11:00 AM – 2:00 PM IST', mode: 'Online',
    tag: '₹299', tagColor: 'bg-amber-100 text-amber-700',
    accent: 'from-orange-500 to-rose-600',
    description: 'Build a full CI/CD pipeline with GitHub Actions, Docker, and Kubernetes. Hands-on project included.',
    isFree: false,
    status: 'coming_soon',
    opensOn: 'May 10, 2025',
  },
  {
    id: 3,
    title: 'Communication & Interview Masterclass',
    date: 'June 1, 2025', time: '3:00 PM – 5:00 PM IST', mode: 'Hybrid',
    tag: 'Free', tagColor: 'bg-emerald-100 text-emerald-700',
    accent: 'from-teal-500 to-green-600',
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
    accent: 'from-indigo-500 to-purple-600',
    description: 'AWS, Azure, Kubernetes, Terraform, and CI/CD with real-world capstone projects and placement support.',
    topics: ['AWS / Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    opensOn: 'June 15, 2025',
  },
  {
    id: 2, title: 'BPO & Communication Excellence',
    duration: '6 Weeks', level: 'Beginner',
    accent: 'from-teal-500 to-green-600',
    description: 'Voice & non-voice training, soft skills, and personality development to launch your BPO career.',
    topics: ['Voice Support', 'Email Etiquette', 'Soft Skills', 'Mock Interviews'],
    opensOn: 'June 20, 2025',
  },
  {
    id: 3, title: 'Data Engineering Foundations',
    duration: '8 Weeks', level: 'Intermediate',
    accent: 'from-rose-500 to-orange-500',
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

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ badge, badgeClass, title, subtitle }: {
  badge: string; badgeClass: string; title: string; subtitle: string;
}) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-14">
      <motion.span variants={fadeInUp} className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${badgeClass}`}>{badge}</motion.span>
      <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{title}</motion.h2>
      <motion.p variants={fadeInUp} className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</motion.p>
    </motion.div>
  );
}

// ─── Workshop Card ────────────────────────────────────────────────────────────
function WorkshopPreviewCard({ w }: { w: typeof upcomingWorkshops[0] }) {
  const isComingSoon = w.status === 'coming_soon';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: isComingSoon ? 0 : -6, scale: isComingSoon ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ${
        isComingSoon ? 'opacity-90 hover:opacity-100 hover:shadow-xl hover:border-indigo-100' : 'hover:shadow-xl hover:border-indigo-100'
      }`}
    >
      <div className={`h-1.5 bg-gradient-to-r ${w.accent} ${isComingSoon ? 'opacity-50' : ''}`} />

      {/* Coming Soon banner */}
      {isComingSoon && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 border-b border-indigo-100">
          <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
            <Bell className="w-3.5 h-3.5" />
            Coming Soon
          </span>
          {w.opensOn && (
            <span className="text-xs text-indigo-500 ml-auto">Opens {w.opensOn}</span>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          {!isComingSoon && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${w.tagColor}`}>
              <Tag className="w-3 h-3" />{w.tag}
            </span>
          )}
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ml-auto ${w.mode === 'Online' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'}`}>
            <Wifi className="w-3 h-3" />{w.mode}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-700 transition-colors">
          {w.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{w.description}</p>

        <div className="space-y-1.5 mb-5 text-xs text-gray-500">
          <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-indigo-400" />{w.date}</div>
          <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-indigo-400" />{w.time}</div>
        </div>

        {isComingSoon ? (
          <Link
            href="/workshops"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            <Bell className="w-4 h-4" /> Notify Me
          </Link>
        ) : (
          <Link
            href={w.slug ? `/workshops/${w.slug}` : '/workshops'}
            className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${w.accent} hover:opacity-90 transition-all shadow-md`}
          >
            {w.isFree ? 'Register Free' : 'Register Now'} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Training Card ────────────────────────────────────────────────────────────
function TrainingPreviewCard({ t }: { t: typeof upcomingTrainings[0] }) {
  const levelColors: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 opacity-90 hover:opacity-100 hover:shadow-xl hover:border-teal-100"
    >
      <div className={`h-1.5 bg-gradient-to-r ${t.accent} opacity-50`} />

      {/* Coming Soon banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 border-b border-teal-100">
        <span className="flex items-center gap-1.5 text-xs font-bold text-teal-700">
          <Bell className="w-3.5 h-3.5" />
          Coming Soon
        </span>
        {t.opensOn && (
          <span className="text-xs text-teal-500 ml-auto">Opens {t.opensOn}</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ml-auto ${levelColors[t.level]}`}>
            <Zap className="w-3 h-3" />{t.level}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors duration-200">{t.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{t.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {t.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{topic}</span>
          ))}
          {t.topics.length > 4 && <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">+{t.topics.length - 4}</span>}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-400" />{t.duration}</span>
        </div>
        <div className="mt-auto">
          <Link
            href="/trainings"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
          >
            <Bell className="w-4 h-4" /> Notify Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7f0000] via-[#b91c1c] to-[#ea580c] text-white py-24 lg:py-36">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/25 mb-4">
                Workshops & Professional Trainings
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Land High-Paying Jobs{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Faster</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-white/20 rounded-sm -z-0" />
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-12 text-white/85 max-w-3xl mx-auto leading-relaxed">
              Industry-expert <span className="font-semibold text-white">workshops</span> and <span className="font-semibold text-white">hands-on training</span> in Cloud, DevOps, Data & Communication — with real projects, mock interviews, and placement support.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold bg-white text-[#8B0000] rounded-2xl hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-2xl group">
                Join Live Workshop <Rocket className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              </Link>
              <Link href="/trainings" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold border-2 border-white/70 rounded-2xl hover:bg-white hover:text-[#8B0000] active:scale-95 transition-all duration-200">
                Explore Training <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-14 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm text-white/80">
              {['Industry Mentors', 'Real Projects', 'Placement Support', 'Limited Seats'].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/60" /><span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-[#8B0000] leading-none">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="text-sm text-gray-500 font-medium mt-2">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Workshops ── */}
      <section className="py-20 px-6 bg-[#faf3f2]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">Live Events</motion.span>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">Upcoming Workshops</motion.h2>
                <motion.p variants={fadeInUp} className="mt-2 text-base text-gray-500 max-w-xl">Free and paid live sessions led by industry experts. Limited seats — register before they fill up.</motion.p>
              </div>
              <motion.div variants={fadeInUp} className="hidden sm:block">
                <Link href="/workshops" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 whitespace-nowrap">
                  View All Workshops <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingWorkshops.map((w) => <WorkshopPreviewCard key={w.id} w={w} />)}
            </motion.div>
            <div className="mt-10 flex justify-center sm:hidden">
              <Link href="/workshops" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                View All Workshops <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Training Programs ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-3">Coming Soon</motion.span>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">Upcoming Training Programs</motion.h2>
                <motion.p variants={fadeInUp} className="mt-2 text-base text-gray-500 max-w-xl">Multi-week cohort programs with mentorship, capstone projects, and placement support — opening soon.</motion.p>
              </div>
              <motion.div variants={fadeInUp} className="hidden sm:block">
                <Link href="/trainings" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-600 hover:text-white transition-all duration-300 whitespace-nowrap">
                  View All Training <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingTrainings.map((t) => <TrainingPreviewCard key={t.id} t={t} />)}
            </motion.div>
            <div className="mt-10 flex justify-center sm:hidden">
              <Link href="/trainings" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-md">
                View All Training <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose XourceBase ── */}
      <section className="py-20 px-6 bg-[#faf3f2]">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Why XourceBase" badgeClass="bg-indigo-100 text-indigo-700" title="Real Skills. Real Results. Real Jobs." subtitle="We don't just teach — we prepare you to succeed in today's competitive job market." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {whyChooseFeatures.map((item, i) => <StaticFeatureCard key={i} {...item} accentColor="text-indigo-700" bgColor="bg-indigo-50" borderHover="hover:border-indigo-200" />)}
          </motion.div>
        </div>
      </section>

      {/* ── Everything You Need ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Value You Get" badgeClass="bg-rose-100 text-rose-700" title="Everything You Need to Get Hired" subtitle="Practical support that actually moves you closer to your dream job — not just coursework." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center">
            {valueProps.map((item, i) => <StaticFeatureCard key={i} {...item} accentColor="text-rose-600" bgColor="bg-rose-50" borderHover="hover:border-rose-200" />)}
          </motion.div>
        </div>
      </section>

      {/* ── Interview Mastery Kit ── */}
      <section className="py-20 px-6 bg-[#faf3f2]">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader badge="Interview Success System" badgeClass="bg-teal-100 text-teal-700" title="Clear Interviews with Confidence" subtitle="Master every stage of the interview process with our proven 5-pillar system." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center max-w-5xl mx-auto">
            {interviewKit.map((item, i) => <StaticFeatureCard key={i} {...item} accentColor="text-teal-600" bgColor="bg-teal-50" borderHover="hover:border-teal-200" />)}
          </motion.div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,0,0,0.18)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 text-white/60 px-4 py-1.5 rounded-full mb-4 border border-white/10">
              Student Outcomes
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">
              Lives Changed. Careers Built.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                bulletClass: 'swiper-pagination-bullet !bg-white/30 !opacity-100 !w-2 !h-2',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 !w-5 !rounded-full',
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
                    transition={{ duration: 0.3 }}
                    className={`bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 ${s.border} hover:bg-white/8 transition-all duration-300 p-7 h-full flex flex-col`}
                  >
                    <Quote className="w-7 h-7 text-white/20 mb-4 shrink-0" />
                    <p className="text-gray-300 text-[14.5px] leading-relaxed flex-1 mb-5">"{s.quote}"</p>
                    <span className={`self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${s.outcomeColor}`}>✦ {s.outcome}</span>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className={`w-10 h-10 bg-gradient-to-br ${s.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
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

            <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 md:flex hidden">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 md:flex hidden">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <div className="swiper-pagination-custom flex justify-center items-center gap-2 mt-2" />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#7f0000] via-[#b91c1c] to-[#c2410c] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-white/5" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-black/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.span variants={fadeInUp} className="inline-block bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              🚀 Limited Seats Available
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
              Your Dream Career<br />Starts Today
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-3 text-white/80 max-w-2xl mx-auto">
              Join thousands of students who accelerated their careers with XourceBase.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-white/55 mb-10">
              ⏰ New batches begin every month — secure your spot before seats run out.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops" className="inline-flex items-center justify-center gap-3 px-9 py-4 text-lg font-bold bg-white text-[#8B0000] rounded-2xl hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-2xl">
                <BookOpen className="w-5 h-5" /> Join a Workshop Free
              </Link>
              <Link href="/trainings" className="inline-flex items-center justify-center gap-3 px-9 py-4 text-lg font-bold border-2 border-white/60 rounded-2xl hover:bg-white hover:text-[#8B0000] active:scale-95 transition-all duration-200">
                Explore Training <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/55">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No upfront commitment</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Free workshops available</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Placement-guaranteed programs</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}