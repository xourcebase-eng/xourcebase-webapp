import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Career tips, cloud tutorials, and team stories from XourceBase — practical insights to help you grow your tech career.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
