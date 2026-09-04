// app/api/check-registration/route.ts
// Public lookup for the /check-registration page. Accepts a single free-text
// query — either a Registration ID (e.g. "XB-7K9M2PQR") or the email the
// person registered with — and returns only public-safe fields (never
// phone, WhatsApp, payment ID, or coupon).
import { NextResponse } from 'next/server';
import { findRegistrations } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === 'string' ? body.query.trim() : '';

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Enter your Registration ID or email' },
        { status: 400 }
      );
    }

    const isEmail = /\S+@\S+\.\S+/.test(query);
    const results = await findRegistrations(
      isEmail ? { email: query } : { registrationId: query }
    );

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Registration lookup failed:', error);
    const message = error instanceof Error ? error.message : 'Lookup is temporarily unavailable';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
