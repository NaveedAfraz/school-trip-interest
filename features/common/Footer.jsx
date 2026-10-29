'use client';

import { GraduationCap, MapPin, Mail, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#071e19] text-slate-300 border-t border-[#1a4239]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-xl mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-900 via-teal-800 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-950/40">
                <GraduationCap className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-white">{t('brandName')}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-5">
              {t('footerDesc')}
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{t('advisoryAddress')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>trips@mblearning.com</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">{t('footerSampleTrips')}</p>
            <ul className="text-xs space-y-2.5">
              <li>
                <a href="#trips" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Singapore STEM Explorer
                </a>
              </li>
              <li>
                <a href="#trips" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Jaipur Heritage & Arts
                </a>
              </li>
              <li>
                <a href="#trips" className="text-slate-300 hover:text-amber-300 transition-colors">
                  London Universities Tour
                </a>
              </li>
              <li>
                <a href="#register" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Custom School Request
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">{t('footerResources')}</p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li>✓ {t('footerSafety')}</li>
              <li>✓ {t('footerCurriculum')}</li>
              <li>✓ 1:10 Teacher Ratio</li>
              <li>✓ 24/7 Medical Coordination</li>
              <li>✓ {t('footerPrivacy')}</li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">{t('advisoryBadge')}</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated tour managers and ground support for participating educational institutions and school coordinators.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a4239] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p className="leading-relaxed">
            © {year} {t('footerRights')}
          </p>
          <p className="leading-relaxed text-center sm:text-right">
            Built for MB Learning Practical Assessment with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block align-middle mx-0.5" /> by Naveed Afraz
          </p>
        </div>
      </div>
    </footer>
  );
}
