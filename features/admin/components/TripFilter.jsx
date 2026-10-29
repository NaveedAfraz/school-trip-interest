'use client';

import { Filter, X, Compass } from 'lucide-react';

export default function TripFilter({
  trips = [],
  selectedTripId = '',
  onChange,
  submissionCounts = {},
  studentCounts = {},
  totalCount = 0,
  totalStudentsOverall = 0,
}) {
  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter by Trip:</span>
        </div>

        <button
          type="button"
          onClick={() => onChange('')}
          className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer ${selectedTripId === ''
              ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20 ring-2 ring-[#0f766e]/30'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
            }`}
        >
          <span>All Itineraries</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-black ${selectedTripId === '' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
          >
            {totalCount} ({totalStudentsOverall} {totalStudentsOverall === 1 ? 'student' : 'students'})
          </span>
        </button>

        {trips.map((t) => {
          const count = submissionCounts[t.id] || 0;
          const students = studentCounts[t.id] || 0;
          const isSelected = selectedTripId === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer ${isSelected
                  ? 'bg-[#0f766e] text-white shadow-sm shadow-teal-950/20 ring-2 ring-[#0f766e]/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
                }`}
            >
              <span className="truncate max-w-[160px] sm:max-w-none">{t.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
              >
                {count} ({students} {students === 1 ? 'student' : 'students'})
              </span>
            </button>
          );
        })}

        {selectedTripId && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-xl transition-colors ml-auto sm:ml-1 cursor-pointer font-bold shadow-2xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {selectedTripId && selectedTrip && (
        <div className="p-3.5 rounded-2xl bg-white border border-[#ccfbf1] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-2 text-[#0f766e] font-extrabold">
            <Compass className="w-4 h-4 text-[#0f766e] flex-shrink-0" />
            <span>Active Trip Filter: {selectedTrip.name}</span>
            {selectedTrip.destination && (
              <span className="text-slate-500 font-medium">({selectedTrip.destination})</span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-600">
              Inquiries:{' '}
              <strong className="text-slate-900 font-black">
                {submissionCounts[selectedTripId] || 0}
              </strong>
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="text-[#0f766e]">
              Total Students for Trip:{' '}
              <strong className="text-[#0f766e] font-black text-sm">
                {(studentCounts[selectedTripId] || 0).toLocaleString()} {studentCounts[selectedTripId] === 1 ? 'student' : 'students'}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
