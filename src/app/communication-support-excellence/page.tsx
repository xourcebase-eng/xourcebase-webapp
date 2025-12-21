// app/communication-support/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUp,
  Mic,
  Users,
  Globe,
  GraduationCap,
  MessageCircle,
  Phone,
  ChevronDown,
  Crown,
  Download,
} from 'lucide-react';

interface ExpandedPlans {
  starter: boolean;
  pro: boolean;
  elite: boolean;
  final: boolean;
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
  key: 'starter' | 'pro' | 'elite' | 'final';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  idealFor: string;
  goal: string;
  duration: string;
  whatYouGet: PlanSection[];
}

export default function CommunicationSupportExcellence() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<ExpandedPlans>({
    starter: false,
    pro: false,
    elite: false,
    final: false,
  });

  useEffect(() => {
    document.title = 'Communication & Support Excellence | XourceBase';

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

    setMeta('description', 'From communication to confidence — build your professional voice. Master interview skills, cultural awareness, and support excellence for IT roles with our 14-Day Interview Clearing Kit.');
    setMeta('keywords', 'communication training, interview preparation, support excellence, verbal skills, cultural awareness, IT interviews, professional voice, 14-day interview kit, STAR method, mock interviews');

    // Open Graph
    setOgProperty('og:title', 'Communication & Support Excellence | XourceBase');
    setOgProperty('og:description', 'From communication to confidence — build your professional voice. Ideal for IT professionals seeking to excel in interviews and workplace interactions with self-introduction mastery, resume guidance, and insider tips.');
    setOgProperty('og:type', 'website');
    setOgProperty('og:url', 'https://xourcebase.com/communication-support');
    setOgProperty('og:image', 'https://xourcebase.com/assets/communication-hero.jpg');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Communication & Support Excellence | XourceBase');
    setMeta('twitter:description', 'Master communication skills for interviews and professional success with hands-on training, 14-Day Interview Clearing Kit, and support from experienced mentors.');
    setMeta('twitter:image', 'https://xourcebase.com/assets/communication-hero.jpg');
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
      icon: Mic,
      title: 'Verbal Communication',
      description: 'Master clear articulation, voice modulation, and accent neutralization. Practice daily reading aloud, record and review for clarity, tone, and pace.',
    },
    {
      icon: Users,
      title: 'Interview Techniques',
      description: 'STAR method, Q&A mastery, and confidence building for IT roles. Prepare for common questions, mock interviews, and handling difficult situations with empathy.',
    },
    {
      icon: Globe,
      title: 'Cultural Awareness',
      description: 'Global workplace etiquette and cross-cultural communication skills. Learn polite phrases, greetings, holidays, and formal responses for international clients.',
    },
  ];

  const plans: Plan[] = [
    {
      key: 'starter',
      icon: GraduationCap,
      title: 'STARTER KIT',
      tagline: 'Basic Interview Preparation',
      idealFor: '🎓 Beginners & Fresh Graduates',
      goal: 'Build trust, generate leads, warm up cold traffic with foundational interview skills. Low-risk entry point to test effectiveness—your first job shapes your career trajectory.',
      duration: '7 Days | 30 Min/Day (Mon–Fri) or 4 Days | 1 Hour/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Foundation Phase – Basic Setup (Days 1-3)',
          items: [
            '🎯 Self-Introduction Mastery: Build a confident 60-second intro covering name, education, strengths, and excitement to work. Example: “Hi, I’m from Nagpur. I’ve completed my studies and I enjoy solving problems and helping people.”',
            '📝 Resume for Freshers: Create a clean, 1-page resume highlighting education, communication skills, tech familiarity, and college projects. Use action verbs like “Managed,” “Led.”',
            '📚 Industry Basics: Understand key terms like inbound, outbound, voice, non-voice, support. Example Q&A: “What is a support center?” A: “It’s a place where people assist customers over phone, chat, or email.”',
          ],
        },
        {
          number: '2️⃣',
          phase: 'Skill Building Phase – Core Essentials (Days 4-5)',
          items: [
            '🗣️ Communication Practice: Improve clarity, tone, and accent neutrality. Read aloud daily, record and review. Example: “Thank you for calling. How may I assist you today?”',
            '💬 Common Interview Questions: Prepare answers to “Why do you want to work here?” and “What are your strengths?” Keep under 90 seconds, be honest and positive.',
          ],
        },
        {
          number: '3️⃣',
          phase: 'Readiness Phase (Days 6-7)',
          items: [
            '⭐ STAR Story Practice: Learn Situation, Task, Action, Result. Write 2 stories from college or personal life. Example: Helping a friend fix a slow laptop.',
            '→ WhatsApp group access for basic community support and 3 basic Q&A samples with voice tips.',
          ],
        },
      ],
    },
    // Pro, Elite, Final plans (included fully below)
    {
      key: 'pro',
      icon: MessageCircle,
      title: 'PRO KIT',
      tagline: 'Advanced Communication Skills',
      idealFor: '💡 Early Professionals (1–3 years)',
      goal: 'Help candidates feel confident and interview-ready with advanced development. Comprehensive preparation without premium cost—stop losing opportunities to better-prepared candidates.',
      duration: '10 Days | 45 Min/Day (Mon–Fri) or 5 Days | 1.5 Hours/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Guidance Phase – Confidence Building (Days 1-4)',
          items: [
            '🤝 Advanced Communication Skills Development: Full 14-Day Interview Kit with detailed explanations.',
            '🎓 Self-Introduction Mastery, Resume Guidance, Industry Basics, and Communication Practice as in Starter, plus deeper exercises.',
            '📂 20+ Samples (Voice + Non-Voice + IT Support) with insider knowledge and tips.',
          ],
        },
        {
          number: '2️⃣',
          phase: 'Performance Phase – Practice & Feedback (Days 5-7)',
          items: [
            '🎯 Common Interview Questions & STAR Story Practice: Rehearse with real examples for behavioral questions.',
            '🧑‍💼 Mock Interview (Self-Practice): Record answers to 3 questions like “Tell me about yourself” and “How do you handle stress?” Watch for tone, clarity, and filler words.',
            '🔧 Basic Troubleshooting Knowledge: Learn fixes for Wi-Fi, login, email. Example Q&A: “What if someone can’t access email?” A: “Check connection, reset password, guide step-by-step.”',
          ],
        },
        {
          number: '3️⃣',
          phase: 'Enhancement Phase (Days 8-10)',
          items: [
            '💡 Handling Difficult Situations: Practice polite responses with empathy. Example: “I listen patiently, apologize, and assure resolution.”',
            '❓ Ask Smart Questions: Prepare 2–3 like “What training do you offer?” Avoid salary in first round.',
            '→ WhatsApp group access, 1 mock interview script, accent practice guide + STAR story templates, and advanced preparation materials.',
          ],
        },
      ],
    },
    {
      key: 'elite',
      icon: Phone,
      title: 'ELITE KIT',
      tagline: 'Premium Professional Training',
      idealFor: '🏆 Mid-Level Professionals (3–5 years)',
      goal: 'Maximize interview success and build premium brand value with complete experience. Professional-grade training—don’t let poor skills waste your education investment.',
      duration: '12 Days | 1 Hour/Day (Mon–Fri) or 6 Days | 2 Hours/Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '1️⃣',
          phase: 'Transformation Phase – Elite Skills (Days 1-5)',
          items: [
            '🧭 Complete Professional Training Experience: Everything in Pro Kit + Premium Features.',
            '🎯 Self-Introduction, Resume, Industry Basics, Communication, Common Questions, STAR, Mock Self-Practice, and Troubleshooting as in Pro.',
            '🌍 Cultural Awareness: Understand global etiquette, polite phrases, greetings, holidays. Example: “May I place you on hold while I check?” Learn US/UK phrases like “I appreciate your patience.”',
          ],
        },
        {
          number: '2️⃣',
          phase: 'Mastery Phase – Advanced Tools (Days 6-9)',
          items: [
            '💻 Handling Difficult Situations & Ask Smart Questions: Deeper roleplay and thoughtful inquiries.',
            '🧘 Stress Management: Practice deep breathing, affirmations like “I am calm, confident, ready.” Visualize success; avoid caffeine, stay hydrated.',
            '📋 Resume Templates + Self-Intro Builder + Cultural Awareness Module: Same Q&A as Pro (20+ samples).',
          ],
        },
        {
          number: '3️⃣',
          phase: 'Sustain Phase (Days 10-12)',
          items: [
            '🔑 Full Mock Interview (With Friend): Simulate pressure with scenarios like “Customer can’t connect to Wi-Fi” or “Angry customer.” Record and get feedback on tone, clarity, confidence.',
            '→ WhatsApp voice feedback (optional add-on), 3 mock interview scripts + feedback checklist, and premium content access.',
          ],
        },
      ],
    },
    {
      key: 'final',
      icon: Crown,
      title: 'FINAL APPLICATION PLAN',
      tagline: 'Ultimate Career Launch',
      idealFor: 'Anyone seeking comprehensive transformation with placement support.',
      goal: 'Ultimate career transformation with guaranteed support and mentorship. Launch the career that changes your family’s future—with mentors until you succeed.',
      duration: '21 Days | 1 Hour per Day (Mon–Fri) or 11 Days | 2 Hours per Day (Sat–Sun)',
      whatYouGet: [
        {
          number: '',
          phase: 'Covers: Starter + Pro + Elite (Full 14-Day Elite Edition)',
          items: [
            'All features from Plans 1, 2 & 3: Self-Introduction Mastery, Resume Guidance, Industry Basics, Communication Practice, Common Questions, STAR Stories, Mock Interviews, Troubleshooting, Difficult Situations, Smart Questions, Cultural Awareness, Stress Management.',
          ],
        },
        {
          number: '',
          phase: 'Includes (Advanced Enhancements):',
          items: [
            'Advanced 14-Day Elite Edition Interview Kit: 50+ Comprehensive Q&A Samples.',
            '📝 Done-for-You Resume + Custom Scripts + Advanced Accent Training.',
            '🧑‍🏫 Live Mock with Detailed Scorecard + Improvement Plan.',
            '👥 3 One-on-One Zoom Sessions with Expert Trainers.',
          ],
        },
        {
          number: '',
          phase: 'Premium Support & Final Review:',
          items: [
            '📱 WhatsApp Alerts + Referral Shortlisting.',
            '🌐 Exclusive Alumni Community & Lifetime Access to Resource Vault.',
            '🎯 Final Review & Mindset Boost: Checklist—Resume ready, self-intro practiced, STAR memorized, accent polished, outfit prepared, calm mindset. Sleep well, arrive early, carry a smile.',
            '💬 Concluding Journey: By Day 14, you’ll have a polished self-introduction, well-crafted resume, foundational tech and customer skills, clear polite engagement, and a calm focused mindset. This is just the beginning—good luck!',
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-green-600 to-emerald-800 text-white py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Communication & Support Excellence
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            From communication to confidence — build your professional voice with our 14-Day Interview Clearing Kit.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="/assets/14%20days%20Interview%20clearing%20Kit.pdf"
              download="14-days-interview-clearing-kit.pdf"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 space-x-3"
            >
              <Download className="w-6 h-6" />
              <span>Download Free 14-Day Kit (PDF)</span>
            </motion.a>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              href="/assets/Plans%20Comparison_D5.pdf"
              download="plans-comparison-d5.pdf"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 space-x-3"
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
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
            For IT professionals who want to excel in interviews and workplace interactions. Focus on verbal skills, cultural awareness, and support excellence to stand out globally.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Our Services Include</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• Self-Introduction Mastery</li>
                <li>• Resume Guidance</li>
                <li>• Insider Knowledge and Tips</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Why Choose Us?</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• Learn from experienced professionals and mentors</li>
                <li>• Build confidence and skills for meaningful achievement</li>
                <li>• Be part of a community where your concerns are genuinely addressed</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
            Reach out: <a href="mailto:contact@xourcebase.com" className="text-teal-600 hover:underline">contact@xourcebase.com</a> |{' '}
            <a href="https://www.xourcebase.com" className="text-teal-600 hover:underline">www.xourcebase.com</a>
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
                  <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
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
                      <Icon className="w-8 h-8 text-teal-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{plan.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{plan.tagline}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${expandedPlans[plan.key] ? 'rotate-180' : ''}`}
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
                          <li>• 30–60 Min per Day (Monday–Friday)</li>
                          <li>• 1–2 Hours per Day (Saturday–Sunday)</li>
                        </ul>
                        <p className="text-sm font-medium text-teal-600 mt-2">{plan.duration}</p>
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
                          className="flex-1 bg-teal-600 text-white py-2 px-4 rounded font-semibold text-center hover:bg-teal-700 transition-colors"
                        >
                          View Pricing
                        </Link>
                        <Link
                          href="https://forms.cloud.microsoft/r/qjHECcYaSV"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border-2 border-teal-600 text-teal-600 py-2 px-4 rounded font-semibold text-center hover:bg-teal-600 hover:text-white transition-colors"
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
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to build your professional voice?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Start your journey with XourceBase today and conclude with a polished skillset for interview success.
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
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </main>
  );
}