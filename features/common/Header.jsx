'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header({ currentUser = null }) {
  const [user, setUser] = useState(currentUser);
  const { lang, setLang, languages, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-xl py-1 px-1 flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-900 via-teal-800 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-900/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-brand-primary transition-colors">
                  {t('brandName')}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-light px-2 py-0.5 rounded-full border border-brand-subtle">
                  {t('badgeGlobalTrips')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t('brandTagline')}
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-3">
            
            <a
              href="#trips"
              className="hidden md:inline-block text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-primary px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {t('navSampleTrips')}
            </a>
            <a
              href="#why-us"
              className="hidden md:inline-block text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-primary px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {t('navWhyUs')}
            </a>
            <a
              href="#how-it-works"
              className="hidden lg:inline-block text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-primary px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {t('navHowItWorks')}
            </a>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-700 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all border border-slate-200/70 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f766e]/30"
                aria-label="Change Language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#0f766e] flex-shrink-0" />
                <span className="text-sm leading-none">{currentLangObj?.flag}</span>
                <span className="hidden sm:inline font-bold text-slate-800">{currentLangObj?.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isLangOpen ? 'rotate-180 text-[#0f766e]' : ''
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Language / भाषा
                  </div>
                  {languages.map((l) => {
                    const isCurrent = l.code === lang;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer text-left ${
                          isCurrent
                            ? 'bg-teal-50/80 text-[#0f766e] font-extrabold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{l.flag}</span>
                          <span>{l.label}</span>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-[#0f766e]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-slate-200 mx-0.5 hidden md:block" />

            {user ? (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-teal-950/20 group flex-shrink-0"
                title={`Logged in as ${user.email}. Click to return to Admin Dashboard.`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-white text-[#0f766e] font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                    {(user.email?.[0] || 'A').toUpperCase()}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-white" />
                </div>
                <span className="text-white font-bold">{t('navAdminDashboard')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
              </Link>
            ) : (
              <>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-slate-700 hover:text-[#0f766e] bg-slate-100/90 hover:bg-slate-200/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all border border-slate-200/60 shadow-2xs flex-shrink-0"
                  title="Restricted Staff & Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0f766e]" />
                  <span className="hidden sm:inline">{t('navAdminPortal')}</span>
                  <span className="sm:hidden">{t('navAdmin')}</span>
                </Link>

                <a
                  href="#register"
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-teal-950/20 cursor-pointer flex-shrink-0"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                  <span className="hidden sm:inline text-white font-bold">{t('navRegisterInterest')}</span>
                  <span className="sm:hidden text-white font-bold">{t('navRegister')}</span>
                </a>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
