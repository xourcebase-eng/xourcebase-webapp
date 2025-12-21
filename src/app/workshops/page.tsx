'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Award, TrendingUp, Target, Briefcase, Star, Shield, Gift, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkshopsPage() {
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    { name: "Rishu Goel", role: "CFO & Commercial Head, BVCPL", quote: "Thank You Sawan Sir for conducting such a lively and impactful session. I am really feeling blessed that I got a GURU like you... Your live successful examples have given me a lot of positive energy." },
    { name: "Archanaa Saxsena", role: "Manager - Product Development", quote: "I am absolutely energized by this training... Brings in a lot of clarity direction in how to fast forward our career path and of course the salary." },
    { name: "Anada Vardhan", role: "Senior Specialist, Larsen & Toubro", quote: "It's a phenomenal learning experience... Kudos to Abhijeet Vishwakarma sir for putting together such a great program!" },
    { name: "Sarang Anjal", role: "Software Engineer", quote: "Wonderfully designed Course... Will recommend for anyone who wants to succeed in their professional career." },
    { name: "Jayram Govindarajan", role: "Principal Consultant, Infosys", quote: "The time invested is definitely worth a lot... Will be an eye opener for seniors." },
    { name: "Swapnil More", role: "Manager, Bharat Forge Ltd.", quote: "This is great and helpful learning for professionals of all stages... I strongly recommend this to each and every working professional." },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="font-sans text-slate-800 bg-gradient-to-b from-white to-gray-50 min-h-screen relative pb-32">
      
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/50 rounded-full px-5 py-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">2-Hour Career Transformation Workshop</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Power Up Your Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mt-2">
                  In Just 2 Hours
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl text-gray-200 font-semibold leading-relaxed">
                Discover the Proven Scientific Process to <span className="text-yellow-400 font-bold">2-3X Your Salary</span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                While finally achieving the work-life balance you've always dreamed of.
              </p>

              {/* Coach Info Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    AV
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Your Expert Coach</p>
                    <p className="font-bold text-yellow-400 text-2xl">Abhijeet Vishwakarma</p>
                    <p className="text-sm text-gray-300">India's Leading Career Coach</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex text-yellow-400 text-2xl">★★★★★</div>
                <div>
                  <p className="text-white font-bold text-lg">4.95/5</p>
                  <p className="text-gray-300 text-sm">India's Highest Rated Career Program</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4 pt-4">
                <Link href="/workshop-checkout" className="inline-block">
                  <button className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold text-2xl py-6 px-12 rounded-2xl shadow-2xl 
                    transform transition-all duration-300 ease-out cursor-pointer
                    hover:scale-105 hover:-translate-y-1 hover:shadow-yellow-500/50 hover:shadow-3xl
                    active:scale-95 flex items-center justify-center gap-3">
                    <Award className="w-7 h-7" />
                    JOIN WORKSHOP NOW @ JUST ₹99
                  </button>
                </Link>
                <div className="flex items-center justify-center md:justify-start gap-2 text-red-300 text-lg font-bold animate-pulse">
                  <Target className="w-5 h-5" />
                  <span>Limited Seats • Enrollment Closes Today • Workshop: 20th Dec</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-white/10">
                <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-32 h-32 text-white/30" />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-white/70 text-sm mb-2">Coach Preview</p>
                  <p className="text-white font-bold text-xl">Abhijeet Vishwakarma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BENEFITS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "2-3X Salary Growth", desc: "Unlock proven strategies to multiply your income fast.", icon: TrendingUp, gradient: "from-green-500 to-emerald-600" },
            { title: "Land Your Dream Job", desc: "Get hired by top companies that value you.", icon: Briefcase, gradient: "from-blue-500 to-indigo-600" },
            { title: "Perfect Work-Life Balance", desc: "Earn more while enjoying life fully.", icon: Target, gradient: "from-purple-500 to-pink-600" },
            { title: "Recognition & Respect", desc: "Be valued for your true contributions.", icon: Award, gradient: "from-orange-500 to-red-600" },
          ].map((item, index) => (
            <div key={index} className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
              <div className={`bg-gradient-to-br ${item.gradient} p-8 flex items-center justify-center`}>
                <item.icon className="w-20 h-20 text-white" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Success Stories from Our Students</h2>
            <p className="text-xl text-gray-300">Real transformations from real professionals</p>
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-yellow-400 text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-lg mb-4">★★★★★</div>
                      <p className="text-gray-200 italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-yellow-400 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-200 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">What Will Change After This Workshop?</h2>
            <p className="text-xl text-gray-600">Transform your career trajectory in just 2 hours</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Master skills to secure high-paying roles or massive salary hikes.",
              "End compromises — achieve true work-life balance.",
              "Identify companies with exceptional culture and stability.",
              "Learn to evaluate recession-proof employers using financial insights.",
              "Negotiate like a pro and accelerate your career trajectory.",
              "Build confidence to switch domains or climb to leadership."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg leading-relaxed text-gray-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">What You'll Master in This 2-Hour Workshop</h2>
            <p className="text-xl text-gray-600">A comprehensive curriculum designed for rapid career acceleration</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, text: "Finding the perfect company & role alignment" },
              { icon: Award, text: "Proven techniques to attract offers from dream companies" },
              { icon: TrendingUp, text: "Standing out in today's ultra-competitive job market" },
              { icon: MessageCircle, text: "Science-backed salary negotiation tactics" },
              { icon: Users, text: "Balancing high income with personal fulfillment" },
              { icon: Briefcase, text: "Long-term strategies for sustained career acceleration" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Is This Workshop For You?</h2>
          <p className="text-xl text-gray-600 mb-12">Perfect for ambitious professionals at these career stages</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Salaried Professionals", "Feeling Stuck in Career", "Seeking Better Balance", "Domain/Role Switchers", "Ready for Next-Level Growth"].map((tag) => (
              <span key={tag} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg text-lg font-bold hover:scale-105 transition-transform duration-300">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 inline-block">
            <p className="text-red-700 font-semibold text-lg">
              ⚠️ Not for business owners or students seeking shortcuts.
            </p>
          </div>
        </div>
      </section>

      {/* BONUSES */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Exclusive Bonuses Worth ₹6,400</h2>
            <p className="text-xl text-gray-600">(Yours FREE when you join today)</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-blue-600 text-center">Registration Bonuses</h4>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>How to Choose the Right Career Path</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Landing International Job Opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Navigating Workplace Politics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-green-600 text-center">Participation Bonuses</h4>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Ultimate Salary Negotiation Guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Mastering Interviews at Top Companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Path to Senior Leadership Roles</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg animate-pulse">
                Limited
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Star className="w-8 h-8 text-yellow-300" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center">Gen AI Job Hunt Guide</h4>
              <p className="text-white/90 mb-6 text-center leading-relaxed">Automate your job search with cutting-edge AI tools and land opportunities 10x faster.</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-yellow-300 font-bold text-center text-sm">🎁 Only for attendees who stay till the end!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COACH BIO */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-80 h-80 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
                <Users className="w-40 h-40 text-white/30" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Meet Your Coach: Abhijeet Vishwakarma</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Known as <strong className="text-indigo-600">"The Career Guy"</strong>, Sawan is India's most trusted career coach. With top-tier education from the US & UK, he climbed from entry-level to CEO. After a major setback, he engineered a breakthrough framework that landed him <strong className="text-indigo-600">4 job offers in just 30 days</strong> with massive salary jumps.
              </p>
              <p className="text-lg text-gray-700 font-semibold">
                Now, he's helped over 150,000 professionals transform their careers.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {[
                  { label: "CEO", value: "Experience" },
                  { label: "18+", value: "Years" },
                  { label: "250+", value: "Seminars" },
                  { label: "1.5L+", value: "Trained" }
                ].map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl text-center border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-4 border-green-500 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-green-700 mb-6">100% Risk-Free: Money Back Guarantee</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              If this workshop doesn't deliver massive value in just 2 hours, email us for a <strong className="text-green-700">full ₹99 refund</strong>. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this workshop live or recorded?", a: "This is a fully live interactive masterclass on 20th Dec 2025 from 10:00 AM to 12:00 PM IST." },
              { q: "Will I get the recording?", a: "No recordings are provided. This is a live-only event for maximum engagement and real-time value." },
              { q: "What if I can't attend the entire session?", a: "Full attendance is highly recommended to qualify for the exclusive Generative AI bonus and get the complete transformation." },
              { q: "Is the money-back guarantee genuine?", a: "Absolutely 100%. If you're not satisfied, simply email support@successgyan.com after the workshop for an instant full refund of ₹99." },
              { q: "How will I receive the Zoom link?", a: "The Zoom link and all details will be emailed instantly after successful payment." },
              { q: "Can I join if I'm a fresher or student?", a: "This workshop is designed for working professionals. It's not suitable for students or business owners." },
              { q: "When does enrollment close?", a: "Enrollment closes today. Secure your seat now before the ₹99 offer expires!" },
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

      {/* STICKY CTA FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white shadow-2xl z-50 py-5 px-6 border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-yellow-300 mb-1">Limited Time Offer</p>
            <p className="text-4xl font-extrabold">
              <span className="line-through text-white/60 mr-3">₹999</span>
              <span className="text-yellow-300">₹99 ONLY</span>
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <Clock className="w-5 h-5 text-yellow-300" />
              <p className="text-lg">
                Offer Ends In: <span className="text-yellow-300 font-bold text-2xl font-mono ml-2">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </div>
          <Link href="/workshop-checkout" className="inline-block">
            <button className="bg-white text-red-600 font-extrabold text-xl py-5 px-12 rounded-2xl shadow-2xl 
              transform transition-all duration-300 ease-out cursor-pointer
              hover:scale-110 hover:-translate-y-2 hover:bg-yellow-50 hover:shadow-3xl
              active:scale-95 flex items-center gap-3">
              <Award className="w-6 h-6" />
              SECURE YOUR SPOT NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}