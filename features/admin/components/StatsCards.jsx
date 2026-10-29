'use client';

import { BarChart3, Users, Compass, Sparkles, School, TrendingUp } from 'lucide-react';

const CATEGORY_COLORS = {
  'STEM & Robotics': {
    border: 'border-cyan-200/90 hover:border-cyan-400',
    pill: 'bg-cyan-100 text-cyan-800 border border-cyan-200',
    accent: 'bg-cyan-500',
    tag: 'STEM & Tech',
  },
  'Heritage & Culture': {
    border: 'border-amber-200/90 hover:border-amber-400',
    pill: 'bg-amber-100 text-amber-800 border border-amber-200',
    accent: 'bg-amber-500',
    tag: 'Heritage & Arts',
  },
  'Higher Education': {
    border: 'border-purple-200/90 hover:border-purple-400',
    pill: 'bg-purple-100 text-purple-800 border border-purple-200',
    accent: 'bg-purple-600',
    tag: 'Higher Ed',
  },
  'Arts, Media & Design': {
    border: 'border-pink-200/90 hover:border-pink-400',
    pill: 'bg-pink-100 text-pink-800 border border-pink-200',
    accent: 'bg-pink-500',
    tag: 'Arts & Design',
  },
};

export default function StatsCards({ stats = {}, tripSummaries = [], trips = [] }) {
  const avgStudents =
    stats.total_submissions > 0
      ? Math.round(stats.total_students / stats.total_submissions)
      : 0;

  const totalTripsCount = trips.length || tripSummaries.length || 0;
  const tripsWithInterest = stats.trips_with_interest || 0;

  // Build dynamic destination summary from active database itineraries
  const dynamicDestinations = trips.length > 0
    ? trips.map((t) => t.destination.split(',')[0].trim()).filter(Boolean).slice(0, 4).join(' • ')
    : 'All Live Itineraries';

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Registrations
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {(stats.total_submissions || 0).toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Recorded school inquiries</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Student Travelers
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {(stats.total_students || 0).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400">capacity</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Aggregated student headcount</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average Batch
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <School className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {avgStudents.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">students / school</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">Mean school cohort volume</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Trips
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {tripsWithInterest}
            </span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              of {totalTripsCount} {totalTripsCount === 1 ? 'itinerary' : 'itineraries'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium truncate" title={dynamicDestinations}>
            {dynamicDestinations}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Per-Trip Interest & Student Distribution
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Live PostgreSQL Sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tripSummaries.map((t) => {
            const matchedTrip = trips.find((item) => item.id === t.trip_id);
            const category = matchedTrip?.category || 'General';
            const styling = CATEGORY_COLORS[category] || {
              border: 'border-slate-200/90 hover:border-blue-400',
              pill: 'bg-blue-50 text-blue-800 border border-blue-200',
              accent: 'bg-blue-600',
              tag: category,
            };

            const studentShare =
              stats.total_students > 0
                ? Math.round((t.total_students / stats.total_students) * 100)
                : 0;

            return (
              <div
                key={t.trip_id}
                className={`bg-white rounded-3xl border ${styling.border} p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${styling.pill}`}>
                      {styling.tag}
                    </span>
                    <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {t.submission_count} {t.submission_count === 1 ? 'school' : 'schools'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base leading-snug truncate" title={t.trip_name}>
                    {t.trip_name}
                  </h4>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        {t.total_students.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-medium ml-1.5">students</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                      {studentShare}% share
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${styling.accent} transition-all duration-700 rounded-full`}
                      style={{ width: `${studentShare}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
