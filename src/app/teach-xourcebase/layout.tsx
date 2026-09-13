import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teach on XourceBase',
  description: 'Share your expertise and earn by teaching workshops and training programs on XourceBase. Become an instructor.',
  alternates: { canonical: '/teach-xourcebase' },
};

export default function TeachXourceBaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
