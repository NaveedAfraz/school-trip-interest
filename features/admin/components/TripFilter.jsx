'use client';

import { Filter, X } from 'lucide-react';

export default function TripFilter({
  trips = [],
  selectedTripId = '',
  onChange,
  submissionCounts = {},
  totalCount = 0,
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span>Filter:</span>
      </div>

      <button
        type="button"
        onClick={() => onChange('')}
        className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
          selectedTripId === ''
            ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
        }`}
      >
        <span>All Trips</span>
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
            selectedTripId === '' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
          }`}
        >
          {totalCount}
        </span>
      </button>

      {trips.map((t) => {
        const count = submissionCounts[t.id] || 0;
        const isSelected = selectedTripId === t.id;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <span className="truncate max-w-[150px] sm:max-w-none">{t.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}

      {selectedTripId && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 transition-colors ml-1 cursor-pointer font-bold"
        >
          <X className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
