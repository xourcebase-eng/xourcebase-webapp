import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'A complete overview of every page on XourceBase — find exactly what you’re looking for, fast.',
  alternates: { canonical: '/sitemap-page' },
};

export default function SitemapPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
