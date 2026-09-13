import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XourceBase for Business',
  description: 'Upskill your team with XourceBase for Business — team training plans, custom workshops, and enterprise onboarding.',
  alternates: { canonical: '/xourcebase-business' },
};

export default function XourceBaseBusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
