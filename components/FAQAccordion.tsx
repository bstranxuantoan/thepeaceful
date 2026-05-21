'use client'
import { useState } from 'react'

const faqs = [
  {
    q: "I've never meditated before. Can I still do this?",
    a: "Absolutely. The Peaceful Mind Method was designed for complete beginners. The 3-Breath Anchor takes 3 minutes to learn and works from Day 1. No experience, no special skills needed.",
  },
  {
    q: "Do I need any special equipment or an app?",
    a: "None. All you need is a quiet spot to sit or lie down. The videos play on any device — phone, tablet, laptop, or TV. No subscription, no app to download, no passwords to remember.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "That's exactly what our 90-Day Peace Promise covers. Try it for 90 full days. If you don't sleep better or feel calmer, email us for a full refund — and you keep the book, all 21 videos, and every bonus. Zero risk.",
  },
  {
    q: "How is this different from Calm or Headspace?",
    a: "Those apps were designed for younger, tech-savvy users with dozens of features that can feel overwhelming. The Peaceful Mind Method is one simple method — built for how the 60+ mind and body actually works.",
  },
  {
    q: "How long is each session?",
    a: "Just 10 minutes. Each of the 21 video sessions is exactly 10 minutes — long enough to work, short enough to fit into any morning or evening routine.",
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3" id="faq-list">
      {faqs.map((item, i) => (
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
