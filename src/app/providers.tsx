'use client';

// src/app/providers.tsx

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Re-check session whenever the tab regains focus
      // (fixes desktop-mode switch showing logged-out state)
      refetchOnWindowFocus={true}
      // Also re-check every 5 minutes in the background
      refetchInterval={5 * 60}
    >
      {children}
    </SessionProvider>
  );
}