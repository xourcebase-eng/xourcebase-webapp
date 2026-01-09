// app/workshop-checkout/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowLeft, Lock, Clock, Calendar, Users, Award, CheckCircle, Mail, Phone } from 'lucide-react';

export default function WorkshopCheckoutPage() {
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

  const [timeLeft, setTimeLeft] = useState(900);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    currentRole: '',
    experience: '',
    coupon: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponStatus, setCouponStatus] = useState({ valid: false, message: '', discount: 0 });

  const validCoupons = {
    EARLYBIRD: { discount: 50, message: '🎉 EARLYBIRD applied! 50% OFF → ₹49' },
    XOURCE50: { discount: 50, message: '🎉 XOURCE50 applied! 50% OFF → ₹49' },
    WELCOME99: { discount: 0, message: '✅ Coupon applied!' },
    FREEPASS: { discount: 100, message: '🎊 FREEPASS applied! FREE ACCESS!' },
    ONEFOR1: { discount: 98, message: '🔥 ONEFOR1 applied! Pay just ₹1' }, // ← NEW ₹1 COUPON
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    const code = formData.coupon.trim().toUpperCase();
    if (validCoupons[code as keyof typeof validCoupons]) {
      setCouponStatus({
        valid: true,
        message: validCoupons[code as keyof typeof validCoupons].message,
        discount: validCoupons[code as keyof typeof validCoupons].discount,
      });
    } else if (formData.coupon.trim()) {
      setCouponStatus({ valid: false, message: '❌ Invalid coupon code', discount: 0 });
    } else {
      setCouponStatus({ valid: false, message: '', discount: 0 });
    }
  };

  useEffect(() => {
    if (!mounted) return;
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Add styles
    const styleId = 'phone-input-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .react-tel-input .form-control {
          width: 100% !important;
          height: 56px !important;
          padding: 16px 14px 16px 58px !important;
          font-size: 16px !important;
          color: #1f2937 !important;
          font-weight: 500 !important;
          background-color: #ffffff !important;
          border: 2px solid #d1d5db !important;
          border-radius: 12px !important;
          transition: all 0.2s !important;
        }
        
        .react-tel-input .form-control:focus {
          border-color: #4f46e5 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
        
        .react-tel-input .form-control::placeholder {
          color: #9ca3af !important;
          opacity: 1 !important;
          font-weight: 400 !important;
        }
        
        .react-tel-input .flag-dropdown {
          background-color: #f9fafb !important;
          border: 2px solid #d1d5db !important;
          border-right: none !important;
          border-radius: 12px 0 0 12px !important;
          transition: all 0.2s !important;
        }
        
        .react-tel-input .flag-dropdown:hover {
          background-color: #f3f4f6 !important;
        }
        
        .react-tel-input .selected-flag {
          padding: 0 0 0 16px !important;
          width: 52px !important;
        }
        
        .react-tel-input .selected-flag .flag {
          transform: scale(1.4) !important;
        }
        
        .react-tel-input .selected-flag .arrow {
          border-top-color: #4b5563 !important;
          margin-left: 6px !important;
        }
        
        .react-tel-input .country-list {
          background-color: #ffffff !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
          max-height: 200px !important;
        }
        
        .react-tel-input .country-list .country:hover {
          background-color: #f3f4f6 !important;
        }
        
        .react-tel-input .country-list .country.highlight {
          background-color: #eef2ff !important;
        }
        
        .react-tel-input .country-list .country .country-name {
          color: #1f2937 !important;
          font-weight: 500 !important;
        }
        
        .react-tel-input .country-list .country .dial-code {
          color: #6b7280 !important;
          font-weight: 600 !important;
        }

        .phone-error .react-tel-input .form-control {
          border-color: #ef4444 !important;
        }
        
        .phone-error .react-tel-input .flag-dropdown {
          border-color: #ef4444 !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [mounted]);

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fix the errors in the form.');
      return;
    }

    let baseAmount = 99;
    let finalAmount = baseAmount;

    if (couponStatus.valid && couponStatus.discount > 0) {
      finalAmount = Math.round(baseAmount * (100 - couponStatus.discount) / 100);
    }
    if (finalAmount < 1) finalAmount = 1;

    if (couponStatus.discount === 100) {
      alert('🎉 Congratulations! You got FREE access with coupon FREEPASS!');
      return;
    }

    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          receipt: `workshop_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert('Failed to initiate payment. Please try again.');
        return;
      }

      const options = {
        // Use test key in development, live key in production
        key: process.env.NODE_ENV === 'development'
          ? 'rzp_test_S1Q7YVN8VPD2k0'
          : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,

        amount: data.amount, // in paise
        currency: data.currency,
        order_id: data.order_id,
        name: 'XourceBase',
        description: 'Career Accelerator Workshop Registration',
        image: 'https://xourcebase.com/logo.png',
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone.replace(/\D/g, ''),
        },
        theme: {
          color: '#4f46e5',
        },

        handler: async function (response: any) {
          try {
            // Show user that verification is in progress
            alert('Verifying your payment... Please do not refresh or close this page.');

            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert('Payment Successful & Verified! 🎉\nYou are now registered for the workshop.');
              console.log('Verified Payment ID:', verifyData.payment_id);

              // Only redirect after successful backend verification
              // After successful verification
              window.location.href = `/workshop-success?payment_id=${verifyData.payment_id}&` +
                `name=${encodeURIComponent(formData.fullName)}&` +
                `email=${encodeURIComponent(formData.email)}&` +
                `phone=${encodeURIComponent(formData.phone)}&` +
                `whatsapp=${encodeURIComponent(formData.whatsapp || '')}&` +
                `role=${encodeURIComponent(formData.currentRole || '')}&` +
                `experience=${encodeURIComponent(formData.experience || '')}&` +
                `coupon=${encodeURIComponent(formData.coupon || 'None')}`;
            } else {
              alert(`Payment verification failed: ${verifyData.message || 'Please try again or contact support.'}`);
              console.error('Verification failed:', verifyData);
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
            alert(
              'Something went wrong while verifying your payment.\n' +
              'If money was deducted, please contact support at contact@xourcebase.com with your Payment ID.\n' +
              `Payment ID: ${response.razorpay_payment_id}`
            );
          }
        },

        modal: {
          ondismiss: function () {
            alert('Payment was cancelled. You can try again anytime.');
          },
        },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-600 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Secure Your Seat – Final Step
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90"
            >
              Join Abhijeet Vishwakarma's Exclusive 2-Hour Career Accelerator Workshop
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Checkout */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="md:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              >
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-gray-900">
                  Your Details
                </motion.h2>

                <div className="space-y-6">
                  {/* Full Name */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-5 py-4 text-base font-medium text-gray-900 bg-white border-2 rounded-xl 
                        placeholder:text-gray-400 placeholder:font-normal
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                        transition-all duration-200 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm font-semibold mt-2">{errors.fullName}</p>}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 text-base font-medium text-gray-900 bg-white border-2 rounded-xl 
                        placeholder:text-gray-400 placeholder:font-normal
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                        transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm font-semibold mt-2">{errors.email}</p>}
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Phone Number *</label>
                    <div className={errors.phone ? 'phone-error' : ''}>
                      <PhoneInput
                        country={'in'}
                        value={formData.phone}
                        onChange={(phone) => setFormData({ ...formData, phone })}
                        inputProps={{ 
                          required: true,
                          placeholder: '98765 43210'
                        }}
                        containerClass="react-tel-input"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm font-semibold mt-2">{errors.phone}</p>}
                  </motion.div>

                  {/* WhatsApp */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">WhatsApp Number (Optional)</label>
                    <PhoneInput
                      country={'in'}
                      value={formData.whatsapp}
                      onChange={(whatsapp) => setFormData({ ...formData, whatsapp })}
                      inputProps={{
                        placeholder: '98765 43210'
                      }}
                      containerClass="react-tel-input"
                    />
                  </motion.div>

                  {/* Role & Experience */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Current Designation / Role</label>
                    <input
                      type="text"
                      value={formData.currentRole}
                      onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                      className="w-full px-5 py-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl 
                        placeholder:text-gray-400 placeholder:font-normal
                        hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                        transition-all duration-200"
                      placeholder="e.g., Software Engineer"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Years of Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-5 py-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl 
                        hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                        transition-all duration-200 cursor-pointer"
                    >
                      <option value="" className="text-gray-400">Select your experience</option>
                      <option value="0-1">0-1 Year</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-10">5-10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                  </motion.div>

                  {/* Coupon */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Coupon Code</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={formData.coupon}
                        onChange={(e) => {
                          setFormData({ ...formData, coupon: e.target.value });
                          setCouponStatus({ valid: false, message: '', discount: 0 });
                        }}
                        className="flex-1 px-5 py-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl 
                          placeholder:text-gray-400 placeholder:font-normal uppercase
                          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          transition-all duration-200"
                        placeholder="e.g., EARLYBIRD"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-8 py-4 bg-indigo-600 text-white text-base font-bold rounded-xl 
                          hover:bg-indigo-700 active:bg-indigo-800 
                          transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Apply
                      </button>
                    </div>
                    {couponStatus.message && (
                      <p className={`text-base mt-3 font-bold ${couponStatus.valid ? 'text-green-600' : 'text-red-500'}`}>
                        {couponStatus.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Pay Button */}
                  <motion.div variants={fadeInUp}>
                    <button
                      type="button"
                      onClick={handlePayment}
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-6 text-2xl font-extrabold 
                        bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl 
                        hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800
                        transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 
                        transform hover:scale-105 active:scale-100"
                    >
                      <Lock className="w-8 h-8" />
                      {couponStatus.discount === 100
                        ? 'CLAIM FREE ACCESS'
                        : couponStatus.discount === 98
                        ? 'PAY ₹1 & JOIN NOW'
                        : couponStatus.discount >= 50
                        ? 'PAY ₹49 & JOIN NOW'
                        : 'PAY ₹99 & JOIN NOW'}
                    </button>
                    <p className="text-center text-sm text-gray-600 font-medium mt-6">
                      🔒 Secured by Razorpay • Instant Access • 100% Money Back Guarantee
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-900 text-white rounded-2xl shadow-2xl p-8 border border-indigo-800"
              >
                <motion.h3 variants={fadeInUp} className="text-2xl font-bold mb-8">
                  Order Summary
                </motion.h3>

                <motion.div variants={fadeInUp} className="flex items-center gap-5 mb-8">
                  <img
                    src="https://as1.ftcdn.net/jpg/05/21/94/72/1000_F_521947221_VO1npq5R2Ia0dZeZmtex8gLGcdaVyDXD.jpg"
                    alt="Abhijeet Vishwakarma"
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400"
                  />
                  <div>
                    <p className="text-sm opacity-80">Workshop by</p>
                    <p className="text-xl font-bold text-indigo-300">Abhijeet Vishwakarma</p>
                  </div>
                </motion.div>

                <div className="space-y-5 border-t border-white/20 pt-6">
                  <div className="flex justify-between text-lg">
                    <span>Original Price</span>
                    <span className="line-through opacity-70">₹999</span>
                  </div>
                  <div className="flex justify-between text-3xl font-bold">
                    <span>Today's Special Price</span>
                    <span className="text-indigo-300">
                      {couponStatus.discount === 100
                        ? 'FREE'
                        : couponStatus.discount === 98
                        ? '₹1'
                        : couponStatus.discount >= 50
                        ? '₹49'
                        : '₹99'}
                    </span>
                  </div>
                </div>

                <motion.div variants={fadeInUp} className="mt-8 p-5 bg-red-600/30 rounded-xl text-center animate-pulse">
                  <p className="text-xl font-bold">
                    Offer Ends In: <span className="text-indigo-300 text-2xl">{formatTime(timeLeft)}</span>
                  </p>
                  <p className="text-sm mt-3 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" /> Workshop: 20th December, 2025
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8 space-y-4 text-sm">
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> 4.95/5 Rated Workshop</p>
                  <p className="flex items-center gap-3"><Award className="w-5 h-5 text-yellow-400" /> Bonuses Worth ₹6,400</p>
                  <p className="flex items-center gap-3"><Users className="w-5 h-5 text-indigo-300" /> Limited Seats Available</p>
                  <p className="flex items-center gap-3"><Lock className="w-5 h-5 text-green-400" /> 100% Money Back Guarantee</p>
                </motion.div>
              </motion.div>

              {/* Support */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
              >
                <p className="text-gray-700 font-semibold mb-4">Need help?</p>
                <div className="space-y-3">
                  <a href="mailto:contact@xourcebase.com" className="flex items-center justify-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors">
                    <Mail className="w-5 h-5" /> contact@xourcebase.com
                  </a>
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors">
                    <Phone className="w-5 h-5" /> +91 87677 65307
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <a
              href="/workshops"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 hover:gap-4 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Workshops
            </a>
          </div>
        </div>
      </section>
    </>
  );
}