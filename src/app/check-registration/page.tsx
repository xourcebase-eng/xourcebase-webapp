'use client';

// src/app/check-registration/page.tsx
// Public lookup — enter a Registration ID (or the email you registered
// with) to confirm a workshop registration. Same "Career Accelerator"
// visual system as the rest of the site.

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle2, Search } from 'lucide-react';

const DISPLAY = "'Archivo Black', sans-serif";
const MONO = "'Space Grotesk', sans-serif";

interface RegistrationResult {
  registrationId: string;
  workshop: string;
  fullName: string;
  type: 'Free' | 'Paid';
  amountPaid: string;
  timestamp: string;
}

export default function CheckRegistrationPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<RegistrationResult[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch('/api/check-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.message || 'Lookup is temporarily unavailable. Please try again shortly.');
        return;
      }
      setResults(data.results || []);
    } catch {
      setError('Something went wrong. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-[#F5F5F2] flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-lg">
        <div className="relative bg-white border-2 border-[#14141A] p-6 sm:p-10 overflow-hidden">
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#14141A]/10 hidden sm:block" />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#C6FF3D] text-[#14141A] px-3 py-1.5 mb-5"
              style={{ fontFamily: MONO }}
            >
              <Search className="w-3.5 h-3.5" />
              Check Registration
            </div>
            <h1 className="text-2xl sm:text-3xl mb-2 text-[#14141A]" style={{ fontFamily: DISPLAY }}>
              FIND YOUR REGISTRATION
            </h1>
            <p className="text-sm text-[#14141A]/60 mb-6 leading-relaxed">
              Enter the Registration ID from your confirmation email, or the email address you registered with.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="XB-7K9M2PQR or you@example.com"
                className="w-full px-4 py-3 text-sm text-[#14141A] bg-[#F5F5F2] border-2 border-[#14141A]/20 focus:outline-none focus:border-[#14141A] transition placeholder-[#14141A]/30"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#14141A] text-white font-bold py-3.5 text-sm tracking-wide hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: MONO }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    SEARCHING…
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 flex-shrink-0" />
                    CHECK REGISTRATION
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="flex items-start gap-2 bg-[#FF3D57]/5 border-2 border-[#FF3D57] px-4 py-3 mt-4 text-sm text-[#14141A] font-semibold">
                <AlertCircle className="w-4 h-4 text-[#FF3D57] flex-shrink-0 mt-0.5" />
                <span className="min-w-0 break-words">{error}</span>
              </div>
            )}

            {results !== null && !error && (
              <div className="mt-6 space-y-3">
                {results.length === 0 ? (
                  <div className="flex items-start gap-2 bg-[#F5F5F2] border-2 border-[#14141A]/15 px-4 py-3 text-sm text-[#14141A]/60">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>No registration found for that ID or email. Double-check it against your confirmation email.</span>
                  </div>
                ) : (
                  results.map((r, i) => (
                    <motion.div
                      key={r.registrationId + i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="border-2 border-[#14141A] p-4 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="w-4 h-4 text-[#14141A] flex-shrink-0" />
                          <span className="text-sm font-extrabold text-[#14141A]" style={{ fontFamily: MONO }}>CONFIRMED</span>
                        </div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 flex-shrink-0 ${
                            r.type === 'Paid' ? 'bg-[#3D5AFF] text-white' : 'bg-[#C6FF3D] text-[#14141A]'
                          }`}
                          style={{ fontFamily: MONO }}
                        >
                          {r.type}
                        </span>
                      </div>
                      <p className="font-bold text-[#14141A] break-words">{r.workshop}</p>
                      <p className="text-sm text-[#14141A]/60 mt-0.5">{r.fullName}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-[#14141A]/50">
                        <span className="font-mono font-bold text-[#14141A]/70">{r.registrationId}</span>
                        {r.amountPaid && <span>Amount: {r.amountPaid}</span>}
                        {r.timestamp && <span>Registered: {new Date(r.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#14141A]/60 hover:text-[#14141A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Workshops
          </Link>
        </div>
      </div>
    </div>
  );
}
