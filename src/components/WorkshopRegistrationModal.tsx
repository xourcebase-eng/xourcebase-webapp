'use client';

// src/components/WorkshopRegistrationModal.tsx
// Shared registration modal for both free and paid workshops — same
// "Career Accelerator" visual system and interaction pattern as the
// original Introduction to Git & GitHub page, generalized so any workshop
// (free or paid) can reuse it instead of a dedicated full-page checkout.
//
// Free  : submits straight to /api/register-workshop, then best-effort WhatsApp.
// Paid  : Razorpay order -> Razorpay checkout -> /api/verify-payment ->
//         /api/send-receipt (email) -> best-effort WhatsApp.
// Both flows end in the same in-modal success state — no page redirect.

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import confetti from 'canvas-confetti';
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Download, Lock, Mail, X } from 'lucide-react';
import type { RazorpayPaymentResponse, RazorpayCheckoutOptions } from '@/types/razorpay';
import { buildWorkshopReceiptPdf } from '@/lib/workshopReceiptPdf';

const DISPLAY = "'Archivo Black', sans-serif";
const MONO = "'Space Grotesk', sans-serif";

export interface WorkshopRegistrationInfo {
  title: string;
  dateLabel: string;
  timeLabel: string;
  durationLabel?: string;
  host?: string;
  isFree: boolean;
  /** Price in whole INR. Required when isFree is false. */
  price?: number;
  /** One-line bonus callout for the WhatsApp confirmation, e.g. "Bonuses worth ₹6,400". Omit if none apply. */
  bonusesLabel?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  currentRole: string;
  experience: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  fullName: '', email: '', phone: '', whatsapp: '', currentRole: '', experience: '',
};

function validate(f: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (!f.fullName.trim()) e.fullName = 'Full name is required.';
  if (!f.email) e.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email.';
  if (!f.phone || f.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number is required.';
  return e;
}

// Phone input style overrides — squared off to match the hard-edge system.
// Shared across every modal instance, injected once.
function usePhoneInputStyles() {
  useEffect(() => {
    const styleId = 'phone-input-overrides-registration-modal';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .react-tel-input .form-control {
          width:100%!important; height:48px!important;
          padding:12px 14px 12px 56px!important;
          font-size:14px!important; color:#14141A!important;
          background:#F5F5F2!important; border:2px solid #14141A33!important;
          border-radius:0!important; transition:all .2s!important;
        }
        .react-tel-input .form-control:focus {
          border-color:#14141A!important; outline:none!important;
          box-shadow:none!important;
          background:#fff!important;
        }
        .react-tel-input .flag-dropdown {
          background:#F5F5F2!important; border:2px solid #14141A33!important;
          border-right:none!important; border-radius:0!important;
        }
        .react-tel-input .selected-flag { padding:0 0 0 14px!important; width:48px!important; }
        .react-tel-input .country-list {
          background:#fff!important; border:2px solid #14141A!important;
          border-radius:0!important; box-shadow:none!important;
          max-height:200px!important;
        }
        .react-tel-input .country-list .country:hover { background:#F5F5F2!important; }
        .react-tel-input .country-list .country.highlight { background:#C6FF3D33!important; }
        .phone-err .react-tel-input .form-control,
        .phone-err .react-tel-input .flag-dropdown { border-color:#FF3D57!important; }
      `;
      document.head.appendChild(style);
    }
  }, []);
}

async function sendWhatsAppBestEffort(
  phone: string,
  fullName: string,
  workshop: WorkshopRegistrationInfo
) {
  try {
    await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        fullName,
        workshop: workshop.title,
        workshopDate: workshop.dateLabel,
        workshopTime: workshop.timeLabel,
        workshopDuration: workshop.durationLabel,
        host: workshop.host,
        bonusesLabel: workshop.bonusesLabel,
      }),
    });
  } catch {
    // Best-effort only — WhatsApp failing should never block a confirmed registration.
  }
}

export default function WorkshopRegistrationModal({
  isOpen,
  onClose,
  workshop,
}: {
  isOpen: boolean;
  onClose: () => void;
  workshop: WorkshopRegistrationInfo;
}) {
  usePhoneInputStyles();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Countdown timer (15 min) — creates gentle urgency, resets each time the modal opens.
  const [timeLeft, setTimeLeft] = useState(900);
  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(900);
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [isOpen]);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Lazy-load the Razorpay checkout script only for paid workshops, only while open.
  useEffect(() => {
    if (!isOpen || workshop.isFree) return;
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [isOpen, workshop.isFree]);

  // Celebrate on success — a beat of delight after the form/payment grind.
  useEffect(() => {
    if (!submitted) return;
    confetti({ particleCount: 150, spread: 75, origin: { y: 0.6 }, colors: ['#14141A', '#C6FF3D', '#FF3D57', '#3D5AFF'] });
  }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setSubmitError(null);
      setErrors({});
      setForm(EMPTY_FORM);
      setPaymentId(null);
      setRegistrationId(null);
    }, 300);
  };

  const downloadReceipt = () => {
    const doc = buildWorkshopReceiptPdf({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      currentRole: form.currentRole,
      experience: form.experience,
      coupon: 'None',
      paymentId: paymentId ?? undefined,
      registrationId: registrationId ?? undefined,
      workshop: workshop.title,
      workshopDate: workshop.dateLabel,
      workshopTime: workshop.timeLabel,
      workshopDuration: workshop.durationLabel,
      amountPaid: workshop.price ? `₹${workshop.price}` : undefined,
      bonuses: workshop.bonusesLabel ? [workshop.bonusesLabel] : [],
    });
    doc.save(`XourceBase_${workshop.title.replace(/\s+/g, '_')}_Receipt.pdf`);
  };

  const registerFree = async () => {
    const res = await fetch('/api/register-workshop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workshop: workshop.title,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        whatsapp: form.whatsapp || form.phone,
        currentRole: form.currentRole,
        experience: form.experience,
      }),
    });
    const data = await res.json();
    if (!data?.success) throw new Error('Could not complete registration. Please try again.');
    setRegistrationId(data.registrationId ?? null);
    await sendWhatsAppBestEffort(form.whatsapp || form.phone, form.fullName, workshop);
  };

  const registerPaid = async () => {
    if (!workshop.price) throw new Error('This workshop is not configured for payment yet.');

    const orderRes = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: workshop.price, receipt: `workshop_${Date.now()}` }),
    });
    const orderData = await orderRes.json();
    if (!orderData?.success) throw new Error(orderData?.message || 'Could not start payment. Please try again.');

    await new Promise<void>((resolve, reject) => {
      const RazorpayCtor = window.Razorpay;
      if (!RazorpayCtor) {
        reject(new Error('Payment system is still loading — please try again in a moment.'));
        return;
      }

      const options: RazorpayCheckoutOptions = {
        key: process.env.NODE_ENV === 'development'
          ? 'rzp_test_S31sBB34MdQR0m'
          : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.order_id,
        name: 'XourceBase',
        description: workshop.title,
        image: 'https://xourcebase.com/logo.png',
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone.replace(/\D/g, ''),
        },
        theme: { color: '#14141A' },
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData?.success) {
              reject(new Error(verifyData?.message || 'Payment verification failed. Contact support with your payment ID.'));
              return;
            }

            setPaymentId(verifyData.payment_id ?? response.razorpay_payment_id);

            const receiptRes = await fetch('/api/send-receipt', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                whatsapp: form.whatsapp || form.phone,
                currentRole: form.currentRole,
                experience: form.experience,
                coupon: 'None',
                paymentId: verifyData.payment_id ?? response.razorpay_payment_id,
                workshop: workshop.title,
                workshopDate: workshop.dateLabel,
                workshopTime: workshop.timeLabel,
                workshopDuration: workshop.durationLabel,
                amountPaid: `₹${workshop.price}`,
                bonuses: workshop.bonusesLabel ? [workshop.bonusesLabel] : [],
              }),
            });
            const receiptData = await receiptRes.json();
            setRegistrationId(receiptData?.registrationId ?? null);
            await sendWhatsAppBestEffort(form.whatsapp || form.phone, form.fullName, workshop);
            resolve();
          } catch {
            reject(new Error('Payment succeeded, but confirming it failed. Contact support with your payment ID.'));
          }
        },
        modal: {
          ondismiss: () => reject(new Error('Payment was cancelled.')),
        },
      };

      new RazorpayCtor(options).open();
    });
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    setSubmitError(null);
    try {
      if (workshop.isFree) await registerFree();
      else await registerPaid();
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-[#14141A]/70"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            className="relative bg-white border-2 border-[#14141A] w-full max-w-lg max-h-[92vh] overflow-y-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {!submitted ? (
              <>
                {/* Modal header */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-start gap-3 border-b-2 border-[#14141A] px-5 sm:px-6 py-5">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#14141A] break-words" style={{ fontFamily: DISPLAY }}>
                      REGISTER FOR WORKSHOP
                    </h3>
                    <p className="text-xs text-[#14141A]/50 mt-0.5 font-semibold break-words">
                      {workshop.title} · {workshop.dateLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-8 h-8 flex items-center justify-center border-2 border-[#14141A]/20 text-[#14141A]/60 hover:text-[#14141A] hover:border-[#14141A] transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Countdown strip */}
                <div className="bg-[#C6FF3D] border-b-2 border-[#14141A] px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-[#14141A] font-bold flex items-center gap-1.5" style={{ fontFamily: MONO }}>
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    SEATS CONFIRM ON A FIRST-COME BASIS
                  </span>
                  <span className="text-sm font-extrabold text-[#14141A] tabular-nums flex-shrink-0" style={{ fontFamily: MONO }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                      Full Name <span className="text-[#FF3D57]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 focus:outline-none transition placeholder-[#14141A]/30 ${
                        errors.fullName ? 'border-[#FF3D57]' : 'border-[#14141A]/20 focus:border-[#14141A]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                      Email Address <span className="text-[#FF3D57]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14141A]/40 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 focus:outline-none transition placeholder-[#14141A]/30 ${
                          errors.email ? 'border-[#FF3D57]' : 'border-[#14141A]/20 focus:border-[#14141A]'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                      Phone Number <span className="text-[#FF3D57]">*</span>
                    </label>
                    <div className={errors.phone ? 'phone-err' : ''}>
                      <PhoneInput
                        country="in"
                        value={form.phone}
                        onChange={(phone) => {
                          setForm((p) => ({ ...p, phone }));
                          setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        inputProps={{ placeholder: '98765 43210' }}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#FF3D57] flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-bold text-[#14141A] mb-1.5">
                      WhatsApp Number
                      <span className="text-[#14141A]/40 font-normal ml-1">(optional — for joining link)</span>
                    </label>
                    <PhoneInput
                      country="in"
                      value={form.whatsapp}
                      onChange={(whatsapp) => setForm((p) => ({ ...p, whatsapp }))}
                      inputProps={{ placeholder: 'Same or different number' }}
                    />
                  </div>

                  {/* Role + Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">Current Role</label>
                      <input
                        type="text"
                        name="currentRole"
                        placeholder="e.g., Student / SDE"
                        value={form.currentRole}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] transition placeholder-[#14141A]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#14141A] mb-1.5">Experience</label>
                      <select
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] transition cursor-pointer"
                      >
                        <option value="">Select…</option>
                        <option value="0-1">0–1 Year</option>
                        <option value="1-3">1–3 Years</option>
                        <option value="3-5">3–5 Years</option>
                        <option value="5-10">5–10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                    </div>
                  </div>

                  {/* Price summary */}
                  <div className="bg-[#F5F5F2] border-2 border-[#14141A] px-4 sm:px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#14141A]/50 font-bold tracking-wide" style={{ fontFamily: MONO }}>
                        TOTAL DUE TODAY
                      </p>
                      <p className="text-2xl font-extrabold text-[#14141A] mt-0.5" style={{ fontFamily: MONO }}>
                        {workshop.isFree ? 'FREE' : `₹${workshop.price}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#14141A]/50 font-semibold">Workshop date</p>
                      <p className="text-sm font-bold text-[#14141A]">{workshop.dateLabel}</p>
                      <p className="text-xs text-[#14141A]/50">{workshop.timeLabel}</p>
                    </div>
                  </div>

                  {/* Error banner */}
                  {submitError && (
                    <div className="flex items-start gap-2 bg-[#FF3D57]/5 border-2 border-[#FF3D57] px-4 py-3 text-sm text-[#14141A] font-semibold">
                      <AlertCircle className="w-4 h-4 text-[#FF3D57] flex-shrink-0 mt-0.5" />
                      <span className="min-w-0 break-words">{submitError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-[#14141A] text-white font-bold py-3.5 text-sm tracking-wide hover:bg-black active:scale-[0.98] transition-all disabled:opacity-70"
                    style={{ fontFamily: MONO }}
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {workshop.isFree ? 'RESERVING…' : 'PROCESSING…'}
                      </>
                    ) : workshop.isFree ? (
                      <>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        RESERVE MY FREE SPOT
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        REGISTER &amp; PAY ₹{workshop.price}
                      </>
                    )}
                  </button>

                  {/* Trust line */}
                  <p className="text-center text-xs text-[#14141A]/40 pb-1">
                    {workshop.isFree ? 'No payment required · No spam, ever.' : 'Secured by Razorpay · Instant confirmation.'}
                  </p>
                  <p className="text-center text-xs text-[#14141A]/40">
                    By registering you agree to our{' '}
                    <Link href="/terms-conditions" className="underline hover:text-[#14141A]">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="underline hover:text-[#14141A]">Privacy Policy</Link>.
                  </p>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="p-8 sm:p-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="w-20 h-20 mx-auto border-2 border-[#14141A] flex items-center justify-center mb-6" style={{ background: '#C6FF3D' }}>
                    <CheckCircle2 className="w-10 h-10 text-[#14141A]" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-extrabold text-[#14141A] mb-2" style={{ fontFamily: DISPLAY }}>
                  YOU&apos;RE REGISTERED!
                </h3>
                <p className="text-[#14141A]/60 text-sm mb-4 leading-relaxed break-words">
                  Check your inbox at <span className="font-bold text-[#14141A]">{form.email}</span> for a confirmation email
                  {workshop.isFree ? ' with the joining link and pre-read resources.' : ', including your payment receipt.'}
                </p>
                {registrationId && (
                  <div className="bg-[#C6FF3D]/15 border-2 border-[#14141A] px-4 py-3 mb-4 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#14141A]/60 mb-1" style={{ fontFamily: MONO }}>
                      Your Registration ID
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-extrabold text-[#14141A] tracking-wide" style={{ fontFamily: MONO }}>
                        {registrationId}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(registrationId)}
                        className="text-xs font-bold text-[#14141A]/60 hover:text-[#14141A] underline flex-shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-[#14141A]/50 mt-1.5">
                      Save this — use it anytime at{' '}
                      <Link href="/check-registration" className="underline hover:text-[#14141A]">xourcebase.com/check-registration</Link>.
                    </p>
                  </div>
                )}
                {paymentId && (
                  <p className="text-xs text-[#14141A]/40 mb-6">
                    Payment ID: <span className="font-mono font-bold text-[#14141A]/60">{paymentId}</span>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
                  {!workshop.isFree && (
                    <button
                      onClick={downloadReceipt}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-[#14141A] text-[#14141A] px-8 py-3 font-bold text-sm tracking-wide hover:bg-[#F5F5F2] transition-colors"
                      style={{ fontFamily: MONO }}
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      DOWNLOAD RECEIPT
                    </button>
                  )}
                  <button
                    onClick={resetAndClose}
                    className="w-full sm:w-auto bg-[#14141A] text-white px-10 py-3 font-bold text-sm tracking-wide hover:bg-black transition-colors"
                    style={{ fontFamily: MONO }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
