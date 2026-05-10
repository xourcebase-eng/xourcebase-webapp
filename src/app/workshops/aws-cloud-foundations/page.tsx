'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, Users, Award, CheckCircle2, ArrowLeft, X, Zap, BookOpen, Video, FileText, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function AWSCloudFoundationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeCompany: '',
    experience: 'Beginner',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', collegeCompany: '', experience: 'Beginner' });
    }, 300);
  };

  const topics = [
    "AWS Global Infrastructure & Regions",
    "IAM – Identity & Access Management",
    "EC2 Instances & Security Groups",
    "S3 Buckets & Storage Services",
    "VPC, Subnets & Networking Basics",
    "CloudWatch Monitoring & Alerts",
    "AWS Pricing & Billing Overview",
    "Live Demo + Open Q&A Session",
  ];

  const includes = [
    { icon: <Zap className="w-5 h-5" />, title: "Live Interactive Session", desc: "3 hours of hands-on learning with real demos" },
    { icon: <Video className="w-5 h-5" />, title: "Session Recording", desc: "Lifetime access to the full recording" },
    { icon: <FileText className="w-5 h-5" />, title: "Workshop Notes & PDF", desc: "Detailed slides, cheatsheets & resources" },
    { icon: <Award className="w-5 h-5" />, title: "Certificate of Participation", desc: "LinkedIn-shareable digital certificate" },
    { icon: <Users className="w-5 h-5" />, title: "Community Access", desc: "Join our exclusive Discord community" },
    { icon: <MessageCircle className="w-5 h-5" />, title: "Live Doubt Clearing", desc: "Direct Q&A with the instructor" },
  ];

  const faqs = [
    ["Is this workshop beginner-friendly?", "Absolutely. This bootcamp is designed for absolute beginners as well as students and professionals starting their cloud journey."],
    ["Will I get a certificate?", "Yes — every participant receives a Certificate of Participation after attending the session."],
    ["Will the recording be available?", "Yes, the full recording is shared within 24 hours with lifetime access."],
    ["Do I need any prior knowledge?", "No prior AWS experience required. Just curiosity and a stable internet connection!"],
  ];

  return (
    <div className="font-sans text-gray-900 antialiased">

      {/* ── Back Button ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/#workshops"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Workshops
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-800 via-indigo-700 to-violet-800 text-white py-20 lg:py-28 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
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

            {/* Meta info */}
            <motion.div
              initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {[
                { icon: <Calendar className="w-4 h-4" />, label: "Date", value: "May 18, 2025" },
                { icon: <Clock className="w-4 h-4" />, label: "Time", value: "10:00 AM – 1:00 PM IST" },
                { icon: <Users className="w-4 h-4" />, label: "Duration", value: "3 Hours" },
                { icon: <Award className="w-4 h-4" />, label: "Price", value: "FREE", highlight: true },
              ].map((m, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
                  <div className="text-indigo-300">{m.icon}</div>
                  <div>
                    <p className="text-xs text-white/60 font-medium">{m.label}</p>
                    <p className={`text-sm font-bold ${m.highlight ? 'text-emerald-400' : 'text-white'}`}>{m.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-white text-indigo-800 font-bold text-base px-8 py-4 rounded-2xl hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-indigo-900/40"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              Reserve My Free Spot
            </button>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Curriculum</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What You Will Learn</h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {topics.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
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
          <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">What's Included</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Everything You Get — For Free</h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {includes.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
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
          <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Your Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet Your Instructor</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
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
                <p className="text-gray-600 leading-relaxed">
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
          <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true }} className="space-y-4">
            {faqs.map(([q, a], i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-3">
                  <span className="text-indigo-500 font-extrabold">Q.</span> {q}
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
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-white text-indigo-800 font-bold px-10 py-4 rounded-2xl text-base hover:bg-indigo-50 active:scale-[0.97] transition-all shadow-2xl shadow-indigo-900/40"
          >
            <Zap className="w-4 h-4" />
            Register Free for the Workshop
          </button>
        </div>
      </section>

      {/* ── Registration Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {!isSubmitted ? (
                <>
                  {/* Modal header */}
                  <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-100 px-6 py-5 rounded-t-3xl">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">Register for Workshop</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Free · AWS Cloud Foundations · May 18</p>
                    </div>
                    <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {[
                      { label: "Full Name", name: "fullName", type: "text", required: true, placeholder: "Rahul Sharma" },
                      { label: "Email Address", name: "email", type: "email", required: true, placeholder: "you@example.com" },
                      { label: "Phone Number", name: "phone", type: "tel", required: true, placeholder: "+91 98765 43210" },
                      { label: "College / Company", name: "collegeCompany", type: "text", required: false, placeholder: "IIT Bombay / Infosys (optional)" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400 text-sm"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Experience Level</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition text-sm"
                      >
                        <option value="Beginner">Beginner — No prior experience</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70 mt-2 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Registering…
                        </>
                      ) : "Reserve My Free Spot →"}
                    </button>

                    <p className="text-center text-xs text-gray-400 pt-1">No spam. We only send workshop details.</p>
                  </form>
                </>
              ) : (
                <div className="p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">You're Registered! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Check your inbox for a confirmation email with the joining link and pre-read resources.
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-gray-900 text-white px-10 py-3 rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors"
                  >
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