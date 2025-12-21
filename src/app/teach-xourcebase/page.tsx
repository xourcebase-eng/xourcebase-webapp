'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, DollarSign, Calendar, Mail, User } from 'lucide-react';

export default function TeachOnXourceBasePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-16 px-6 lg:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Share Your Expertise. Empower the Next Generation of Cloud & DevOps Engineers.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Join XourceBase as an instructor and shape the future of tech careers. Teach what you know, reach thousands, and earn while you educate.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300"
            >
              Become an Instructor
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Why Teach with Us */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
            whileHover={{ y: -4 }}
          >
            <Users className="w-14 h-14 text-[#8B0000] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Teach with Us</h3>
            <ul className="space-y-3 text-gray-700 text-left">
              <li>• Global reach to aspiring engineers</li>
              <li>• Competitive revenue share (up to 70%)</li>
              <li>• Flexible scheduling and tools</li>
              <li>• Join a supportive instructor community</li>
            </ul>
          </motion.div>

          {/* Who Can Apply */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
            whileHover={{ y: -4 }}
          >
            <User className="w-14 h-14 text-[#8B0000] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Who Can Apply</h3>
            <p className="text-gray-700 leading-relaxed">
              Professionals, certified trainers, or industry experts with 3+ years in Cloud & DevOps. Share your real-world knowledge!
            </p>
          </motion.div>

          {/* How to Get Started */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
            whileHover={{ y: -4 }}
          >
            <Calendar className="w-14 h-14 text-[#8B0000] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Get Started</h3>
            <ol className="text-gray-700 space-y-3 text-left list-decimal pl-6">
              <li>Submit your application with credentials</li>
              <li>Review and content approval (1-2 weeks)</li>
              <li>Launch your course and start teaching!</li>
            </ol>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
            whileHover={{ y: -4 }}
          >
            <Mail className="w-14 h-14 text-[#8B0000] mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-6">Ready to teach? Reach out for a chat.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#8B0000] rounded-lg hover:bg-[#6e0101] transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}