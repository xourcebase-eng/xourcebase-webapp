'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, Zap, Users, Award, ArrowRight, BookOpen, Cloud, FileText, Brain, Clock, Star, Map, Mic, MessageSquare, ArrowLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Flip Card Component
function FlipCard({ icon: Icon, title, desc, gradient = "from-red-900 to-red-700" }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Only set auto-flip timer on mobile when card is flipped
    if (isFlipped && window.innerWidth < 768) {
      timer = setTimeout(() => {
        setIsFlipped(false);
      }, 10000); // 10 seconds
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFlipped]);

  const handleInteraction = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="h-80 [perspective:1200px] group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          setIsFlipped(false);
        }
      }}
    >
      <div
        className={`relative w-full h-full cursor-pointer transition-all duration-700 ease-out [transform-style:preserve-3d]
                  ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        onClick={handleInteraction}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-100 p-8">
          <Icon className="w-16 h-16 text-[#8B0000] mb-6" />
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-sm text-gray-500">Tap or hover for details</p>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center text-white p-8`}>
          <h3 className="text-xl font-bold mb-6">{title}</h3>
          <p className="text-base text-white/90 leading-relaxed px-4">{desc}</p>
          <p className="mt-8 text-sm text-white/70">Tap again to flip back</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
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

  const whyChooseFeatures = [
    {
      icon: Users,
      title: 'Industry Experts',
      desc: 'Learn from seasoned professionals actively working in tech and communication roles.',
    },
    {
      icon: Rocket,
      title: 'Hands-On Projects',
      desc: 'Build real-world projects using tools like AWS, Kubernetes, and Terraform.',
    },
    {
      icon: Zap,
      title: '1:1 Mentorship',
      desc: 'Personal guidance, code reviews, and career advice from industry mentors.',
    },
    {
      icon: Award,
      title: 'Career & Placement Support',
      desc: 'Resume building, mock interviews, and dedicated placement assistance.',
    },
    {
      icon: Users,
      title: 'Strong Learning Community',
      desc: 'Network with peers, mentors, and alumni through an active learning community.',
    },
    {
      icon: Award,
      title: 'Job-Ready Outcomes',
      desc: 'Gain practical, interview-ready skills aligned with current industry needs.',
    },
  ];

  const valueProps = [
    {
      icon: Users,
      title: 'Real Interview Simulations',
      desc: 'Live mocks mirroring actual company interviews.',
    },
    {
      icon: Brain,
      title: 'One-on-One Mentorship',
      desc: 'Dedicated guidance from industry veterans.',
    },
    {
      icon: FileText,
      title: 'Resume & LinkedIn Optimization',
      desc: 'Craft profiles that get noticed by recruiters.',
    },
    {
      icon: Map,
      title: 'Technical & Behavioral Training',
      desc: 'Balanced prep for every interview stage.',
    },
    {
      icon: Clock,
      title: 'Cloud & DevOps Career Roadmaps',
      desc: 'Personalized paths to your target role.',
    },
    {
      icon: Star,
      title: 'Lifetime Community Access',
      desc: 'Ongoing support from alumni and experts.',
    },
  ];

  const interviewKit = [
    {
      icon: Mic,
      title: 'Mock Interviews',
      desc: 'Real-time practice with expert feedback to simulate high-stakes scenarios.',
    },
    {
      icon: Brain,
      title: 'Technical Assessments',
      desc: 'Hands-on coding challenges and quizzes tailored to top IT companies.',
    },
    {
      icon: Users,
      title: 'Communication Mastery',
      desc: 'Voice modulation, storytelling, and STAR method for impactful responses.',
    },
    {
      icon: FileText,
      title: 'Resume & Portfolio Review',
      desc: 'Personalized critiques to make your profile ATS-friendly and compelling.',
    },
    {
      icon: Clock,
      title: 'Confidence Coaching',
      desc: 'Mindset sessions to overcome anxiety and build lasting interview poise.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              Fuel Your Future: Rapid Career Advancement.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 opacity-90"
            >
              XourceBase empowers students, professionals, and freshers with tailored programs in tech and communication to unlock your potential and land dream roles. Industry-aligned training, real-world projects, and personalized mentorship to help you land high-paying tech jobs.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/plans-pricing"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold bg-white text-[#8B0000] rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Explore Plans
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/workshops"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Join Workshop
                <Rocket className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Choose Your Program Track Section */}
      <section className="py-20 px-6 bg-[#faf3f2]" aria-labelledby="program-tracks-heading">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Programs
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from comprehensive career accelerator programs designed for every stage.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Tech Career Accelerator Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-indigo-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-indigo-100 rounded-2xl group-hover:bg-indigo-200 transition-colors duration-300">
                    <Cloud className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Tech Career Accelerator</h3>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  Master Cloud & DevOps skills with hands-on training, certifications, and placement support.
                </p>

                <p className="text-lg text-gray-600 mb-6">
                  Ideal For: Students, Graduates, Working Professionals in Tech
                </p>

                <h4 className="font-semibold text-gray-900 mb-4">Key Focus:</h4>
                <ul className="space-y-3 mb-10">
                  {['Cloud', 'DevOps', 'Data', 'Programming','Certifications', 'Leadership'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/plans-pricing"
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg transition-all duration-300"
                  aria-label="Explore Tech Program"
                >
                  Explore Tech Program
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>

            {/* Communication & Support Excellence Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-teal-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-teal-100 rounded-2xl group-hover:bg-teal-200 transition-colors duration-300">
                    <MessageSquare className="w-12 h-12 text-teal-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Communication & Support Excellence</h3>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  Build confidence, ace interviews, and communicate like a professional with expert guidance.
                </p>

                <p className="text-lg text-gray-600 mb-6">
                  Ideal For: Freshers, BPO Aspirants, Communication Roles
                </p>

                <h4 className="font-semibold text-gray-900 mb-4">Key Focus:</h4>
                <ul className="space-y-3 mb-10">
                  {['Voice & Non-Voice Support', 'Soft Skills', 'Personality Development'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <Zap className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/plans-pricing"
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:from-teal-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-lg transition-all duration-300"
                  aria-label="Explore Communication Programs"
                >
                  Explore Communication Programs
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose XourceBase?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bridge the gap between learning and landing your dream job. Tap or hover to reveal details.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {whyChooseFeatures.map((item, index) => (
              <FlipCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Why You Need This Course Section */}
      <section className="py-20 px-6 bg-[#faf3f2]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why You Need This Courses?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Value Propositions. Tap or hover to reveal details.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {valueProps.map((item, index) => (
              <FlipCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* The Interview Clearing Kit Essentials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Interview Clearing Kit Essentials
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the 5 Pillars of Interview Success. Tap or hover to reveal details.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {interviewKit.map((item, index) => (
              <FlipCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-6 bg-[#faf3f2] overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Success Stories
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Hear from our students who transformed their careers with XourceBase.
            </motion.p>
          </motion.div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              centeredSlides={false}
              grabCursor={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              loop={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
                bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-60',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-indigo-600 !opacity-100 !scale-125',
              }}
              navigation={{
                prevEl: '.prev-btn',
                nextEl: '.next-btn',
              }}
              breakpoints={{
                640: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 20 },
                768: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
              }}
              className="pb-12"
            >
              <SwiperSlide>
                <div className="h-full p-1">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl p-8 h-full border border-gray-100 hover:border-indigo-200 transition-all duration-500"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mb-8 italic">
                      "XourceBase's Tech Career Accelerator completely changed my career trajectory. The hands-on DevOps projects and certification guidance helped me land a Cloud Engineer role with a 180% salary hike!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        RS
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Rahul Sharma</h4>
                        <p className="text-sm text-gray-600">Cloud Engineer at TechMahindra</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="h-full p-1">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl p-8 h-full border border-gray-100 hover:border-teal-200 transition-all duration-500"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mb-8 italic">
                      "As a fresher, I was nervous about interviews. The Communication program built my confidence and prepared me perfectly. Placed in an international BPO within 2 months!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        PP
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Priya Patel</h4>
                        <p className="text-sm text-gray-600">Customer Support at Concentrix</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="h-full p-1">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl p-8 h-full border border-gray-100 hover:border-indigo-200 transition-all duration-500"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mb-8 italic">
                      "Switching to DevOps seemed impossible, but the mentorship and projects made it happen. Cleared AWS cert on first try!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        AV
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Ankit Verma</h4>
                        <p className="text-sm text-gray-600">DevOps Engineer at Infosys</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            </Swiper>

            <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#faf3f2] transition-all duration-300 md:flex hidden">
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#faf3f2] transition-all duration-300 md:flex hidden">
              <ArrowRight className="w-6 h-6 text-gray-800" />
            </button>

            <div className="swiper-pagination-custom flex justify-center gap-2 mt-8" />
          </div>
        </div>
      </section>

      {/* Workshops CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Journey Today
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-10 opacity-90">
              Join our upcoming workshop and take the first step toward your dream career.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/workshops"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold bg-white text-[#8B0000] rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Join Workshop Now
                <BookOpen className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}