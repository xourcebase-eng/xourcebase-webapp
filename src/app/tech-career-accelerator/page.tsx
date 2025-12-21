// app/tech-career-accelerator/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUp,
  Cloud,
  Code,
  Database,
  GraduationCap,
  Zap,
  ChevronDown,
  Crown,
  Download,
} from 'lucide-react';

interface ExpandedPlans {
  starter: boolean;
  pro: boolean;
  elite: boolean;
  master: boolean;
}

interface FocusArea {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface PlanSection {
  number: string;
  phase: string;
  items: string[];
}

interface Plan {
  key: 'starter' | 'pro' | 'elite' | 'master';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  idealFor: string;
  goal: string;
  duration: string;
  whatYouGet: PlanSection[];
}

export default function TechCareerAccelerator() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<ExpandedPlans>({
    starter: false,
    pro: false,
    elite: false,
    master: false,
  });

  useEffect(() => {
    document.title = 'Tech Career Accelerator | XourceBase';

    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const setOgProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta('description', 'From learning to leadership — your IT career starts here. Build a successful tech career with our accelerator programs in cloud, DevOps, and data domains.');
    setMeta('keywords', 'tech career accelerator, IT training, cloud engineering, DevOps, data analyst, software professional, career readiness');

    setOgProperty('og:title', 'Tech Career Accelerator | XourceBase');
    setOgProperty('og:description', 'From learning to leadership — your IT career starts here. Ideal for aspiring Cloud Engineers, DevOps Engineers, Data Analysts, or Software Professionals.');
    setOgProperty('og:type', 'website');
    setOgProperty('og:url', 'https://xourcebase.com/tech-career-accelerator');
    setOgProperty('og:image', 'https://xourcebase.com/assets/tech-accelerator-hero.jpg');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Tech Career Accelerator | XourceBase');
    setMeta('twitter:description', 'Build your IT career with hands-on projects, certification guidance, and leadership training.');
    setMeta('twitter:image', 'https://xourcebase.com/assets/tech-accelerator-hero.jpg');
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const togglePlan = (planKey: keyof ExpandedPlans) => {
    setExpandedPlans((prev) => ({ ...prev, [planKey]: !prev[planKey] }));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const expandVariants: Variants = {
    expanded: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  const focusAreas: FocusArea[] = [
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'AWS, Azure, and Google Cloud fundamentals.',
    },
    {
      icon: Code,
      title: 'DevOps Practices',
      description: 'CI/CD pipelines and infrastructure as code.',
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'SQL, Python, and big data tools.',
    },
  ];

  const plans: Plan[] = [
    {
      key: 'starter',
      icon: GraduationCap,
      title: 'STARTER KIT',
      tagline: 'Foundations & Job Readiness',
      idealFor: '🎓 Students, fresh graduates, early professionals (0–2 years)',
      goal: 'Build strong foundations, gain job-ready confidence, and secure your first role.',
      duration: '9 Days | 1 Hour/Day (Mon–Fri) or 5 Days | 2 Hours/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Foundation Phase – Find Your Direction',
          items: ['🎯 Career Counselling & Role Mapping', '→ Discover your ideal domain (Cloud, DevOps, Data, etc.) with expert guidance.'],
        },
        {
          number: '2️⃣',
          phase: 'Skill Development Phase – Build Real Capabilities',
          items: ['📚 Industry-Aligned Curriculum', '🧠 Technical Skill Training (Cloud/DevOps/Data)', '🏆 Certification Preparation Support', '🗣️ Soft Skills & Communication Training', '🧩 Career Readiness Assessments'],
        },
        {
          number: '3️⃣',
          phase: 'Career Preparation & Job Readiness Phase',
          items: ['📝 Resume & Portfolio Building', '🌐 LinkedIn & Naukri Optimization', '💬 Interview Q&A Library', '🚀 Interview Preparation & Mock Interviews'],
        },
      ],
    },
    {
      key: 'pro',
      icon: Code,
      title: 'PRO KIT',
      tagline: 'Career Growth & Upskilling',
      idealFor: '💡 Early to mid-level professionals (2–6 years)',
      goal: 'Upskill efficiently, accelerate your career, and transition into high-demand domains.',
      duration: '6 Days | 1 Hour/Day (Mon–Fri) or 3 Days | 2 Hours/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Mentorship & Career Guidance Phase',
          items: ['🤝 1-on-1 Mentorship Sessions', '🎓 Career Growth & Transition Mentoring', '🌍 Networking with Industry Experts'],
        },
        {
          number: '2️⃣',
          phase: 'Placement & Performance Phase',
          items: ['📂 Placement & Internship Assistance', '🎯 Recruiter Connect & Referrals', '🔍 Personalized Feedback & Skill Assessment'],
        },
        {
          number: '3️⃣',
          phase: 'Advanced Skill Development Phase',
          items: ['💻 Real-World Projects & Workshops', '🧩 New Tools & Trends', '💼 Alumni Community Access'],
        },
      ],
    },
    {
      key: 'elite',
      icon: Zap,
      title: 'ELITE KIT',
      tagline: 'Leadership & Transformation',
      idealFor: '🏆 Mid–Senior professionals & career switchers (5+ years)',
      goal: 'Transition into leadership or redefine your career with future-ready skills.',
      duration: '5 Days | 1 Hour/Day (Mon–Fri) or 3 Days | 2 Hours/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Career Transformation Phase',
          items: ['🧭 Career Transition Programs (Non-Tech → Tech, Mid → Senior roles)', '🎯 Leadership Coaching', '💡 Corporate Readiness & Workplace Etiquette'],
        },
        {
          number: '2️⃣',
          phase: 'Strategic Growth & Future Tech Phase',
          items: ['🤖 AI, Automation & Future Tech', '🌍 Global Trends & Skills', '💼 Product Management & Tech Leadership (Optional)'],
        },
        {
          number: '3️⃣',
          phase: 'Exclusive Access & Continuous Growth Phase',
          items: ['🔑 Priority Recruiter Access', '💬 Personal Branding Consultations', '🌐 Lifetime Alumni Community'],
        },
      ],
    },
    {
      key: 'master',
      icon: Crown,
      title: 'MASTER PROGRAM – The Complete Tech Career Accelerator',
      tagline: 'Full Career Transformation Bundle',
      idealFor: 'Anyone who wants a full career transformation in IT.',
      goal: 'Complete end-to-end training, from foundation to leadership, in one journey.',
      duration: '20 Days | 1 Hour per Day (Mon–Fri) or 11 Days | 2 Hours per Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '',
          phase: 'Covers: Starter Kit + Pro + Elite',
          items: [],
        },
        {
          number: '',
          phase: 'Includes:',
          items: ['All features from Plans 1, 2 & 3', 'End-to-end career mentorship', 'Certification, resume, and placement guidance', 'Post-program alumni and recruiter support'],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Download Buttons */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-purple-600 to-blue-800 text-white py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Tech Career Accelerator
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            From learning to leadership — your IT career starts here.
          </motion.p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="/assets/tech-accelerator-guide.pdf" // ← Replace with your actual PDF URL
              download="tech-career-accelerator-guide.pdf"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 space-x-3"
            >
              <Download className="w-6 h-6" />
              <span>Download Free Tech Accelerator Kit (PDF)</span>
            </motion.a>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              href="/assets/tech-plans-comparison.pdf" // ← Replace with your actual PDF URL
              download="tech-plans-comparison.pdf"
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 space-x-3"
            >
              <Download className="w-6 h-6" />
              <span>Download Plans Comparison (PDF)</span>
            </motion.a>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        {/* About Section */}
        <motion.section variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            About the Program
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            For students and professionals who want to build or grow a career in Information Technology. Ideal for aspiring Cloud Engineers, DevOps Engineers, Data Analysts, or Software Professionals.
          </p>
        </motion.section>

        {/* Focus Areas */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Focus Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                >
                  <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{area.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Programs Accordion */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Programs Under This Track
          </h2>
          <div className="space-y-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.key}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => togglePlan(plan.key)}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon className="w-8 h-8 text-red-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{plan.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{plan.tagline}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-red-600 transition-transform duration-300 ${expandedPlans[plan.key] ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <motion.div
                    variants={expandVariants}
                    initial="collapsed"
                    animate={expandedPlans[plan.key] ? 'expanded' : 'collapsed'}
                    className="overflow-hidden bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Ideal For</h4>
                        <p className="text-gray-600 dark:text-gray-300">{plan.idealFor}</p>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mt-4">Goal</h4>
                        <p className="text-gray-600 dark:text-gray-300">{plan.goal}</p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Duration Options</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• 1 Hour per Day (Monday–Friday)</li>
                          <li>• 2 Hours per Day (Saturday–Sunday)</li>
                        </ul>
                        <p className="text-sm font-medium text-red-600 mt-2">{plan.duration}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">What You’ll Get</h4>
                        {plan.whatYouGet.map((section, secIndex) => (
                          <div key={secIndex} className="mb-6">
                            <h5 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
                              {section.number} {section.phase}
                            </h5>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                              {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <Link
                          href="/plans-pricing"
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded font-semibold text-center hover:bg-red-700 transition-colors"
                        >
                          View Pricing
                        </Link>
                        <Link
                          href="https://forms.cloud.microsoft/r/qjHECcYaSV"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border-2 border-red-600 text-red-600 py-2 px-4 rounded font-semibold text-center hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Book This Program
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </motion.div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to launch your tech career?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Start your journey with XourceBase today.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/plans-pricing"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </main>
  );
}