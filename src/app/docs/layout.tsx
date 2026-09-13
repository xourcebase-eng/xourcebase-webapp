import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation & Help',
  description: 'Guides, how-tos, and answers for everything on XourceBase — workshops, trainings, billing, and your account.',
  alternates: { canonical: '/docs' },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
