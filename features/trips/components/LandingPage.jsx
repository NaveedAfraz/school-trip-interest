'use client';

import { useState, useRef } from 'react';
import Header from '@/features/common/Header';
import Footer from '@/features/common/Footer';
import TripCard from '@/features/trips/components/TripCard';
import InterestForm from '@/features/interest-form/components/InterestForm';
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

  function handleTripSelect(tripId) {
    setSelectedTripId(tripId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas-bg font-sans text-slate-900">
      <Header currentUser={currentUser} />

      <main id="main-content" className="flex-1">
        
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
              Inspire Your Students<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200">
                Beyond the Classroom
              </span>
            </h1>

            <p className="text-emerald-50 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-normal drop-shadow-sm">
              Curated educational travel programmes for schools. Explore sample itineraries to{' '}
              <strong className="text-white font-bold">Singapore</strong>,{' '}
              <strong className="text-white font-bold">Jaipur</strong>, and{' '}
              <strong className="text-white font-bold">London</strong>. Register your school's
              interest and receive a custom itinerary & proposal tailored to your syllabus.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#trips"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#042f2e] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-teal-950/60 hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              >
                <span>Explore Sample Trips</span>
                <ChevronDown className="w-4 h-4" />
              </a>
              <a
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer text-sm sm:text-base hover:-translate-y-0.5"
              >
                <span>Register School Interest</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15 text-left">
              {[
                { title: '3 Global Themes', sub: 'STEM, Heritage, Higher Ed' },
                { title: '2,400+ Students', sub: 'Inspired across partner schools' },
                { title: '1:10 Teacher Ratio', sub: 'Safety & adult supervision first' },
                { title: '48-Hour Response', sub: 'Customized school quotation' },
              ].map((stat, idx) => (
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

        <section id="trips" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1.5 rounded-full border border-brand-subtle">
              Sample Programmes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Curated Educational Expeditions
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              These illustrative programmes combine academic depth with experiential real-world learning.
              Click any trip to pre-fill your school registration below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                isSelected={selectedTripId === trip.id}
                onSelect={handleTripSelect}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500">
              💡 Need a custom destination such as Switzerland CERN, NASA Kennedy Space Center, or Japan Robotics?{' '}
              <a href="#register" className="text-brand-primary font-bold hover:underline">
                Let us know in your interest registration.
              </a>
            </p>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1.5 rounded-full border border-brand-subtle">
                Simple 4-Step Journey
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
                How We Partner With Your School
              </h2>
              <p className="text-slate-600 mt-2 text-sm">
                From initial syllabus alignment to safe student return, we handle 100% of the logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Register Interest',
                  desc: 'Pick your preferred sample itinerary and provide student estimates via our simple form.',
                },
                {
                  step: '02',
                  title: 'Tailored Proposal',
                  desc: 'Within 48 hours, receive an all-inclusive itinerary, verified safety plan, and transparent quote.',
                },
                {
                  step: '03',
                  title: 'Parent & Board Pack',
                  desc: 'We supply parent presentation decks, consent forms, and visa guidance for school leadership.',
                },
                {
                  step: '04',
                  title: 'Guided Expedition',
                  desc: 'A dedicated MB Learning trip director accompanies the group 24/7 so teachers focus on mentoring.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs relative flex flex-col justify-between"
                >
                  <span className="text-4xl font-black text-brand-primary/20">{item.step}</span>
                  <div className="mt-4">
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1.5 rounded-full border border-brand-subtle">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Why Leading Educators Choose Us
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We understand school compliance, student safeguarding, and pedagogical objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                color: 'bg-emerald-100 text-emerald-800',
                title: 'Curriculum-Aligned Learning',
                desc: 'Every visit is paired with guided reflection worksheets and student discussions linked directly to IB, Cambridge, CBSE, or ICSE syllabi.',
              },
              {
                icon: ShieldCheck,
                color: 'bg-amber-100 text-amber-800',
                title: 'Comprehensive Safety First',
                desc: 'Audited 3-star and 4-star hotels, verified coach operators, round-the-clock emergency medical assistance, and full travel insurance.',
              },
              {
                icon: HeartHandshake,
                color: 'bg-teal-100 text-teal-800',
                title: 'Teacher-Friendly Execution',
                desc: 'Zero paperwork burden. We handle flight bookings, group visas, meal dietary restrictions, and parent queries from start to finish.',
              },
            ].map(({ icon: Icon, color, title, desc }, idx) => (
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

        <section
          id="register"
          ref={formRef}
          className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-t border-slate-200/80 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1.5 rounded-full border border-brand-subtle">
                    Coordinator Registration
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                    Let's Plan Your School's Next Learning Adventure
                  </h2>
                  <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                    Fill out the form with your school details. Submitting this form does not confirm a booking
                    nor incur any cost. It allows our educational travel planners to assemble an accurate proposal for your batch.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    What You Receive with Your Proposal:
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Day-by-day itemized academic schedule',
                      'Transparent group pricing & payment milestones',
                      'Comprehensive risk assessment & insurance policy pack',
                      'Parent presentation slides customized with your school crest',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#071e19] to-[#0c2b24] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#1a4239] space-y-4">
                  <p className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                    Founders' Office & School Advisory
                  </p>
                  <p className="text-base font-extrabold text-white">Have questions before registering?</p>
                  <div className="space-y-2.5 text-xs text-emerald-100">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Gachibowli, Hyderabad, Telangana, India</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>trips@mblearning.com</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>+91 40 4821 7000 (Mon–Fri, 9am–6pm IST)</span>
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

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1.5 rounded-full border border-brand-subtle">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Frequently Asked School Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the required teacher-to-student ratio?',
                a: 'We adhere to international school safety standards with a strict 1:10 teacher/chaperone to student ratio. We also provide 1 fully-funded teacher spot for every 10 registered students.',
              },
              {
                q: 'Are these dates and itineraries fixed?',
                a: 'No. All three itineraries (Singapore STEM, Jaipur Heritage, London Universities) are illustrative templates. Departure dates, duration, hotel tiers, and workshop topics can be customized around your academic calendar and term breaks.',
              },
              {
                q: 'What happens after I submit this interest form?',
                a: 'An MB Learning academic tour consultant will review your school requirements and reach out within 3–5 working days to present an itemized proposal, costing estimate, and safety kit.',
              },
              {
                q: 'How are visas and international travel documents handled?',
                a: 'For Singapore and London trips, we provide official student invitation letters, complete visa application checklists, and coordinate biometric group appointments with embassies.',
              },
            ].map(({ q, a }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
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
