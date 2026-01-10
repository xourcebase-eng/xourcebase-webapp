// src/components/Footer.tsx

import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import logo from "@/assets/xourcebase-logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-white transition">About us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover XourceBase</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/teach-xourcebase" className="hover:text-white transition">Teach on XourceBase</Link></li>
              <li><Link href="/plans-pricing" className="hover:text-white transition">Plans and Pricing</Link></li>
              <li><Link href="/help-support" className="hover:text-white transition">Help and Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Business*/}
          <div>
            <h3 className="text-white font-semibold mb-4">XourceBase for Business</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/xourcebase-business" className="hover:text-white transition">XourceBase for Business</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Accessibility */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Accessibility</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy policy</Link></li>
              <li><Link href="/sitemap-links" className="hover:text-white transition">Sitemap</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-white transition">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-8" />

        {/* Bottom Section: Logo + Copyright + Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src={logo.src} 
                alt="XourceBase" 
                className="h-9 w-auto transition-transform duration-200 group-hover:scale-105" 
              />
            </Link>
            <span className="text-white">
              © {new Date().getFullYear()} XourceBase, Inc.
            </span>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a href="https://www.linkedin.com/company/xourcebase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/XourceBase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/xourcebase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/@XourceBase" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Youtube size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582394452096" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}