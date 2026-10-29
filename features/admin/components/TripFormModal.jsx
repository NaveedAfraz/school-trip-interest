'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  X,
  Loader2,
  Sparkles,
  Compass,
  MapPin,
  Tag,
  Clock,
  Image,
  GraduationCap,
  Users,
  ListChecks,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { createTripAction, updateTripAction } from '@/features/trips/actions/tripActions';

const IMAGE_PRESETS = [
  {
    label: '🔬 STEM & Tech',
    url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '🏛️ Heritage & Culture',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '🎓 Higher Education',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '🎨 Arts & Design',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function TripFormModal({
  isOpen = false,
  onClose,
  tripToEdit = null,
  onSuccess,
  onError,
}) {
  const isEditing = Boolean(tripToEdit);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    category: 'STEM & Robotics',
    duration: '',
    description: '',
    image_url: '',
    target_grades: 'Grades 7 – 12',
    group_size: '15 – 45 Students',
    highlights: '',
    active: true,
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (tripToEdit) {
      let highlightsText = '';
      if (Array.isArray(tripToEdit.highlights)) {
        highlightsText = tripToEdit.highlights.join('\n');
      } else if (typeof tripToEdit.highlights === 'string') {
        highlightsText = tripToEdit.highlights;
      }

      setFormData({
        name: tripToEdit.name || '',
        destination: tripToEdit.destination || '',
        category: tripToEdit.category || 'STEM & Robotics',
        duration: tripToEdit.duration || '',
        description: (tripToEdit.description || '').replace(/<!--[\s\S]*?-->/g, '').trim(),
        image_url: tripToEdit.image_url || '',
        target_grades: tripToEdit.target_grades || 'Grades 7 – 12',
        group_size: tripToEdit.group_size || '15 – 45 Students',
        highlights:
          highlightsText ||
          'Curriculum-linked learning objectives\nDedicated educational guides & safety officers\nAll-inclusive travel, accommodation, and meals',
        active: tripToEdit.active !== false,
      });
    } else {
      setFormData({
        name: '',
        destination: '',
        category: 'STEM & Robotics',
        duration: '7 Days / 6 Nights',
        description: '',
        image_url: IMAGE_PRESETS[0].url,
        target_grades: 'Grades 7 – 12',
        group_size: '15 – 45 Students',
        highlights:
          'Hands-on applied science workshops\nBehind-the-scenes university laboratory tour\nGuided cultural reflection & student journal',
        active: true,
      });
    }
    setErrors({});
    setServerMessage(null);
  }, [tripToEdit, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function handleSetPresetImage(url) {
    setFormData((prev) => ({ ...prev, image_url: url }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setServerMessage(null);

    startTransition(async () => {
      try {
        let res;
        if (isEditing) {
          res = await updateTripAction(tripToEdit.id, formData);
        } else {
          res = await createTripAction(formData);
        }

        if (res.success) {
          if (onSuccess) onSuccess(res.message);
          onClose();
        } else {
          if (res.errors) setErrors(res.errors);
          const errMsg =
            res.message ||
            Object.values(res.errors || {})[0] ||
            'Failed to save trip. Please check the highlighted fields.';
          setServerMessage(errMsg);
          if (onError) onError(errMsg);
        }
      } catch (err) {
        const errMsg = err?.message || 'An unexpected network error occurred while saving.';
        setServerMessage(errMsg);
        if (onError) onError(errMsg);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 flex-shrink-0" />

        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isEditing ? 'Edit Trip Programme' : 'Create New Trip Programme'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved directly to Supabase and published on the homepage card grid.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7 space-y-4 overflow-y-auto flex-1">
          {serverMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{serverMessage}</div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Trip Programme Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Switzerland CERN & Particle Physics"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label htmlFor="destination" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Destination <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Geneva, Switzerland"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
              {errors.destination && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.destination}</p>
              )}
            </div>

            <div>
              <label htmlFor="duration" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 Days / 5 Nights"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
              {errors.duration && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.duration}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="target_grades" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Cohort / Grades
                </label>
                <span className="text-[10px] font-semibold text-blue-600">Editable</span>
              </div>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="target_grades"
                  name="target_grades"
                  type="text"
                  value={formData.target_grades}
                  onChange={handleChange}
                  placeholder="e.g. Grades 7 – 12"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Specifies eligible school grades (e.g. Grades 6 – 10)</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="group_size" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Batch / Group Size
                </label>
                <span className="text-[10px] font-semibold text-blue-600">Editable</span>
              </div>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="group_size"
                  name="group_size"
                  type="text"
                  value={formData.group_size}
                  onChange={handleChange}
                  placeholder="e.g. 15 – 45 Students"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Min and max traveler volume per school delegation</p>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Academic Theme / Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs cursor-pointer appearance-none"
              >
                <option value="STEM & Robotics">STEM & Robotics</option>
                <option value="Heritage & Culture">Heritage & Culture</option>
                <option value="Higher Education">Higher Education</option>
                <option value="Arts, Media & Design">Arts, Media & Design</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Leadership & MUN">Leadership & MUN</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="image_url" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cover Photo URL
              </label>
              <span className="text-[11px] text-slate-400">Paste URL or pick preset:</span>
            </div>
            <div className="relative">
              <Image className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="image_url"
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs font-mono text-[12px]"
              />
            </div>
            
            <div className="flex flex-wrap gap-1.5 mt-2">
              {IMAGE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSetPresetImage(preset.url)}
                  className="text-[11px] font-semibold text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Itinerary Overview <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a comprehensive academic overview, planned landmark visits, and learning outcomes..."
              className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="highlights" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Key Curriculum Highlights (1 bullet per line)
              </label>
              <span className="text-[11px] text-slate-400">Green checkmarks on card</span>
            </div>
            <textarea
              id="highlights"
              name="highlights"
              rows={3}
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Applied workshops with industry experts&#10;Behind-the-scenes guided tour&#10;All inclusive meals & private transport"
              className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              id="active"
              name="active"
              type="checkbox"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="active" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
              Publish on public homepage immediately
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] disabled:opacity-60 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal-950/20 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Create Itinerary'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
