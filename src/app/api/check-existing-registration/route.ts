// app/api/check-existing-registration/route.ts
// Called by the registration modal before proceeding (before charging
// payment, for paid workshops) to check whether this email has already
// registered for THIS specific workshop. The same email registering for a
// different workshop is fine — only an exact email+workshop repeat blocks.
import { NextResponse } from 'next/server';
import { findRegistrations } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const workshop = typeof body?.workshop === 'string' ? body.workshop.trim() : '';

    if (!email || !workshop) {
      return NextResponse.json({ exists: false });
    }

    const matches = await findRegistrations({ email, workshop });
    if (matches.length > 0) {
      return NextResponse.json({ exists: true, registrationId: matches[0].registrationId });
    }
    return NextResponse.json({ exists: false });
  } catch (error) {
    // Fail open: a Sheets outage should never block a legitimate registration.
    // The anti-spam check is a nice-to-have layer, not a hard gate.
    console.error('Duplicate-registration check failed (failing open):', error);
    return NextResponse.json({ exists: false });
  }
}
