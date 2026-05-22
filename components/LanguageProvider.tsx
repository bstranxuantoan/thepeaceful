'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { vi } from '@/locales/vi';

type Dictionary = typeof en;

interface LanguageContextType {
  lang: string;
  t: Dictionary;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'vi',
  t: vi,
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') || 'vi';
    setLang(savedLang);
  }, []);

  const handleSetLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('preferred-language', newLang);
  };

  const t = lang === 'en' ? en : vi;

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
