'use client';

import { MapPin, Clock, ArrowRight, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TripCard({ trip, isSelected = false, onSelect }) {
  const { t } = useLanguage();
  const highlights = trip.highlights || [
    'Curriculum-linked learning objectives',
    'Dedicated educational guides & safety officers',
    'All-inclusive travel, accommodation, and meals',
  ];

  return (
    <article
      className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col ${
        isSelected
          ? 'border-[#0f766e] ring-2 ring-[#0f766e] ring-offset-2 shadow-xl -translate-y-1'
          : 'border-slate-200/80 hover:border-teal-400 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      
      <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
        <img
          src={trip.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'}
          alt={trip.name}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.92]"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-slate-900/30 to-transparent" />

        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {trip.category || 'Educational Travel'}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/20 backdrop-blur-md shadow-md">
            <Clock className="w-3 h-3 text-amber-300" />
            {trip.duration || 'Flexible'}
          </span>
        </div>

        <div className="absolute bottom-3.5 inset-x-4 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-200 drop-shadow-sm mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>{trip.destination}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white leading-snug drop-shadow-md">
            {trip.name}
          </h3>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {trip.description}
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Cohort</p>
              <p className="text-xs font-bold text-slate-800">{trip.target_grades || 'Grades 6 – 12'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Batch Size</p>
              <p className="text-xs font-bold text-slate-800">{trip.group_size || '15 – 50 Students'}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Curriculum Highlights
          </p>
          <ul className="space-y-2 mb-6">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onSelect(trip.id)}
            className={`w-full flex items-center justify-center gap-2 text-sm font-bold px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20'
                : 'bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white shadow-md shadow-teal-950/20 hover:shadow-lg'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{t('tripSelectedBtn')}</span>
              </>
            ) : (
              <>
                <span>{t('tripSelectBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
