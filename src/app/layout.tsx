// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'XourceBase',
  description: 'Advance your skills with XourceBase - Your gateway to expert-led coding workshops and projects.',
  verification: {
    google: 'sf85vAlVH5V9S3jkmLEi7cZ9EuxOEMwNcSBxqrVKCnY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-gray-50`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}