'use client';
import { useEffect, useState } from 'react';

export default function ClientDynamicPrice({ enPrice, viPrice, textEn, textVi, className }: { enPrice: string, viPrice: string, textEn: string, textVi: string, className?: string }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    setLang(currentLang);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLang(customEvent.detail);
    };

    window.addEventListener('language-changed', handleLangChange);
    return () => window.removeEventListener('language-changed', handleLangChange);
  }, []);

  return (
    <span className={className}>
      {lang === 'vi' ? textVi + ' — ' + viPrice : textEn + ' — ' + enPrice}
    </span>
  );
}
