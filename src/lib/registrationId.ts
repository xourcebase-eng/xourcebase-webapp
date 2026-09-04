// src/lib/registrationId.ts
// Generates a short, human-typeable Registration ID shown to every
// registrant (free or paid) so they can later look up their registration
// via /check-registration. Not a security token — just an unambiguous,
// easy-to-read/retype reference code.
import crypto from 'crypto';

// Excludes visually-ambiguous characters (0/O, 1/I/L) so it's easy to
// read off a screen and retype without mistakes.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateRegistrationId(): string {
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += ALPHABET[crypto.randomInt(0, ALPHABET.length)];
  }
  return `XB-${code}`;
}
