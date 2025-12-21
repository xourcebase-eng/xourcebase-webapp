'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star, Zap, Crown, Rocket, ArrowRight, Code, MessageSquare, Sparkles, Target, TrendingUp, Download, Gift, X } from 'lucide-react';

export default function PlansPricingPage() {
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

  const techPlans = [
    {
      name: 'Starter Kit',
      price: 999,
      actualWorth: 1999,
      icon: Rocket,
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      recommended: false,
      perfectFor: 'Students & Fresh Graduates',
      description: 'Build your foundation, ace interviews, and land your first job with confidence.',
      features: [
        { name: 'Career Counselling', included: true },
        { name: 'Technical Skill Training', included: true },
        { name: 'Certification Prep', included: true },
        { name: 'Mock Interviews', included: true },
        { name: 'Placement Assistance (Basic)', included: true },
        { name: '1-on-1 Mentorship', included: false },
        { name: 'Leadership Coaching', included: false },
        { name: 'Lifetime Alumni Access', included: false },
      ],
    },
    {
      name: 'Pro Kit',
      price: 1499,
      actualWorth: 3499,
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
      recommended: false,
      perfectFor: 'Early Professionals (1–3 yrs exp)',
      description: 'Sharpen your skills, boost performance, and fast-track your career growth.',
      features: [
        { name: 'Career Counselling', included: true },
        { name: 'Technical Skill Training', included: true },
        { name: 'Certification Prep', included: true },
        { name: 'Mock Interviews', included: true },
        { name: 'Placement Assistance', included: true },
        { name: '1-on-1 Mentorship', included: true },
        { name: 'Leadership Coaching', included: false },
        { name: 'Lifetime Alumni Access', included: true },
      ],
    },
    {
      name: 'Elite Kit',
      price: 1999,
      actualWorth: 4999,
      icon: Crown,
      color: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-500',
      recommended: true,
      perfectFor: 'Mid–Senior Professionals / Career Switchers',
      description: 'Master leadership, corporate readiness, and future-ready skills for global roles.',
      features: [
        { name: 'Career Counselling', included: true },
        { name: 'Technical Skill Training', included: true },
        { name: 'Certification Prep', included: true },
        { name: 'Mock Interviews', included: true },
        { name: 'Placement Assistance (Priority)', included: true },
        { name: '1-on-1 Mentorship', included: true },
        { name: 'Leadership Coaching', included: true },
        { name: 'Lifetime Alumni Access', included: true },
      ],
    },
  ];

  const commPlans = [
    {
      name: 'Starter Kit',
      price: 99,
      actualWorth: 499,
      icon: Rocket,
      color: 'from-teal-500 to-green-600',
      borderColor: 'border-teal-500',
      recommended: false,
      primaryGoal: 'Build trust, generate leads, warm up cold traffic',
      keyObjective: 'Basic interview preparation foundation',
      interviewKit: '14-Day basic version',
      qaSamples: '3 basic samples with voice tips',
      templates: 'Basic voice tone tips',
    },
    {
      name: 'Pro Kit',
      price: 499,
      actualWorth: 999,
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      recommended: false,
      primaryGoal: 'Help candidates feel confident and interview-ready',
      keyObjective: 'Advanced communication skills development',
      interviewKit: 'Full 14-Day with detailed explanations',
      qaSamples: '20+ samples (voice + non voice + IT support)',
      templates: 'Accent practice guide + STAR story templates',
    },
    {
      name: 'Elite Kit',
      price: 1499,
      actualWorth: 2999,
      icon: Crown,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500',
      recommended: true,
      primaryGoal: 'Maximize interview success and build premium brand value',
      keyObjective: 'Complete professional training experience',
      interviewKit: 'Everything in Pro Kit',
      qaSamples: 'Same as Pro Kit',
      templates: 'Resume templates + self-intro builder + cultural awareness module',
    },
    {
      name: 'Final Application Plan',
      price: 5999,
      actualWorth: 9999,
      icon: Star,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
      recommended: false,
      primaryGoal: 'Ultimate career transformation with placement support',
      keyObjective: 'Comprehensive career launch with mentorship',
      interviewKit: 'Advanced 14-Day Elite Edition',
      qaSamples: '50+ comprehensive samples',
      templates: 'Done-for-you resume + custom scripts + advanced accent training',
    },
  ];

  const calculateDiscount = (actual: number, offer: number) => {
    return Math.round(((actual - offer) / actual) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/50 rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">Limited Time Launch Offer</span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Choose Your Path to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mt-2">
                Career Excellence
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            >
              Transform your career with industry-aligned training, expert mentorship, and guaranteed results
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 px-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-extrabold">💥 Special Early-Bird Offer</h3>
                  <p className="text-xl font-semibold">🎁 Get ₹500 OFF on any plan</p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/30">
                <p className="text-lg font-bold">Limited to first 100 enrollments only!</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Career Accelerator Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tech Career Accelerator
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              From learning to leadership — your IT career starts here.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {techPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 ${plan.borderColor} hover:shadow-3xl transition-all duration-500 ${
                  plan.recommended ? 'transform lg:scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-bl-3xl font-bold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4" />
                    RECOMMENDED
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-lg mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                  {/* Launch Offer Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <TrendingUp className="w-4 h-4" />
                    Launch Offer
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-extrabold text-gray-900">₹{plan.price}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 line-through text-lg">₹{plan.actualWorth}</span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        {calculateDiscount(plan.actualWorth, plan.price)}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-semibold">Actual Worth:</span> ₹{plan.actualWorth.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Perfect For */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100">
                    <p className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Perfect For
                    </p>
                    <p className="text-gray-700 font-semibold">{plan.perfectFor}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed">{plan.description}</p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/workshop-checkout" className="block">
                    <button className={`w-full py-4 px-6 bg-gradient-to-r ${plan.color} text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer text-lg`}>
                      Enroll Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download PDF Button */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Download className="w-6 h-6" />
              Download Full Pricing Details (PDF)
            </button>
          </motion.div>
        </div>
      </section>

      {/* Communication & Support Excellence Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Communication & Support Excellence
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              From communication to confidence — build your professional voice.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 ${plan.borderColor} hover:shadow-3xl transition-all duration-500 ${
                  plan.recommended ? 'transform lg:scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-bl-3xl font-bold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4" />
                    RECOMMENDED
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-lg mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                  {/* Launch Offer Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <TrendingUp className="w-4 h-4" />
                    Launch Offer
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-extrabold text-gray-900">₹{plan.price}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 line-through text-lg">₹{plan.actualWorth}</span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        {calculateDiscount(plan.actualWorth, plan.price)}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      <span className="font-semibold">Actual Worth:</span> ₹{plan.actualWorth.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Details Sections */}
                  <div className="space-y-4 mb-8">
                    {/* Primary Goal */}
                    <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl border-2 border-teal-100">
                      <p className="text-sm font-bold text-teal-900 mb-2">Primary Goal</p>
                      <p className="text-gray-700 text-sm">{plan.primaryGoal}</p>
                    </div>

                    {/* Key Objective */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100">
                      <p className="text-sm font-bold text-blue-900 mb-2">Key Objective</p>
                      <p className="text-gray-700 text-sm">{plan.keyObjective}</p>
                    </div>

                    {/* Interview Kit */}
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Interview Kit</p>
                        <p className="text-gray-600 text-sm">{plan.interviewKit}</p>
                      </div>
                    </div>

                    {/* Q&A Samples */}
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Q&A Samples</p>
                        <p className="text-gray-600 text-sm">{plan.qaSamples}</p>
                      </div>
                    </div>

                    {/* Templates & Guides */}
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Templates & Guides</p>
                        <p className="text-gray-600 text-sm">{plan.templates}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/workshop-checkout" className="block">
                    <button className={`w-full py-4 px-6 bg-gradient-to-r ${plan.color} text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer text-lg`}>
                      Enroll Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download PDF Button */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Download className="w-6 h-6" />
              Download Full Pricing Details (PDF)
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Got questions? We've got answers.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the difference between Starter, Pro, and Elite Kits?',
                a: 'Starter Kit is designed for beginners and fresh graduates with foundational content. Pro Kit is for early professionals (1-3 years exp) with intermediate-level training. Elite Kit is our most comprehensive program for mid-senior professionals and career switchers, including leadership and advanced corporate readiness training.',
              },
              {
                q: 'Can I upgrade from one kit to another later?',
                a: 'Yes! You can upgrade from Starter to Pro or Elite, or from Pro to Elite at any time. You\'ll only pay the difference in price when upgrading.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure payment partner Razorpay. EMI options are also available for certain plans.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes! We offer a 7-day money-back guarantee. If you\'re not satisfied within the first 7 days of enrollment, we\'ll refund your full amount, no questions asked.',
              },
              {
                q: 'How long do I have access to the course content?',
                a: 'All our programs come with lifetime access to the course materials, including any future updates and additions to the curriculum.',
              },
              {
                q: 'Do you provide placement assistance?',
                a: 'Yes! Pro and Elite Kit members get dedicated placement support including resume building, mock interviews, and access to our job referral network with partner companies.',
              },
              {
                q: 'Can I access both Tech and Communication programs?',
                a: 'Yes! You can enroll in both programs separately. We also offer bundle discounts if you want to combine programs. Contact our support team for custom pricing.',
              },
              {
                q: 'What if I miss a live session?',
                a: 'All live sessions are recorded and available in your learning portal within 24 hours. You can access them anytime at your convenience.',
              },
              {
                q: 'Are there any prerequisites for enrollment?',
                a: 'No specific prerequisites for Starter Kit. For Pro and Elite Kits, basic familiarity with the subject matter is recommended but not mandatory. Our mentors will guide you based on your current skill level.',
              },
              {
                q: 'How do I get started after enrollment?',
                a: 'After successful payment, you\'ll receive instant access to your learning portal via email. You can start learning immediately and our onboarding team will guide you through the next steps.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-6 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                <summary className="text-xl font-bold text-gray-800 list-none flex justify-between items-center cursor-pointer">
                  {faq.q}
                  <span className="text-3xl text-indigo-500 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 text-gray-700 text-lg leading-relaxed pl-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-10 text-gray-200">
              Join thousands of professionals who've accelerated their careers with XourceBase
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/workshop-checkout" className="inline-block">
                <button className="px-12 py-5 bg-white text-indigo-900 font-extrabold text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-3 cursor-pointer">
                  <Rocket className="w-6 h-6" />
                  Start Learning Today
                </button>
              </Link>
              <Link href="/workshops" className="inline-block">
                <button className="px-12 py-5 border-2 border-white text-white font-extrabold text-xl rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  <Star className="w-6 h-6" />
                  Try Free Workshop First
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}