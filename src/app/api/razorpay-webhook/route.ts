// app/api/razorpay-webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrismaClient } from '../../../generated/prisma';  // Adjust path based on your file location

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get raw body for signature verification
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
      const amountPaid = (payment.amount / 100).toFixed(2); // Convert paise to rupees
      const coupon = payment.notes?.coupon || 'None';

      // Extract user data from notes (sent during order creation)
      const fullName = payment.notes?.name || 'Unknown User';
      const email = payment.email || payment.notes?.email || '';
      const rawPhone = payment.contact || payment.notes?.phone || '';
      const phone = rawPhone.replace(/^\+91|\D/g, ''); // Clean to 10 digits
      const whatsapp = payment.notes?.whatsapp || null;
      const currentRole = payment.notes?.role || null;
      const experience = payment.notes?.experience || null;

      // Save to database using upsert (safe for retries)
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

      console.log(`Registration saved successfully: ${paymentId} | ${fullName} | ₹${amountPaid} | ${email}`);
    }

    // Optional: Log failed payments
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment?.entity;
      if (payment) {
        console.log(`Payment failed: ${payment.id} | Amount: ₹${payment.amount / 100}`);
        
        // Optional: Record failed attempt
        // await prisma.workshopRegistration.upsert({ ... });
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Good practice
  }
}

// Critical: Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};