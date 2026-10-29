'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, SUPPORTED_LANGUAGES } from './i18n';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  languages: SUPPORTED_LANGUAGES,
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  // Load user language preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mb_preferred_lang');
      if (saved && translations[saved]) {
        setLangState(saved);
      }
    } catch {
      // localStorage may be unavailable in incognito or SSR
    }
  }, []);

  function setLang(newLang) {
    if (translations[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('mb_preferred_lang', newLang);
      } catch {
        // Ignore storage errors
      }
    }
  }

  function t(key) {
    if (!key) return '';
    const dict = translations[lang] || translations.en;
    if (dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English
    return translations.en[key] !== undefined ? translations.en[key] : key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, languages: SUPPORTED_LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
