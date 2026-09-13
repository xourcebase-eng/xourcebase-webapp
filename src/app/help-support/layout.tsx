import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support',
  description: 'Frequently asked questions and support resources for XourceBase workshops, trainings, payments, and accounts.',
  alternates: { canonical: '/help-support' },
};

export default function HelpSupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
