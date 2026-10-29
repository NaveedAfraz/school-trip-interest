'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageDropdown({ variant = 'default', className = '' }) {
  const { lang, setLang, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === lang) || languages[0];

  const buttonStyle =
    variant === 'dark'
      ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
      : 'bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-700 border-slate-200/80';

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all border shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f766e]/30 flex-shrink-0 ${buttonStyle}`}
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#0f766e] flex-shrink-0" />
        <span className="font-black text-xs uppercase text-slate-800">{current?.code}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0f766e]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select Language
          </div>
          {languages.map((l) => {
            const isCurrent = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isCurrent
                    ? 'bg-teal-50/80 text-[#0f766e] font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {l.code}
                  </span>
                  <span>{l.label}</span>
                </div>
                {isCurrent && <Check className="w-3.5 h-3.5 text-[#0f766e]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
