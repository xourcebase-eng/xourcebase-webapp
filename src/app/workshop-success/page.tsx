// app/workshop-success/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Clock, Users, Award, Mail, Phone, ArrowLeft } from 'lucide-react';

export default function WorkshopSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
      {/* Hero Success Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <CheckCircle className="w-32 h-32 mx-auto text-green-300 animate-pulse" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Payment Successful! 🎉
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl opacity-90 mb-4"
            >
              Congratulations! You're officially registered for the
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-yellow-300"
            >
              Career Accelerator Workshop
            </motion.p>

            {paymentId && (
              <motion.p
                variants={fadeInUp}
                className="mt-8 text-lg opacity-80"
              >
                Payment ID: <span className="font-mono font-bold">{paymentId}</span>
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Details & Next Steps */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-10"
          >
            {/* Workshop Details */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <Calendar className="w-10 h-10 text-emerald-600" />
                Workshop Details
              </h2>

              <div className="space-y-6 text-lg">
                <p className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <span>
                    <strong>Date & Time:</strong> Saturday, 20th December 2025 @ 7:00 PM IST
                  </span>
                </p>
                <p className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <span>
                    <strong>Duration:</strong> 2 Hours Live Session
                  </span>
                </p>
                <p className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <span>
                    <strong>Platform:</strong> Zoom (Link will be sent 1 hour before)
                  </span>
                </p>
              </div>

              <div className="mt-10 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800 font-bold text-lg">
                  🎁 Bonus: You’ll receive workshop materials, recording access, and ₹6,400 worth of bonuses within 24 hours!
                </p>
              </div>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white rounded-2xl shadow-2xl p-10"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <CheckCircle className="w-10 h-10 text-green-300" />
                What Happens Next?
              </h2>

              <ul className="space-y-5 text-lg">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-green-300 flex-shrink-0 mt-1" />
                  <span>You’ll receive a confirmation email shortly with all details</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-green-300 flex-shrink-0 mt-1" />
                  <span>Zoom link will be sent to your email & WhatsApp 1 hour before the workshop</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-green-300 flex-shrink-0 mt-1" />
                  <span>Workshop recording + bonuses will be shared within 24 hours</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-green-300 flex-shrink-0 mt-1" />
                  <span>Join our exclusive WhatsApp community for updates</span>
                </li>
              </ul>

              <div className="mt-10 p-6 bg-white/10 rounded-xl backdrop-blur">
                <p className="text-green-300 font-bold text-xl text-center">
                  See you on 20th December! Get ready to accelerate your career! 🚀
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Support */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100 max-w-3xl mx-auto"
          >
            <p className="text-2xl font-bold text-gray-800 mb-6">Any Questions?</p>
            <p className="text-gray-600 mb-8">We're here to help you prepare for the workshop!</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:contact@xourcebase.com"
                className="flex items-center gap-3 text-indigo-600 font-bold text-lg hover:text-indigo-700 transition-colors"
              >
                <Mail className="w-7 h-7" />
                contact@xourcebase.com
              </a>
              <a
                href="tel:+918767765307"
                className="flex items-center gap-3 text-indigo-600 font-bold text-lg hover:text-indigo-700 transition-colors"
              >
                <Phone className="w-7 h-7" />
                +91 87677 65307
              </a>
            </div>
          </motion.div>

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-3 text-indigo-600 font-bold text-xl hover:text-indigo-700 hover:gap-5 transition-all duration-300"
            >
              <ArrowLeft className="w-7 h-7" />
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
}