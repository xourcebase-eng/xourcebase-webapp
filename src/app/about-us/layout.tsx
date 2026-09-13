import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about XourceBase's mission to make world-class tech education accessible to every Indian learner, and the team behind our expert-led coding workshops and training programs.",
  alternates: { canonical: '/about-us' },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
