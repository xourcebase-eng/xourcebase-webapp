// src/lib/googleSheets.ts
// Appends one row per workshop registration to a Google Sheet via a service
// account's JWT-bearer OAuth flow — implemented with Node's built-in `crypto`
// + `fetch` only (same signing pattern already used for Razorpay signatures
// elsewhere in this app), so no `googleapis` dependency is needed.
//
// Setup (one-time, in Google Cloud Console + the target Sheet):
//   1. console.cloud.google.com -> create/select a project -> enable the
//      "Google Sheets API".
//   2. IAM & Admin -> Service Accounts -> Create Service Account (any name,
//      e.g. "xourcebase-sheets") -> no roles needed -> Done.
//   3. Open the service account -> Keys tab -> Add Key -> Create new key ->
//      JSON. This downloads a JSON file with `client_email` and
//      `private_key`.
//   4. Open your target Google Sheet -> Share -> paste the service account's
//      `client_email` -> give it Editor access.
//   5. In that Sheet, create/rename a tab called exactly "Registrations"
//      with a header row, e.g.:
//      Timestamp | Workshop | Full Name | Email | Phone | WhatsApp | Current Role | Experience | Type | Amount Paid | Payment ID | Coupon | Registration ID
//   6. Copy the spreadsheet ID from its URL:
//      https://docs.google.com/spreadsheets/d/<THIS-PART>/edit
//   7. Set these in .env.local (never commit real values):
//      GOOGLE_SHEETS_CLIENT_EMAIL=<the client_email from the JSON key>
//      GOOGLE_SHEETS_PRIVATE_KEY="<the private_key from the JSON key, quoted, with \n kept literal>"
//      GOOGLE_SHEETS_SPREADSHEET_ID=<the spreadsheet ID from step 6>
//
// This is intentionally separate from GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET
// (those are the OAuth app used for "Sign in with Google" — a different
// credential type entirely).

import crypto from 'crypto';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEET_RANGE = 'Registrations!A:A'; // append() finds the next empty row on its own
const SHEET_READ_RANGE = 'Registrations!A:M'; // all 13 columns, header row included

// Column order written by appendRegistrationRow — kept in one place so the
// writer and the reader can never drift apart.
const COLUMNS = [
  'timestamp', 'workshop', 'fullName', 'email', 'phone', 'whatsapp',
  'currentRole', 'experience', 'type', 'amountPaid', 'paymentId', 'coupon',
  'registrationId',
] as const;

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials are not configured (GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY).');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(privateKey);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to authenticate with Google Sheets');
  }
  return data.access_token as string;
}

export interface RegistrationRow {
  workshop: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  currentRole?: string;
  experience?: string;
  type: 'Free' | 'Paid';
  amountPaid?: string;
  paymentId?: string;
  coupon?: string;
  registrationId: string;
}

/**
 * Best-effort: never throws. A missing/misconfigured Sheets setup, or any
 * network hiccup, should never block a confirmed registration — it only
 * logs the error server-side.
 */
export async function appendRegistrationRow(row: RegistrationRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    console.error('GOOGLE_SHEETS_SPREADSHEET_ID is not set — skipping registration sheet log.');
    return;
  }

  try {
    const accessToken = await getAccessToken();
    const values = [[
      new Date().toISOString(),
      row.workshop,
      row.fullName,
      row.email,
      row.phone,
      row.whatsapp || '',
      row.currentRole || '',
      row.experience || '',
      row.type,
      row.amountPaid || '',
      row.paymentId || '',
      row.coupon || '',
      row.registrationId,
    ]];

    // RAW (not USER_ENTERED): registrant data like "+91 87677-65307" must be
    // stored literally — USER_ENTERED parses leading +/-/= as a formula,
    // which corrupts phone numbers into #ERROR! cells.
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=RAW`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });

    if (!res.ok) {
      console.error('Google Sheets append failed:', await res.text());
    }
  } catch (error) {
    console.error('Google Sheets logging error:', error);
  }
}

export interface RegistrationLookupResult {
  registrationId: string;
  workshop: string;
  fullName: string;
  type: 'Free' | 'Paid';
  amountPaid: string;
  timestamp: string;
}

/**
 * Looks up registrations by Registration ID (exact match) or email
 * (case-insensitive; can match more than one registration for the same
 * person). Returns only the fields safe to show a public lookup page —
 * never phone, WhatsApp, payment ID, or coupon.
 *
 * Throws on genuine misconfiguration/network failure (unlike
 * appendRegistrationRow) so the API route can tell the user "lookup is
 * temporarily unavailable" instead of a false "not found".
 */
export async function findRegistrations(query: { registrationId?: string; email?: string }): Promise<RegistrationLookupResult[]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('Google Sheets is not configured (GOOGLE_SHEETS_SPREADSHEET_ID).');
  }

  const accessToken = await getAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_READ_RANGE)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });

  if (!res.ok) {
    throw new Error(`Failed to read the registrations sheet: ${await res.text()}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];
  const dataRows = rows.slice(1); // skip header

  const wantedId = query.registrationId?.trim().toUpperCase();
  const wantedEmail = query.email?.trim().toLowerCase();

  const matches: RegistrationLookupResult[] = [];
  for (const cells of dataRows) {
    const record: Record<string, string> = {};
    COLUMNS.forEach((key, i) => { record[key] = cells[i] || ''; });

    const idMatches = wantedId && record.registrationId.trim().toUpperCase() === wantedId;
    const emailMatches = wantedEmail && record.email.trim().toLowerCase() === wantedEmail;
    if (idMatches || emailMatches) {
      matches.push({
        registrationId: record.registrationId,
        workshop: record.workshop,
        fullName: record.fullName,
        type: record.type === 'Paid' ? 'Paid' : 'Free',
        amountPaid: record.amountPaid,
        timestamp: record.timestamp,
      });
    }
  }

  return matches;
}
