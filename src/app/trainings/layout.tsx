import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Programs',
  description: 'Structured, mentor-led training programs on XourceBase with placement support — build in-demand skills at your own pace.',
  alternates: { canonical: '/trainings' },
};

export default function TrainingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
