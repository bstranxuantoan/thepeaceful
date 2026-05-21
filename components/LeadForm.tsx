'use client'
import { useState } from 'react'

export default function LeadForm({ tier }: { tier: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-forest mb-2">You&apos;re In!</h3>
        <p className="text-muted">Check your email for instant access to The Peaceful Mind Method.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Get instant access form">
      <div>
        <label htmlFor="lead-name" className="block text-sm font-semibold text-forest mb-1">Full Name</label>
        <input
          id="lead-name"
          type="text"
          required
          placeholder="Your first name"
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
          placeholder="your@email.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-semibold text-forest mb-1">Phone (optional)</label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="(555) 000-0000"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full text-xl py-5 disabled:opacity-60"
        id="lead-form-submit"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing...
          </span>
        ) : 'Get Instant Access — $14.97'}
      </button>
      <p className="text-center text-sm text-muted">
        🔒 Secure checkout · Instant digital delivery · 90-Day Peace Promise
      </p>
    </form>
  )
}
