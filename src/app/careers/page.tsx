'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-16 px-6 lg:py-20"
    >
      <div className="text-center max-w-md mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 flex justify-center items-center gap-3 mx-auto"
        >
          Careers at XourceBase
          <Briefcase className="w-8 h-8 md:w-12 md:h-12 text-[#8B0000] animate-bounce" />
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          Exciting opportunities coming soon!
        </motion.p>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-gray-600 mb-12"
        >
          We're building something amazing — stay tuned for roles in tech, mentorship, and more.
        </motion.p>

        {/* Illustration/Icon Group */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <Users className="w-12 h-12 md:w-16 md:h-16 text-[#8B0000]" />
          <div className="w-px h-12 bg-gray-300"></div>
          <Users className="w-12 h-12 md:w-16 md:h-16 text-orange-600" />
        </motion.div>
      </div>
    </motion.section>
  );
}