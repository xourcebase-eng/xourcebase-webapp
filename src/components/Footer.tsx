// src/components/Footer.tsx

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react';
import logo from "@/assets/xourcebase-logo.png";

const FOOTER_COLS = [
  {
    heading: 'About',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'Teach on XourceBase', href: '/teach-xourcebase' },
      { label: 'Help & Support', href: '/help-support' },
    ],
  },
  {
    heading: 'Business',
    links: [
      { label: 'XourceBase for Business', href: '/xourcebase-business' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Sitemap', href: '/sitemap-page' },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/xourcebase',            label: 'LinkedIn'  },
  { icon: Twitter,   href: 'https://x.com/XourceBase',                               label: 'Twitter'   },
  { icon: Instagram, href: 'https://www.instagram.com/xourcebase',                   label: 'Instagram' },
  { icon: Youtube,   href: 'https://www.youtube.com/@XourceBase',                    label: 'YouTube'   },
  { icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61582394452096', label: 'Facebook'  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-14 pb-10">

        {/* Top strip: brand + tagline */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-3">
            <img src={logo.src} alt="XourceBase" className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Learn in-demand skills from expert instructors — at your own pace, on any device.
          </p>
        </div>

        {/* Nav columns
            Mobile  : 2 cols
            Tablet  : 2 cols (avoids 4-col squeeze at md)
            Desktop : 4 cols
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          <p className="text-xs text-gray-600 order-2 sm:order-1">
            © {new Date().getFullYear()} XourceBase, Inc. All rights reserved.
          </p>

          {/* Social icons with proper tap targets */}
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}