'use client';

// src/app/workshops/aws-cloud-foundations/page.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, Award, CheckCircle2, ArrowLeft, X,
  Zap, Video, FileText, MessageCircle, Star, Lock, Phone,
  Mail, Tag, AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// ─── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Coupon config — edit here to add/remove coupons ─────────────────────────

const COUPONS: Record<string, { discount: number; label: string }> = {
  EARLYBIRD: { discount: 50,  label: '50% OFF → ₹49' },
  XOURCE50:  { discount: 50,  label: '50% OFF → ₹49' },
  FREEPASS:  { discount: 100, label: 'FREE ACCESS!' },
  ONEFOR1:   { discount: 98,  label: 'Pay just ₹1' },
};

const BASE_PRICE = 99; // paise × 100 sent to Razorpay

function calcFinal(discount: number) {
  const final = Math.round(BASE_PRICE * (1 - discount / 100));
  return Math.max(final, 1);
}

function priceLabel(discount: number) {
  if (discount === 100) return 'FREE';
  return `₹${calcFinal(discount)}`;
}

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  currentRole: string;
  experience: string;
  couponCode: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validate(f: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (!f.fullName.trim())  e.fullName = 'Full name is required.';
  if (!f.email)            e.email    = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email.';
  if (!f.phone || f.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number is required.';
  return e;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AWSCloudFoundationsPage() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [paying,      setPaying]      = useState(false);
  const [errors,      setErrors]      = useState<FieldErrors>({});
  const [couponMsg,   setCouponMsg]   = useState<{ text: string; ok: boolean } | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [mounted,     setMounted]     = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', whatsapp: '',
    currentRole: '', experience: '', couponCode: '',
  });

  // Countdown timer (15 min)
  const [timeLeft, setTimeLeft] = useState(900);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Load Razorpay script
  useEffect(() => {
    setMounted(true);
    const script = document.createElement('script');
    script.src   = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Phone input overrides
    const styleId = 'phone-input-overrides';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id   = styleId;
      style.textContent = `
        .react-tel-input .form-control {
          width:100%!important; height:48px!important;
          padding:12px 14px 12px 56px!important;
          font-size:14px!important; color:#1f2937!important;
          background:#f9fafb!important; border:1px solid #e5e7eb!important;
          border-radius:12px!important; transition:all .2s!important;
        }
        .react-tel-input .form-control:focus {
          border-color:#6366f1!important; outline:none!important;
          box-shadow:0 0 0 3px rgba(99,102,241,.12)!important;
          background:#fff!important;
        }
        .react-tel-input .flag-dropdown {
          background:#f9fafb!important; border:1px solid #e5e7eb!important;
          border-right:none!important; border-radius:12px 0 0 12px!important;
        }
        .react-tel-input .selected-flag { padding:0 0 0 14px!important; width:48px!important; }
        .react-tel-input .country-list {
          background:#fff!important; border:1px solid #e5e7eb!important;
          border-radius:12px!important; box-shadow:0 8px 24px rgba(0,0,0,.1)!important;
          max-height:200px!important;
        }
        .react-tel-input .country-list .country:hover { background:#f3f4f6!important; }
        .react-tel-input .country-list .country.highlight { background:#eef2ff!important; }
        .phone-err .react-tel-input .form-control,
        .phone-err .react-tel-input .flag-dropdown { border-color:#ef4444!important; }
      `;
      document.head.appendChild(style);
    }

    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const openModal  = () => { setModalOpen(true); setSubmitted(false); setPaying(false); };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSubmitted(false); setErrors({});
      setCouponMsg(null); setCouponDiscount(0);
      setForm({ fullName:'',email:'',phone:'',whatsapp:'',currentRole:'',experience:'',couponCode:'' });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const applyCoupon = () => {
    const code = form.couponCode.trim().toUpperCase();
    if (!code) { setCouponMsg(null); setCouponDiscount(0); return; }
    const found = COUPONS[code];
    if (found) {
      setCouponDiscount(found.discount);
      setCouponMsg({ text: `✓ ${code} applied — ${found.label}`, ok: true });
    } else {
      setCouponDiscount(0);
      setCouponMsg({ text: '✗ Invalid coupon code', ok: false });
    }
  };

  const handlePayment = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Free-pass shortcut
    if (couponDiscount === 100) {
      setSubmitted(true);
      return;
    }

    setPaying(true);

    try {
      const finalAmount = calcFinal(couponDiscount);

      const res  = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          receipt: `aws_workshop_${Date.now()}`,
          fullName:    form.fullName,
          email:       form.email,
          phone:       form.phone,
          whatsapp:    form.whatsapp,
          currentRole: form.currentRole,
          experience:  form.experience,
          coupon:      form.couponCode || 'None',
        }),
      });
      const data = await res.json();

      if (!data.success) { alert('Could not initiate payment. Please try again.'); setPaying(false); return; }

      const options = {
        key: process.env.NODE_ENV === 'development'
          ? 'rzp_test_S31sBB34MdQR0m'
          : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount:      data.amount,
        currency:    data.currency,
        order_id:    data.order_id,
        name:        'XourceBase',
        description: 'AWS Cloud Foundations Bootcamp',
        image:       'https://xourcebase.com/logo.png',
        prefill: {
          name:    form.fullName,
          email:   form.email,
          contact: form.phone.replace(/\D/g, ''),
        },
        theme: { color: '#6366f1' },

        handler: async (response: any) => {
          try {
            const verify = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              }),
            });
            const vData = await verify.json();

            if (vData.success) {
              window.location.href =
                `/workshop-success?payment_id=${vData.payment_id}` +
                `&name=${encodeURIComponent(form.fullName)}` +
                `&email=${encodeURIComponent(form.email)}` +
                `&phone=${encodeURIComponent(form.phone)}` +
                `&whatsapp=${encodeURIComponent(form.whatsapp || '')}` +
                `&role=${encodeURIComponent(form.currentRole || '')}` +
                `&experience=${encodeURIComponent(form.experience || '')}` +
                `&coupon=${encodeURIComponent(form.couponCode || 'None')}`;
            } else {
              alert(`Payment verification failed: ${vData.message || 'Contact support.'}`);
            }
          } catch {
            alert(`Verification error. Payment ID: ${response.razorpay_payment_id}. Email contact@xourcebase.com`);
          } finally {
            setPaying(false);
          }
        },

        modal: { ondismiss: () => setPaying(false) },
      };

      // @ts-ignore
      new (window as any).Razorpay(options).open();
    } catch {
      alert('Payment failed. Please try again.');
      setPaying(false);
    }
  };

  // ─── Content data ───────────────────────────────────────────────────────────

  const topics = [
    'AWS Global Infrastructure & Regions',
    'IAM — Identity & Access Management',
    'EC2 Instances & Security Groups',
    'S3 Buckets & Storage Services',
    'VPC, Subnets & Networking Basics',
    'CloudWatch Monitoring & Alerts',
    'AWS Pricing & Billing Overview',
    'Live Demo + Open Q&A Session',
  ];

  const includes = [
    { icon: <Zap className="w-5 h-5" />,           title: 'Live Interactive Session',    desc: '3 hours of hands-on learning with real demos' },
    { icon: <Video className="w-5 h-5" />,          title: 'Session Recording',           desc: 'Lifetime access to the full recording' },
    { icon: <FileText className="w-5 h-5" />,       title: 'Workshop Notes & PDF',        desc: 'Detailed slides, cheatsheets & resources' },
    { icon: <Award className="w-5 h-5" />,          title: 'Certificate of Participation',desc: 'LinkedIn-shareable digital certificate' },
    { icon: <Users className="w-5 h-5" />,          title: 'Community Access',            desc: 'Join our exclusive Discord community' },
    { icon: <MessageCircle className="w-5 h-5" />,  title: 'Live Doubt Clearing',         desc: 'Direct Q&A with the instructor' },
  ];

  const faqs = [
    ['Is this workshop beginner-friendly?',  'Absolutely. Designed for absolute beginners as well as students and professionals starting their cloud journey.'],
    ['Will I get a certificate?',            'Yes — every participant receives a Certificate of Participation after the session.'],
    ['Will the recording be available?',     'Yes, the full recording is shared within 24 hours with lifetime access.'],
    ['Do I need any prior knowledge?',       'No prior AWS experience required. Just curiosity and a stable internet connection!'],
    ['What if I am not satisfied?',          'We offer a full refund within 7 days of the session if you are not satisfied — no questions asked.'],
  ];

  // Current discount label for CTA buttons
  const ctaLabel = couponDiscount === 100
    ? 'Claim FREE Access'
    : couponDiscount > 0
    ? `Pay ${priceLabel(couponDiscount)} & Register`
    : 'Reserve My Free Spot';

  // ─── JSX ────────────────────────────────────────────────────────────────────

  return (
    <div className="font-sans text-gray-900 antialiased">

      {/* ── Back ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Workshops
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-800 via-indigo-700 to-violet-800 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free Live Workshop
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-white">
                AWS Cloud Foundations<br />
                <span className="text-indigo-200">Bootcamp</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
                Master the fundamentals of Amazon Web Services in one focused live session and launch your cloud career.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: <Calendar className="w-4 h-4" />, label: 'Date',     value: 'May 18, 2025' },
                { icon: <Clock className="w-4 h-4" />,    label: 'Time',     value: '10:00 AM – 1:00 PM IST' },
                { icon: <Users className="w-4 h-4" />,    label: 'Duration', value: '3 Hours' },
                { icon: <Award className="w-4 h-4" />,    label: 'Price',    value: 'FREE', highlight: true },
              ].map((m, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
                  <div className="text-indigo-300">{m.icon}</div>
                  <div>
                    <p className="text-xs text-white/60 font-medium">{m.label}</p>
                    <p className={`text-sm font-bold ${m.highlight ? 'text-emerald-400' : 'text-white'}`}>{m.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <button type="button" onClick={openModal}
              className="inline-flex items-center gap-2 bg-white text-indigo-800 font-bold text-base px-8 py-4 rounded-2xl hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-indigo-900/40">
              <Zap className="w-4 h-4 text-indigo-600" />
              Reserve My Free Spot
            </button>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Curriculum</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What You Will Learn</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
            {topics.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <div className="w-8 h-8 flex-shrink-0 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-800 font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Workshop Includes ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">What's Included</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Everything You Get — For Free</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Instructor ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Your Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet Your Instructor</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-indigo-200">
                RA
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Rahul Arora</h3>
                <p className="text-indigo-600 font-semibold text-sm mb-1">Senior Cloud Architect · Ex-AWS · 9+ Years Experience</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-sm text-gray-500 ml-1">4.9 · 800+ students trained</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Rahul has helped 800+ students break into cloud and DevOps roles across India and abroad.
                  He specialises in AWS, Terraform, and Kubernetes with hands-on production experience at scale.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="space-y-4">
            {faqs.map(([q, a], i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-3">
                  <span className="text-indigo-500 font-extrabold flex-shrink-0">Q.</span> {q}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed pl-6">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-800 to-violet-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-indigo-300 font-semibold text-sm uppercase tracking-widest mb-3">Limited Seats</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Start Your Cloud Journey?</h2>
          <p className="text-white/70 mb-8">Join thousands of learners who've launched their AWS careers with us.</p>
          <button type="button" onClick={openModal}
            className="inline-flex items-center gap-2 bg-white text-indigo-800 font-bold px-10 py-4 rounded-2xl text-base hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-indigo-900/40">
            <Zap className="w-4 h-4" />
            Register Free for the Workshop
          </button>
        </div>
      </section>

      {/* ── Registration Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="relative bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {!submitted ? (
                <>
                  {/* ── Modal header ── */}
                  <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-100 px-6 py-5 rounded-t-3xl">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">Register for Workshop</h3>
                      <p className="text-xs text-gray-400 mt-0.5">AWS Cloud Foundations Bootcamp · May 18, 2025</p>
                    </div>
                    <button type="button" onClick={closeModal}
                      className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* ── Countdown strip ── */}
                  <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3 flex items-center justify-between">
                    <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Offer expires in
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 tabular-nums">
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="fullName" autoComplete="name"
                        placeholder="Rahul Sharma" value={form.fullName} onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition placeholder-gray-400 ${
                          errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-300 focus:border-indigo-400'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input type="email" name="email" autoComplete="email"
                          placeholder="you@example.com" value={form.email} onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition placeholder-gray-400 ${
                            errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-300 focus:border-indigo-400'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className={errors.phone ? 'phone-err' : ''}>
                        <PhoneInput country="in" value={form.phone}
                          onChange={(phone) => { setForm((p) => ({ ...p, phone })); setErrors((p) => ({ ...p, phone: undefined })); }}
                          inputProps={{ placeholder: '98765 43210' }}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        WhatsApp Number
                        <span className="text-gray-400 font-normal ml-1">(optional — for joining link)</span>
                      </label>
                      <PhoneInput country="in" value={form.whatsapp}
                        onChange={(whatsapp) => setForm((p) => ({ ...p, whatsapp }))}
                        inputProps={{ placeholder: 'Same or different number' }}
                      />
                    </div>

                    {/* Role + Experience row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Role</label>
                        <input type="text" name="currentRole"
                          placeholder="e.g., Student / SDE" value={form.currentRole} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Experience</label>
                        <select name="experience" value={form.experience} onChange={handleChange}
                          className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition cursor-pointer">
                          <option value="">Select…</option>
                          <option value="0-1">0–1 Year</option>
                          <option value="1-3">1–3 Years</option>
                          <option value="3-5">3–5 Years</option>
                          <option value="5-10">5–10 Years</option>
                          <option value="10+">10+ Years</option>
                        </select>
                      </div>
                    </div>

                    {/* Coupon */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-indigo-400" />
                        Coupon Code
                      </label>
                      <div className="flex gap-2">
                        <input type="text" name="couponCode"
                          placeholder="e.g., EARLYBIRD" value={form.couponCode}
                          onChange={(e) => { handleChange(e); setCouponMsg(null); setCouponDiscount(0); }}
                          className="flex-1 px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition placeholder-gray-400 placeholder-normal"
                        />
                        <button type="button" onClick={applyCoupon}
                          className="flex-shrink-0 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors">
                          Apply
                        </button>
                      </div>
                      {couponMsg && (
                        <p className={`mt-1.5 text-xs font-semibold flex items-center gap-1 ${couponMsg.ok ? 'text-emerald-600' : 'text-red-600'}`}>
                          {couponMsg.ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {couponMsg.text}
                        </p>
                      )}
                    </div>

                    {/* Price summary */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Total due today</p>
                        <p className="text-2xl font-extrabold text-indigo-700 mt-0.5">
                          {couponDiscount > 0 ? priceLabel(couponDiscount) : 'FREE'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Workshop date</p>
                        <p className="text-sm font-semibold text-gray-700">May 18, 2025</p>
                        <p className="text-xs text-gray-400">10:00 AM – 1:00 PM IST</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="button" onClick={handlePayment} disabled={paying}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70">
                      {paying ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Processing…
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          {couponDiscount === 0 ? 'Reserve My Free Spot →' : `Pay ${priceLabel(couponDiscount)} & Register →`}
                        </>
                      )}
                    </button>

                    {/* Trust line */}
                    <p className="text-center text-xs text-gray-400 pb-1">
                      🔒 Secured by Razorpay · 100% Money-Back Guarantee · No spam, ever.
                    </p>
                    <p className="text-center text-xs text-gray-400">
                      By registering you agree to our{' '}
                      <Link href="/terms-conditions" className="underline hover:text-gray-600">Terms</Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                    </p>
                  </div>
                </>
              ) : (
                /* ── Success state (free-pass / FREEPASS coupon) ── */
                <div className="p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">You're Registered! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Check your inbox at <span className="font-semibold text-gray-700">{form.email}</span> for a confirmation email with the joining link and pre-read resources.
                  </p>
                  <button onClick={closeModal}
                    className="bg-gray-900 text-white px-10 py-3 rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors">
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}