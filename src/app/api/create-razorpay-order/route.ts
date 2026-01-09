// app/api/create-razorpay-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const getRazorpayInstance = () => {
  // Determine environment
  const isDevelopment = process.env.NODE_ENV === 'development';

  const key_id = isDevelopment
    ? process.env.RAZORPAY_TEST_KEY_ID!
    : process.env.RAZORPAY_KEY_ID!;

  const key_secret = isDevelopment
    ? process.env.RAZORPAY_TEST_KEY_SECRET!
    : process.env.RAZORPAY_KEY_SECRET!;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials are not configured properly.');
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `workshop_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount, // in paise
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