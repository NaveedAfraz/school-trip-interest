'use client';

import { useState, useTransition, useRef } from 'react';
import {
  Plus,
  Compass,
  MapPin,
  Clock,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Users,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';
import TripFormModal from './TripFormModal';
import { toggleTripStatusAction, deleteTripAction } from '@/features/trips/actions/tripActions';

export default function TripManagement({
  trips = [],
  submissionCounts = {},
  tripSummaries = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [toast, setToast] = useState(null); // { id, message, type: 'success' | 'error' }
  const [isPending, startTransition] = useTransition();
  const toastTimeoutRef = useRef(null);

  const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';

  const DEFAULT_HIGHLIGHTS = [
    'Curriculum-linked learning objectives',
    'Dedicated educational guides & safety officers',
    'All-inclusive travel, accommodation, and meals',
  ];

  function showToast(message, type = 'success') {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ id: Date.now(), message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  }

  function handleCreate() {
    setEditingTrip(null);
    setIsModalOpen(true);
  }

  function handleEdit(trip) {
    setEditingTrip(trip);
    setIsModalOpen(true);
  }

  function handleToggleStatus(trip) {
    startTransition(async () => {
      try {
        const res = await toggleTripStatusAction(trip.id, trip.active);
        if (res.success) {
          showToast(res.message, 'success');
        } else {
          showToast(res.message || 'Failed to toggle trip status.', 'error');
        }
      } catch (err) {
        showToast(err?.message || 'Network error occurred while updating status.', 'error');
      }
    });
  }

  function handleDelete(trip) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${trip.name}"? If there are existing teacher registrations, it will be deactivated to preserve inquiry history.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const res = await deleteTripAction(trip.id);
        if (res.success) {
          showToast(res.message, 'success');
        } else {
          showToast(res.message || 'Failed to delete trip listing.', 'error');
        }
      } catch (err) {
        showToast(err?.message || 'Network error occurred while deleting trip.', 'error');
      }
    });
  }

  return (
    <div className="space-y-6 relative">
      
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Itinerary Catalog</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Manage Homepage Trip Listings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, or toggle visibility of educational itineraries displayed on the public landing page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-teal-950/25 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Itinerary</span>
        </button>
      </div>

      {toast && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-6 right-6 z-[9999] max-w-sm sm:max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <div
            className={`p-4 rounded-2xl border shadow-xl flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-red-50/95 border-red-200 text-red-900 shadow-red-500/10'
                : 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/10'
            }`}
          >
            {toast.type === 'error' ? (
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5">
                {toast.type === 'error' ? 'Error Encountered' : 'Success'}
              </p>
              <p className="text-xs font-medium leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-extrabold text-slate-800 text-base">No Trip Listings Found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click the "Add New Itinerary" button above to publish your first educational trip on the homepage.
          </p>
          <button
            type="button"
            onClick={handleCreate}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Trip</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const summary = tripSummaries.find((s) => s.trip_id === trip.id) || {
              submission_count: submissionCounts[trip.id] || 0,
              total_students: 0,
            };

            const highlightsList =
              Array.isArray(trip.highlights) && trip.highlights.length > 0
                ? trip.highlights
                : DEFAULT_HIGHLIGHTS;

            return (
              <div
                key={trip.id}
                className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-lg ${
                  trip.active
                    ? 'border-slate-200/90 hover:border-blue-300'
                    : 'border-slate-200/60 bg-slate-50/50 opacity-80'
                }`}
              >
                
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={trip.image_url || DEFAULT_IMAGE}
                    alt={trip.name}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {trip.category || 'General'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(trip)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm transition-all cursor-pointer ${
                        trip.active
                          ? 'bg-emerald-500/90 text-white border-emerald-400 hover:bg-emerald-600'
                          : 'bg-slate-900/80 text-slate-300 border-white/20 hover:bg-slate-900'
                      }`}
                      title={trip.active ? 'Click to switch to Draft' : 'Click to Publish on Homepage'}
                    >
                      {trip.active ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-400" />
                          <span>Draft / Hidden</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200 drop-shadow-sm mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                        <span>{trip.destination}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                        <span>{trip.duration || 'Flexible'}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-snug drop-shadow-md truncate">
                      {trip.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
                      {trip.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3.5">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            Cohort
                          </p>
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {trip.target_grades || 'Grades 7 – 12'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            Batch Size
                          </p>
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {trip.group_size || '15 – 45 Students'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Curriculum Highlights
                      </p>
                      <ul className="space-y-1.5">
                        {highlightsList.slice(0, 3).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-700 leading-tight"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-auto">
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                      <span className="flex items-center gap-1 font-medium">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>
                          <strong className="text-slate-900 font-extrabold">
                            {summary.submission_count}
                          </strong>{' '}
                          inquiries
                        </span>
                      </span>
                      <span>
                        <strong className="text-slate-900 font-extrabold">
                          {summary.total_students}
                        </strong>{' '}
                        students
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(trip)}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/70 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(trip)}
                        disabled={isPending}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200/70 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TripFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tripToEdit={editingTrip}
        onSuccess={(msg) => showToast(msg, 'success')}
        onError={(err) => showToast(err, 'error')}
      />
    </div>
  );
}
