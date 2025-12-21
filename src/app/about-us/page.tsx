'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Heart, Lightbulb, Award, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Heart, title: 'Empathy First', desc: 'We listen and support every step of your unique journey.' },
    { icon: Lightbulb, title: 'Innovation Driven', desc: 'Fresh ideas meet practical skills for real impact.' },
    { icon: Users, title: 'Community Powered', desc: 'Grow with peers and mentors who become lifelong allies.' },
    { icon: Award, title: 'Results Oriented', desc: 'Measurable growth, from interviews to dream jobs.' },
  ];

  const teamMembers = [
    { name: 'Abhijeet Vishwakarma', role: 'Lead Mentor', avatar: 'https://via.placeholder.com/80?text=AK' },
    { name: 'Satyam Mishra', role: 'Lead Mentor', avatar: 'https://via.placeholder.com/80?text=PS' },
    { name: 'Rehan Khan', role: 'Lead Mentor', avatar: 'https://via.placeholder.com/80?text=RM' },
    { name: 'Priyanshu Prajapati', role: 'Lead Mentor', avatar: 'https://via.placeholder.com/80?text=PP' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-16 px-6 lg:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About XourceBase
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <p>
              XourceBase is a next-generation career acceleration and professional training platform dedicated to helping students, fresh graduates, and working professionals unlock their full potential.
            </p>
            <p>
              At XourceBase, we bridge the gap between education and employability by offering industry-aligned training, hands-on learning, and personalized mentorship. Our goal is to empower individuals with the right skills, mindset, and confidence to thrive in today’s competitive job market.
            </p>
            <p>
              We believe true growth begins with practical exposure — that’s why our programs blend real-world projects, mock interviews, and expert-led sessions designed by experienced professionals from the tech and business world. Whether you’re a student preparing for your first interview, a professional looking to upskill, or an organization seeking workforce readiness programs, XourceBase is your trusted partner in building a career that stands out.
            </p>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#8B0000]" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To transform learning into an empowering journey that builds confidence, competence, and career success for every individual.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-600" />
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become the most trusted platform for job readiness and professional growth, connecting talent with opportunity through innovation, skill, and mentorship.
            </p>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center border border-gray-100"
                whileHover={{ y: -4 }}
              >
                <value.icon className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-200 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#8B0000] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-xl text-gray-600 mb-8">
            Ready to unlock your potential with XourceBase?
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Programs
            <BookOpen className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}