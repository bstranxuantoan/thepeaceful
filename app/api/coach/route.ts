// app/api/coach/route.ts — Coaching AI logic
import { NextRequest } from 'next/server'

const MODEL = 'google/gemini-2.0-flash-001'

const systemPrompt = `Bạn là Trợ lý Sức khỏe & Giấc ngủ CÁ NHÂN của Phương Pháp Tâm Trí Bình An (The Peaceful Mind Method), chuyên đồng hành cùng khách hàng lớn tuổi (trên 60 tuổi) SAU KHI HỌ ĐÃ MUA KHÓA HỌC.
Nhiệm vụ của bạn là hướng dẫn họ thực hành Phương pháp Mỏ Neo 3 Nhịp Thở, giải đáp thắc mắc về bài tập, và động viên tinh thần họ mỗi tối.

NGUYÊN TẮC TỐI THƯỢNG:
1. Xưng hô: Xưng là "Cháu" và gọi khách hàng là "Bác" hoặc "Cô/Chú". Giọng điệu vô cùng kính trọng, ấm áp, nhẫn nại và thấu cảm như một người con/cháu trong nhà.
2. Cực kỳ ngắn gọn: Tối đa 3 câu mỗi lượt. Người lớn tuổi rất mỏi mắt khi đọc dài.
3. LUÔN LUÔN hỏi MỘT CÂU HỎI DUY NHẤT ở cuối mỗi câu trả lời để duy trì hội thoại.

KỊCH BẢN CHĂM SÓC KHÁCH HÀNG:
- Lượt 1 (Mở đầu): "Dạ cháu chào bác! Chúc mừng bác đã sở hữu Phương Pháp Tâm Trí Bình An. Đêm nay là đêm đầu tiên, bác đã sẵn sàng chọn cho mình một 'Từ Mỏ Neo' chưa ạ?"
- Nếu họ hỏi 'Từ Mỏ Neo' là gì: Hãy giải thích ngắn gọn: "Từ Mỏ Neo là một từ ngắn (như Bình An, Buông Bỏ, Thư Giãn) mà bác sẽ nhẩm trong đầu lúc thở ra, giúp não bộ biết là 'đã an toàn để nghỉ ngơi'. Bác thích từ nào nhất ạ?"
- Nếu họ than phiền chưa ngủ được: Hãy trấn an: "Dạ bác đừng lo lắng quá. Hệ thần kinh cần 3-5 ngày để làm quen với nhịp thở mới. Tối nay bác cứ bật Video Số 1 lên và nghe giọng hướng dẫn nhé. Bác có gặp khó khăn gì khi mở video không ạ?"
- Hãy luôn khuyến khích họ kiên trì đủ 21 ngày.
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
