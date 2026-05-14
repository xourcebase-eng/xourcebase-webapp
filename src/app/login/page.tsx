'use client';

// src/app/login/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import logo from '@/assets/xourcebase-logo.png';
import type { Variants } from 'framer-motion';
// Add this import at the top
import { signIn } from 'next-auth/react';

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
    onClick: () => signIn('google', { callbackUrl: '/dashboard' }),
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
    onClick: () => signIn('github', { callbackUrl: '/dashboard' }),
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    // TODO: replace with real auth call
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="min-h-screen flex text-gray-900 antialiased">

      {/* ── Left panel — decorative (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#8B0000] overflow-hidden flex-col justify-between p-12">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gradient blobs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-red-900/50 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <img src={logo.src} alt="XourceBase" className="h-8 w-auto brightness-0 invert" />
          </Link>
        </div>

        {/* Quote / value prop */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-red-200" />
            <span className="text-red-200 text-sm font-semibold uppercase tracking-widest">Learn. Grow. Succeed.</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Welcome back to<br />your learning journey.
          </h2>
          <p className="text-red-200 text-base leading-relaxed max-w-sm">
            Pick up right where you left off. Your workshops, trainings, and community are waiting.
          </p>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '50K+', label: 'Learners' },
            { value: '200+', label: 'Workshops' },
            { value: '4.9★', label: 'Avg Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-white font-extrabold text-xl">{value}</p>
              <p className="text-red-200 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <img src={logo.src} alt="XourceBase" className="h-8 w-auto mx-auto" />
            </Link>
          </div>

          <motion.div initial="hidden" animate="visible">
            <motion.h1 custom={0} variants={fadeUp} className="text-3xl font-extrabold text-gray-900 mb-1">
              Sign in
            </motion.h1>
            <motion.p custom={1} variants={fadeUp} className="text-gray-500 text-sm mb-8">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#8B0000] font-semibold hover:underline">
                Get started free
              </Link>
            </motion.p>

            {/* Social login */}
            <motion.div custom={2} variants={fadeUp} className="grid grid-cols-2 gap-3 mb-6">
              {SOCIAL_PROVIDERS.map(({ name, icon, onClick }) => (
                <button
                  key={name}
                  type="button"
                  onClick={onClick} // ← use the onClick from the provider config
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
              <span className="text-xs text-gray-400 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <motion.div custom={4} variants={fadeUp}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
                  />
                </div>
              </motion.div>

              <motion.div custom={5} variants={fadeUp}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[#8B0000] font-medium hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
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
              </motion.div>

              <motion.div custom={6} variants={fadeUp} className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#8B0000] accent-[#8B0000] cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </motion.div>

              <motion.div custom={7} variants={fadeUp} className="pt-1">
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
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <Link href="/terms-conditions" className="underline hover:text-gray-600">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}