'use client';

import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  Plane,
  Compass,
  ShieldCheck,
} from 'lucide-react';

function getAirportCode(destination) {
  if (!destination) return 'EXP';
  const d = destination.toLowerCase();
  if (d.includes('singapore')) return 'SIN';
  if (d.includes('jaipur')) return 'JAI';
  if (d.includes('london')) return 'LHR';
  if (d.includes('paris')) return 'CDG';
  if (d.includes('tokyo')) return 'HND';
  if (d.includes('dubai')) return 'DXB';
  return destination.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'EXP';
}

function getCategoryAccent(category) {
  if (!category) return { bg: 'bg-teal-600', text: 'text-white', bar: 'from-teal-600 to-emerald-600' };
  const c = category.toLowerCase();
  if (c.includes('stem') || c.includes('science')) return { bg: 'bg-blue-600', text: 'text-white', bar: 'from-blue-600 to-cyan-500' };
  if (c.includes('heritage') || c.includes('art') || c.includes('history')) return { bg: 'bg-amber-600', text: 'text-white', bar: 'from-amber-600 to-orange-500' };
  if (c.includes('higher') || c.includes('university')) return { bg: 'bg-violet-600', text: 'text-white', bar: 'from-violet-600 to-indigo-500' };
  return { bg: 'bg-teal-600', text: 'text-white', bar: 'from-teal-600 to-emerald-600' };
}

// Horizontal boarding-pass card — used in the mobile stack view
export default function TripCard({ trip, isSelected = false, onSelect }) {
  const highlights = trip.highlights || [
    'Curriculum-linked learning objectives',
    'Dedicated educational guides & safety officers',
    'All-inclusive travel, accommodation, and meals',
  ];

  const code = getAirportCode(trip.destination);
  const accent = getCategoryAccent(trip.category);

  return (
    <article
      onClick={() => onSelect(trip.id)}
      className={`group relative overflow-hidden cursor-pointer rounded-2xl transition-all duration-500 ${
        isSelected
          ? 'ring-2 ring-[#0f766e] shadow-2xl scale-[1.01]'
          : 'shadow-md hover:shadow-xl hover:scale-[1.005]'
      }`}
    >
      {/* Gradient accent strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />

      <div className="flex flex-col sm:flex-row bg-white">

        {/* LEFT: Photo panel */}
        <div className="relative sm:w-52 flex-shrink-0 h-52 sm:h-auto overflow-hidden bg-slate-900">
          <img
            src={
              trip.image_url ||
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
            }
            alt={trip.name}
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.88]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/30" />

          {/* Route badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20 tracking-wider shadow">
            <span className="text-amber-400">IND</span>
            <Plane className="w-2.5 h-2.5 text-white" />
            <span className="text-emerald-300">{code}</span>
          </div>

          {/* Duration badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
            <Clock className="w-2.5 h-2.5 text-[#0f766e]" />
            {trip.duration || 'Flexible'}
          </div>

          {/* Destination title on photo (mobile only) */}
          <div className="absolute bottom-3 left-3 right-3 sm:hidden">
            <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3" />{trip.destination}
            </p>
            <h3 className="text-base font-black text-white leading-tight mt-0.5">{trip.name}</h3>
          </div>

          {/* Selected badge */}
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-emerald-500/90 text-white text-xs font-black px-4 py-2 rounded-xl rotate-[-8deg] border-2 border-white/60 shadow-xl">
                ✓ SELECTED
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Content panel */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0">
          <div>
            {/* Category pill + batch */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${accent.bg} ${accent.text}`}>
                {trip.category || 'Study Expedition'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Batch 2026/27</span>
            </div>

            {/* Destination + title (desktop) */}
            <div className="hidden sm:block mb-3">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-500" />{trip.destination}
              </p>
              <h3 className="text-xl font-black text-slate-900 leading-tight mt-0.5">{trip.name}</h3>
            </div>

            {/* Specs row */}
            <div className="flex items-center gap-4 mb-4 py-3 border-y border-slate-100">
              <div className="flex items-center gap-1.5 min-w-0">
                <GraduationCap className="w-3.5 h-3.5 text-[#0f766e] flex-shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Cohort</p>
                  <p className="text-xs font-extrabold text-slate-800 truncate">{trip.target_grades || 'Gr 6–12'}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="flex items-center gap-1.5 min-w-0">
                <Users className="w-3.5 h-3.5 text-[#0f766e] flex-shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Group</p>
                  <p className="text-xs font-extrabold text-slate-800 truncate">{trip.group_size || '15–50 Students'}</p>
                </div>
              </div>
            </div>

            {/* Itinerary highlights */}
            <ul className="space-y-2 mb-4">
              {highlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                  <span className="mt-0.5 w-4 h-4 rounded flex items-center justify-center bg-emerald-50 border border-emerald-200 text-[9px] font-black text-[#0f766e] flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Inclusions strip */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold flex-wrap">
              <span>✈️ Flights</span>
              <span className="text-slate-300">·</span>
              <span>🏨 4★ Hotel</span>
              <span className="text-slate-300">·</span>
              <span>🛡️ Insurance</span>
              <span className="text-slate-300">·</span>
              <span>👨‍🏫 1:10 Ratio</span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelect(trip.id); }}
            className={`mt-5 w-full flex items-center justify-center gap-2 text-sm font-bold py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-emerald-700 text-white ring-2 ring-emerald-600/40'
                : 'bg-[#0f766e] hover:bg-[#115e59] text-white hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isSelected ? (
              <><CheckCircle2 className="w-4 h-4" /><span>Trip Selected</span></>
            ) : (
              <><span>Select This Trip</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
