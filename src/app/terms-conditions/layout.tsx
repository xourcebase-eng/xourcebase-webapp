import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing your use of XourceBase, including our refund and cancellation policy for paid workshops.',
  alternates: { canonical: '/terms-conditions' },
};

export default function TermsConditionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
