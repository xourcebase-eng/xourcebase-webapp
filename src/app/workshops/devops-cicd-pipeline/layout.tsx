import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevOps CI/CD Pipeline — Build to Deploy | XourceBase',
  description: 'A hands-on workshop on building a full CI/CD pipeline with GitHub Actions, Docker, and Kubernetes — deploy a real application to AWS EKS.',
  alternates: { canonical: '/workshops/devops-cicd-pipeline' },
};

export default function DevOpsCiCdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
