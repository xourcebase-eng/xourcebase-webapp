// src/lib/workshopReceiptPdf.ts
// Builds the payment-receipt PDF shared by the server (emailed as an
// attachment from /api/send-receipt) and the client (instant "Download
// Receipt" button in WorkshopRegistrationModal's success state) — one
// isomorphic function, so the two never drift apart.
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { RowInput } from 'jspdf-autotable';

// jspdf-autotable augments the jsPDF instance with `lastAutoTable` at runtime;
// its types don't expose that, so declare it here instead of casting to `any`.
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: { finalY: number };
  }
}

export interface WorkshopReceiptData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  currentRole?: string;
  experience?: string;
  coupon?: string;
  paymentId?: string;
  workshop?: string;
  workshopDate?: string;
  workshopTime?: string;
  workshopDuration?: string;
  amountPaid?: string;
  bonuses?: string[];
}

const EXPERIENCE_LABELS: Record<string, string> = {
  '0-1': 'Fresher (0-1 Year)',
  '1-3': '1-3 Years',
  '3-5': '3-5 Years',
  '5-10': '5-10 Years',
  '10+': '10+ Years',
};

function getAmountPaidFallback(coupon: string): string {
  if (coupon === 'FREEPASS') return 'FREE';
  if (coupon === 'ONEFOR1') return '₹1';
  if (['EARLYBIRD', 'XOURCE50'].includes(coupon)) return '₹49';
  return '₹99';
}

export function buildWorkshopReceiptPdf(data: WorkshopReceiptData): jsPDF {
  const {
    fullName,
    email,
    phone,
    whatsapp = '',
    currentRole = '',
    experience = '',
    coupon = 'None',
    paymentId,
    workshop = 'Career Accelerator Workshop',
    workshopDate = 'Saturday, 7th November 2026',
    workshopTime = '7:00 PM - 9:00 PM IST',
    workshopDuration = '2 Hours Live Session',
    amountPaid,
    bonuses = [
      'Full workshop recording access',
      'Career templates & resume guides',
      'Lifetime access to bonus resources',
    ],
  } = data;

  const doc = new jsPDF();

  // Title
  doc.setFontSize(26);
  doc.setTextColor(16, 185, 129);
  doc.text('Payment Receipt', 105, 30, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text(workshop, 105, 45, { align: 'center' });

  // Success badge
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(70, 55, 70, 12, 3, 3, 'F');
  doc.setTextColor(255);
  doc.setFontSize(14);
  doc.text('PAYMENT SUCCESSFUL ✓', 105, 63, { align: 'center' });

  const bodyRows: RowInput[] = [
    ['Participant Name', fullName],
    ['Email Address', email],
    ['Phone Number', phone],
    ...(whatsapp ? [['WhatsApp Number', whatsapp]] : []),
    ...(currentRole ? [['Current Role', currentRole]] : []),
    ...(experience ? [['Experience', EXPERIENCE_LABELS[experience] || experience]] : []),
    ['Coupon Applied', coupon === 'None' ? 'No coupon used' : coupon],
    ['Payment ID', paymentId || 'N/A'],
    ['Transaction Date', new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
    ['Workshop Date', workshopDate],
    ['Time', workshopTime],
    ['Duration', workshopDuration],
    ['Platform', 'Zoom (Link will be sent 1 hour before)'],
    ['Amount Paid', amountPaid || getAmountPaidFallback(coupon)],
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

  let finalY = doc.lastAutoTable.finalY + 15;

  // Bonuses section (skipped when the workshop has none configured)
  if (bonuses.length) {
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129);
    doc.text('Exclusive Bonuses Included:', 20, finalY);
    doc.setFontSize(11);
    doc.setTextColor(0);
    bonuses.forEach((line, i) => {
      doc.text(`• ${line}`, 25, finalY + 10 + i * 8);
    });
    finalY = finalY + 10 + bonuses.length * 8;
  }

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Thank you for choosing XourceBase!', 105, 270, { align: 'center' });
  doc.text('For support: contact@xourcebase.com | +91 87677 65307', 105, 278, { align: 'center' });
  doc.text('www.xourcebase.com', 105, 285, { align: 'center' });

  return doc;
}
