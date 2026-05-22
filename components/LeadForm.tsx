'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'

const TIER_MAPPING: Record<string, { productName: string; amount: number; priceKey: 'basic' | 'standard' | 'premium' }> = {
  basic: {
    productName: 'The Peaceful Mind Method - Book Only',
    amount: 20000,
    priceKey: 'basic',
  },
  standard: {
    productName: 'The Peaceful Mind Method - Full Bundle',
    amount: 50000,
    priceKey: 'standard',
  },
  premium: {
    productName: 'The Peaceful Mind Method - Premium + Support',
    amount: 100000,
    priceKey: 'premium',
  },
}

export default function LeadForm({ tier: initialTier }: { tier: string }) {
  const [selectedTier, setSelectedTier] = useState<string>(initialTier || 'standard')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { t, lang } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.id.startsWith('pricing-cta-')) {
        const tier = target.id.replace('pricing-cta-', '');
        if (TIER_MAPPING[tier]) {
          setSelectedTier(tier);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const tierInfo = TIER_MAPPING[selectedTier] || TIER_MAPPING.standard

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          productName: tierInfo.productName,
          amount: tierInfo.amount,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setStatus('success')
        router.push(`/checkout/${data.orderId}`)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Get instant access form">
      <div>
        <label htmlFor="tier" className="block text-sm font-semibold text-forest mb-2">
          Select Your Package
        </label>
        <select
          id="tier"
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-sage/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-shadow text-forest notranslate"
        >
          {t.pricing.tiers.map((tData) => (
            <option key={tData.id} value={tData.id} className="notranslate">
              {tData.label} — {t.prices[TIER_MAPPING[tData.id].priceKey]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-name" className="block text-sm font-semibold text-forest mb-1">Full Name</label>
        <input
          id="lead-name"
          type="text"
          required
          placeholder="Enter your full name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="lead-email" className="block text-sm font-semibold text-forest mb-1">Email Address</label>
        <input
          id="lead-email"
          type="email"
          required
          placeholder="email@example.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-semibold text-forest mb-1">Phone Number (Zalo)</label>
        <input
          id="lead-phone"
          type="tel"
          required
          placeholder="e.g. 0912345678"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">Connection error. Please try again.</p>
      )}
      
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="btn-primary w-full mt-6 py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed notranslate"
      >
        {status === 'loading' ? (
          'Processing...'
        ) : status === 'success' ? (
          'Redirecting to checkout...'
        ) : (
          `${t.pricing.formTitle} — ${t.prices[tierInfo.priceKey]}`
        )}
      </button>
      
      <p className="text-center text-sm text-muted">
        🔒 Secure payment · Instant delivery · 90-Day Money Back Guarantee
      </p>
    </form>
  )
}
