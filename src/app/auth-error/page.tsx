'use client';

// src/app/login/page.tsx  — add error param handling to your existing login page
// OR create src/app/auth/error/page.tsx as a dedicated error page

// This is a standalone auth error page — place at:
// src/app/auth-error/page.tsx
// and set  error: '/auth-error'  in your NextAuth config

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const ERROR_MESSAGES: Record<string, string> = {
  Configuration:   'There is a problem with the server configuration. Contact support.',
  AccessDenied:    'You do not have permission to sign in.',
  Verification:    'The sign-in link has expired or has already been used.',
  OAuthCallback:   'There was a problem with the OAuth provider. Check your credentials.',
  OAuthSignin:     'Could not start the sign-in flow. Check your OAuth app settings.',
  OAuthAccountNotLinked: 'This email is already linked to another sign-in method.',
  Default:         'An unexpected error occurred. Please try again.',
};

function AuthErrorContent() {
  const params = useSearchParams();
  const error  = params.get('error') ?? 'Default';
  const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-[#8B0000]" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Sign-in Error</h1>
        <p className="text-sm text-gray-500 mb-2">{message}</p>
        <p className="text-xs text-gray-400 mb-8">Error code: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{error}</code></p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B0000] hover:bg-[#700000] text-white text-sm font-bold rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
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