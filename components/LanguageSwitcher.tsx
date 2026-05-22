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
    // Force default to Vietnamese if no preference is saved
    const savedLang = localStorage.getItem('preferred-language');
    let targetLang = 'vi'; // Default to vi
    
    if (savedLang === 'en') {
      targetLang = 'en';
    }

    setLang(targetLang);

    if (targetLang === 'vi' && !document.cookie.includes('googtrans=/en/vi')) {
      document.cookie = `googtrans=/en/vi; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/vi; path=/`;
    }

    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,vi', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
          'google_translate_element'
        );
      };
    }
    
    // Notify other components of initial language
    window.dispatchEvent(new CustomEvent('language-changed', { detail: targetLang }));
  }, []);

  const changeLanguage = (langCode: string) => {
    setLang(langCode);
    
    // Set Google Translate cookies
    if (langCode === 'vi') {
      document.cookie = `googtrans=/en/vi; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/vi; path=/`;
    } else {
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/en; path=/`;
    }

    // Try instant translation
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Fallback: reload to apply cookie
      window.location.reload();
    }
    
    // Save state and notify LeadForm
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
