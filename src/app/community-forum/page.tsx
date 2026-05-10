'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
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
  Tag,
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
} from 'lucide-react';

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
  avatarGradient: string;
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
  avatarGradient: string;
  badge: string;
  badgeColor: string;
  posts: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const posts: Post[] = [
  {
    id: 1,
    title: '📌 Welcome to the XourceBase Community — Read Before You Post!',
    excerpt:
      'Guidelines, rules, and how to get the most out of this community. Please read before starting a new thread.',
    category: 'Announcements',
    author: 'XourceBase Team',
    authorRole: 'Admin',
    avatarGradient: 'from-rose-600 to-red-700',
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
    title: 'I cleared AWS SAA-C03 in 5 weeks — here\'s my full study plan',
    excerpt:
      'After two failed attempts, I finally cracked the SAA-C03 using a structured approach. Sharing my week-by-week breakdown, resources, and the mistakes I made earlier.',
    category: 'Success Stories',
    author: 'Ankush Vishwakarma',
    authorRole: 'DevOps Engineer @ Capgemini',
    avatarGradient: 'from-indigo-500 to-purple-600',
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
      'I\'m starting my DevOps journey and keep going back and forth. Most job postings mention Kubernetes but Docker Swarm seems simpler. What do industry folks recommend?',
    category: 'Cloud & DevOps',
    author: 'Rohan Patil',
    authorRole: 'Student',
    avatarGradient: 'from-sky-500 to-cyan-500',
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
    avatarGradient: 'from-teal-500 to-green-500',
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
      'I spent a month hunting for good Terraform content. Here\'s my curated list of free courses, repos, and labs that actually helped me get hands-on.',
    category: 'Cloud & DevOps',
    author: 'Ganesh Pawar',
    authorRole: 'DevOps Engineer @ Gigmos',
    avatarGradient: 'from-orange-500 to-rose-500',
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
      'I\'ve seen everything from 4 LPA to 40 LPA mentioned online. Can people who are currently working share actual numbers based on experience and skills?',
    category: 'Career Advice',
    author: 'Pooja Mehta',
    authorRole: 'Fresher',
    avatarGradient: 'from-violet-500 to-pink-500',
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
      'I\'ve done 3 Python courses and still feel lost when I try to build something. Looking for project ideas that helped other beginners actually understand the language.',
    category: 'Programming',
    author: 'Aryan Singh',
    authorRole: 'Student',
    avatarGradient: 'from-yellow-500 to-orange-500',
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
      'Went through 4 mock interviews over 2 weeks before my actual interview. Here\'s what worked and what I\'d do differently.',
    category: 'Career Advice',
    author: 'Neha Kulkarni',
    authorRole: 'Cloud Engineer @ Sapient',
    avatarGradient: 'from-emerald-500 to-teal-600',
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
    avatarGradient: 'from-rose-400 to-pink-500',
    timeAgo: '3 days ago',
    likes: 27,
    replies: 18,
    views: 540,
    tags: ['SQL', 'NoSQL', 'Data Engineering'],
  },
];

const topMembers: Member[] = [
  {
    name: 'Ganesh Pawar',
    role: 'DevOps Engineer',
    avatarGradient: 'from-orange-500 to-rose-500',
    badge: 'Top Contributor',
    badgeColor: 'bg-amber-100 text-amber-700',
    posts: 47,
  },
  {
    name: 'Ankush Vishwakarma',
    role: 'Cloud Engineer',
    avatarGradient: 'from-indigo-500 to-purple-600',
    badge: 'Mentor',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    posts: 39,
  },
  {
    name: 'Neha Kulkarni',
    role: 'Cloud Engineer',
    avatarGradient: 'from-emerald-500 to-teal-600',
    badge: 'Helper',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    posts: 31,
  },
  {
    name: 'Sakshi Tiwari',
    role: 'Customer Support',
    avatarGradient: 'from-teal-500 to-green-500',
    badge: 'Rising Star',
    badgeColor: 'bg-teal-100 text-teal-700',
    posts: 22,
  },
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

const categoryColors: Record<string, string> = {
  'Announcements': 'bg-rose-100 text-rose-700',
  'Cloud & DevOps': 'bg-indigo-100 text-indigo-700',
  'Communication': 'bg-teal-100 text-teal-700',
  'Data': 'bg-orange-100 text-orange-700',
  'Programming': 'bg-yellow-100 text-yellow-700',
  'Career Advice': 'bg-violet-100 text-violet-700',
  'Success Stories': 'bg-emerald-100 text-emerald-700',
};

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden
        ${post.isPinned
          ? 'border-rose-200 shadow-md shadow-rose-50'
          : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-100'
        }`}
    >
      {/* Pinned / Announcement bar */}
      {post.isPinned && (
        <div className="bg-gradient-to-r from-rose-600 to-red-700 px-5 py-1.5 flex items-center gap-2">
          <Pin className="w-3 h-3 text-white" />
          <span className="text-xs font-bold text-white tracking-wide">PINNED ANNOUNCEMENT</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5`}>
            {post.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category as string] ?? 'bg-gray-100 text-gray-600'}`}>
                {post.category as string}
              </span>
              {post.isTrending && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3" /> Trending
                </span>
              )}
              {post.isAnswered && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug group-hover:text-indigo-700 transition-colors duration-200 cursor-pointer">
              {post.title}
            </h3>

            {/* Author */}
            <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-400">
              <span className="font-semibold text-gray-600">{post.author}</span>
              <span>·</span>
              <span>{post.authorRole}</span>
              <span>·</span>
              <Clock className="w-3 h-3" />
              <span>{post.timeAgo}</span>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-150">
                  <Hash className="w-2.5 h-2.5" />{tag}
                </span>
              ))}
            </div>

            {/* Footer meta */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 font-semibold transition-colors duration-200 ${liked ? 'text-rose-500' : 'hover:text-rose-500'}`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                {likeCount}
              </button>
              <span className="flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
              </span>
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PostCategory>('All');
  const [sortBy, setSortBy] = useState<SortBy>('Latest');

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
      return 0; // Latest = default order
    });

  const stats = [
    { icon: Users, label: 'Members', value: '1,240+' },
    { icon: MessageSquare, label: 'Discussions', value: '3,800+' },
    { icon: Star, label: 'Questions Answered', value: '2,100+' },
    { icon: Award, label: 'Top Contributors', value: '48' },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 text-white py-24 lg:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

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
              Community Forum
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Learn Together,{' '}
              <span className="text-yellow-300">Grow Together</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
            >
              Ask questions, share wins, explore resources, and connect with students, alumni, and industry mentors from the XourceBase community.
            </motion.p>

            {/* Stats strip */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 opacity-80" />
                    <span className="text-2xl font-bold">{value}</span>
                  </div>
                  <span className="text-xs opacity-70 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold bg-white text-indigo-700 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl">
                <Plus className="w-5 h-5" />
                Start a Discussion
              </button>
              <button className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300">
                <Bell className="w-5 h-5" />
                Subscribe to Updates
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="py-12 px-6 bg-gray-50 min-h-[70vh]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Left: Posts ── */}
            <div className="flex-1 min-w-0">

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions, topics, members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        sortBy === s
                          ? 'bg-indigo-600 text-white shadow'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      {s === 'Latest' && <Clock className="w-3 h-3 inline mr-1" />}
                      {s === 'Popular' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                      {s === 'Unanswered' && <MessageSquare className="w-3 h-3 inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category tabs — scrollable */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      category === c
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Result count + New Thread button */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">{filtered.length}</span> discussions
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                  New Thread
                </button>
              </div>

              {/* Posts list */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No discussions found.</p>
                  <button
                    onClick={() => { setSearch(''); setCategory('All'); }}
                    className="mt-3 text-indigo-600 text-sm font-semibold hover:underline"
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
                    <PostCard key={post.id} post={post} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Right Sidebar ── */}
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">

              {/* Join the community CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white"
              >
                <h3 className="text-lg font-bold mb-2">Join the Community</h3>
                <p className="text-sm opacity-85 mb-5 leading-relaxed">
                  Ask questions, share knowledge, and connect with 1,200+ learners and mentors.
                </p>
                <button className="w-full py-2.5 text-sm font-bold bg-white text-indigo-700 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  Sign Up Free
                </button>
                <p className="text-xs text-center mt-3 opacity-70">Already a member? <span className="underline cursor-pointer">Log in</span></p>
              </motion.div>

              {/* Top Members */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Top Contributors
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {topMembers.map((m, i) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.avatarGradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {m.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{m.name}</p>
                        <p className="text-xs text-gray-400 truncate">{m.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
                        <p className="text-xs text-gray-400 mt-0.5">{m.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trending Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => setSearch(tag.label)}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-150"
                    >
                      <Hash className="w-2.5 h-2.5" />
                      {tag.label}
                      <span className="ml-1 text-gray-400 font-normal">{tag.count}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {[
                    { label: 'Upcoming Workshops', href: '/workshops' },
                    { label: 'Training Programs', href: '/trainings' },
                    { label: 'Plans & Pricing', href: '/plans-pricing' },
                    { label: 'Contact & Support', href: '/help-support' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-150 py-1"
                      >
                        {label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-rose-50 border border-rose-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-bold text-rose-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  Community Guidelines
                </h3>
                <ul className="space-y-2">
                  {[
                    'Be respectful and constructive',
                    'No spam or self-promotion',
                    'Search before posting',
                    'Give credit for resources shared',
                    'Help others when you can',
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-xs text-rose-700">
                      <span className="mt-0.5 text-rose-400">•</span>
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
      <section className="py-20 px-6 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Level Up Your Career?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8">
              The community is a great start — our training programs take you all the way to placement.
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
                href="/workshops"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Join a Free Workshop
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}