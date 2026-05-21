'use client'
import { useEffect, useState } from 'react'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-cream-300 shadow-card px-4 py-3"
      role="complementary"
      aria-label="Get access CTA"
    >
      <a
        href="#pricing"
        id="sticky-cta-button"
        className="btn-primary w-full text-base py-4 no-underline"
      >
        Get Instant Access — $14.97
      </a>
      <p className="text-center text-xs text-muted mt-1">90-Day Peace Promise · $241 Value</p>
    </div>
  )
}
