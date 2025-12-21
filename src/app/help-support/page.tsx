'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Mail, BookOpen, Users, ChevronDown } from 'lucide-react';

export default function HelpAndSupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const supportCards = [
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get in touch with our team for personalized assistance.',
      action: 'Contact Us',
      path: '/contact',
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Explore our setup guides and tutorials.',
      action: 'Browse Docs',
      path: '/docs',
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Join discussions and find solutions from peers.',
      action: 'Join Forum',
      path: '/forum',
    },
  ];

  const faqs = [
    {
      question: 'How do I join a workshop?',
      answer: 'Visit the workshop page, click "Join Now", fill in your details, and complete payment. You’ll receive instant access and joining instructions via email.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major cards, UPI, net banking, and wallets through Razorpay — India’s most secure payment gateway. All transactions are encrypted.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes! We offer a 100% refund if you’re not satisfied after attending the workshop. Just email us within 7 days of the session — no questions asked.',
    },
    {
      question: 'Will I get a recording if I miss the live workshop?',
      answer: 'Yes! All paid workshops include lifetime access to the high-quality recording, plus bonus materials and resources.',
    },
    {
      question: 'How soon can I access the workshop after payment?',
      answer: 'Instantly! As soon as payment is successful, you’ll get a confirmation email with Zoom link, calendar invite, and access to any pre-work materials.',
    },
    {
      question: 'Can I get an invoice or certificate?',
      answer: 'Yes. Invoices are sent automatically. Participation certificates are issued upon completion (for most workshops).',
    },
    {
      question: 'Do you offer group or corporate discounts?',
      answer: 'Absolutely! Contact us for special rates on bulk enrollments for teams, colleges, or organizations.',
    },
    {
      question: 'How do I apply a coupon code?',
      answer: 'On the checkout page, enter your coupon code in the "Coupon Code" field and click "Apply". The discount will reflect instantly.',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-16 px-6 lg:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Browse FAQs or reach out for assistance.
          </p>
        </motion.div>

        {/* Support Options */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {supportCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center p-8 border border-gray-100"
                whileHover={{ y: -4 }}
              >
                <card.icon className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {card.description}
                </p>
                <Link
                  href={card.path}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8B0000] bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {card.action} →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Still Need Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            Still need help?
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Contact Us
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}