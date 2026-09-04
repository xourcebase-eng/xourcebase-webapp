'use client';

// src/app/dashboard/page.tsx
// Same "Career Accelerator" visual system as the rest of the redesigned site.
// Hard 2px edges, ink/lime/coral palette, Archivo Black + Space Grotesk + Inter.

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, Clock, Award, TrendingUp,
  ArrowRight, Play, CheckCircle, Calendar,
  Zap, LayoutDashboard,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
  }),
};

const MONO = "'Space Grotesk', sans-serif";
const DISPLAY = "'Archivo Black', sans-serif";

const STATS = [
  { icon: BookOpen,    label: 'Enrolled',      value: '4',    sub: 'courses & workshops' },
  { icon: Clock,       label: 'Hours Learned', value: '12.5', sub: 'this month' },
  { icon: Award,       label: 'Certificates',  value: '2',    sub: 'earned so far' },
  { icon: TrendingUp,  label: 'Streak',        value: '7',    sub: 'days in a row' },
];

const ENROLLED_COURSES = [
  { id: 1, title: 'Full-Stack Web Development Bootcamp', category: 'Training', progress: 65, nextLesson: 'Building REST APIs with Node.js' },
  { id: 2, title: 'UI/UX Design Fundamentals Workshop',  category: 'Workshop', progress: 30, nextLesson: 'Color Theory & Typography' },
  { id: 3, title: 'Data Analysis with Python',           category: 'Training', progress: 90, nextLesson: 'Final Project Submission' },
];

const RECENT_ACTIVITY = [
  { icon: CheckCircle, color: 'text-[#3D5AFF]', text: 'Completed "Intro to React Hooks"',       time: '2 hours ago' },
  { icon: Play,        color: 'text-[#14141A]/60', text: 'Started "Building REST APIs"',         time: 'Yesterday' },
  { icon: Award,       color: 'text-[#FFB800]', text: 'Earned UI/UX Foundations Certificate',    time: '3 days ago' },
  { icon: Calendar,    color: 'text-[#FF3D57]', text: 'Registered for Advanced React Workshop',  time: '5 days ago' },
];

const UPCOMING = [
  { title: 'Advanced React Patterns',          date: 'Sat, 17 May · 10:00 AM', type: 'Workshop' },
  { title: 'Python for Data Science — Live Q&A', date: 'Wed, 21 May · 6:00 PM',  type: 'Live Session' },
];

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return src ? (
    <Image src={src} alt={name ?? ''} width={56} height={56} className="w-14 h-14 object-cover border-2 border-[#14141A] flex-shrink-0" />
  ) : (
    <div className="w-14 h-14 bg-[#C6FF3D] flex items-center justify-center border-2 border-[#14141A] flex-shrink-0">
      <span className="text-[#14141A] text-xl font-bold" style={{ fontFamily: MONO }}>{initials}</span>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 bg-[#14141A]/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="h-full bg-[#14141A]"
      />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/dashboard');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F5F5F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#14141A] border-t-transparent animate-spin" />
          <p className="text-sm text-[#14141A]/60 font-medium">Loading your dashboard…</p>
        </div>
      </div>
    );
  }
  if (!session) return null;

  const firstName = session.user?.name?.split(' ')[0] ?? 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F5F2] antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero welcome bar ── */}
      <div className="bg-white border-b-2 border-[#14141A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Stack on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <Avatar src={session.user?.image} name={session.user?.name} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-[#14141A]" />
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-[#14141A]"
                    style={{ fontFamily: MONO }}
                  >
                    {greeting}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl text-[#14141A] truncate" style={{ fontFamily: DISPLAY }}>
                  {firstName}, welcome back! 👋
                </h1>
                <p className="text-xs sm:text-sm text-[#14141A]/50 mt-0.5 truncate">
                  {session.user?.email}
                </p>
              </div>

              {/* Key fix: inline-flex + self-start so it never stretches full width */}
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-[#C6FF3D] hover:brightness-95 text-[#14141A] text-sm font-bold transition-all active:scale-95 flex-shrink-0"
                style={{ fontFamily: MONO }}
              >
                BROWSE COURSES
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 sm:py-10 space-y-6 sm:space-y-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div key={label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white border-2 border-[#14141A] p-4 sm:p-5">
              <div className="w-9 h-9 border-2 border-[#14141A]/15 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-[#14141A]" />
              </div>
              <p className="text-xl sm:text-2xl text-[#14141A]" style={{ fontFamily: DISPLAY }}>{value}</p>
              <p className="text-xs font-semibold text-[#14141A]/70 mt-0.5">{label}</p>
              <p className="text-xs text-[#14141A]/40">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Continue learning */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="lg:col-span-2 bg-white border-2 border-[#14141A] p-5 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-extrabold text-[#14141A]" style={{ fontFamily: MONO }}>CONTINUE LEARNING</h2>
                <p className="text-xs text-[#14141A]/40 mt-0.5">Pick up where you left off</p>
              </div>
              <Link href="/workshops"
                className="text-xs font-bold text-[#14141A] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {ENROLLED_COURSES.map((course) => (
                <div key={course.id}
                  className="flex items-start gap-3 sm:gap-4 p-4 bg-[#F5F5F2] border-2 border-transparent hover:border-[#14141A] transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#14141A] bg-white flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#14141A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-[#14141A] leading-tight line-clamp-1">{course.title}</p>
                      <span className="text-xs font-semibold text-[#14141A] bg-[#C6FF3D] px-2 py-0.5 flex-shrink-0 hidden sm:inline-flex">
                        {course.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#14141A]/40 mb-2 truncate">Next: {course.nextLesson}</p>
                    <div className="flex items-center gap-3">
                      <ProgressBar value={course.progress} />
                      <span className="text-xs font-bold text-[#14141A]/60 flex-shrink-0">{course.progress}%</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-[#14141A] flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upcoming */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white border-2 border-[#14141A] p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-[#14141A] mb-4" style={{ fontFamily: MONO }}>UPCOMING</h2>
              <div className="space-y-3">
                {UPCOMING.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-[#F5F5F2] border-2 border-transparent">
                    <div className="w-8 h-8 border-2 border-[#14141A]/15 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#14141A]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#14141A] leading-tight line-clamp-2">{item.title}</p>
                      <p className="text-xs text-[#14141A]/40 mt-0.5">{item.date}</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-[#14141A] bg-[#C6FF3D] px-2 py-0.5">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white border-2 border-[#14141A] p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-[#14141A] mb-4" style={{ fontFamily: MONO }}>RECENT ACTIVITY</h2>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map(({ icon: Icon, color, text, time }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <p className="text-xs text-[#14141A]/80 leading-tight">{text}</p>
                      <p className="text-xs text-[#14141A]/40 mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick links */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="bg-white border-2 border-[#14141A] p-5 sm:p-7">
          <h2 className="text-base font-extrabold text-[#14141A] mb-5" style={{ fontFamily: MONO }}>QUICK LINKS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Browse Workshops', href: '/workshops',       icon: Zap },
              { label: 'All Trainings',    href: '/trainings',       icon: BookOpen },
              { label: 'Community Forum',  href: '/community-forum', icon: LayoutDashboard },
              { label: 'Get Help',         href: '/help-support',    icon: Award },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-[#F5F5F2] border-2 border-transparent hover:border-[#14141A] transition-all text-center group">
                <div className="w-9 h-9 bg-white border-2 border-[#14141A]/15 flex items-center justify-center group-hover:border-[#14141A] transition-colors">
                  <Icon className="w-4 h-4 text-[#14141A]" />
                </div>
                <span className="text-xs font-semibold text-[#14141A]/70 group-hover:text-[#14141A] transition-colors leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
