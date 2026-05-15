'use client';

// src/components/Header.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import logo from '@/assets/xourcebase-logo.png';

const NAV_LINKS = [
  { label: 'Workshops', href: '/workshops' },
  { label: 'Trainings', href: '/trainings' },
  { label: 'Community Forum', href: '/community-forum' },
  { label: 'Contact', href: '/contact' },
];

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return src ? (
    <img src={src} alt={name ?? 'User'} className="w-8 h-8 rounded-full object-cover ring-2 ring-white" />
  ) : (
    <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center ring-2 ring-white">
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  );
}

function UserDropdown({ session }: { session: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <Avatar src={session.user?.image} name={session.user?.name} />
        <span className="text-sm font-semibold text-gray-800 max-w-[120px] truncate hidden xl:block">
          {session.user?.name?.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{session.user?.email}</p>
            </div>
            <div className="py-1">
              <Link href="/dashboard" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#8B0000] transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#8B0000] transition-colors">
                <User className="w-4 h-4" /> Profile
              </Link>
            </div>
            <div className="border-t border-gray-100 pt-1">
              <button type="button" onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-gray-100' : 'border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-6">

            <Link href="/" className="flex-shrink-0">
              <img src={logo.src} alt="XourceBase" className="h-8 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href}
                  className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${isActive(href) ? 'text-[#8B0000] bg-red-50' : 'text-gray-700 hover:text-[#8B0000] hover:bg-red-50'}`}>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : isLoggedIn ? (
                <UserDropdown session={session} />
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-[#8B0000] transition-colors px-3 py-2">
                    Log in
                  </Link>
                  <Link href="/signup" className="text-sm font-bold bg-[#8B0000] hover:bg-[#700000] active:scale-95 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            <button type="button" onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

            <motion.div key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-xs bg-white flex flex-col shadow-2xl">

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo.src} alt="XourceBase" className="h-7 w-auto" />
                </Link>
                <button type="button" onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User info strip */}
              {isLoggedIn && session && (
                <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border-b border-red-100 flex-shrink-0">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name ?? ''}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center ring-2 ring-white shadow flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {session.user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() ?? '?'}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive(href) ? 'text-[#8B0000] bg-red-50' : 'text-gray-800 hover:text-[#8B0000] hover:bg-red-50'}`}>
                    {label}
                  </Link>
                ))}

                {/* Dashboard + Profile links — only when logged in */}
                {isLoggedIn && (
                  <>
                    <div className="h-px bg-gray-100 my-2" />
                    <Link href="/dashboard"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-[#8B0000] bg-red-50' : 'text-gray-800 hover:text-[#8B0000] hover:bg-red-50'}`}>
                      <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                      Dashboard
                    </Link>
                    <Link href="/profile"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive('/profile') ? 'text-[#8B0000] bg-red-50' : 'text-gray-800 hover:text-[#8B0000] hover:bg-red-50'}`}>
                      <User className="w-4 h-4 flex-shrink-0" />
                      Profile
                    </Link>
                  </>
                )}
              </nav>

              {/* Footer CTAs */}
              <div className="flex-shrink-0 px-4 py-5 border-t border-gray-100 space-y-3">
                {isLoggedIn ? (
                  <button type="button"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-red-700 border border-red-200 hover:bg-red-50 py-3 rounded-xl transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link href="/login"
                      className="block w-full text-center text-sm font-semibold text-gray-700 border border-gray-200 hover:border-[#8B0000] hover:text-[#8B0000] py-3 rounded-xl transition-colors">
                      Log in
                    </Link>
                    <Link href="/signup"
                      className="block w-full text-center text-sm font-bold bg-[#8B0000] hover:bg-[#700000] text-white py-3 rounded-xl transition-colors">
                      Get Started — It's Free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}