'use client';
import { useLanguage } from '@/components/LanguageProvider';

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex bg-white/90 backdrop-blur-md border border-sage/20 p-1.5 rounded-full shadow-lg">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          lang === 'en' ? 'bg-[#003366] text-white shadow-md' : 'text-gray-500 hover:text-[#003366] bg-transparent'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('vi')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          lang === 'vi' ? 'bg-[#DA251D] text-white shadow-md' : 'text-gray-500 hover:text-[#DA251D] bg-transparent'
        }`}
      >
        VN
      </button>
    </div>
  );
}
