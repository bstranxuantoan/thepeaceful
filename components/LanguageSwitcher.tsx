'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Inject Google Translate script only once
    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,vi', autoDisplay: false },
          'google_translate_element'
        );
      };
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setLang(langCode);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    // Save state and notify other components
    localStorage.setItem('preferred-language', langCode);
    window.dispatchEvent(new CustomEvent('language-changed', { detail: langCode }));
  };

  return (
    <>
      {/* Hidden google translate element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Custom Flag UI */}
      <div className="fixed top-4 right-4 z-50 flex bg-white/90 backdrop-blur-md border border-sage/20 p-1.5 rounded-full shadow-lg">
        <button
          onClick={() => changeLanguage('en')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            lang === 'en' ? 'bg-[#003366] text-white shadow-md' : 'text-gray-500 hover:text-[#003366] bg-transparent'
          }`}
        >
          <span className="text-sm">🇺🇸</span> EN
        </button>
        <button
          onClick={() => changeLanguage('vi')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            lang === 'vi' ? 'bg-[#DA251D] text-white shadow-md' : 'text-gray-500 hover:text-[#DA251D] bg-transparent'
          }`}
        >
          <span className="text-sm">🇻🇳</span> VI
        </button>
      </div>

      {/* CSS to completely hide Google's default top banner and tooltip */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { top: 0px !important; position: static !important; }
        .goog-te-banner-frame { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background: none !important; box-shadow: none !important; }
      ` }} />
    </>
  );
}
