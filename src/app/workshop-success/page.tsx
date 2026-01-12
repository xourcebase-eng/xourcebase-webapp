// app/workshop-success/page.tsx
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient';

export const dynamic = 'force-dynamic';

export default function WorkshopSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paymentId = searchParams.payment_id as string | undefined;

  // Block direct access without a valid payment_id
  if (!paymentId || paymentId === 'N/A') {
    redirect('/');
  }

  return <SuccessClient searchParams={searchParams as any} />;
}