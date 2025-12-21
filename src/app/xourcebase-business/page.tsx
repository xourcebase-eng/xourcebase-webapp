'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, Users, TrendingUp, Shield, Mail, CheckCircle } from 'lucide-react';

export default function XourceBaseForBusinessPage() {
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

  const benefits = [
    {
      icon: Users,
      title: 'Talent Pipeline Development',
      desc: 'Build a steady stream of skilled, job-ready professionals trained specifically for your industry needs.',
    },
    {
      icon: TrendingUp,
      title: 'Custom Upskilling Programs',
      desc: 'Tailored training modules designed with your team to upskill existing employees in Cloud, DevOps, and emerging technologies.',
    },
    {
      icon: Shield,
      title: 'Certified & Verified Talent',
      desc: 'Access pre-vetted candidates with industry-recognized certifications and real-world project experience.',
    },
    {
      icon: CheckCircle,
      title: 'Reduced Hiring Time & Cost',
      desc: 'Cut recruitment costs by up to 40% with direct access to trained, motivated professionals ready to contribute from day one.',
    },
  ];

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
            XourceBase for Business
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Partner with XourceBase to build a future-ready workforce. Access top Cloud & DevOps talent, customize training for your teams, and accelerate your organization’s digital transformation.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300"
            >
              <Building2 className="w-6 h-6" />
              Partner with Us
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100"
              whileHover={{ y: -4 }}
            >
              <benefit.icon className="w-14 h-14 text-[#8B0000] mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-700 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mb-16"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#8B0000]" />
              Hire Trained Talent
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Connect directly with our pool of certified Cloud & DevOps professionals. Our graduates complete rigorous, project-based training and are ready to contribute from day one.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Pre-screened and interview-ready candidates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Specialized in AWS, Azure, Kubernetes, Terraform, CI/CD</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Guaranteed skill alignment with your tech stack</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#8B0000]" />
              Corporate Training Solutions
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Upskill your existing teams with customized programs delivered by industry experts. From beginner workshops to advanced certifications.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Fully customized curriculum</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Flexible delivery: online, onsite, or hybrid</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span>Measurable outcomes and certification</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white rounded-2xl shadow-xl p-12 border border-gray-100 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let’s discuss how XourceBase can support your talent and training goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white bg-gradient-to-br from-rose-700 via-red-600 to-orange-500 rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}