'use client'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  const { t } = useLanguage()

  return (
    <div className="space-y-3" id="faq-list">
      {t.faq.items.map((item, i) => (
        <div key={i} className="card !p-0 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-cream transition-colors"
            aria-expanded={open === i}
            id={`faq-btn-${i}`}
          >
            <span className="font-serif font-medium text-forest text-lg">{item.q}</span>
            <svg
              className={`w-5 h-5 text-sage flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-muted leading-relaxed border-t border-cream-300">
              <p className="pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
