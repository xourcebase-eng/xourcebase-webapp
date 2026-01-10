// app/admin/registrations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Download, Users, IndianRupee, Search, Filter, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface Registration {
  id: number;
  paymentId: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  currentRole: string | null;
  experience: string | null;
  coupon: string;
  amountPaid: number;
  status: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [couponFilter, setCouponFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ADMIN_PASSWORD = 'xourcebase2026'; // CHANGE THIS!

  useEffect(() => {
    if (authenticated) {
      fetchRegistrations();
    }
  }, [authenticated, currentPage, search, couponFilter, fromDate, toDate]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        search: search.trim(),
        coupon: couponFilter,
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
      });

      const res = await fetch(`/api/admin/registrations?${params}`);
      const data = await res.json();

      if (data.success) {
        setRegistrations(data.registrations);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const exportCSV = () => {
    // Same as before — exports current filtered view
    const headers = ['Date', 'Name', 'Email', 'Phone', 'WhatsApp', 'Role', 'Experience', 'Coupon', 'Amount (₹)', 'Payment ID'];
    const rows = registrations.map(r => [
      format(new Date(r.createdAt), 'dd MMM yyyy'),
      r.fullName,
      r.email,
      r.phone,
      r.whatsapp || '-',
      r.currentRole || '-',
      r.experience || '-',
      r.coupon,
      r.amountPaid,
      r.paymentId
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const uniqueCoupons = Array.from(new Set(registrations.map(r => r.coupon)));
  const totalRevenue = registrations.reduce((sum, r) => sum + r.amountPaid, 0);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-emerald-600">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none"
              required
            />
            <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-xl hover:bg-emerald-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Workshop Registrations</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4">
              <Users className="w-12 h-12 text-emerald-600" />
              <div>
                <p className="text-gray-600">Total Shown</p>
                <p className="text-3xl font-bold">{registrations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4">
              <IndianRupee className="w-12 h-12 text-green-600" />
              <div>
                <p className="text-gray-600">Revenue Shown</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <button onClick={exportCSV} className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">
              <Download className="w-6 h-6" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search name/email/phone"
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <select
                value={couponFilter}
                onChange={(e) => { setCouponFilter(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none appearance-none bg-white"
              >
                <option value="all">All Coupons</option>
                {uniqueCoupons.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setCurrentPage(1); }}
              className="px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setCurrentPage(1); }}
              className="px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Pagination Info */}
        {pagination && (
          <p className="text-gray-600 mb-4">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} registrations
          </p>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-left">Coupon</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12">Loading...</td></tr>
                ) : registrations.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-500">No registrations found</td></tr>
                ) : (
                  registrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{format(new Date(reg.createdAt), 'dd MMM yyyy')}</td>
                      <td className="px-6 py-4 font-medium">{reg.fullName}</td>
                      <td className="px-6 py-4">{reg.email}</td>
                      <td className="px-6 py-4">{reg.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">{reg.coupon}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">₹{reg.amountPaid}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Server Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={!pagination.hasPrev || loading}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>

              <span className="text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={!pagination.hasNext || loading}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}