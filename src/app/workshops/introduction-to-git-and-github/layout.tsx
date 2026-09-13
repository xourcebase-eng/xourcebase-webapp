import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introduction to Git & GitHub for Beginners | XourceBase',
  description: 'A free, hands-on live workshop covering Git and GitHub from scratch — branching, merging, pull requests, and real-world team workflows. No experience needed.',
  alternates: { canonical: '/workshops/introduction-to-git-and-github' },
};

export default function GitGithubWorkshopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
