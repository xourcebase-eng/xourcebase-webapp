import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Browse live, hands-on workshops on XourceBase — from beginner-friendly Git & GitHub sessions to advanced DevOps and cloud topics.',
  alternates: { canonical: '/workshops' },
};

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
