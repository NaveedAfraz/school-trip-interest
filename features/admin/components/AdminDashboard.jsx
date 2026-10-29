'use client';

import { useState } from 'react';
import Link from 'next/link';
import { logoutAction } from '@/features/admin/actions/authActions';
import AdminSidebar from './AdminSidebar';
import StatsCards from './StatsCards';
import SubmissionsTable from './SubmissionsTable';
import TripFilter from './TripFilter';
import TripManagement from './TripManagement';
import {
  GraduationCap,
  LogOut,
  Globe,
  ShieldCheck,
  Sparkles,
  Menu,
  RotateCcw,
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

function computeStats(submissions) {
  const total_students = submissions.reduce(
    (sum, item) => sum + (item.number_of_students || 0),
    0
  );
  const tripIds = new Set(submissions.map((item) => item.trip_id));
  return {
    total_submissions: submissions.length,
    total_students,
    trips_with_interest: tripIds.size,
  };
}

function computeTripSummaries(trips, submissions) {
  return trips.map((t) => {
    const tripSubs = submissions.filter((s) => s.trip_id === t.id);
    return {
      trip_id: t.id,
      slug: t.slug,
      trip_name: t.name,
      submission_count: tripSubs.length,
      total_students: tripSubs.reduce(
        (sum, item) => sum + (item.number_of_students || 0),
        0
      ),
    };
  });
}

export default function AdminDashboard({
  adminEmail = '',
  trips = [],
  allSubmissions = [],
}) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'inquiries' | 'trips'
  const [filterTripId, setFilterTripId] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter submissions by selected trip (used for inquiries table view)
  const filtered = filterTripId
    ? allSubmissions.filter((s) => s.trip_id === filterTripId)
    : allSubmissions;

  // Global aggregate stats across all database submissions
  const stats = computeStats(allSubmissions);
  const tripSummaries = computeTripSummaries(trips, allSubmissions);

  // Map counts per trip for filter pills & stats
  const submissionCounts = {};
  allSubmissions.forEach((s) => {
    submissionCounts[s.trip_id] = (submissionCounts[s.trip_id] || 0) + 1;
  });

  const selectedTripObj = trips.find((t) => t.id === filterTripId);

  return (
    <div className="min-h-screen bg-slate-100/70 flex font-sans text-slate-900">
      
      <AdminSidebar
        adminEmail={adminEmail}
        trips={trips}
        totalCount={allSubmissions.length}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
        
        <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs backdrop-blur-md">
          <div className="px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-400">Admin</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-extrabold">
                  {activeTab === 'analytics'
                    ? 'Analytics'
                    : activeTab === 'inquiries'
                    ? selectedTripObj
                      ? `Inquiries · ${selectedTripObj.name}`
                      : 'Registered Inquiries'
                    : 'Trip Catalog'}
                </span>
                {activeTab === 'inquiries' && filterTripId && (
                  <button
                    type="button"
                    onClick={() => setFilterTripId('')}
                    className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md ml-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>View All</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Live Sync</span>
              </div>

              <Link
                href="/"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                title="Go to public homepage in same tab"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>View Public Site</span>
              </Link>

              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  {(adminEmail[0] || 'A').toUpperCase()}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">
                    {adminEmail || 'admin@mblearning.com'}
                  </p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    Super Admin
                  </p>
                </div>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-700 hover:bg-red-50/80 px-3 py-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-200"
                  title="Sign out of Admin Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">

          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Live Admissions Analytics</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Admissions & Destination Demand
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Real-time student traveler metrics, registration volume, and itinerary popularity aggregated from Supabase.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0f766e] bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-[#ccfbf1] px-4 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>View All Registered Inquiries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <StatsCards stats={stats} tripSummaries={tripSummaries} trips={trips} />
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fade-in">
              
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f766e] bg-[#f0fdfa] px-2.5 py-0.5 rounded-full border border-[#ccfbf1] mb-2">
                  <Users className="w-3 h-3" />
                  <span>School Submissions Table</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Registered Inquiries
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  School and coordinator interest submissions saved to Supabase with full RLS protection. Filter by itinerary or export to CSV.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      All Submissions
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Real-time submissions with direct database persistence.
                    </p>
                  </div>

                  <TripFilter
                    trips={trips}
                    selectedTripId={filterTripId}
                    onChange={setFilterTripId}
                    submissionCounts={submissionCounts}
                    totalCount={allSubmissions.length}
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <SubmissionsTable
                    submissions={filtered}
                    filterTripId={filterTripId}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="animate-fade-in">
              <TripManagement
                trips={trips}
                submissionCounts={submissionCounts}
                tripSummaries={tripSummaries}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
