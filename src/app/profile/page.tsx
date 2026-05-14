'use client';

// src/app/profile/page.tsx

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  User, Mail, Shield, LogOut, Github, Chrome,
  CheckCircle, AlertTriangle, Camera, ArrowLeft,
  Bell, Lock, Trash2, ExternalLink,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
  }),
};

/* ── Avatar ── */
function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return src ? (
    <img src={src} alt={name ?? ''}
      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
  ) : (
    <div className="w-20 h-20 rounded-2xl bg-[#8B0000] flex items-center justify-center ring-4 ring-white shadow-lg">
      <span className="text-white text-2xl font-bold">{initials}</span>
    </div>
  );
}

/* ── Info row ── */
function InfoRow({ label, value, icon: Icon }: { label: string; value?: string | null; icon: any }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
        <Icon className="w-4 h-4 text-[#8B0000]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{value ?? '—'}</p>
      </div>
    </div>
  );
}

/* ── Toggle switch — uses inline styles to avoid Tailwind purge issues ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '44px',
        height: '24px',
        borderRadius: '9999px',
        backgroundColor: checked ? '#8B0000' : '#D1D5DB',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '9999px',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  );
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notifications, setNotifications] = useState({
    marketing: true,
    updates: true,
    reminders: false,
  });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.name) setDisplayName(session.user.name);
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading your profile…</p>
        </div>
      </div>
    );
  }
  if (!session) return null;

  const isGithub = session.user?.image?.includes('githubusercontent');
  const isGoogle = session.user?.image?.includes('googleusercontent');

  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setSaveStatus('saving');
    await new Promise((r) => setTimeout(r, 900));
    await update({ name: displayName });
    setSaveStatus('saved');
    setIsEditing(false);
    setTimeout(() => setSaveStatus('idle'), 2500);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>

            <Link href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#8B0000] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>

            {/* Profile header — stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Avatar */}
              <div className="relative flex-shrink-0 self-start">
                <Avatar src={session.user?.image} name={session.user?.name} />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#8B0000] rounded-xl flex items-center justify-center shadow-md"
                  title="Profile picture is managed by your sign-in provider">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {/* Provider badges */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {isGithub && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-gray-900 text-white px-2.5 py-1 rounded-full">
                      <Github className="w-3 h-3" /> GitHub
                    </span>
                  )}
                  {isGoogle && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                      <Chrome className="w-3 h-3" /> Google
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 truncate">
                  {session.user?.name}
                </h1>
                <p className="text-sm text-gray-400 mt-0.5 truncate">{session.user?.email}</p>
              </div>

              {/* Sign out — full width on mobile */}
              <button onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 border border-red-200 text-[#8B0000] text-sm font-bold rounded-xl hover:bg-red-50 transition-colors flex-shrink-0">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left col ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Account info */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-[#8B0000]" />
                </div>
                <div className="pt-1.5">
                  <h2 className="text-base font-extrabold text-gray-900">Account Information</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Your details from your sign-in provider</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <InfoRow label="Full Name" value={session.user?.name} icon={User} />
                <InfoRow label="Email Address" value={session.user?.email} icon={Mail} />
                <InfoRow
                  label="Sign-in Provider"
                  value={isGithub ? 'GitHub OAuth' : isGoogle ? 'Google OAuth' : 'Email & Password'}
                  icon={Shield}
                />
              </div>

              {/* Edit display name */}
              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Display Name</p>
                    <p className="text-xs text-gray-400">This appears across the platform</p>
                  </div>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)}
                      className="text-xs font-bold text-[#8B0000] hover:underline">
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:border-[#8B0000] focus:ring-2 focus:ring-red-50 outline-none transition-all"
                      autoFocus
                    />
                    <button onClick={handleSaveName} disabled={saveStatus === 'saving'}
                      className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#700000] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60 flex-shrink-0">
                      {saveStatus === 'saving' ? 'Saving…' : 'Save'}
                    </button>
                    <button onClick={() => { setIsEditing(false); setDisplayName(session.user?.name ?? ''); }}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-all flex-shrink-0">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-sm font-semibold text-gray-800">{displayName || session.user?.name}</span>
                    {saveStatus === 'saved' && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold ml-auto">
                        <CheckCircle className="w-3.5 h-3.5" /> Saved
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Notification preferences */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-[#8B0000]" />
                </div>
                <div className="pt-1.5">
                  <h2 className="text-base font-extrabold text-gray-900">Notification Preferences</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Choose what emails you receive</p>
                </div>
              </div>

              <div className="space-y-3">
                {([
                  { key: 'marketing', label: 'Promotions & offers',  desc: 'New courses, discounts, and special events' },
                  { key: 'updates',   label: 'Product updates',      desc: 'New features and platform improvements' },
                  { key: 'reminders', label: 'Session reminders',    desc: "Upcoming workshops you've enrolled in" },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key}
                    className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[key]}
                      onChange={() => toggleNotification(key)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Danger zone */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-red-100 shadow-sm p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-[#8B0000]" />
                </div>
                <div className="pt-1.5">
                  <h2 className="text-base font-extrabold text-gray-900">Danger Zone</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Irreversible actions — proceed with caution</p>
                </div>
              </div>

              {!showDeleteConfirm ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Delete Account</p>
                    <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
                  </div>
                  <button onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors flex-shrink-0 w-full sm:w-auto justify-center">
                    <Trash2 className="w-3.5 h-3.5" /> Delete Account
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                  <p className="text-sm font-bold text-red-800 mb-1">Are you absolutely sure?</p>
                  <p className="text-xs text-red-600 mb-4">
                    This will permanently delete your account, all enrolments, and progress. This cannot be reversed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors w-full sm:w-auto">
                      Yes, delete my account
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-6">

            {/* Connected provider */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Connected Account</h2>
              <div className={`flex items-center gap-3 p-4 rounded-2xl border ${isGithub ? 'bg-gray-900 border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
                {isGithub
                  ? <Github className="w-5 h-5 text-white flex-shrink-0" />
                  : <Chrome className="w-5 h-5 text-blue-600 flex-shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-bold ${isGithub ? 'text-white' : 'text-blue-800'}`}>
                    {isGithub ? 'GitHub' : 'Google'}
                  </p>
                  <p className={`text-xs truncate ${isGithub ? 'text-gray-400' : 'text-blue-500'}`}>
                    {session.user?.email}
                  </p>
                </div>
                <CheckCircle className={`w-4 h-4 ml-auto flex-shrink-0 ${isGithub ? 'text-green-400' : 'text-green-500'}`} />
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Your profile picture and name are managed by your {isGithub ? 'GitHub' : 'Google'} account.
              </p>
            </motion.div>

            {/* Security */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#8B0000]" />
                </div>
                <h2 className="text-base font-extrabold text-gray-900">Security</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  OAuth sign-in (no password needed)
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Email verified
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-1">
                {[
                  { label: 'Your Dashboard', href: '/dashboard' },
                  { label: 'Browse Workshops', href: '/workshops' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms & Conditions', href: '/terms-conditions' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-[#8B0000] transition-colors font-medium group">
                    {label}
                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[#8B0000] transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}