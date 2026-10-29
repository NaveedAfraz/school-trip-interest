'use client';

import { useState } from 'react';
import {
  Calendar,
  Mail,
  Phone,
  Users,
  Search,
  X,
  School,
  Compass,
  Download,
  Sparkles,
} from 'lucide-react';
import { formatDate, getInitials, getAvatarColor } from '@/lib/formatters';
import { exportSubmissionsToCSV } from '@/lib/csv';

export default function SubmissionsTable({
  submissions = [],
  isLoading = false,
  error = null,
  filterTripId = '',
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Live client-side search across teacher name, school, email, phone
  const filteredSubmissions = submissions.filter((s) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const teacher = (s.teacher_name || '').toLowerCase();
    const school = (s.school_name || '').toLowerCase();
    const email = (s.email || '').toLowerCase();
    const phone = (s.phone || '').toLowerCase();
    return teacher.includes(q) || school.includes(q) || email.includes(q) || phone.includes(q);
  });

  function handleExport() {
    exportSubmissionsToCSV(filteredSubmissions);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <div className="w-10 h-10 border-3 border-[#0f766e] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">Retrieving registrations from Supabase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-900 rounded-3xl p-8 text-center max-w-md mx-auto my-8">
        <p className="font-extrabold text-sm">Failed to load registration data</p>
        <p className="text-xs mt-1 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
        
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by teacher, school, email, or phone..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{filteredSubmissions.length}</strong> of{' '}
            {submissions.length}
          </span>

          <button
            type="button"
            onClick={handleExport}
            disabled={filteredSubmissions.length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white px-3.5 py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer flex-shrink-0"
            title="Download CSV report of current filtered submissions"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-20 bg-slate-50/60 rounded-3xl border border-dashed border-slate-200 p-8">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Users className="w-7 h-7 text-slate-400" />
          </div>
          <p className="font-extrabold text-slate-800 text-base">No registrations found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            {searchTerm
              ? `No registrations match "${searchTerm}". Check the spelling or reset the search.`
              : filterTripId
              ? 'There are currently no registrations for this specific trip category.'
              : 'As teachers submit the interest form on the public homepage, their registrations will appear here immediately.'}
          </p>
          {(searchTerm || filterTripId) && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-blue-200/60"
            >
              Clear Search Query
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-400 mb-2 px-1">
            <span>Scroll horizontally for full record</span>
            <span>👉 Swipe</span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs">
            <table className="min-w-[760px] w-full text-left divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    Teacher / Coordinator
                  </th>
                  <th scope="col" className="px-5 py-4">
                    School Name
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Contact Information
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Trip Programme
                  </th>
                  <th scope="col" className="px-5 py-4 text-center">
                    Students
                  </th>
                  <th scope="col" className="px-5 py-4 whitespace-nowrap">
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredSubmissions.map((s) => {
                  const tripName = Array.isArray(s.trips)
                    ? s.trips[0]?.name
                    : s.trips?.name || '—';

                  const tripDest = Array.isArray(s.trips)
                    ? s.trips[0]?.destination
                    : s.trips?.destination || '';

                  const avatarGradient = getAvatarColor(s.teacher_name);

                  return (
                    <tr key={s.id} className="hover:bg-teal-50/40 transition-colors">
                      
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${avatarGradient} text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-xs`}
                          >
                            {getInitials(s.teacher_name)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{s.teacher_name}</p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#0f766e] font-bold">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                              New Inquiry
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm">
                          <School className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{s.school_name}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${s.email}`}
                          className="inline-flex items-center gap-1.5 text-xs text-[#0f766e] hover:text-[#042f2e] hover:underline font-semibold"
                          title="Compose email to coordinator"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#0f766e]" />
                          <span>{s.email}</span>
                        </a>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <a href={`tel:${s.phone}`} className="hover:underline">
                            {s.phone}
                          </a>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          <Compass className="w-3 h-3 text-[#0f766e]" />
                          <span>{tripName}</span>
                        </span>
                        {tripDest && (
                          <p className="text-[11px] text-slate-400 mt-1 font-medium ml-1">
                            {tripDest}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center justify-center font-black text-slate-900 bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                          {s.number_of_students}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(s.created_at)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
