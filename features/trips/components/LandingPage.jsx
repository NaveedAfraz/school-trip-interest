'use client';

import { useState, useRef } from 'react';
import Header from '@/features/common/Header';
import Footer from '@/features/common/Footer';
import TripCard from '@/features/trips/components/TripCard';
import ExpeditionShowcase from '@/features/trips/components/ExpeditionShowcase';
import InterestForm from '@/features/interest-form/components/InterestForm';
import { useLanguage } from '@/lib/LanguageContext';
import {
  ChevronDown,
  Globe2,
  BookOpen,
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Mail,
  MapPin,
} from 'lucide-react';

export default function LandingPage({ trips = [], currentUser = null }) {
  const [selectedTripId, setSelectedTripId] = useState('');
  const formRef = useRef(null);
  const { t } = useLanguage();

  function handleTripSelect(tripId) {
    setSelectedTripId(tripId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const heroStats = [
    { title: t('stat1Title'), sub: t('stat1Sub') },
    { title: t('stat2Title'), sub: t('stat2Sub') },
    { title: t('stat3Title'), sub: t('stat3Sub') },
    { title: t('stat4Title'), sub: t('stat4Sub') },
  ];

  const processSteps = [
    { step: '01', title: t('step1Title'), desc: t('step1Desc') },
    { step: '02', title: t('step2Title'), desc: t('step2Desc') },
    { step: '03', title: t('step3Title'), desc: t('step3Desc') },
    { step: '04', title: t('step4Title'), desc: t('step4Desc') },
  ];

  const whyChooseUsFeatures = [
    {
      icon: BookOpen,
      color: 'bg-emerald-100 text-emerald-800',
      title: t('feature1Title'),
      desc: t('feature1Desc'),
    },
    {
      icon: ShieldCheck,
      color: 'bg-amber-100 text-amber-800',
      title: t('feature2Title'),
      desc: t('feature2Desc'),
    },
    {
      icon: HeartHandshake,
      color: 'bg-teal-100 text-teal-800',
      title: t('feature3Title'),
      desc: t('feature3Desc'),
    },
  ];

  const proposalPoints = [
    t('receive1'),
    t('receive2'),
    t('receive3'),
    t('receive4'),
  ];

  const faqItems = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-bg font-sans text-slate-900">
      <Header currentUser={currentUser} />

      <main id="main-content" className="flex-1">

        {/* 1. Hero Section with Background Video */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">

          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none"
            poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#071e19] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-md">
              {t('heroTitle1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200">
                {t('heroTitle2')}
              </span>
            </h1>

            <p className="text-emerald-50 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-normal drop-shadow-sm">
              {t('heroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#trips"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-teal-950/60 hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              >
                <span>{t('heroBtnExplore')}</span>
                <ChevronDown className="w-4 h-4" />
              </a>
              <a
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer text-sm sm:text-base hover:-translate-y-0.5"
              >
                <span>{t('heroBtnRegister')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15 text-left">
              {heroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#041713]/60 border border-white/15 rounded-2xl p-4 sm:p-5 backdrop-blur-xs hover:bg-[#041713]/80 transition-colors"
                >
                  <p className="text-amber-400 font-extrabold text-lg sm:text-xl tracking-tight">
                    {stat.title}
                  </p>
                  <p className="text-slate-200 text-xs mt-1 font-medium">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Expedition Showcase – desktop immersive dossier + mobile stack */}
        <section id="trips" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0f766e] font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Sample Programmes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                Curated Educational Expeditions
              </h2>
              <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
                Immersive itineraries that merge curriculum depth with real-world exploration. Select a destination below to pre-fill your school registration.
              </p>
            </div>

            {/* Desktop / tablet: immersive dossier showcase */}
            <div className="hidden md:block">
              <ExpeditionShowcase
                trips={trips}
                selectedTripId={selectedTripId}
                onSelect={handleTripSelect}
              />
            </div>

            {/* Mobile: horizontal boarding-pass card stack */}
            <div className="md:hidden space-y-4">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isSelected={selectedTripId === trip.id}
                  onSelect={handleTripSelect}
                />
              ))}
            </div>

            {/* Custom destination footnote */}
            <div className="mt-10 text-center">
              <p className="text-xs text-slate-500">
                💡 Need a custom destination — Switzerland CERN, NASA Kennedy Space Center, or Japan Robotics?{' '}
                <a href="#register" className="text-[#0f766e] font-bold hover:underline">
                  Let us know in your interest registration.
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 3. How We Partner With Your School */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#0f766e] font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                {t('howBadge')}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
                {t('howTitle')}
              </h2>
              <p className="text-slate-600 mt-2 text-sm">
                {t('howDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {processSteps.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs relative flex flex-col justify-between"
                >
                  <span className="text-4xl font-black text-[#0f766e]/20">{item.step}</span>
                  <div className="mt-4">
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why Leading Educators Choose Us */}
        <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0f766e] font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              {t('whyBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t('whyTitle')}
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              {t('whyDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsFeatures.map(({ icon: Icon, color, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl mb-3">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. School Registration Form Section */}
        <section
          id="register"
          ref={formRef}
          className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-t border-slate-200/80 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-[#0f766e] font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    {t('regBadge')}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                    {t('regTitle')}
                  </h2>
                  <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                    {t('regDesc')}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    {t('receiveTitle')}
                  </h3>
                  <div className="space-y-3">
                    {proposalPoints.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#071e19] to-[#0c2b24] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#1a4239] space-y-4">
                  <p className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                    {t('advisoryBadge')}
                  </p>
                  <p className="text-base font-extrabold text-white">{t('advisoryTitle')}</p>
                  <div className="space-y-2.5 text-xs text-emerald-100">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{t('advisoryAddress')}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>trips@mblearning.com</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{t('advisoryHours')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InterestForm
                  trips={trips}
                  selectedTripId={selectedTripId}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0f766e] font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              {t('faqBadge')}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t('faqTitle')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map(({ q, a }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#0f766e] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{q}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
