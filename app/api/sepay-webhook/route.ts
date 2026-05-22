// app/api/sepay-webhook/route.ts — Next.js App Router
//
// POST /api/sepay-webhook — receives Sepay payment notification
// Headers: Authorization: Apikey {SEPAY_WEBHOOK_API_KEY}
// Body: SepayWebhookPayload (xem lib/sepay.ts)
//
// Quy tắc bất di bất dịch:
//   1. Verify auth qua timingSafeEqual — chống timing attack
//   2. Multi-strategy order matching — content parse → phone fallback → amount+timestamp window
//   3. Reject underpayment, ACCEPT overpayment (khách trả thừa OK)
//   4. ALWAYS return 200 (kể cả internal error) — Sepay retry 7 lần Fibonacci nếu non-200
//   5. Dedup theo payload.id (number)
//   6. Side effects non-blocking — wrap mỗi cái try/catch riêng

import { NextResponse } from 'next/server';
import {
  getLeadByOrderId,
  getLeadByPhone,
  findPendingLeadByAmountAndTime,
  markLeadPaid,
  isTransactionProcessed,
  markTransactionProcessed,
  type Lead,
  type PaymentRecord,
} from '@/lib/leads-store';
import {
  parseOrderIdFromContent,
  parsePhoneFromContent,
  verifySepayAuth,
  type SepayWebhookPayload,
} from '@/lib/sepay';

export async function POST(req: Request) {
  // Wrap-all try/catch — Sepay retry nếu non-200, luôn trả 200
  try {
    // 1. AUTH — timing-safe
    const auth = req.headers.get('authorization');
    if (!verifySepayAuth(auth, process.env.SEPAY_WEBHOOK_API_KEY!)) {
      console.warn('[sepay-webhook] Invalid auth');
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const payload = (await req.json()) as SepayWebhookPayload;
    const eventId = String(payload.id);

    // 2. EARLY DEDUP — return 200 ngay nếu đã xử lý
    if (await isTransactionProcessed(eventId)) {
      console.log(`[sepay-webhook] Duplicate ignored: ${eventId}`);
      return NextResponse.json({ success: true, status: 'already_processed' });
    }

    // 3. RECORD dedup marker FIRST — idempotent ngay cả khi processing fail
    await markTransactionProcessed(eventId);

    // 4. Filter outgoing transfers (chuyển TIỀN RA, không phải khách thanh toán)
    if (payload.transferType !== 'in') {
      return NextResponse.json({ success: true, status: 'outgoing_skipped' });
    }

    // 5. MULTI-STRATEGY MATCHING
    const matchResult = await findOrderForTransaction(payload);
    if (!matchResult.lead) {
      console.warn(`[sepay-webhook] No lead matched. content="${payload.content}" amount=${payload.transferAmount} method=${matchResult.method}`);
      // Vẫn trả 200 — Sepay không retry. Admin có thể xử lý manual qua log.
      return NextResponse.json({ success: true, status: 'no_match' });
    }

    const { lead, method } = matchResult;

    // Guard: method 'none' đã được xử lý ở trên (no_match), không thể đến đây
    if (method === 'none') {
      return NextResponse.json({ success: true, status: 'no_match' });
    }

    // 6. AMOUNT VALIDATION — reject underpayment, accept overpayment
    if (payload.transferAmount < lead.amount) {
      console.error(`[sepay-webhook] Underpayment: order=${lead.orderId} expected=${lead.amount} got=${payload.transferAmount}`);
      // Trả 200 — không retry. Admin xử lý qua log alert.
      return NextResponse.json({ success: true, status: 'underpayment' });
    }
    if (payload.transferAmount > lead.amount) {
      console.log(`[sepay-webhook] Overpayment accepted: order=${lead.orderId} expected=${lead.amount} got=${payload.transferAmount}`);
    }

    // 7. MARK PAID
    const payment: PaymentRecord = {
      sepayId: payload.id,
      referenceCode: payload.referenceCode,
      gateway: payload.gateway,
      amount: payload.transferAmount,
      transactionDate: payload.transactionDate,
      matchMethod: method,
    };
    const updatedLead = await markLeadPaid(lead.orderId, payment);

    // 8. SIDE EFFECTS — non-blocking, wrap mỗi cái try/catch riêng
    // Placeholder cho biz-email-setup + biz-telegram-payment-notify wire vào.
    await runSideEffects(updatedLead!, payload);

    return NextResponse.json({ success: true, orderId: lead.orderId, matchMethod: method });
  } catch (err) {
    console.error('[sepay-webhook] Unhandled error:', err);
    // ALWAYS return 200 để Sepay không retry → tránh duplicate alert
    return NextResponse.json({ success: false, error: String(err) }, { status: 200 });
  }
}

// =============================================================================
// Multi-strategy order matching (3 strategies)
// =============================================================================

type MatchResult = {
  lead: Lead | null;
  method: 'content-orderid' | 'content-phone' | 'amount-timestamp-window' | 'none';
};

async function findOrderForTransaction(payload: SepayWebhookPayload): Promise<MatchResult> {
  // Strategy 1: Parse order ID từ content (preferred — exact match)
  const orderId = parseOrderIdFromContent(payload.content);
  if (orderId) {
    const lead = await getLeadByOrderId(orderId);
    if (lead) return { lead, method: 'content-orderid' };
  }

  // Strategy 2: Parse phone từ content (fallback nếu khách chỉ dán SĐT)
  const phone = parsePhoneFromContent(payload.content);
  if (phone) {
    const lead = await getLeadByPhone(phone);
    if (lead) return { lead, method: 'content-phone' };
  }

  // Strategy 3: Amount + timestamp window (last resort, ±30 min)
  // Chỉ accept nếu CHỈ CÓ 1 pending order match exact amount trong window
  // → tránh ambiguity khi 2 khách cùng giá CK gần nhau.
  const transactionTime = new Date(payload.transactionDate.replace(' ', 'T') + '+07:00');
  const windowStart = new Date(transactionTime.getTime() - 30 * 60 * 1000);
  const windowEnd = new Date(transactionTime.getTime() + 30 * 60 * 1000);

  const candidates = await findPendingLeadByAmountAndTime(payload.transferAmount, windowStart, windowEnd);
  if (candidates.length === 1) {
    return { lead: candidates[0], method: 'amount-timestamp-window' };
  }
  if (candidates.length > 1) {
    console.warn(`[sepay-webhook] Multiple amount-window matches (${candidates.length}) — skip ambiguous match`);
  }

  return { lead: null, method: 'none' };
}

// =============================================================================
// Side effects fan-out — placeholder cho biz-email-setup + biz-telegram-payment-notify
// =============================================================================

async function runSideEffects(lead: Lead, payload: SepayWebhookPayload): Promise<void> {
  // Mỗi side effect wrap try/catch riêng để 1 fail không block khác.
  // KHÔNG dùng Promise.all (1 reject block tất cả).
  
  const operations: Array<{ name: string; fn: () => Promise<unknown> }> = [
    {
      name: 'send-welcome-email',
      fn: async () => {
        const resendApiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'The Peaceful Mind Method <hello@quietmindful.com>';
        
        if (!resendApiKey) {
          console.warn('[sepay-webhook] RESEND_API_KEY is not set, skipping email.');
          return;
        }
        
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: lead.email,
            subject: 'Xác nhận thanh toán thành công & Hướng dẫn nhận tài liệu',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                <h2 style="color: #2F5233;">Cảm ơn bạn đã đăng ký The Peaceful Mind Method!</h2>
                <p>Chào <strong>${lead.name}</strong>,</p>
                <p>Hệ thống đã xác nhận nhận được khoản thanh toán <strong>${lead.amount.toLocaleString('vi-VN')}đ</strong> cho đơn hàng <strong>${lead.orderId}</strong> của bạn.</p>
                
                <div style="background-color: #E8F2FF; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #B0D0FF;">
                  <h3 style="margin-top: 0; color: #0068FF;">Bước tiếp theo quan trọng:</h3>
                  <p>Tất cả tài liệu (Ebook, Audio, Video), hướng dẫn chi tiết và sự hỗ trợ sẽ được chia sẻ qua <strong>nhóm Zalo kín dành riêng cho học viên</strong>.</p>
                  <p style="margin-bottom: 20px;"><strong>Vui lòng tham gia nhóm ngay bây giờ:</strong></p>
                  <a href="https://zalo.me/g/tfjys46kkhw79hbslpxm" style="display: inline-block; background-color: #0068FF; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-align: center;">Tham gia Nhóm Zalo</a>
                </div>
                
                <p>Nếu bạn gặp bất kỳ vấn đề gì hoặc không thể tham gia nhóm, hãy phản hồi lại email này để được hỗ trợ nhé.</p>
                <p>Chúc bạn sẽ sớm tìm lại được những giấc ngủ ngon và bình yên.</p>
                <br/>
                <p>Trân trọng,</p>
                <p><strong>The Peaceful Mind Method Team</strong></p>
              </div>
            `
          })
        });

        if (!res.ok) {
          const errData = await res.text();
          throw new Error(`Resend API error: ${res.status} ${errData}`);
        }
      }
    }
  ];
    try {
      await op.fn();
      console.log(`[sepay-webhook] ✓ ${op.name} done`);
    } catch (err) {
      console.error(`[sepay-webhook] ✗ ${op.name} failed:`, err);
    }
  }
}
