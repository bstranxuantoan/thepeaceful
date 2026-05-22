'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIER_MAPPING: Record<string, { productName: string; amount: number; priceLabel: string; label: string }> = {
  basic: {
    productName: 'The Peaceful Mind Method - Book Only',
    amount: 99000,
    priceLabel: '99.000đ',
    label: 'Gói Sách Đọc (Book Only) — 99.000đ',
  },
  standard: {
    productName: 'The Peaceful Mind Method - Full Bundle',
    amount: 149700,
    priceLabel: '149.700đ',
    label: 'Gói Đầy Đủ (Full Bundle) — 149.700đ',
  },
  premium: {
    productName: 'The Peaceful Mind Method - Premium + Support',
    amount: 370000,
    priceLabel: '370.000đ',
    label: 'Gói Cao Cấp (Premium + Support) — 370.000đ',
  },
}

export default function LeadForm({ tier: initialTier }: { tier: string }) {
  const [selectedTier, setSelectedTier] = useState<string>(initialTier || 'standard')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const router = useRouter()

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
        <label htmlFor="lead-tier" className="block text-sm font-semibold text-forest mb-1">Gói đăng ký</label>
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
        <label htmlFor="lead-name" className="block text-sm font-semibold text-forest mb-1">Họ và Tên</label>
        <input
          id="lead-name"
          type="text"
          required
          placeholder="Nhập họ tên của bạn"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="lead-email" className="block text-sm font-semibold text-forest mb-1">Địa chỉ Email</label>
        <input
          id="lead-email"
          type="email"
          required
          placeholder="email@cua-ban.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-semibold text-forest mb-1">Số điện thoại</label>
        <input
          id="lead-phone"
          type="tel"
          required
          placeholder="Ví dụ: 0912345678"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-forest placeholder:text-muted focus:border-sage focus:outline-none transition-colors"
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">Đã xảy ra lỗi kết nối. Vui lòng thử lại.</p>
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
            Đang xử lý đơn hàng...
          </span>
        ) : status === 'success' ? (
          'Đang chuyển sang thanh toán...'
        ) : (
          `Đăng ký ngay — ${tierInfo.priceLabel}`
        )}
      </button>
      
      <p className="text-center text-sm text-muted">
        🔒 Bảo mật thanh toán · Nhận tài liệu ngay · 90 ngày bảo hành hoàn tiền
      </p>
    </form>
  )
}
