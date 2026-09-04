// app/api/send-receipt/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildWorkshopReceiptPdf } from '@/lib/workshopReceiptPdf';
import { appendRegistrationRow } from '@/lib/googleSheets';
import { generateRegistrationId } from '@/lib/registrationId';

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
      workshop = 'Career Accelerator Workshop',
      workshopDate = 'Saturday, 7th November 2026',
      amountPaid,
    } = body;

    const registrationId = generateRegistrationId();
    const doc = buildWorkshopReceiptPdf({ ...body, registrationId });
    const pdfBuffer = doc.output('arraybuffer');

    // Send email with PDF attachment
    await transporter.sendMail({
      from: '"XourceBase" <no-reply@xourcebase.com>',
      to: email,
      subject: `Your ${workshop} Receipt - ${fullName}`,
      text: `Hi ${fullName},\n\nThank you for registering! Attached is your payment receipt.\n\nYour Registration ID: ${registrationId}\nSave this — you can use it to look up your registration anytime at xourcebase.com/check-registration.\n\nSee you on ${workshopDate}!\n\nTeam XourceBase`,
      html: `
        <h2>Thank You, ${fullName}! 🎉</h2>
        <p>Your seat is confirmed for the <strong>${workshop}</strong> on <strong>${workshopDate}</strong>.</p>
        <p>Attached is your official receipt.</p>
        <p>Your Registration ID: <strong>${registrationId}</strong><br>
        Save this — you can look up your registration anytime at <a href="https://xourcebase.com/check-registration">xourcebase.com/check-registration</a>.</p>
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

    await appendRegistrationRow({
      workshop,
      fullName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      currentRole,
      experience,
      type: 'Paid',
      amountPaid,
      paymentId,
      coupon,
      registrationId,
    });

    return NextResponse.json({ success: true, message: 'Receipt emailed successfully!', registrationId });
  } catch (error) {
    console.error('Email send error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send receipt';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}