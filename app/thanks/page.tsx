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
          Thanh Toán Thành Công
        </span>

        <h1 className="mt-4 text-3xl font-serif font-bold text-forest">
          Cảm ơn bạn!
        </h1>
        
        <p className="mt-2 text-sm text-muted">
          Đơn hàng của bạn đã được hệ thống tự động xác nhận thành công.
        </p>

        {/* Order Details box */}
        {lead ? (
          <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-forest">{lead.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Khách hàng:</span>
              <span className="font-semibold text-gray-900">{lead.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email nhận bài:</span>
              <span className="font-semibold text-gray-900 break-all">{lead.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gói sản phẩm:</span>
              <span className="font-semibold text-gray-900">{lead.productName}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-500 font-semibold">Tổng thanh toán:</span>
              <span className="font-bold text-sage">{(lead.amount).toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        ) : (
          <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm">
            <p className="text-gray-500">Đang tải thông tin đơn hàng...</p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-800 leading-relaxed mb-6">
          📧 <strong>Kiểm tra hộp thư:</strong> Hướng dẫn tham gia khoá học đã được gửi tự động tới địa chỉ email của bạn. Vui lòng kiểm tra cả thư mục Spam/Quảng cáo nếu chưa nhận được.
        </div>

        <Link
          href="/"
          className="btn-primary w-full no-underline block py-3.5 text-center text-base"
        >
          Quay lại Trang Chủ
        </Link>
      </div>

      <div className="mt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} The Peaceful Mind Method. All rights reserved.
      </div>
    </main>
  );
}
