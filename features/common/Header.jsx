'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Compass,
  BookOpen,
  HelpCircle,
  Globe,
  Check,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

export default function Header({ currentUser = null }) {
  const [user, setUser] = useState(currentUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, languages, t } = useLanguage();

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Client-side session fetch and listener to ensure real-time auth detection
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }

    try {
      const supabase = createSupabaseBrowserClient();

      supabase.auth.getUser().then(({ data: { user: authUser }, error }) => {
        if (!error && authUser) {
          setUser((prev) => ({
            id: authUser.id,
            email: authUser.email || prev?.email || 'admin@mblearning.com',
            isAdmin: true,
            role: 'admin',
          }));
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@mblearning.com',
            isAdmin: true,
            role: 'admin',
          });
        } else if (!currentUser) {
          setUser(null);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    } catch (err) {
      console.warn('[Header] Supabase client init notice:', err);
    }
  }, [currentUser]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo: Always fully visible, never truncated on mobile */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#0f766e] rounded-xl py-1 px-1 flex-shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-900 via-teal-800 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-900/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-200" />
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight whitespace-nowrap group-hover:text-[#0f766e] transition-colors">
                    {t('brandName')}
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider text-[#0f766e] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                    {t('badgeGlobalTrips')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden lg:block whitespace-nowrap">
                  {t('brandTagline')}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation (>= md screens) */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              <a
                href="#trips"
                className="text-xs lg:text-sm font-semibold text-slate-600 hover:text-[#0f766e] px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {t('navSampleTrips')}
              </a>
              <a
                href="#why-us"
                className="text-xs lg:text-sm font-semibold text-slate-600 hover:text-[#0f766e] px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {t('navWhyUs')}
              </a>
              <a
                href="#how-it-works"
                className="text-xs lg:text-sm font-semibold text-slate-600 hover:text-[#0f766e] px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {t('navHowItWorks')}
              </a>

              <LanguageDropdown />

              <div className="h-4 w-px bg-slate-200 mx-1" />

              {user ? (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] px-3.5 py-2 rounded-xl transition-all shadow-xs group flex-shrink-0"
                  title={`Logged in as ${user.email}. Click to return to Admin Dashboard.`}
                >
                  <div className="w-5 h-5 rounded-full bg-white text-[#0f766e] font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                    {(user.email?.[0] || 'A').toUpperCase()}
                  </div>
                  <span className="text-white font-bold">{t('navAdminDashboard')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0f766e] bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition-all border border-slate-200/70 shadow-2xs flex-shrink-0"
                    title="Restricted Staff & Admin Dashboard"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0f766e]" />
                    <span>{t('navAdminPortal')}</span>
                  </Link>

                  <a
                    href="#register"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex-shrink-0"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span className="text-white font-bold">{t('navRegisterInterest')}</span>
                  </a>
                </>
              )}
            </nav>

            {/* Mobile Controls (< md screens): Language Dropdown + Hamburger Button */}
            <div className="flex md:hidden items-center gap-2 flex-shrink-0">
              <LanguageDropdown />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-700 hover:text-[#0f766e] hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/70 shadow-2xs"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5 text-slate-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar / Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
            
            {/* Drawer Header */}
            <div>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-900 to-emerald-700 flex items-center justify-center text-white">
                    <GraduationCap className="w-4 h-4 text-emerald-200" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">
                      {t('brandName')}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      School Trip Interest
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <a
                  href="#trips"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-700 hover:text-[#0f766e] hover:bg-teal-50/70 transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#0f766e]" />
                  <span>{t('navSampleTrips')}</span>
                </a>

                <a
                  href="#why-us"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-700 hover:text-[#0f766e] hover:bg-teal-50/70 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#0f766e]" />
                  <span>{t('navWhyUs')}</span>
                </a>

                <a
                  href="#how-it-works"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-700 hover:text-[#0f766e] hover:bg-teal-50/70 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#0f766e]" />
                  <span>{t('navHowItWorks')}</span>
                </a>
              </div>

              {/* Language Selection inside Drawer */}
              <div className="px-4 py-3 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Language / भाषा
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {languages.map((l) => {
                    const isCurrent = l.code === lang;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#0f766e] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span className="uppercase text-[11px] font-black">{l.code}</span>
                        <span className="text-xs font-semibold">{l.label}</span>
                        {isCurrent && <Check className="w-3 h-3 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50/60">
              <a
                href="#register"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t('navRegisterInterest')}</span>
              </a>

              {user ? (
                <Link
                  href="/admin"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-2xs transition-colors"
                >
                  <div className="w-4 h-4 rounded-full bg-[#0f766e] text-white text-[9px] font-extrabold flex items-center justify-center">
                    {(user.email?.[0] || 'A').toUpperCase()}
                  </div>
                  <span>{t('navAdminDashboard')}</span>
                </Link>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200 shadow-2xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0f766e]" />
                  <span>{t('navAdminPortal')}</span>
                </Link>
              )}

              <p className="text-[10px] text-slate-400 text-center pt-1 font-medium">
                MB Learning • Gachibowli, Hyderabad
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
