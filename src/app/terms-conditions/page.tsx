'use client';

import { motion } from 'framer-motion';
import { Scale, Shield, Gavel, AlertTriangle, Globe, Mail } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-16 px-6 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Welcome to XourceBase. These terms govern your use of our services. Please read carefully.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Scale className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  By accessing or using XourceBase (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use the Service.
                </p>
                <p>
                  These Terms form a legally binding agreement between you and XourceBase. We may update them periodically; continued use constitutes acceptance of changes.
                </p>
              </div>
            </motion.section>

            {/* Use of Services */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Shield className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Use of Services</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copy, reproduce, or distribute content without permission.</li>
                  <li>Engage in harassment, spam, or unauthorized access.</li>
                  <li>Use the Service for commercial purposes without our consent.</li>
                </ul>
                <p className="mt-4">
                  Enrollment in programs grants personal, non-transferable access. Sharing credentials is prohibited.
                </p>
              </div>
            </motion.section>

            {/* Intellectual Property Rights */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Gavel className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Intellectual Property Rights</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  All content on the Service, including courses, materials, and logos, is owned by XourceBase or its licensors and protected by copyright, trademark, and other laws.
                </p>
                <p>
                  You may not modify, distribute, or create derivative works without written permission. User-generated content grants us a non-exclusive license for platform use.
                </p>
              </div>
            </motion.section>

            {/* Limitation of Liability */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  XourceBase provides the Service "as is" without warranties. We disclaim liability for indirect, incidental, or consequential damages arising from use.
                </p>
                <p>
                  Our total liability shall not exceed the amount paid by you in the past 12 months. This includes errors in content or service interruptions.
                </p>
              </div>
            </motion.section>

            {/* Termination of Access */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Termination of Access</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may suspend or terminate your access for violations of these Terms, with or without notice. Upon termination, your right to use the Service ends.
                </p>
                <p>
                  You may terminate by ceasing use or requesting account deletion. Certain provisions (e.g., IP rights, liability) survive termination.
                </p>
              </div>
            </motion.section>

            {/* Governing Law and Jurisdiction */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Globe className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Governing Law and Jurisdiction</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  These Terms are governed by the laws of India. Any disputes shall be resolved exclusively in the courts of [City, India].
                </p>
                <p>
                  We may seek injunctive relief for IP violations without waiving other remedies.
                </p>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Mail className="w-8 h-8 text-[#8B0000] mt-1 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>For questions about these Terms, contact:</p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:contact@xourcebase.com"
                      className="text-[#8B0000] hover:underline"
                    >
                      contact@xourcebase.com
                    </a>
                  </li>
                </ul>
              </div>
            </motion.section>
          </div>

          {/* Last Updated */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16 text-sm text-gray-500"
          >
            <p>Last updated: December 15, 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}