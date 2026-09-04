// src/types/next-auth.d.ts
// Augments next-auth's session/JWT types with the `provider` field we attach
// in the jwt/session callbacks (src/app/api/auth/[...nextauth]/route.ts).

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      provider?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
  }
}
