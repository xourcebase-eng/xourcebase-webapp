// app/workshop-success/page.tsx
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient'; // We'll move client part here

export const dynamic = 'force-dynamic'; // Always fetch fresh

export default function WorkshopSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paymentId = searchParams.payment_id as string | undefined;

  // Critical protection: Block direct access without payment_id
  if (!paymentId || paymentId === 'N/A') {
    redirect('/'); // Or to a 404 page, or workshop page
  }

  // Optional: You can verify paymentId exists in DB here for extra security
  // (Advanced — later if needed)

  return <SuccessClient searchParams={searchParams} />;
}