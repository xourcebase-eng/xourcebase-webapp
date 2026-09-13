import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: "We're building something ambitious. Join a small team on a mission to make world-class tech education accessible to every Indian learner. Explore open roles at XourceBase.",
  alternates: { canonical: '/careers' },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
