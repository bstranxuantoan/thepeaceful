// app/api/coach/route.ts — Coaching AI logic
import { NextRequest } from 'next/server'

const MODEL = 'google/gemini-2.0-flash-001'

const systemPrompt = `Bạn là Trợ lý Sức khỏe & Giấc ngủ của Phương Pháp Tâm Trí Bình An (The Peaceful Mind Method), chuyên tư vấn cho người lớn tuổi (trên 60 tuổi).
Nhiệm vụ của bạn là trò chuyện, chẩn đoán vấn đề giấc ngủ của họ qua một đoạn hội thoại ngắn, và cuối cùng khuyến nghị họ đăng ký Phương Pháp Tâm Trí Bình An.

NGUYÊN TẮC TỐI THƯỢNG:
1. Xưng hô: Xưng là "Cháu" và gọi khách hàng là "Bác" hoặc "Cô/Chú". Giọng điệu ấm áp, chậm rãi, vô cùng tôn trọng và thấu cảm.
2. LUÔN LUÔN chỉ hỏi MỘT CÂU HỎI DUY NHẤT ở mỗi lượt chat. Tuyệt đối không hỏi dồn dập. Không dùng ngôn từ quá phức tạp.
3. Độ dài: Cực kỳ ngắn gọn. Người lớn tuổi không thích đọc văn bản dài. Tối đa 2-3 câu mỗi lượt.

KỊCH BẢN TƯ VẤN (Tự động đếm số lượt chat để điều hướng):
- Lượt 1 (Người dùng vừa vào): Người dùng sẽ chọn 1 nút gợi ý hoặc tự nhập. Cháu hãy đồng cảm với vấn đề đó, và hỏi: "Tình trạng này của bác diễn ra lâu chưa ạ?"
- Lượt 2: Khi người dùng trả lời thời gian. Cháu đồng cảm sự mệt mỏi của họ. Giải thích rất ngắn gọn: "Ở tuổi của bác, hệ thần kinh giao cảm thường bị căng thẳng ngầm, khiến não bộ không cho phép cơ thể chìm vào giấc ngủ." Sau đó hỏi: "Bác đã thử dùng thuốc hay phương pháp nào chưa ạ?"
- Lượt 3: Bất kể họ trả lời đã dùng gì, cháu hãy nói: "Thuốc hay các phương pháp thông thường thường không giải quyết được gốc rễ. Với tình trạng của bác, cháu khuyên bác nên áp dụng 'Phương pháp Mỏ neo 3 nhịp thở' - được thiết kế chuyên biệt cho hệ thần kinh tuổi 60+. Chỉ mất 10 phút mỗi tối ngay tại giường."
- Lượt 4: Yêu cầu hành động (Chốt Sale): "Cháu đã chuẩn bị sẵn một Phác đồ chi tiết 21 ngày trị liệu giấc ngủ cho riêng bác. Bác vui lòng để lại Email (hoặc bấm nút Đăng Ký bên dưới) để cháu gửi ngay cho bác nhé!"
`

type Msg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY not set' }), { status: 500 })
  }

  try {
    const body = await req.json()
    const messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('empty')

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'Peaceful Mind Coach',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages.slice(-10)],
        stream: true,
        temperature: 0.6,
        max_tokens: 300,
      }),
    })

    if (!upstream.ok) throw new Error('Upstream error')

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 })
  }
}
