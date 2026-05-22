// app/thanks/page.tsx — Thank You Page
//
// Hiển thị sau khi người dùng thanh toán thành công qua Sepay VietQR.
// Lấy thông tin đơn hàng từ database và hiển thị lời cảm ơn trang trọng.

import { getLeadByOrderId } from '@/lib/leads-store';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function ThanksPage({ searchParams }: Props) {
  const { orderId } = await searchParams;
  
  let lead = null;
  if (orderId) {
    lead = await getLeadByOrderId(orderId);
  }

  return (
    <main className="mx-auto min-h-screen max-w-md p-4 sm:p-6 flex flex-col justify-center bg-[#FDF8F0] font-sans">
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-cream-300 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="bg-sage text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Payment Successful
        </span>

        <h1 className="mt-4 text-3xl font-serif font-bold text-forest">
          Thank you!
        </h1>
        
        <p className="mt-2 text-sm text-muted">
          Your order has been automatically confirmed. We've also sent the details to your email!
        </p>

        {/* Order Details box */}
        {lead ? (
          <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-forest">{lead.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-semibold text-gray-900">{lead.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-semibold text-gray-900 break-all">{lead.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Product:</span>
              <span className="font-semibold text-gray-900">{lead.productName}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-500 font-semibold">Total paid (VND):</span>
              <span className="font-bold text-sage">{(lead.amount).toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        ) : (
          <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-[#E8F2FF] border border-[#0068FF]/20 text-center mb-6">
          <h3 className="font-bold text-[#0068FF] mb-2">Final Step: Join Our Zalo Group</h3>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            All materials, guides, and direct support will be provided via our exclusive members-only Zalo group. We've also emailed you the link!
          </p>
          
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-white rounded-xl border border-gray-200">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zalo.me/g/tfjys46kkhw79hbslpxm" 
                alt="Zalo Group QR Code" 
                width={160} 
                height={160}
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mb-4">Scan the QR code with Zalo app or click the button below</p>

          <a
            href="https://zalo.me/g/tfjys46kkhw79hbslpxm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#0068FF] hover:bg-[#0054cc] text-white font-bold py-3.5 px-4 rounded-xl transition-colors no-underline text-base"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.168 7.332c-1.396-4.528-6.906-5.836-10.748-4.708-5.32 1.564-7.514 7.646-4.832 12.392.516.91.56 1.946.12 2.894l-1.076 2.32a1.083 1.083 0 001.378 1.436l2.42-1.002c.896-.372 1.902-.378 2.802-.016 4.706 1.888 10.366-1.156 11.458-6.198.814-3.766-.522-6.666-1.522-7.118z" fill="currentColor"/>
            </svg>
            Join Zalo Group Now
          </a>
          
          <div className="mt-4 pt-4 border-t border-[#0068FF]/10">
            <Link 
              href="/"
              className="inline-block text-sm font-medium text-sage hover:text-forest transition-colors underline"
            >
              ← Trở về trang chủ (Return to Homepage)
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} The Peaceful Mind Method. All rights reserved.
      </div>
    </main>
  );
}
