'use client';

// src/app/contact/page.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, Linkedin, Twitter,
  Instagram, Youtube, Facebook, Clock, CheckCircle2, AlertCircle,
  MessageSquare,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

/* ── Animation variants ─────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const, delay: 0.1 } },
};

/* ── Constants ──────────────────────────────────── */
const MAX_MESSAGE = 1000;

const CONTACT_ITEMS = [
  { icon: Mail,    label: 'Email',    value: 'contact@xourcebase.com', href: 'mailto:contact@xourcebase.com' },
  { icon: Phone,   label: 'Phone',    value: '+91 87677 65307',        href: 'tel:+918767765307' },
  { icon: MapPin,  label: 'Location', value: 'Mumbai, Maharashtra, India', href: null },
  { icon: Clock,   label: 'Response', value: 'Within 24 business hours',   href: null },
];

const SOCIALS = [
  { icon: Linkedin,  url: 'https://www.linkedin.com/company/xourcebase',            label: 'LinkedIn'  },
  { icon: Twitter,   url: 'https://x.com/XourceBase',                               label: 'Twitter'   },
  { icon: Instagram, url: 'https://www.instagram.com/xourcebase/',                  label: 'Instagram' },
  { icon: Youtube,   url: 'https://www.youtube.com/@XourceBase',                    label: 'YouTube'   },
  { icon: Facebook,  url: 'https://www.facebook.com/profile.php?id=61582394452096', label: 'Facebook'  },
];

const SUBJECTS = [
  'General Inquiry',
  'Workshop Registration',
  'Training Programs',
  'Partnership Opportunity',
  'Technical Support',
  'Billing & Payments',
  'Other',
];

type FormData = { name: string; email: string; subject: string; message: string };
type FieldErrors = Partial<Record<keyof FormData, string>>;

/* ── Validation ─────────────────────────────────── */
function validate(data: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (!data.name.trim()) e.name = 'Please enter your name.';
  if (!data.email) e.email = 'Please enter your email.';
  else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Enter a valid email address.';
  if (!data.subject) e.subject = 'Please select a subject.';
  if (!data.message.trim()) e.message = 'Please write a message.';
  else if (data.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
  return e;
}

/* ── Field wrapper ──────────────────────────────── */
function Field({
  label, error, children, hint,
}: {
  label: string; error?: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error
        ? <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>
        : hint
        ? <p className="mt-1.5 text-xs text-gray-400">{hint}</p>
        : null}
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const inputBase =
    'w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all';
  const inputOk  = 'border-gray-200 focus:ring-[#8B0000]/20 focus:border-[#8B0000]';
  const inputErr = 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setStatus('idle');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const remaining = MAX_MESSAGE - formData.message.length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Hero band ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 lg:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B0000] border border-red-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <MessageSquare className="w-3.5 h-3.5" />
              We respond within 24 hrs
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Let's start a conversation
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Have questions about our workshops, trainings, or partnerships? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left: form (3 cols) ── */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden" animate="visible" variants={slideIn}
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-10">
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">Send us a message</h2>
              <p className="text-sm text-gray-400 mb-8">All fields marked with * are required.</p>

              {/* Status banners */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-5 py-4 rounded-2xl mb-6"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Message sent!</p>
                    <p className="text-emerald-700 mt-0.5">We'll get back to you within 24 business hours.</p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 text-sm px-5 py-4 rounded-2xl mb-6"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-semibold">Something went wrong.</p>
                    <p className="text-red-600 mt-0.5">Please try again or email us directly at contact@xourcebase.com</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" error={errors.name}>
                    <input
                      type="text" name="name" autoComplete="name"
                      placeholder="Rahul Sharma"
                      value={formData.name} onChange={handleChange}
                      disabled={isLoading}
                      className={`${inputBase} ${errors.name ? inputErr : inputOk} disabled:opacity-60`}
                    />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input
                      type="email" name="email" autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email} onChange={handleChange}
                      disabled={isLoading}
                      className={`${inputBase} ${errors.email ? inputErr : inputOk} disabled:opacity-60`}
                    />
                  </Field>
                </div>

                {/* Subject dropdown */}
                <Field label="Subject *" error={errors.subject}>
                  <select
                    name="subject"
                    value={formData.subject} onChange={handleChange}
                    disabled={isLoading}
                    className={`${inputBase} ${errors.subject ? inputErr : inputOk} disabled:opacity-60 cursor-pointer`}
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                {/* Message */}
                <Field
                  label="Message *"
                  error={errors.message}
                  hint={!errors.message ? `${remaining} characters remaining` : undefined}
                >
                  <textarea
                    name="message" rows={6}
                    placeholder="Tell us more about your inquiry…"
                    value={formData.message} onChange={handleChange}
                    maxLength={MAX_MESSAGE}
                    disabled={isLoading}
                    className={`${inputBase} ${errors.message ? inputErr : inputOk} resize-none disabled:opacity-60`}
                  />
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 font-bold text-sm text-white bg-[#8B0000] hover:bg-[#700000] active:scale-[0.98] disabled:opacity-60 rounded-xl transition-all shadow-sm shadow-red-900/20"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

          {/* ── Right: info (2 cols) ── */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden" animate="visible" variants={slideInRight}
          >

            {/* Contact details */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
              <h3 className="text-base font-extrabold text-gray-900 mb-5">Contact Details</h3>
              <ul className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex-shrink-0 bg-red-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#8B0000]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-gray-800 hover:text-[#8B0000] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow us */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
              <h3 className="text-base font-extrabold text-gray-900 mb-1">Follow Us</h3>
              <p className="text-xs text-gray-400 mb-5">Stay updated on workshops and announcements.</p>
              <div className="grid grid-cols-5 gap-2">
                {SOCIALS.map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.93 }}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gray-50 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all group"
                  >
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-[#8B0000] transition-colors" />
                    <span className="text-[10px] text-gray-400 group-hover:text-[#8B0000] font-medium transition-colors leading-none">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick note */}
            <div className="bg-[#8B0000] rounded-3xl p-7 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/10 rounded-full" />
              <div className="relative z-10">
                <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-2">Quick note</p>
                <p className="text-white text-sm leading-relaxed">
                  For urgent workshop registrations, WhatsApp us directly at{' '}
                  <a
                    href="https://wa.me/918767765307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 font-semibold hover:text-red-200 transition-colors"
                  >
                    +91 87677 65307
                  </a>
                  {' '}for a faster response.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}