'use client';

// src/app/signup/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import logo from '@/assets/xourcebase-logo.png';
import type { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const SOCIAL_PROVIDERS = [
  {
    name: 'Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

const PERKS = [
  'Access 200+ workshops & trainings',
  'Certificate on every completion',
  'Join 50,000+ learners community',
  'Lifetime access to recordings',
];

// Password strength checker
function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: '', color: 'bg-gray-200' },
    { label: 'Weak', color: 'bg-red-400' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];
  return { score, ...map[score] };
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const strength = getStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required.';
    if (!formData.email) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email.';
    if (!formData.password) e.password = 'Password is required.';
    else if (formData.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!formData.agreeTerms) e.agreeTerms = 'You must agree to the terms.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    // TODO: replace with real registration call
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="min-h-screen flex text-gray-900 antialiased">

      {/* ── Left panel — decorative (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gray-950 overflow-hidden flex-col justify-between p-12">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8B0000]/30 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <img src={logo.src} alt="XourceBase" className="h-8 w-auto brightness-0 invert" />
          </Link>
        </div>

        {/* Value prop */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-red-400" />
            <span className="text-red-400 text-sm font-semibold uppercase tracking-widest">Free Forever</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Start learning today.<br />
            <span className="text-[#cc3333]">No credit card needed.</span>
          </h2>
          <ul className="space-y-3.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "XourceBase helped me land my first cloud role in just 3 months. The workshops are genuinely world-class."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0000] to-red-400 flex items-center justify-center text-white text-xs font-bold">
              PS
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Priya S.</p>
              <p className="text-gray-500 text-xs">Cloud Engineer, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <img src={logo.src} alt="XourceBase" className="h-8 w-auto mx-auto" />
            </Link>
          </div>

          <motion.div initial="hidden" animate="visible">
            <motion.h1 custom={0} variants={fadeUp} className="text-3xl font-extrabold text-gray-900 mb-1">
              Create your account
            </motion.h1>
            <motion.p custom={1} variants={fadeUp} className="text-gray-500 text-sm mb-8">
              Already have one?{' '}
              <Link href="/login" className="text-[#8B0000] font-semibold hover:underline">
                Sign in
              </Link>
            </motion.p>

            {/* Social signup */}
            <motion.div custom={2} variants={fadeUp} className="grid grid-cols-2 gap-3 mb-6">
              {SOCIAL_PROVIDERS.map(({ name, icon }) => (
                <button
                  key={name}
                  type="button"
                  className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm"
                >
                  {icon}
                  {name}
                </button>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div custom={3} variants={fadeUp} className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Full Name */}
              <motion.div custom={4} variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8B0000]/20 focus:border-[#8B0000]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>}
              </motion.div>

              {/* Email */}
              <motion.div custom={5} variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8B0000]/20 focus:border-[#8B0000]'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </motion.div>

              {/* Password */}
              <motion.div custom={6} variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-11 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8B0000]/20 focus:border-[#8B0000]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i <= strength.score ? strength.color : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    {strength.label && (
                      <p className="text-xs text-gray-500">
                        Strength: <span className="font-semibold">{strength.label}</span>
                      </p>
                    )}
                  </div>
                )}
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
              </motion.div>

              {/* Terms checkbox */}
              <motion.div custom={7} variants={fadeUp} className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#8B0000] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    I agree to XourceBase's{' '}
                    <Link href="/terms-conditions" className="text-[#8B0000] font-medium hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="text-[#8B0000] font-medium hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeTerms && <p className="mt-1.5 text-xs text-red-600">{errors.agreeTerms}</p>}
              </motion.div>

              {/* Submit */}
              <motion.div custom={8} variants={fadeUp} className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#8B0000] hover:bg-[#700000] active:scale-[0.98] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm shadow-red-900/20"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>
                      Get Started — It's Free
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-gray-400">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}