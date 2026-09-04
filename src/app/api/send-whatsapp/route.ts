// app/api/send-whatsapp/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      phone,
      fullName,
      workshop = 'Career Accelerator Workshop',
      workshopDate = 'Saturday, 7th November 2026',
      workshopTime = '7:00 PM IST',
      workshopDuration = '2 Hours Live',
      host = 'Abhijeet Vishwakarma',
      bonusesLabel = 'Bonuses Worth ₹6,400 + Recording access included!',
    } = body;

    if (!phone || !fullName) {
      return NextResponse.json({ success: false, message: 'Missing phone or name' }, { status: 400 });
    }

    // Robust phone cleaning
    let cleanPhone = phone.replace(/\D/g, ''); // Remove ALL non-digits

    // Remove leading 0 if present
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    }

    // Remove country code if present
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      cleanPhone = cleanPhone.slice(2); // Remove '91'
    }

    // Final validation: must be exactly 10 digits
    if (cleanPhone.length !== 10) {
      console.log('Invalid phone after cleaning:', phone, '→', cleanPhone);
      return NextResponse.json({ success: false, message: 'Invalid Indian phone number (must be 10 digits)' }, { status: 400 });
    }

    const formattedPhone = `91${cleanPhone}`;

    const message = `🎉 *Congratulations ${fullName}!* 🎉

You're officially registered for the
*${workshop}* by ${host}!

📅 *Date*: ${workshopDate}
🕖 *Time*: ${workshopTime}
⏱️ *Duration*: ${workshopDuration}
🔗 *Platform*: Zoom (Link will be sent 1 hour before)
${bonusesLabel ? `\n🎁 *${bonusesLabel}*\n` : ''}
Confirmation email sent.

See you soon! 🚀
Team XourceBase`;

    const response = await fetch(`https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: process.env.ULTRAMSG_TOKEN,
        to: formattedPhone,
        body: message,
        priority: 10,
        referenceId: '',
      }),
    });

    const data = await response.json();

    if (data.sent === 'true' || data.id) {
      return NextResponse.json({ success: true, message: 'WhatsApp message sent!' });
    } else {
      console.error('UltraMsg API error:', data);
      return NextResponse.json({ success: false, message: data.error || 'Failed to send via UltraMsg' });
    }
  } catch (error) {
    console.error('WhatsApp send error:', error);
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}