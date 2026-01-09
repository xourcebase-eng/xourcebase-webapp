// app/api/send-receipt/route.ts
import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import nodemailer from 'nodemailer';
import type { RowInput } from 'jspdf-autotable'; // ← Important for typing

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      whatsapp = '',
      currentRole = '',
      experience = '',
      coupon = 'None',
      paymentId,
    } = body;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(26);
    doc.setTextColor(16, 185, 129);
    doc.text('Payment Receipt', 105, 30, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text('Career Accelerator Workshop', 105, 45, { align: 'center' });

    // Success Badge
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(70, 55, 70, 12, 3, 3, 'F');
    doc.setTextColor(255);
    doc.setFontSize(14);
    doc.text('PAYMENT SUCCESSFUL ✓', 105, 63, { align: 'center' });

    // Helper functions
    const getExperienceLabel = (exp: string): string => {
      const map: Record<string, string> = {
        '0-1': 'Fresher (0-1 Year)',
        '1-3': '1-3 Years',
        '3-5': '3-5 Years',
        '5-10': '5-10 Years',
        '10+': '10+ Years',
      };
      return map[exp] || exp;
    };

    const getAmountPaid = (c: string): string => {
      if (c === 'FREEPASS') return 'FREE';
      if (c === 'ONEFOR1') return '₹1';
      if (['EARLYBIRD', 'XOURCE50'].includes(c)) return '₹49';
      return '₹99';
    };

    // Build body rows safely (no nulls)
    const bodyRows: RowInput[] = [
      ['Participant Name', fullName],
      ['Email Address', email],
      ['Phone Number', phone],
      ...(whatsapp ? [['WhatsApp Number', whatsapp]] : []),
      ...(currentRole ? [['Current Role', currentRole]] : []),
      ...(experience ? [['Experience', getExperienceLabel(experience)]] : []),
      ['Coupon Applied', coupon === 'None' ? 'No coupon used' : coupon],
      ['Payment ID', paymentId || 'N/A'],
      ['Transaction Date', new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
      ['Workshop Date', 'Saturday, 20th December 2025'],
      ['Time', '7:00 PM - 9:00 PM IST'],
      ['Duration', '2 Hours Live Session'],
      ['Platform', 'Zoom (Link will be sent 1 hour before)'],
      ['Amount Paid', getAmountPaid(coupon)],
      ['Payment Status', 'Success - Confirmed'],
    ];

    // Generate table
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

    // Bonuses Section
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129);
    doc.text('Exclusive Bonuses Included (Worth ₹6,400):', 20, finalY);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text('• Full workshop recording access', 25, finalY + 10);
    doc.text('• Career templates & resume guides', 25, finalY + 18);
    doc.text('• Lifetime access to bonus resources', 25, finalY + 26);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing XourceBase!', 105, 270, { align: 'center' });
    doc.text('For support: contact@xourcebase.com | +91 87677 65307', 105, 278, { align: 'center' });
    doc.text('www.xourcebase.com', 105, 285, { align: 'center' });

    const pdfBuffer = doc.output('arraybuffer');

    // Send email with PDF attachment
    await transporter.sendMail({
      from: '"XourceBase" <no-reply@xourcebase.com>',
      to: email,
      subject: `Your Career Accelerator Workshop Receipt - ${fullName}`,
      text: `Hi ${fullName},\n\nThank you for registering! Attached is your payment receipt.\n\nSee you on 20th December!\n\nTeam XourceBase`,
      html: `
        <h2>Thank You, ${fullName}! 🎉</h2>
        <p>Your seat is confirmed for the <strong>Career Accelerator Workshop</strong> on <strong>20th December 2025</strong>.</p>
        <p>Attached is your official receipt.</p>
        <p>We can't wait to see you there!</p>
        <br>
        <p>Best,<br>Team XourceBase</p>
      `,
      attachments: [
        {
          filename: `XourceBase_Receipt_${fullName.replace(/\s+/g, '_')}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Receipt emailed successfully!' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send receipt' },
      { status: 500 }
    );
  }
}