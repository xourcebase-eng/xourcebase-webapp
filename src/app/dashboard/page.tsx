'use client';

// src/app/dashboard/page.tsx

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
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
  { icon: CheckCircle, color: 'text-green-500',   text: 'Completed "Intro to React Hooks"',          time: '2 hours ago' },
  { icon: Play,        color: 'text-blue-500',    text: 'Started "Building REST APIs"',               time: 'Yesterday' },
  { icon: Award,       color: 'text-yellow-500',  text: 'Earned UI/UX Foundations Certificate',       time: '3 days ago' },
  { icon: Calendar,    color: 'text-[#8B0000]',   text: 'Registered for Advanced React Workshop',    time: '5 days ago' },
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
    <img src={src} alt={name ?? ''} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md flex-shrink-0" />
  ) : (
    <div className="w-14 h-14 rounded-2xl bg-[#8B0000] flex items-center justify-center ring-4 ring-white shadow-md flex-shrink-0">
      <span className="text-white text-xl font-bold">{initials}</span>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="h-full bg-[#8B0000] rounded-full"
      />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading your dashboard…</p>
        </div>
      </div>
    );
  }
  if (!session) return null;

  const firstName = session.user?.name?.split(' ')[0] ?? 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-gray-50 antialiased">

      {/* ── Hero welcome bar ── */}
      <div className="bg-white border-b border-gray-100">
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
                  <Zap className="w-4 h-4 text-[#8B0000]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8B0000]">
                    {greeting}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 truncate">
                  {firstName}, welcome back! 👋
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                  {session.user?.email}
                </p>
              </div>

              {/* ← Key fix: inline-flex + self-start so it never stretches full width */}
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-[#8B0000] hover:bg-[#700000] text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm flex-shrink-0"
              >
                Browse Courses
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
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-[#8B0000]" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Continue learning */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-extrabold text-gray-900">Continue Learning</h2>
                <p className="text-xs text-gray-400 mt-0.5">Pick up where you left off</p>
              </div>
              <Link href="/workshops"
                className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {ENROLLED_COURSES.map((course) => (
                <div key={course.id}
                  className="flex items-start gap-3 sm:gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/40 transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B0000]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-gray-800 leading-tight line-clamp-1">{course.title}</p>
                      <span className="text-xs font-semibold text-[#8B0000] bg-red-50 px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline-flex">
                        {course.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2 truncate">Next: {course.nextLesson}</p>
                    <div className="flex items-center gap-3">
                      <ProgressBar value={course.progress} />
                      <span className="text-xs font-bold text-gray-500 flex-shrink-0">{course.progress}%</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-[#8B0000] rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
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
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {UPCOMING.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8B0000]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-[#8B0000] bg-red-50 px-2 py-0.5 rounded-full">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map(({ icon: Icon, color, text, time }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-700 leading-tight">{text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick links */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7">
          <h2 className="text-base font-extrabold text-gray-900 mb-5">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Browse Workshops', href: '/workshops',       icon: Zap },
              { label: 'All Trainings',    href: '/trainings',       icon: BookOpen },
              { label: 'Community Forum',  href: '/community-forum', icon: LayoutDashboard },
              { label: 'Get Help',         href: '/help-support',    icon: Award },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all text-center group">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                  <Icon className="w-4 h-4 text-[#8B0000]" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-[#8B0000] transition-colors leading-tight">
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