'use client';

// src/components/Header.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "@/assets/xourcebase-logo.png";

const NAV_LINKS = [
  { label: 'Workshops', href: '/workshops' },
  { label: 'Trainings', href: '/trainings' },
  { label: 'Community Forum', href: '/community-forum' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-gray-100' : 'border-b border-gray-100'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src={logo.src}
                alt="XourceBase"
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${
                    isActive(href)
                      ? 'text-[#8B0000] bg-red-50'
                      : 'text-gray-700 hover:text-[#8B0000] hover:bg-red-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-[#8B0000] transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-bold bg-[#8B0000] hover:bg-[#700000] active:scale-95 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer (outside header so it overlays page) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Slide-in panel from right */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-xs bg-white flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo.src} alt="XourceBase" className="h-7 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(href)
                        ? 'text-[#8B0000] bg-red-50'
                        : 'text-gray-800 hover:text-[#8B0000] hover:bg-red-50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="flex-shrink-0 px-4 py-5 border-t border-gray-100 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center text-sm font-semibold text-gray-700 border border-gray-200 hover:border-[#8B0000] hover:text-[#8B0000] py-3 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center text-sm font-bold bg-[#8B0000] hover:bg-[#700000] text-white py-3 rounded-xl transition-colors"
                >
                  Get Started — It's Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}