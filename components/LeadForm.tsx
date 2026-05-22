'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const TIER_MAPPING: Record<string, { productName: string; amount: number; priceLabel: string; label: string }> = {
  basic: {
    productName: 'The Peaceful Mind Method - Book Only',
    amount: 20000,
    priceLabel: '$0.74',
    label: 'Book Only — $0.74',
  },
  standard: {
    productName: 'The Peaceful Mind Method - Full Bundle',
    amount: 50000,
    priceLabel: '$1.85',
    label: 'Full Bundle — $1.85',
  },
  premium: {
    productName: 'The Peaceful Mind Method - Premium + Support',
    amount: 100000,
    priceLabel: '$3.70',
    label: 'Premium + Support — $3.70',
  },
}

export default function LeadForm({ tier: initialTier }: { tier: string }) {
  const [selectedTier, setSelectedTier] = useState<string>(initialTier || 'standard')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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
        <label htmlFor="lead-tier" className="block text-sm font-semibold text-forest mb-1">Select Tier</label>
        <select
          id="lead-tier"
          value={selectedTier}
          onChange={e => setSelectedTier(e.target.value)}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest focus:border-sage focus:outline-none transition-colors font-medium"
        >
          {Object.entries(TIER_MAPPING).map(([key, val]) => (
            <option key={key} value={key}>
              {val.label}
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
        className="btn-primary w-full text-xl py-5 disabled:opacity-60"
        id="lead-form-submit"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing your order...
          </span>
        ) : status === 'success' ? (
          'Redirecting to checkout...'
        ) : (
          `Get Access Now — ${tierInfo.priceLabel}`
        )}
      </button>
      
      <p className="text-center text-sm text-muted">
        🔒 Secure payment · Instant delivery · 90-Day Money Back Guarantee
      </p>
    </form>
  )
}
