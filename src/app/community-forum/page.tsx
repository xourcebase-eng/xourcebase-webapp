'use client';

// src/app/community/page.tsx
// Reskinned to match the "Career Accelerator" design system.
// The forum itself isn't live yet — this renders as a "Coming Soon" preview:
// browsing/filtering the sample content works, but posting/joining actions
// open a Notify Me modal instead of performing the real action.

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Search,
  Filter,
  Pin,
  Flame,
  Clock,
  Plus,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Star,
  CheckCircle2,
  Bell,
  Hash,
  TrendingUp,
  Lock,
  X,
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

// ─── Types ────────────────────────────────────────────────────────────────────

type PostCategory =
  | 'All'
  | 'Cloud & DevOps'
  | 'Communication'
  | 'Data'
  | 'Programming'
  | 'Career Advice'
  | 'Success Stories'
  | 'Announcements';

type SortBy = 'Latest' | 'Popular' | 'Unanswered';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: Omit<PostCategory, 'All'>;
  author: string;
  authorRole: string;
  accentBg: string;
  timeAgo: string;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
  isPinned?: boolean;
  isAnswered?: boolean;
  isTrending?: boolean;
  isAnnouncement?: boolean;
}

interface Member {
  name: string;
  role: string;
  accentBg: string;
  badge: string;
  posts: number;
}

// ─── Data (sample / preview content — forum is not live yet) ─────────────────

const posts: Post[] = [
  {
    id: 1,
    title: 'Welcome to the XourceBase Community — Read Before You Post!',
    excerpt:
      'Guidelines, rules, and how to get the most out of this community. Please read before starting a new thread.',
    category: 'Announcements',
    author: 'XourceBase Team',
    authorRole: 'Admin',
    accentBg: '#FF3D57',
    timeAgo: '2 days ago',
    likes: 142,
    replies: 18,
    views: 3240,
    tags: ['Guidelines', 'Welcome'],
    isPinned: true,
    isAnnouncement: true,
  },
  {
    id: 2,
    title: "I cleared AWS SAA-C03 in 5 weeks — here's my full study plan",
    excerpt:
      'After two failed attempts, I finally cracked the SAA-C03 using a structured approach. Sharing my week-by-week breakdown, resources, and the mistakes I made earlier.',
    category: 'Success Stories',
    author: 'Ankush Vishwakarma',
    authorRole: 'DevOps Engineer @ Capgemini',
    accentBg: '#C6FF3D',
    timeAgo: '5 hours ago',
    likes: 87,
    replies: 34,
    views: 1820,
    tags: ['AWS', 'Certification', 'Study Plan'],
    isTrending: true,
  },
  {
    id: 3,
    title: 'Kubernetes vs Docker Swarm — which to learn first in 2025?',
    excerpt:
      "I'm starting my DevOps journey and keep going back and forth. Most job postings mention Kubernetes but Docker Swarm seems simpler. What do industry folks recommend?",
    category: 'Cloud & DevOps',
    author: 'Rohan Patil',
    authorRole: 'Student',
    accentBg: '#3D5AFF',
    timeAgo: '1 day ago',
    likes: 41,
    replies: 22,
    views: 890,
    tags: ['Kubernetes', 'Docker', 'DevOps'],
    isAnswered: true,
  },
  {
    id: 4,
    title: 'How I went from BPO rejection to offer letter in 6 weeks',
    excerpt:
      'Three rejections in a row made me rethink everything. I joined the XourceBase Communication program and this is what actually changed for me — voice, confidence, and structure.',
    category: 'Success Stories',
    author: 'Sakshi Tiwari',
    authorRole: 'Customer Support @ Concentrix',
    accentBg: '#FFB800',
    timeAgo: '3 days ago',
    likes: 73,
    replies: 28,
    views: 1540,
    tags: ['BPO', 'Communication', 'Placement'],
    isTrending: true,
  },
  {
    id: 5,
    title: 'Free resources for learning Terraform — curated list',
    excerpt:
      "I spent a month hunting for good Terraform content. Here's my curated list of free courses, repos, and labs that actually helped me get hands-on.",
    category: 'Cloud & DevOps',
    author: 'Ganesh Pawar',
    authorRole: 'DevOps Engineer @ Gigmos',
    accentBg: '#C6FF3D',
    timeAgo: '1 week ago',
    likes: 64,
    replies: 15,
    views: 2100,
    tags: ['Terraform', 'IaC', 'Free Resources'],
    isAnswered: true,
  },
  {
    id: 6,
    title: 'What does a realistic DevOps salary look like in India (2025)?',
    excerpt:
      "I've seen everything from 4 LPA to 40 LPA mentioned online. Can people who are currently working share actual numbers based on experience and skills?",
    category: 'Career Advice',
    author: 'Pooja Mehta',
    authorRole: 'Fresher',
    accentBg: '#FF3D57',
    timeAgo: '2 days ago',
    likes: 55,
    replies: 41,
    views: 3100,
    tags: ['Salary', 'Career', 'India'],
    isTrending: true,
  },
  {
    id: 7,
    title: 'Python basics — which project helped you actually "get it"?',
    excerpt:
      "I've done 3 Python courses and still feel lost when I try to build something. Looking for project ideas that helped other beginners actually understand the language.",
    category: 'Programming',
    author: 'Aryan Singh',
    authorRole: 'Student',
    accentBg: '#FFB800',
    timeAgo: '4 days ago',
    likes: 38,
    replies: 29,
    views: 760,
    tags: ['Python', 'Projects', 'Beginners'],
  },
  {
    id: 8,
    title: 'My experience with the mock interviews at XourceBase',
    excerpt:
      "Went through 4 mock interviews over 2 weeks before my actual interview. Here's what worked and what I'd do differently.",
    category: 'Career Advice',
    author: 'Neha Kulkarni',
    authorRole: 'Cloud Engineer @ Sapient',
    accentBg: '#3D5AFF',
    timeAgo: '6 days ago',
    likes: 49,
    replies: 12,
    views: 980,
    tags: ['Mock Interviews', 'Placement', 'Feedback'],
    isAnswered: true,
  },
  {
    id: 9,
    title: 'SQL vs NoSQL — how do you decide for a new project?',
    excerpt:
      'In my data engineering course we touched on both but never really dug into the decision-making process. How do practitioners actually choose?',
    category: 'Data',
    author: 'Kiran Joshi',
    authorRole: 'Student',
    accentBg: '#C6FF3D',
    timeAgo: '3 days ago',
    likes: 27,
    replies: 18,
    views: 540,
    tags: ['SQL', 'NoSQL', 'Data Engineering'],
  },
];

const topMembers: Member[] = [
  { name: 'Ganesh Pawar', role: 'DevOps Engineer', accentBg: '#FFB800', badge: 'Top Contributor', posts: 47 },
  { name: 'Ankush Vishwakarma', role: 'Cloud Engineer', accentBg: '#3D5AFF', badge: 'Mentor', posts: 39 },
  { name: 'Neha Kulkarni', role: 'Cloud Engineer', accentBg: '#C6FF3D', badge: 'Helper', posts: 31 },
  { name: 'Sakshi Tiwari', role: 'Customer Support', accentBg: '#FF3D57', badge: 'Rising Star', posts: 22 },
];

const trendingTags = [
  { label: 'AWS', count: 84 },
  { label: 'DevOps', count: 72 },
  { label: 'Kubernetes', count: 61 },
  { label: 'Placement', count: 55 },
  { label: 'Python', count: 48 },
  { label: 'Certification', count: 43 },
  { label: 'BPO', count: 37 },
  { label: 'Terraform', count: 33 },
  { label: 'Docker', count: 29 },
  { label: 'SQL', count: 24 },
];

const CATEGORIES: PostCategory[] = [
  'All', 'Cloud & DevOps', 'Communication', 'Data',
  'Programming', 'Career Advice', 'Success Stories', 'Announcements',
];
const SORT_OPTIONS: SortBy[] = ['Latest', 'Popular', 'Unanswered'];

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── Notify Modal ──────────────────────────────────────────────────────────────

function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST /api/notify { email, feature: 'community' }
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#14141A]/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-2 border-[#14141A] p-8 w-full max-w-md relative"
      >
        <button type="button" onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#14141A]/20 text-[#14141A]/60 hover:text-[#14141A] hover:border-[#14141A] transition-colors">
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <>
            <div className="h-2 w-14 mb-6 bg-[#C6FF3D]" />
            <div className="w-12 h-12 border-2 border-[#14141A] flex items-center justify-center mb-4">
              <Bell className="w-5 h-5 text-[#14141A]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#14141A] mb-1" style={{ fontFamily: DISPLAY }}>
              GET NOTIFIED
            </h3>
            <p className="text-xs text-[#14141A]/50 mb-5">
              The XourceBase Community forum is launching soon. Leave your email and we'll let you know the moment it's live.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email" required placeholder="your@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#14141A]/20 text-sm bg-[#F5F5F2] focus:border-[#14141A] outline-none transition-colors"
              />
              <button type="submit"
                className="w-full py-3 bg-[#14141A] hover:bg-black text-white text-sm font-bold tracking-wide transition-colors" style={{ fontFamily: MONO }}>
                NOTIFY ME AT LAUNCH
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 border-2 border-[#14141A] mx-auto mb-4 flex items-center justify-center" style={{ background: '#C6FF3D' }}>
              <CheckCircle2 className="w-7 h-7 text-[#14141A]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#14141A] mb-1" style={{ fontFamily: DISPLAY }}>
              YOU'RE ON THE LIST
            </h3>
            <p className="text-sm text-[#14141A]/60 mb-5">
              We'll email <span className="font-semibold text-[#14141A]">{email}</span> as soon as the community opens.
            </p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#14141A] text-white text-sm font-bold hover:bg-black transition-colors" style={{ fontFamily: MONO }}>
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Post Card — "mission brief" style, read-only preview ────────────────────

function PostCard({ post, onLocked }: { post: Post; onLocked: () => void }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white border-2 border-[#14141A] overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: post.accentBg }} />

      {post.isPinned && (
        <div className="bg-[#14141A] px-5 py-1.5 flex items-center gap-2">
          <Pin className="w-3 h-3 text-[#C6FF3D]" />
          <span className="text-xs font-bold text-white tracking-widest" style={{ fontFamily: MONO }}>PINNED ANNOUNCEMENT</span>
        </div>
      )}

      <div className="p-6 pl-7">
        <div className="flex gap-4">
          <div className="w-10 h-10 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-sm font-bold flex-shrink-0 mt-0.5" style={{ background: post.accentBg }}>
            {post.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-wide px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase" style={{ fontFamily: MONO }}>
                {post.category as string}
              </span>
              {post.isTrending && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#FF3D57] text-white uppercase" style={{ fontFamily: MONO }}>
                  <Flame className="w-3 h-3" /> Trending
                </span>
              )}
              {post.isAnswered && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#C6FF3D] text-[#14141A] uppercase" style={{ fontFamily: MONO }}>
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>

            <h3 className="text-base font-extrabold text-[#14141A] mb-1 leading-snug">
              {post.title}
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs text-[#14141A]/50 font-semibold">
              <span className="text-[#14141A]">{post.author}</span>
              <span>·</span>
              <span>{post.authorRole}</span>
              <span>·</span>
              <Clock className="w-3 h-3" />
              <span>{post.timeAgo}</span>
            </div>

            <p className="text-sm text-[#14141A]/60 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-[11px] text-[#14141A]/60 bg-[#F5F5F2] border border-[#14141A]/15 px-2 py-0.5 font-medium">
                  <Hash className="w-2.5 h-2.5" />{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-[#14141A]/50 font-semibold">
              <button onClick={onLocked} className="flex items-center gap-1.5 hover:text-[#FF3D57] transition-colors duration-200">
                <ThumbsUp className="w-3.5 h-3.5" />
                {post.likes}
              </button>
              <button onClick={onLocked} className="flex items-center gap-1.5 hover:text-[#3D5AFF] transition-colors duration-200">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
              </button>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {post.views.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  useAcceleratorFonts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PostCategory>('All');
  const [sortBy, setSortBy] = useState<SortBy>('Latest');
  const [showNotify, setShowNotify] = useState(false);

  const filtered = posts
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === 'All' || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (sortBy === 'Popular') return b.likes + b.replies - (a.likes + a.replies);
      if (sortBy === 'Unanswered') return (a.isAnswered ? 1 : 0) - (b.isAnswered ? 1 : 0);
      return 0;
    });

  const stats = [
    { icon: Users, label: 'MEMBERS WAITLISTED', value: '1,240+' },
    { icon: MessageSquare, label: 'SAMPLE DISCUSSIONS', value: '9' },
    { icon: Star, label: 'PLANNED AT LAUNCH', value: '2,100+' },
    { icon: Award, label: 'FOUNDING MENTORS', value: '48' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#14141A]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#14141A] text-white py-20 lg:py-24">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 hidden md:block" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center max-w-4xl mx-auto">

            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
              style={{ fontFamily: MONO }}
            >
              <Lock className="w-3 h-3" /> Coming Soon — Not Yet Open
            </motion.span>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl leading-[0.98] mb-6" style={{ fontFamily: DISPLAY }}>
              LEARN TOGETHER,<br />
              <span className="bg-[#C6FF3D] text-[#14141A] px-2">GROW TOGETHER</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl mx-auto">
              A forum for questions, wins, resources, and mentorship — built for students, alumni, and industry mentors across the XourceBase community.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-white/50 mb-10 max-w-xl mx-auto">
              We're still building this. What you see below is a preview of what's coming — browsing works, but posting and joining open once we launch.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto border-2 border-white/20 divide-x-2 divide-y-2 sm:divide-y-0 divide-white/20 mb-10">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1 px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-[#C6FF3D]" />
                    <span className="text-xl font-bold" style={{ fontFamily: MONO }}>{value}</span>
                  </div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold text-center">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowNotify(true)}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all" style={{ fontFamily: MONO }}>
                <Bell className="w-4 h-4" /> NOTIFY ME AT LAUNCH
              </button>
              <Link href="/workshops"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-white hover:bg-white/10 transition-all" style={{ fontFamily: MONO }}>
                EXPLORE WORKSHOPS <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="py-12 px-6 bg-[#F5F5F2] min-h-[70vh]">
        <div className="container mx-auto max-w-7xl">

          {/* Preview banner */}
          <div className="flex items-center gap-3 border-2 border-[#14141A] bg-white px-5 py-3 mb-8">
            <Lock className="w-4 h-4 text-[#14141A] flex-shrink-0" />
            <p className="text-xs sm:text-sm text-[#14141A]/70 font-semibold">
              This is a preview of sample content. Posting, likes, and replies are disabled until the community officially launches.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Left: Posts ── */}
            <div className="flex-1 min-w-0">

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40" />
                  <input
                    type="text"
                    placeholder="Search discussions, topics, members…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] bg-white transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`text-xs font-bold tracking-wide px-3 py-2.5 border-2 border-[#14141A] transition-all duration-150 ${
                        sortBy === s ? 'bg-[#14141A] text-white' : 'bg-white text-[#14141A] hover:bg-[#14141A]/5'
                      }`}
                      style={{ fontFamily: MONO }}
                    >
                      {s === 'Latest' && <Clock className="w-3 h-3 inline mr-1" />}
                      {s === 'Popular' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                      {s === 'Unanswered' && <MessageSquare className="w-3 h-3 inline mr-1" />}
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category tabs — scrollable */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <Filter className="w-4 h-4 text-[#14141A]/40 flex-shrink-0" />
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-xs font-bold tracking-wide px-3.5 py-1.5 whitespace-nowrap transition-all duration-150 flex-shrink-0 border-2 border-[#14141A] ${
                      category === c ? 'bg-[#14141A] text-white' : 'bg-white text-[#14141A] hover:bg-[#14141A]/5'
                    }`}
                    style={{ fontFamily: MONO }}
                  >
                    {c.toString().toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Result count + New Thread button (locked) */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[#14141A]/60">
                  <span className="font-bold text-[#14141A]">{filtered.length}</span> sample discussions
                </p>
                <button
                  onClick={() => setShowNotify(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide bg-[#14141A] text-white hover:bg-black transition-all"
                  style={{ fontFamily: MONO }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  NEW THREAD
                </button>
              </div>

              {/* Posts list */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-[#14141A]/40">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-40" />
                  <p className="text-lg font-medium">No discussions found.</p>
                  <button
                    onClick={() => { setSearch(''); setCategory('All'); }}
                    className="mt-3 text-[#14141A] text-sm font-bold hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <motion.div
                  key={`${search}-${category}-${sortBy}`}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-4"
                >
                  {filtered.map((post) => (
                    <PostCard key={post.id} post={post} onLocked={() => setShowNotify(true)} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Right Sidebar ── */}
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">

              {/* Get notified CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-[#14141A] text-white border-2 border-[#14141A] p-6 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C6FF3D]" />
                <h3 className="text-lg font-extrabold mb-2" style={{ fontFamily: DISPLAY }}>NOT LIVE YET</h3>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  The community forum is still in the works. Get notified the moment it opens for 1,200+ waitlisted learners and mentors.
                </p>
                <button onClick={() => setShowNotify(true)}
                  className="w-full py-2.5 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-colors" style={{ fontFamily: MONO }}>
                  NOTIFY ME
                </button>
              </motion.div>

              {/* Top Members */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border-2 border-[#14141A] p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-extrabold text-[#14141A] flex items-center gap-2" style={{ fontFamily: MONO }}>
                    <Award className="w-4 h-4 text-[#FFB800]" />
                    FOUNDING CONTRIBUTORS
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[#14141A]/40" />
                </div>
                <div className="space-y-4">
                  {topMembers.map((m, i) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#14141A]/40 w-4" style={{ fontFamily: MONO }}>{i + 1}</span>
                      <div className="w-9 h-9 border-2 border-[#14141A] flex items-center justify-center text-[#14141A] text-xs font-bold flex-shrink-0" style={{ background: m.accentBg }}>
                        {m.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#14141A] truncate">{m.name}</p>
                        <p className="text-xs text-[#14141A]/50 truncate">{m.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 border border-[#14141A]/70 text-[#14141A] uppercase" style={{ fontFamily: MONO }}>{m.badge}</span>
                        <p className="text-xs text-[#14141A]/40 mt-0.5">{m.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trending Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white border-2 border-[#14141A] p-6"
              >
                <h3 className="text-sm font-extrabold text-[#14141A] mb-4 flex items-center gap-2" style={{ fontFamily: MONO }}>
                  <TrendingUp className="w-4 h-4 text-[#FF3D57]" />
                  TRENDING TAGS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => setSearch(tag.label)}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-[#F5F5F2] border border-[#14141A]/15 text-[#14141A]/70 px-2.5 py-1 hover:border-[#14141A] transition-colors duration-150"
                    >
                      <Hash className="w-2.5 h-2.5" />
                      {tag.label}
                      <span className="ml-1 text-[#14141A]/40 font-normal">{tag.count}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white border-2 border-[#14141A] p-6"
              >
                <h3 className="text-sm font-extrabold text-[#14141A] mb-4 flex items-center gap-2" style={{ fontFamily: MONO }}>
                  <BookOpen className="w-4 h-4 text-[#3D5AFF]" />
                  QUICK LINKS
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'Upcoming Workshops', href: '/workshops' },
                    { label: 'Training Programs', href: '/trainings' },
                    { label: 'Plans & Pricing', href: '/plans-pricing' },
                    { label: 'Contact & Support', href: '/help-support' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="flex items-center justify-between text-sm text-[#14141A]/70 hover:text-[#14141A] transition-colors duration-150 py-1 font-medium">
                        {label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                className="relative bg-white border-2 border-[#14141A] p-6 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF3D57]" />
                <h3 className="text-sm font-extrabold text-[#14141A] mb-3 flex items-center gap-2" style={{ fontFamily: MONO }}>
                  <CheckCircle2 className="w-4 h-4 text-[#FF3D57]" />
                  COMMUNITY GUIDELINES
                </h3>
                <ul className="space-y-2">
                  {[
                    'Be respectful and constructive',
                    'No spam or self-promotion',
                    'Search before posting',
                    'Give credit for resources shared',
                    'Help others when you can',
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-xs text-[#14141A]/60">
                      <span className="mt-0.5 text-[#FF3D57]">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 bg-[#14141A] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.span variants={fadeInUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-6" style={{ fontFamily: MONO }}>
              While You Wait
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl mb-4" style={{ fontFamily: DISPLAY }}>
              READY TO LEVEL UP YOUR CAREER?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/60 mb-8">
              The community is launching soon — our workshops and training programs are open right now.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trainings"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-wide bg-[#C6FF3D] text-[#14141A] hover:brightness-95 transition-all" style={{ fontFamily: MONO }}>
                EXPLORE TRAINING PROGRAMS <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/workshops"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-wide border-2 border-white hover:bg-white/10 transition-all" style={{ fontFamily: MONO }}>
                JOIN A FREE WORKSHOP <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showNotify && <NotifyModal onClose={() => setShowNotify(false)} />}
      </AnimatePresence>
    </div>
  );
}