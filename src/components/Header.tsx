// src/components/Header.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import logo from "@/assets/xourcebase-logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if current viewport is mobile (lg breakpoint = 1024px)
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 1024); // Tailwind 'lg' = 1024px
  };

  // Reset all open states when switching between mobile/desktop
  const resetMenuStates = () => {
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
  };

  // Initial check + listener for window resize
  useEffect(() => {
    checkIsMobile();
    const handleResize = () => {
      const wasMobile = isMobile;
      checkIsMobile();
      const nowMobile = window.innerWidth < 1024;

      // Only reset if crossing the lg breakpoint
      if (wasMobile !== nowMobile) {
        resetMenuStates();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMobile]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProgramsOpen(false);
      }
    };

    if (isProgramsOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProgramsOpen, isMobile]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const isProgramsActive = isActive('/programs');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const togglePrograms = () => {
    setIsProgramsOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={logo.src} 
              alt="XourceBase" 
              className="h-9 w-auto transition-transform duration-200 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */ }
          <nav className="hidden lg:flex items-center space-x-10 font-manrope">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={togglePrograms}
                className={`flex items-center space-x-1 font-medium transition ${
                  isProgramsActive ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
                }`}
              >
                <span>Programs</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProgramsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 font-manrope">
                  <Link
                    href="/tech-career-accelerator"
                    onClick={handleLinkClick}
                    className={`block px-5 py-3 text-sm transition ${
                      pathname === '/programs/tech-career-accelerator'
                        ? 'bg-purple-50 text-[#8B0000]'
                        : 'text-gray-700 hover:text-[#8B0000] hover:bg-gray-100'
                    }`}
                  >
                    Tech Career Accelerator
                  </Link>
                  <Link
                    href="/communication-support-excellence"
                    onClick={handleLinkClick}
                    className={`block px-5 py-3 text-sm transition ${
                      pathname === '/programs/communication-support-excellence'
                        ? 'bg-purple-50 text-[#8B0000]'
                        : 'text-gray-700 hover:text-[#8B0000] hover:bg-gray-100'
                    }`}
                  >
                    Communication & Support Excellence
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/workshops"
              className={`font-medium transition font-manrope ${
                isActive('/workshops') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
              }`}
            >
              Workshops
            </Link>
            <Link
              href="/plans-pricing"
              className={`font-medium transition font-manrope ${
                isActive('/plans-pricing') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
              }`}
            >
              Plans & Pricing
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition font-manrope ${
                isActive('/contact') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'
          }`}
        >
          <div className="py-6">
            <nav className="space-y-5 font-manrope">
              {/* Programs - Collapsible in Mobile */}
              <div>
                <button
                  onClick={togglePrograms}
                  className={`flex w-full items-center justify-between text-left font-semibold py-2 transition ${
                    isProgramsActive ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
                  }`}
                  aria-expanded={isProgramsOpen}
                >
                  <span>Programs</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isProgramsOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 space-y-2 font-manrope">
                    <Link
                      href="/tech-career-accelerator"
                      onClick={handleLinkClick}
                      className={`block py-2 transition ${
                        pathname === '/tech-career-accelerator'
                          ? 'text-[#8B0000] font-medium'
                          : 'text-gray-700 hover:text-[#8B0000]'
                      }`}
                    >
                      Tech Career Accelerator
                    </Link>
                    <Link
                      href="/communication-support-excellence"
                      onClick={handleLinkClick}
                      className={`block py-2 transition ${
                        pathname === '/communication-support-excellence'
                          ? 'text-[#8B0000] font-medium'
                          : 'text-gray-700 hover:text-[#8B0000]'
                      }`}
                    >
                      Communication & Support Excellence
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/workshops"
                onClick={handleLinkClick}
                className={`block text-lg font-medium transition ${
                  isActive('/workshops') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
                }`}
              >
                Workshops
              </Link>
              <Link
                href="/plans-pricing"
                onClick={handleLinkClick}
                className={`block text-lg font-medium transition ${
                  isActive('/plans-pricing') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
                }`}
              >
                Plans & Pricing
              </Link>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className={`block text-lg font-medium transition ${
                  isActive('/contact') ? 'text-[#8B0000]' : 'text-gray-700 hover:text-[#8B0000]'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}