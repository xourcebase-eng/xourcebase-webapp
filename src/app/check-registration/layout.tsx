import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check Your Registration',
  description: 'Look up your XourceBase workshop registration using your Registration ID or the email you registered with.',
  alternates: { canonical: '/check-registration' },
};

export default function CheckRegistrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
