// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const getRazorpaySecret = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment
    ? process.env.RAZORPAY_TEST_KEY_SECRET!
    : process.env.RAZORPAY_KEY_SECRET!;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing payment details' },
        { status: 400 }
      );
    }

    const secret = getRazorpaySecret();

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Compare signatures
    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      console.error('Invalid payment signature:', { razorpay_payment_id });
      return NextResponse.json(
        { success: false, message: 'Payment verification failed - Invalid signature' },
        { status: 400 }
      );
    }

    // Payment is verified! Here you can:
    // - Save to database
    // - Send confirmation email
    // - Grant access to workshop
    // - Mark user as registered

    console.log('Payment verified successfully:', razorpay_payment_id);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during verification' },
      { status: 500 }
    );
  }
}