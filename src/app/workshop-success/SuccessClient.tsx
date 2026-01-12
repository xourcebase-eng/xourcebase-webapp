// app/workshop-success/SuccessClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Award,
  Mail,
  Phone,
  ArrowLeft,
  User,
  AtSign,
  Smartphone,
  MessageCircle,
  Briefcase,
  Clock as ClockIcon,
  Download,
} from 'lucide-react';

interface SuccessClientProps {
  searchParams: { [key: string]: string | undefined };
}

export default function SuccessClient({ searchParams }: SuccessClientProps) {
  const paymentId = searchParams.payment_id || 'N/A';
  const fullName = searchParams.name || 'Valued Participant';
  const email = searchParams.email || '';
  const phone = searchParams.phone || '-';
  const whatsapp = searchParams.whatsapp || '';
  const currentRole = searchParams.role || '';
  const experience = searchParams.experience || '';
  const coupon = searchParams.coupon || 'None';

  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(true);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [whatsappSending, setWhatsappSending] = useState(true);

  useEffect(() => {
    // Confetti celebration
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d9f99d'],
    });

    setTimeout(() => {
      confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } });
    }, 300);

    const storageKey = `workshop_receipt_sent_${paymentId}`;

    if (sessionStorage.getItem(storageKey) === 'true') {
      setEmailSent(true);
      setWhatsappSent(true);
      setEmailSending(false);
      setWhatsappSending(false);
      return;
    }

    let hasSentAnything = false;

    // Send Email Receipt
    if (email && paymentId !== 'N/A') {
      setEmailSending(true);
      fetch('/api/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          whatsapp,
          currentRole,
          experience,
          coupon,
          paymentId,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setEmailSent(true);
            hasSentAnything = true;
          }
        })
        .catch(err => console.error('Email send error:', err))
        .finally(() => setEmailSending(false));
    } else {
      setEmailSending(false);
    }

    // Send WhatsApp
    if (phone && phone !== '-' && phone.replace(/\D/g, '').length >= 10) {
      setWhatsappSending(true);
      fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, fullName }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setWhatsappSent(true);
            hasSentAnything = true;
          }
        })
        .catch(err => console.error('WhatsApp send error:', err))
        .finally(() => setWhatsappSending(false));
    } else {
      setWhatsappSending(false);
    }

    if (hasSentAnything || (email && phone)) {
      sessionStorage.setItem(storageKey, 'true');
    }
  }, [paymentId, fullName, email, phone, whatsapp, currentRole, experience, coupon]);

  const getExperienceLabel = (exp: string) => {
    const map: Record<string, string> = {
      '0-1': 'Fresher (0-1 Year)',
      '1-3': '1-3 Years',
      '3-5': '3-5 Years',
      '5-10': '5-10 Years',
      '10+': '10+ Years',
    };
    return map[exp] || exp;
  };

  const getAmountPaid = (c: string) => {
    if (c === 'FREEPASS') return 'FREE';
    if (c === 'ONEFOR1') return '₹1';
    if (['EARLYBIRD', 'XOURCE50'].includes(c)) return '₹49';
    return '₹99';
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(26);
    doc.setTextColor(16, 185, 129);
    doc.text('Payment Receipt', 105, 30, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text('Career Accelerator Workshop', 105, 45, { align: 'center' });

    doc.setFillColor(16, 185, 129);
    doc.roundedRect(70, 55, 70, 12, 3, 3, 'F');
    doc.setTextColor(255);
    doc.setFontSize(14);
    doc.text('PAYMENT SUCCESSFUL ✓', 105, 63, { align: 'center' });

    const bodyRows = [
      ['Participant Name', fullName],
      ['Email Address', email],
      ['Phone Number', phone],
      ...(whatsapp ? [['WhatsApp Number', whatsapp]] : []),
      ...(currentRole ? [['Current Role', currentRole]] : []),
      ...(experience ? [['Experience', getExperienceLabel(experience)]] : []),
      ['Coupon Applied', coupon === 'None' ? 'No coupon used' : coupon],
      ['Payment ID', paymentId],
      ['Transaction Date', new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
      ['Workshop Date', 'Saturday, 20th December 2025'],
      ['Time', '7:00 PM - 9:00 PM IST'],
      ['Duration', '2 Hours Live Session'],
      ['Platform', 'Zoom (Link will be sent 1 hour before)'],
      ['Amount Paid', getAmountPaid(coupon)],
      ['Payment Status', 'Success - Confirmed'],
    ];

    autoTable(doc, {
      startY: 80,
      head: [['Field', 'Details']],
      body: bodyRows,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 11, cellPadding: 6 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70 } },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;

    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129);
    doc.text('Exclusive Bonuses Included (Worth ₹6,400):', 20, finalY);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text('• Full workshop recording access', 25, finalY + 10);
    doc.text('• Career templates & resume guides', 25, finalY + 18);
    doc.text('• Lifetime access to bonus resources', 25, finalY + 26);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing XourceBase!', 105, 270, { align: 'center' });
    doc.text('For support: contact@xourcebase.com | +91 87677 65307', 105, 278, { align: 'center' });
    doc.text('www.xourcebase.com', 105, 285, { align: 'center' });

    return doc;
  };

  const downloadReceipt = () => {
    const doc = generatePDF();
    doc.save(`XourceBase_Workshop_Receipt_${fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <CheckCircle className="w-32 h-32 mx-auto text-green-300 animate-pulse" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Thank You, {fullName}! 🎉
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl mb-8">
              You're registered for the <span className="font-bold text-yellow-300">Career Accelerator Workshop</span>
            </motion.p>

            {paymentId !== 'N/A' && (
              <motion.p variants={fadeInUp} className="text-lg opacity-80">
                Payment ID: <span className="font-mono font-bold">{paymentId}</span>
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Receipt Actions & Status */}
      <section className="py-8 bg-emerald-50">
        <div className="container mx-auto px-6 text-center">
          <button
            onClick={downloadReceipt}
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold text-lg rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download className="w-6 h-6" />
            Download Receipt (PDF)
          </button>

          <div className="mt-6 space-y-3">
            {emailSending && (
              <p className="text-emerald-700 font-medium">Sending email receipt...</p>
            )}
            {emailSent && (
              <p className="text-emerald-600 font-bold flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" /> Receipt sent to {email}!
              </p>
            )}

            {whatsappSending && (
              <p className="text-green-700 font-medium">Sending WhatsApp confirmation...</p>
            )}
            {whatsappSent && (
              <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" /> WhatsApp confirmation sent!
              </p>
            )}

            {!emailSending && !emailSent && email && sessionStorage.getItem(`workshop_receipt_sent_${paymentId}`) && (
              <p className="text-orange-600">Email receipt could not be sent automatically</p>
            )}
            {!whatsappSending && !whatsappSent && phone !== '-' && sessionStorage.getItem(`workshop_receipt_sent_${paymentId}`) && (
              <p className="text-orange-600">WhatsApp message could not be sent</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content - 3 Cards */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Your Details */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <User className="w-8 h-8 text-emerald-600" /> Your Details
              </h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-bold text-gray-900">{fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <AtSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-bold text-gray-900 break-all text-base">{email || '-'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-bold text-gray-900">{phone}</p>
                  </div>
                </div>

                {whatsapp && whatsapp !== '' && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-bold text-gray-900">{whatsapp}</p>
                    </div>
                  </div>
                )}

                {currentRole && currentRole !== '' && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-bold text-gray-900">{currentRole}</p>
                    </div>
                  </div>
                )}

                {experience && experience !== '' && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-bold text-gray-900">{getExperienceLabel(experience)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coupon</p>
                    <p className="font-bold text-emerald-600">{coupon === 'None' ? 'None' : coupon}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workshop Details */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-emerald-600" /> Workshop Details
              </h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="font-bold text-gray-900">Sat, 20th Dec 2025</p>
                    <p className="text-sm text-gray-600">7:00 PM IST</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <p className="font-bold text-gray-900">2 Hours Live Session</p>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <p className="font-bold text-gray-900">Zoom Platform</p>
                </div>
              </div>
              <div className="mt-8 p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800 font-bold text-center">
                  🎁 Bonuses worth ₹6,400 + Recording<br />shared within 24 hours!
                </p>
              </div>
            </motion.div>

            {/* What Happens Next */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-300" /> What Happens Next?
              </h2>
              <ul className="space-y-4 text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Confirmation email sent</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Zoom link 1 hour before via email & WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Recording + bonuses in 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Join exclusive WhatsApp community</span>
                </li>
              </ul>
              <div className="mt-8 p-5 bg-white/10 rounded-xl text-center">
                <p className="font-bold text-xl text-green-300">
                  See you on 20th Dec, {fullName.split(' ')[0]}! 🚀
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Support */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
              <p className="text-2xl font-bold text-gray-800 mb-4">Need Help?</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="mailto:contact@xourcebase.com" className="flex items-center gap-3 text-indigo-600 font-bold text-lg hover:text-indigo-700">
                  <Mail className="w-6 h-6" /> contact@xourcebase.com
                </a>
                <a href="tel:+918767765307" className="flex items-center gap-3 text-indigo-600 font-bold text-lg hover:text-indigo-700">
                  <Phone className="w-6 h-6" /> +91 87677 65307
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center gap-3 text-indigo-600 font-bold text-xl hover:text-indigo-700 hover:gap-5 transition-all">
              <ArrowLeft className="w-6 h-6" /> Back to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
}