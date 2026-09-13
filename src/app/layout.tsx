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
  metadataBase: new URL('https://xourcebase.com'),
  title: {
    default: 'XourceBase',
    template: '%s | XourceBase',
  },
  description: 'Advance your skills with XourceBase - Your gateway to expert-led coding workshops and projects.',
  verification: {
    google: 'sf85vAlVH5V9S3jkmLEi7cZ9EuxOEMwNcSBxqrVKCnY',
  },
};

// Organization + WebSite structured data (JSON-LD) — helps Google confidently
// identify the brand entity behind the site. No SearchAction on the WebSite
// entry since there's no crawlable /search?q= page to point it at; add one
// if a real site-wide search page is ever built.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'XourceBase',
  url: 'https://xourcebase.com',
  logo: 'https://xourcebase.com/logo.png',
  sameAs: [
    'https://www.linkedin.com/company/xourcebase',
    'https://x.com/XourceBase',
    'https://www.instagram.com/xourcebase',
    'https://www.youtube.com/@XourceBase',
    'https://www.facebook.com/profile.php?id=61582394452096',
  ],
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'XourceBase',
  url: 'https://xourcebase.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-[#F5F5F2]`}>
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