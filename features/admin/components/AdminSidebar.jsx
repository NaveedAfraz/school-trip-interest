'use client';

import Link from 'next/link';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Globe,
  LogOut,
  ShieldCheck,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { logoutAction } from '@/features/admin/actions/authActions';

export default function AdminSidebar({
  adminEmail = '',
  trips = [],
  totalCount = 0,
  activeTab = 'analytics',
  onSelectTab,
  isOpen = false,
  onClose,
}) {
  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
        }`}
      >
        
        <div>
          <div className="h-18 px-6 flex items-center justify-between border-b border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f766e] flex items-center justify-center text-white shadow-md shadow-teal-950/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                  MB Learning
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#0f766e] bg-[#f0fdfa] border border-[#ccfbf1] px-1.5 py-0.2 rounded-md">
                    Admin Suite
                  </span>
                  <span className="text-[10px] text-slate-400">v1.0</span>
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Close navigation sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
            
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Main Views
              </p>
              <nav className="space-y-1.5">
                
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTab) onSelectTab('analytics');
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTab) onSelectTab('inquiries');
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Inquiries</span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeTab === 'inquiries'
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {totalCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTab) onSelectTab('trips');
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'trips'
                      ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderKanban className="w-4 h-4" />
                    <span>Trip Catalog</span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeTab === 'trips'
                        ? 'bg-white/25 text-white'
                        : 'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}
                  >
                    {trips.length}
                  </span>
                </button>
              </nav>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Live Sync</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-1 leading-snug">
                Row Level Security active. Real-time PostgreSQL sync.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between gap-2 mb-3 px-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0f766e] transition-colors"
              title="Go to public homepage in same tab"
            >
              <Globe className="w-3.5 h-3.5 text-[#0f766e]" />
              <span>Public Website</span>
            </Link>

            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0f766e] bg-[#f0fdfa] border border-[#ccfbf1] px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3" />
              Admin
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-800 to-emerald-700 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                {(adminEmail[0] || 'A').toUpperCase()}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                  {adminEmail || 'admin@mblearning.com'}
                </p>
                <p className="text-[10px] text-slate-400">Authenticated Staff</p>
              </div>
            </div>

            <form action={logoutAction} className="flex-shrink-0">
              <button
                type="submit"
                className="p-1.5 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                title="Sign out of Admin Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
