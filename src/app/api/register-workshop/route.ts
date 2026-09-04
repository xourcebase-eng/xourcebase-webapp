// app/api/register-workshop/route.ts
// Handles free-workshop registrations (e.g. "Introduction to Git & GitHub").
// No payment involved — just validates the submission and emails a confirmation.
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

interface RegisterWorkshopBody {
  workshop: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  currentRole?: string;
  experience?: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterWorkshopBody = await request.json();
    const { workshop, fullName, email, phone, whatsapp = '', currentRole = '', experience = '' } = body;

    if (!workshop || !fullName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Missing required registration details' },
        { status: 400 }
      );
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const registrationId = generateRegistrationId();

    await transporter.sendMail({
      from: '"XourceBase" <no-reply@xourcebase.com>',
      to: email,
      subject: `You're registered — ${workshop}`,
      text: `Hi ${fullName},\n\nYou're confirmed for "${workshop}". We'll email the joining link and pre-read resources closer to the date.\n\nYour Registration ID: ${registrationId}\nSave this — you can use it to look up your registration anytime at xourcebase.com/check-registration.\n\nSee you there!\n\nTeam XourceBase`,
      html: `
        <h2>You&rsquo;re registered, ${fullName}! 🎉</h2>
        <p>Your seat is confirmed for <strong>${workshop}</strong> — this is a free session, no payment required.</p>
        <p>We&rsquo;ll send the joining link and pre-read resources to this email closer to the date.</p>
        <p>Your Registration ID: <strong>${registrationId}</strong><br>
        Save this — you can look up your registration anytime at <a href="https://xourcebase.com/check-registration">xourcebase.com/check-registration</a>.</p>
        <br>
        <p>Best,<br>Team XourceBase</p>
      `,
    });

    await appendRegistrationRow({
      workshop,
      fullName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      currentRole,
      experience,
      type: 'Free',
      registrationId,
    });

    return NextResponse.json({ success: true, message: 'Registration confirmed', registrationId });
  } catch (error) {
    console.error('Workshop registration failed:', error);
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
