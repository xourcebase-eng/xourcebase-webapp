'use client';

// src/app/api/auth/auth-error/page.tsx
// NextAuth error page — set as `pages.error: '/auth-error'` in the NextAuth config.
// Same "Career Accelerator" visual system as the rest of the redesigned site.

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration. Contact support.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The sign-in link has expired or has already been used.',
  OAuthCallback: 'There was a problem with the OAuth provider. Check your credentials.',
  OAuthSignin: 'Could not start the sign-in flow. Check your OAuth app settings.',
  OAuthAccountNotLinked: 'This email is already linked to another sign-in method.',
  Default: 'An unexpected error occurred. Please try again.',
};

const MONO = "'Space Grotesk', sans-serif";

function AuthErrorContent() {
  const params = useSearchParams();
  const error = params.get('error') ?? 'Default';
  const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-[#F5F5F2] flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md bg-white border-2 border-[#14141A] p-8 sm:p-10 text-center">
        <div className="w-14 h-14 border-2 border-[#FF3D57] bg-[#FF3D57]/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-[#FF3D57]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#14141A] mb-2" style={{ fontFamily: MONO }}>
          SIGN-IN ERROR
        </h1>
        <p className="text-sm text-[#14141A]/60 mb-2">{message}</p>
        <p className="text-xs text-[#14141A]/40 mb-8">
          Error code:{' '}
          <code className="bg-[#F5F5F2] border border-[#14141A]/10 px-1.5 py-0.5 font-mono">{error}</code>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#14141A] hover:bg-black text-white text-sm font-bold transition-all"
          style={{ fontFamily: MONO }}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  );
}
