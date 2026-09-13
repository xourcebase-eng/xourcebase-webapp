import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Forum',
  description: 'Join the XourceBase community forum to ask questions, share insights, and connect with other learners in DevOps, cloud, and software engineering.',
  alternates: { canonical: '/community-forum' },
};

export default function CommunityForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
