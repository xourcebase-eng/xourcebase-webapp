'use client';

// src/app/contact/page.tsx
// Same "Career Accelerator" visual system as /workshops and /trainings.
// Signature element: a "Direct Lines" signal panel — a color-coded list of
// contact channels, echoing the Session Board's list format from /workshops.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, Linkedin, Twitter,
  Instagram, Youtube, Facebook, Clock, CheckCircle2, AlertCircle,
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

/* ── Design tokens ──────────────────────────────── */
// paper #F5F5F2 · ink #14141A · lime #C6FF3D · coral #FF3D57 · azure #3D5AFF · gold #FFB800

/* ── Constants ──────────────────────────────────── */
const MAX_MESSAGE = 1000;

const CONTACT_ITEMS = [
  { icon: Mail,   label: 'EMAIL',    value: 'contact@xourcebase.com',      href: 'mailto:contact@xourcebase.com', bg: '#C6FF3D', text: '#14141A' },
  { icon: Phone,  label: 'PHONE',    value: '+91 87677 65307',             href: 'tel:+918767765307',              bg: '#FF3D57', text: '#FFFFFF' },
  { icon: MapPin, label: 'LOCATION', value: 'Mumbai, Maharashtra, India',  href: null,                              bg: '#3D5AFF', text: '#FFFFFF' },
  { icon: Clock,  label: 'RESPONSE', value: 'Within 24 business hours',    href: null,                              bg: '#FFB800', text: '#14141A' },
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

/* ── Fonts (self-contained, same family set as /workshops and /trainings) ── */
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

/* ── Field wrapper ──────────────────────────────── */
function Field({
  label, error, children, hint,
}: {
  label: string; error?: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest text-[#14141A] mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      {children}
      {error
        ? <p className="mt-1.5 text-xs text-[#FF3D57] font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>
        : hint
        ? <p className="mt-1.5 text-xs text-[#14141A]/40">{hint}</p>
        : null}
    </div>
  );
}

/* ── Direct Lines signal panel (hero signature) ──── */
function DirectLines() {
  return (
    <div className="border-2 border-[#14141A] bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14141A] text-white">
        <span className="text-[11px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          DIRECT LINES
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#C6FF3D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-pulse" />
          OPEN NOW
        </span>
      </div>
      {CONTACT_ITEMS.map((item, i) => {
        const Icon = item.icon;
        const content = (
          <>
            <div
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center border-2 border-[#14141A]"
              style={{ background: item.bg, color: item.text }}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-widest text-[#14141A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.label}
              </p>
              <p className="text-sm font-bold text-[#14141A] truncate">{item.value}</p>
            </div>
          </>
        );
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.35 }}
            className={`${i !== CONTACT_ITEMS.length - 1 ? 'border-b border-[#14141A]/10' : ''}`}
          >
            {item.href ? (
              <a href={item.href} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F2] transition-colors">
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3">{content}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */
export default function ContactPage() {
  useAcceleratorFonts();

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const inputBase =
    'w-full px-4 py-3 bg-white border-2 text-sm text-[#14141A] placeholder-[#14141A]/35 focus:outline-none transition-colors';
  const inputOk  = 'border-[#14141A]/20 focus:border-[#14141A]';
  const inputErr = 'border-[#FF3D57] bg-[#FF3D57]/5';

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
    <div className="min-h-screen bg-[#F5F5F2] text-[#14141A] antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-14 lg:pt-24 lg:pb-16 px-6">
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#14141A]/15 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#14141A]/15 hidden md:block" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] bg-[#FF3D57] text-white px-3 py-1.5 mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Get In Touch
              </span>
              <h1
                className="text-[11vw] sm:text-5xl md:text-6xl leading-[0.95] text-[#14141A] mb-6"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                LET'S START A<br />
                <span className="bg-[#C6FF3D] px-2">CONVERSATION</span>
              </h1>
              <p className="text-base md:text-lg text-[#14141A]/60 max-w-lg">
                Have questions about our workshops, trainings, or partnerships? We'd love to hear from you — and we respond within 24 business hours.
              </p>
            </motion.div>

            {/* Right: signature — direct lines panel */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <DirectLines />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left: form (3 cols) ── */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden" animate="visible" variants={slideIn}
          >
            <div className="bg-white border-2 border-[#14141A] p-7 sm:p-10">
              <h2 className="text-xl mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>SEND US A MESSAGE</h2>
              <p className="text-sm text-[#14141A]/40 mb-8">All fields marked with * are required.</p>

              {/* Status banners */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 border-2 border-[#14141A] bg-[#C6FF3D] text-[#14141A] text-sm px-5 py-4 mb-6"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message sent!</p>
                    <p className="mt-0.5">We'll get back to you within 24 business hours.</p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 border-2 border-[#14141A] bg-[#FF3D57] text-white text-sm px-5 py-4 mb-6"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Something went wrong.</p>
                    <p className="mt-0.5">Please try again or email us directly at contact@xourcebase.com</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="FULL NAME *" error={errors.name}>
                    <input
                      type="text" name="name" autoComplete="name"
                      placeholder="Rahul Sharma"
                      value={formData.name} onChange={handleChange}
                      disabled={isLoading}
                      className={`${inputBase} ${errors.name ? inputErr : inputOk} disabled:opacity-60`}
                    />
                  </Field>
                  <Field label="EMAIL ADDRESS *" error={errors.email}>
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
                <Field label="SUBJECT *" error={errors.subject}>
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
                  label="MESSAGE *"
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
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 font-bold text-sm tracking-wide text-white bg-[#14141A] hover:bg-black disabled:opacity-60 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      SENDING…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SEND MESSAGE
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

            {/* Follow us */}
            <div className="bg-white border-2 border-[#14141A] p-7">
              <h3 className="text-base mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>FOLLOW US</h3>
              <p className="text-xs text-[#14141A]/40 mb-5">Stay updated on workshops and announcements.</p>
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
                    className="flex flex-col items-center gap-1.5 p-3 border-2 border-[#14141A]/15 hover:border-[#14141A] hover:bg-[#F5F5F2] transition-all group"
                  >
                    <Icon className="w-5 h-5 text-[#14141A]/60 group-hover:text-[#14141A] transition-colors" />
                    <span className="text-[9px] text-[#14141A]/40 group-hover:text-[#14141A] font-bold tracking-wide transition-colors leading-none">
                      {label.toUpperCase()}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick note */}
            <div className="bg-[#14141A] p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2" style={{ background: '#C6FF3D' }} />
              <p className="text-[#C6FF3D] text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quick Note
              </p>
              <p className="text-white text-sm leading-relaxed">
                For urgent workshop registrations, WhatsApp us directly at{' '}
                <a
                  href="https://wa.me/918767765307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-bold text-[#C6FF3D] hover:text-white transition-colors"
                >
                  +91 87677 65307
                </a>
                {' '}for a faster response.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}