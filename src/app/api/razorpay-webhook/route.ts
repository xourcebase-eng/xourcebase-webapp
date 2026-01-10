// app/api/razorpay-webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma'; // ← Use the singleton from lib/prisma.ts

export async function POST(request: Request) {
  try {
    // Get raw body text for signature verification
    const text = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      console.error('Missing Razorpay signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(text)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(text);

    // Handle successful payment
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const payment = event.payload.payment?.entity;

      if (!payment || payment.status !== 'captured') {
        return NextResponse.json({ status: 'ignored' });
      }

      const paymentId = payment.id;
      const amountPaid = (payment.amount / 100).toFixed(2);
      const coupon = payment.notes?.coupon || 'None';

      // Extract user data from notes
      const fullName = payment.notes?.name || 'Unknown User';
      const email = payment.email || payment.notes?.email || '';
      const rawPhone = payment.contact || payment.notes?.phone || '';
      const phone = rawPhone.replace(/^\+91|\D/g, ''); // Clean to 10 digits
      const whatsapp = payment.notes?.whatsapp || null;
      const currentRole = payment.notes?.role || null;
      const experience = payment.notes?.experience || null;

      // Save to database using upsert
      await prisma.workshopRegistration.upsert({
        where: { paymentId },
        update: {
          status: 'confirmed',
          amountPaid: parseFloat(amountPaid),
        },
        create: {
          paymentId,
          fullName,
          email,
          phone,
          whatsapp,
          currentRole,
          experience,
          coupon,
          amountPaid: parseFloat(amountPaid),
          status: 'confirmed',
        },
      });

      console.log(`Registration saved: ${paymentId} | ${fullName} | ₹${amountPaid} | ${email}`);
    }

    // Optional: Handle failed payments
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment?.entity;
      if (payment) {
        console.log(`Payment failed: ${payment.id} | ₹${payment.amount / 100}`);
        // Optional: Save failed attempt if needed
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Removed deprecated config — raw body is available by default in App Router