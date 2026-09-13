import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign-In Error',
  description: 'There was a problem signing you in to XourceBase.',
  robots: { index: false, follow: false },
};

export default function AuthErrorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
