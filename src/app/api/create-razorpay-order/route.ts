// app/api/create-razorpay-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();

    // Amount should be in paise (₹99 = 9900 paise)
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Payment initiation failed' },
      { status: 500 }
    );
  }
}