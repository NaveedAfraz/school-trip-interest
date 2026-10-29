'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Clock,
  Plane,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle2,
  Compass,
  ChevronLeft,
  ChevronRight,
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

function getCategoryStyle(category) {
  if (!category) return { pill: 'bg-teal-600 text-white', bar: 'from-teal-700 to-emerald-600', accent: 'text-teal-400' };
  const c = category.toLowerCase();
  if (c.includes('stem') || c.includes('science'))
    return { pill: 'bg-blue-600 text-white', bar: 'from-blue-900 to-cyan-800', accent: 'text-cyan-300' };
  if (c.includes('heritage') || c.includes('art') || c.includes('history'))
    return { pill: 'bg-amber-600 text-white', bar: 'from-amber-900 to-orange-800', accent: 'text-amber-300' };
  if (c.includes('higher') || c.includes('university'))
    return { pill: 'bg-violet-600 text-white', bar: 'from-violet-900 to-indigo-800', accent: 'text-violet-300' };
  return { pill: 'bg-teal-600 text-white', bar: 'from-teal-900 to-emerald-800', accent: 'text-teal-300' };
}

const INCLUSIONS = ['✈️ Flights', '🏨 4★ Hotel', '🛡️ Insurance', '👨‍🏫 1:10 Ratio'];

export default function ExpeditionShowcase({ trips = [], selectedTripId, onSelect }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const autoTimer = useRef(null);

  const trip = trips[activeIdx] || trips[0];
  if (!trip) return null;

  const highlights = trip.highlights || [
    'Curriculum-linked learning objectives',
    'Dedicated educational guides & safety officers',
    'All-inclusive travel, accommodation, and meals',
  ];

  const code = getAirportCode(trip.destination);
  const style = getCategoryStyle(trip.category);
  const isSelected = selectedTripId === trip.id;

  function switchTo(idx, dir = 'next') {
    if (idx === activeIdx || animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimating(false);
    }, 340);
  }

  function handlePrev() {
    const idx = (activeIdx - 1 + trips.length) % trips.length;
    switchTo(idx, 'prev');
  }

  function handleNext() {
    const idx = (activeIdx + 1) % trips.length;
    switchTo(idx, 'next');
  }

  // Auto-advance every 6 s (paused when a trip is selected)
  useEffect(() => {
    if (isSelected) return;
    autoTimer.current = setInterval(() => {
      setDirection('next');
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % trips.length);
        setAnimating(false);
      }, 340);
    }, 6000);
    return () => clearInterval(autoTimer.current);
  }, [activeIdx, isSelected, trips.length]);

  const slideStyle = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === 'next' ? '24px' : '-24px'})`
      : 'translateX(0)',
    transition: 'opacity 340ms ease, transform 340ms ease',
  };

  return (
    <div className="w-full">

      {/* ── Destination Tab Bar ── */}
      <div className="flex items-center gap-0 overflow-x-auto scrollbar-none mb-6 bg-slate-900/5 rounded-2xl p-1.5 border border-slate-200/60">
        {trips.map((t, idx) => {
          const c = getAirportCode(t.destination);
          const s = getCategoryStyle(t.category);
          const active = idx === activeIdx;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => switchTo(idx, idx > activeIdx ? 'next' : 'prev')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer ${
                active
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200/80 scale-[1.02]'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
              }`}
            >
              {/* Airport code badge */}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${active ? s.pill : 'bg-slate-200 text-slate-600'}`}>
                {c}
              </span>
              <span className="whitespace-nowrap hidden sm:block">{t.name}</span>
              <span className="whitespace-nowrap sm:hidden">{c}</span>
            </button>
          );
        })}

        {/* Arrow nav buttons */}
        <div className="ml-auto flex items-center gap-1 flex-shrink-0 pl-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-md transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-md transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Main Dossier Panel ── */}
      <div
        className={`relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl ${isSelected ? 'ring-2 ring-[#0f766e] ring-offset-2' : ''}`}
        style={slideStyle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[520px]">

          {/* LEFT: Full-bleed photo column */}
          <div className="relative lg:col-span-2 h-72 lg:h-auto overflow-hidden bg-slate-950">
            <img
              src={
                trip.image_url ||
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
              }
              alt={trip.name}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover"
              style={{ transition: 'opacity 400ms ease', opacity: animating ? 0 : 1 }}
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 lg:bg-gradient-to-r lg:from-black/10 lg:to-black/60" />

            {/* Flight route ribbon */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md text-white text-[11px] font-black px-3.5 py-1.5 rounded-full border border-white/20 tracking-wider shadow-lg">
                <span className="text-amber-400">IND</span>
                <Plane className="w-3 h-3" />
                <span className="text-emerald-300">{code}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-slate-100">
                <Clock className="w-3 h-3 text-[#0f766e]" />
                {trip.duration || 'Flexible'}
              </div>
            </div>

            {/* Destination title overlaid on photo */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${style.pill}`}>
                  {trip.category || 'Expedition'}
                </span>
              </div>
              <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${style.accent}`}>
                <MapPin className="w-3 h-3" />{trip.destination}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
                {trip.name}
              </h2>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-5 right-5 flex items-center gap-1.5 z-10">
              {trips.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => switchTo(i, i > activeIdx ? 'next' : 'prev')}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Dossier content column */}
          <div className="lg:col-span-3 bg-white flex flex-col">

            {/* Top accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${style.bar}`} />

            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-6">

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {trip.description}
              </p>

              {/* Specs strip */}
              <div className="flex items-stretch gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4.5 h-4.5 text-[#0f766e]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Cohort</p>
                    <p className="text-sm font-extrabold text-slate-900">{trip.target_grades || 'Grades 6–12'}</p>
                  </div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4.5 h-4.5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Batch Size</p>
                    <p className="text-sm font-extrabold text-slate-900">{trip.group_size || '15–50 Students'}</p>
                  </div>
                </div>
              </div>

              {/* Itinerary waypoints */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#0f766e]" />
                    Journey Highlights
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                    {highlights.length} stops
                  </span>
                </div>

                {/* Timeline-style list */}
                <div className="relative pl-6 space-y-3">
                  {/* Vertical line */}
                  <div className="absolute left-2.5 top-1 bottom-1 w-px bg-gradient-to-b from-[#0f766e] via-emerald-200 to-transparent" />
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      {/* Node */}
                      <div className="absolute left-0 w-5 h-5 rounded-full border-2 border-[#0f766e] bg-white flex items-center justify-center text-[9px] font-black text-[#0f766e] flex-shrink-0 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-700 leading-snug font-medium group-hover/item:text-slate-900 transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: inclusions + CTA */}
              <div className="mt-auto space-y-4">
                {/* Inclusions pill row */}
                <div className="flex flex-wrap items-center gap-2">
                  {INCLUSIONS.map((inc) => (
                    <span
                      key={inc}
                      className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1"
                    >
                      {inc}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelect(trip.id)}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold py-4 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-emerald-700 text-white ring-2 ring-emerald-500/40 shadow-emerald-800/20'
                        : 'bg-[#0f766e] hover:bg-[#115e59] text-white hover:shadow-lg hover:-translate-y-0.5 shadow-teal-950/20'
                    }`}
                  >
                    {isSelected ? (
                      <><CheckCircle2 className="w-5 h-5" /><span>Trip Selected — Scroll to Form</span></>
                    ) : (
                      <><span>Select & Register Interest</span><ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  {/* Indicator counter */}
                  <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                    {activeIdx + 1} / {trips.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thumbnail Strip (quick-jump) ── */}
      {trips.length > 1 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trips.map((t, idx) => {
            const thumbStyle = getCategoryStyle(t.category);
            const active = idx === activeIdx;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => switchTo(idx, idx > activeIdx ? 'next' : 'prev')}
                className={`group relative rounded-xl overflow-hidden h-20 sm:h-24 cursor-pointer transition-all duration-300 border-2 ${
                  active ? 'border-[#0f766e] scale-[1.02] shadow-lg' : 'border-transparent opacity-60 hover:opacity-90 hover:scale-[1.01]'
                }`}
              >
                <img
                  src={t.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=70'}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 inset-x-0 p-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${thumbStyle.pill}`}>
                    {getAirportCode(t.destination)}
                  </span>
                  <p className="text-[10px] font-bold text-white leading-tight mt-0.5 line-clamp-1">{t.name}</p>
                </div>
                {active && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#0f766e] border-2 border-white shadow" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

