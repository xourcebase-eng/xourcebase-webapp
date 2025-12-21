'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPinned } from 'lucide-react';

export default function SitemapPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const pages = {
    main: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about-us' },
      { name: 'Plans & Pricing', path: '/plans-pricing' },
      { name: 'Workshops', path: '/workshops' },
      { name: 'Programs', path: '/programs' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Help & Support', path: '/help-support' },
      { name: 'Teach on XourceBase', path: '/teach-xourcebase' },
    ],
    programSections: [
      { name: 'Tech Career Accelerator', path: '/programs/tech-career-accelerator' },
      { name: 'Communication & Support Excellence', path: '/programs/communication-support-excellence' },
    ],
    company: [
      { name: 'Careers', path: '/careers' },
      { name: 'XourceBase for Business', path: '/xourcebase-business' },
      { name: 'Terms and Conditions', path: '/terms-conditions' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-16 px-6 lg:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-6">
            <MapPinned className="w-10 h-10 md:w-12 md:h-12 text-[#8B0000]" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Sitemap</h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all pages on XourceBase and easily navigate to any section.
          </motion.p>
        </motion.div>

        {/* Sitemap Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Main Pages */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Main Pages</h2>
            <ul className="space-y-4">
              {pages.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-lg text-gray-700 hover:text-[#8B0000] transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Resources</h2>
            <ul className="space-y-4">
              {pages.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-lg text-gray-700 hover:text-[#8B0000] transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Program Sections */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Programs</h2>
            <ul className="space-y-4">
              {pages.programSections.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-lg text-gray-700 hover:text-[#8B0000] transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Company</h2>
            <ul className="space-y-4">
              {pages.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-lg text-gray-700 hover:text-[#8B0000] transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}