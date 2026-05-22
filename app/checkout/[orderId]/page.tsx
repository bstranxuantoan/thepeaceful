// app/checkout/[orderId]/page.tsx — Pattern B (recommended)
//
// Server component fetch lead by orderId, embed VietQR, kèm client polling component.
// QR + bank info text + status polling — mobile-first responsive.

import { notFound } from 'next/navigation';
import { getLeadByOrderId } from '@/lib/leads-store';
import { CheckoutStatusPoll } from './CheckoutStatusPoll';
import { BankDetails } from './BankDetails';

export default async function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const lead = await getLeadByOrderId(orderId);
  
  if (!lead) notFound();

  const bank = process.env.SEPAY_BANK_NAME || 'MBBank';
  const accountNumber = process.env.SEPAY_BANK_ACCOUNT_NUMBER || '0888693368';
  const accountName = process.env.SEPAY_ACCOUNT_NAME || 'TRAN XUAN TOAN';
  
  const qrUrl = buildSepayQrUrl({
    accountNumber,
    bank,
    amount: lead.amount,
    content: lead.orderId,
  });

  const amountStr = lead.amount.toLocaleString('vi-VN') + 'đ';

  return (
    <main className="mx-auto min-h-screen max-w-md p-4 sm:p-6 flex flex-col justify-center bg-[#FDF8F0] font-sans">
      <div className="rounded-3xl bg-white p-6 shadow-xl border border-cream-300">
        <div className="text-center mb-5">
          <span className="bg-sage/10 text-sage text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Thanh Toán Đơn Hàng
          </span>
          <h1 className="mt-3 text-2xl font-serif font-bold text-forest">
            Quét mã VietQR
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Mở ứng dụng ngân hàng và quét mã dưới đây
          </p>
        </div>

        {/* QR Code Container */}
        <div className="mb-6 flex justify-center">
          <div className="relative p-3 rounded-2xl bg-white border-2 border-dashed border-sage/30 shadow-sm">
            <img
              src={qrUrl}
              alt="VietQR thanh toán"
              width={260}
              height={260}
              className="h-64 w-64 rounded-xl object-contain"
            />
          </div>
        </div>

        {/* Bank details fallback and copy actions */}
        <BankDetails
          bank={bank}
          accountNumber={accountNumber}
          accountName={accountName}
          amountStr={amountStr}
          amountRaw={lead.amount}
          orderId={lead.orderId}
        />

        <p className="mb-5 text-center text-xs text-muted leading-relaxed">
          ⚠️ <strong>Lưu ý:</strong> Vui lòng giữ đúng nội dung chuyển khoản <strong>{lead.orderId}</strong> để hệ thống tự động xác nhận đơn hàng sau 10 giây.
        </p>

        {/* Client polling status indicator */}
        <CheckoutStatusPoll orderId={lead.orderId} />

        {/* Order summary */}
        <div className="mt-6 border-t border-cream-300 pt-4 text-sm">
          <div className="text-xs text-muted uppercase font-semibold tracking-wider mb-1">Chi tiết đơn hàng</div>
          <div className="font-serif font-bold text-forest text-base">{lead.productName}</div>
          <div className="mt-1 text-xs text-muted">Mã đơn hàng: {lead.orderId}</div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <a href="/" className="text-sm font-medium text-sage hover:underline">
          ← Quay lại trang chủ
        </a>
      </div>
    </main>
  );
}

function buildSepayQrUrl(opts: {
  accountNumber: string; bank: string; amount: number; content: string;
}): string {
  const params = new URLSearchParams({
    acc: opts.accountNumber,
    bank: opts.bank,
    amount: String(opts.amount),
    des: opts.content,
    template: 'compact',
  });
  return `https://qr.sepay.vn/img?${params.toString()}`;
}
