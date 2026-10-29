'use client';

import { useRef, useState, useTransition, useEffect } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Building,
  Mail,
  Phone,
  Compass,
  Users,
  Send,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { submitInterest } from '@/features/interest-form/actions/submitInterest';
import { validateInterestForm } from '@/lib/validations';
import { useLanguage } from '@/lib/LanguageContext';

const EMPTY_FORM = {
  teacher_name: '',
  school_name: '',
  email: '',
  phone: '',
  trip_id: '',
  number_of_students: '',
};

function getMaxCohortSize(groupSizeStr) {
  if (!groupSizeStr) return 50;
  const nums = groupSizeStr.match(/\d+/g);
  if (nums && nums.length > 0) {
    const ints = nums.map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
    return Math.max(...ints);
  }
  return 50;
}

export default function InterestForm({ trips = [], selectedTripId = '' }) {
  const [values, setValues] = useState({
    ...EMPTY_FORM,
    trip_id: selectedTripId,
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (selectedTripId) {
      setValues((prev) => ({ ...prev, trip_id: selectedTripId }));
    }
  }, [selectedTripId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setResult(null);

    const validation = validateInterestForm(values);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    startTransition(async () => {
      const res = await submitInterest(values);
      setResult(res);
      if (res.success) {
        setValues(EMPTY_FORM);
        setErrors({});
      } else if (res.errors) {
        setErrors(res.errors);
      }
    });
  }

  function handleReset() {
    setResult(null);
    setValues(EMPTY_FORM);
    setErrors({});
  }

  const selectedTripObj = trips.find((t) => t.id === values.trip_id);
  const studentCount = parseInt(values.number_of_students, 10);
  const maxCohortSize = selectedTripObj ? getMaxCohortSize(selectedTripObj.group_size) : 50;
  const isLargeDelegation = !isNaN(studentCount) && studentCount > maxCohortSize;

  const inputClass = (field) =>
    `w-full rounded-xl border pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent transition-all shadow-2xs ${
      errors[field]
        ? 'border-red-400 bg-red-50/40 focus:ring-red-500'
        : 'border-slate-200 hover:border-slate-300'
    }`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-10 relative overflow-hidden">
      
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-900 via-[#0f766e] to-amber-500" />

      {result && result.success ? (
        <div className="py-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 animate-bounce">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="max-w-md mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Inquiry Confirmed</span>
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {t('formSuccessTitle')}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {result.message}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2">
            <p className="font-bold text-slate-900">{t('formSuccessNextTitle')}</p>
            <p>{t('formSuccessNext1')}</p>
            <p>{t('formSuccessNext2')}</p>
            <p>{t('formSuccessNext3')}</p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('formAnotherBtn')}</span>
          </button>
        </div>
      ) : (
        <>
          
          <div className="mb-7">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f766e] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('formNoObligation')}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">{t('formStep')}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {t('formHeader')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('formSub')}
            </p>
          </div>

          {selectedTripObj && (
            <div className="mb-7 p-4 rounded-2xl bg-gradient-to-r from-teal-50/80 to-emerald-50/50 border border-teal-200/80 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-teal-900/20">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#0f766e] font-bold uppercase tracking-wider">
                    Selected Itinerary
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedTripObj.name}{' '}
                    <span className="text-xs font-medium text-slate-500">
                      ({selectedTripObj.destination})
                    </span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0f766e] bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs flex-shrink-0">
                {selectedTripObj.duration || 'Flexible'}
              </span>
            </div>
          )}

          {result && !result.success && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 text-red-900 border border-red-200 mb-7 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Please correct the highlighted fields</p>
                <p className="mt-0.5 opacity-90">{result.message}</p>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              <div>
                <label
                  htmlFor="teacher_name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelTeacher')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    id="teacher_name"
                    name="teacher_name"
                    type="text"
                    required
                    value={values.teacher_name}
                    onChange={handleChange}
                    placeholder={t('formPlaceholderTeacher')}
                    className={inputClass('teacher_name')}
                  />
                </div>
                {errors.teacher_name && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.teacher_name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="school_name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelSchool')}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    id="school_name"
                    name="school_name"
                    type="text"
                    required
                    value={values.school_name}
                    onChange={handleChange}
                    placeholder={t('formPlaceholderSchool')}
                    className={inputClass('school_name')}
                  />
                </div>
                {errors.school_name && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.school_name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelEmail')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder={t('formPlaceholderEmail')}
                    className={inputClass('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelPhone')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={handleChange}
                    placeholder={t('formPlaceholderPhone')}
                    className={inputClass('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="trip_id"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelTrip')}
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-4 pointer-events-none" />
                  <select
                    id="trip_id"
                    name="trip_id"
                    required
                    value={values.trip_id}
                    onChange={handleChange}
                    className={inputClass('trip_id')}
                  >
                    <option value="">— {t('formPlaceholderTrip')} —</option>
                    {trips.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.destination})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.trip_id && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.trip_id}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="number_of_students"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  {t('formLabelStudents')}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    id="number_of_students"
                    name="number_of_students"
                    type="number"
                    required
                    min={1}
                    max={500}
                    value={values.number_of_students}
                    onChange={handleChange}
                    placeholder={t('formPlaceholderStudents')}
                    className={inputClass('number_of_students')}
                  />
                </div>
                {errors.number_of_students && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.number_of_students}
                  </p>
                )}

                {isLargeDelegation && !errors.number_of_students && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200 shadow-2xs">
                    <span className="text-sm flex-shrink-0 leading-none mt-0.5">💡</span>
                    <p className="leading-relaxed">
                      <strong className="font-extrabold text-amber-950">Note:</strong> Standard single-cohort size for this trip is{' '}
                      <span className="font-bold underline decoration-amber-400">
                        {selectedTripObj?.group_size || '15–50 students'}
                      </span>
                      . For larger delegations ({studentCount} students), our operations team will prepare a multi-cohort staggered itinerary proposal.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Strict privacy. Direct advisory team response within 3–5 working days.</span>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] disabled:opacity-60 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-teal-950/25 cursor-pointer flex-shrink-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span className="text-white font-bold">{t('formSubmitting')}</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold">{t('formSubmitBtn')}</span>
                    <Send className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
