// app/api/razorpay-webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// In production, save registrations to DB here
// For now, we'll just log and confirm receipt

export async function POST(request: Request) {
  const text = await request.text();
  const signature = request.headers.get('x-razorpay-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(text)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(text);

  // Handle successful payment
  if (event.event === 'payment.captured' || event.event === 'order.paid') {
    const payment = event.payload.payment?.entity;
    const order = event.payload.order?.entity;

    if (payment && payment.status === 'captured') {
      const paymentId = payment.id;
      const amount = payment.amount / 100; // in rupees
      const email = payment.email;
      const phone = payment.contact;
      const name = payment.notes?.name || 'User';

      console.log('✅ Genuine Payment Confirmed:', {
        paymentId,
        name,
        email,
        phone,
        amount,
      });

      // HERE: Save to your database (Prisma, Supabase, etc.)
      // Trigger welcome sequence
      // Add to WhatsApp group
      // Send manual bonuses if needed

      // Optional: Trigger your own confirmation email/WhatsApp here if needed
    }
  }

  // Handle failed payments (optional)
  if (event.event === 'payment.failed') {
    console.log('❌ Payment Failed:', event.payload.payment.entity.id);
  }

  return NextResponse.json({ status: 'success' });
}