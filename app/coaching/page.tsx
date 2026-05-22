'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  "Tôi hay bị tỉnh giấc lúc 2h-3h sáng",
  "Tôi trằn trọc mãi không ngủ được",
  "Tôi ngủ được nhưng sáng dậy rất mệt mỏi",
  "Tôi bị căng thẳng và hay suy nghĩ nhiều",
]

export default function CoachingPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Dạ cháu chào bác! Cháu là Trợ lý Giấc ngủ của Phương pháp Tâm Trí Bình An. Dạo này giấc ngủ của bác có vấn đề gì làm bác trăn trở không ạ?' }
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streaming])

  async function send(text: string) {
    if (!text.trim() || streaming) return
    const userMsg: Msg = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) throw new Error('API Error')
      if (!res.body) throw new Error('No body')

      setMessages((m) => [...m, { role: 'assistant', content: '' }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content
            if (delta) {
              setMessages((m) => {
                const last = m[m.length - 1]
                if (last.role !== 'assistant') return m
                return [...m.slice(0, -1), { ...last, content: last.content + delta }]
              })
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err) {
      console.error(err)
      setMessages((m) => [...m, { role: 'assistant', content: 'Xin lỗi bác, hệ thống đang bận một chút. Bác thử lại sau nhé!' }])
    } finally {
      setStreaming(false)
    }
  }

  // Auto-suggest email form if the assistant asks for it (heuristic)
  const lastMsg = messages[messages.length - 1]
  const showEmailForm = lastMsg?.role === 'assistant' && !streaming && (lastMsg.content.includes('Email') || lastMsg.content.includes('Đăng Ký'))

  return (
    <div className="flex flex-col h-screen bg-cream font-sans">
      {/* Header */}
      <header className="bg-forest text-white py-4 px-6 shadow-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-sage">
            <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold">Chuyên Gia Tâm Trí</h1>
            <p className="text-sage-200 text-xs">Phản hồi ngay lập tức</p>
          </div>
        </div>
        <a href="/" className="text-white opacity-80 hover:opacity-100 p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </a>
      </header>

      {/* Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-5 py-4 text-lg md:text-xl shadow-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-sage text-white rounded-br-sm'
                    : 'bg-white text-forest border border-cream-300 rounded-bl-sm'
                }`}
              >
                {m.content || (streaming && i === messages.length - 1 ? 'Đang suy nghĩ...' : '')}
              </div>
            </div>
          ))}

          {/* Quick Suggestions if it's user's turn and no messages yet */}
          {messages.length === 1 && !streaming && (
            <div className="flex flex-wrap gap-3 mt-4 justify-start max-w-[85%]">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="bg-white border-2 border-sage-100 text-sage hover:bg-sage hover:text-white transition-colors rounded-2xl px-4 py-3 text-left text-lg shadow-sm font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Upsell Form Injection */}
          {showEmailForm && (
            <div className="flex justify-start animate-fade-in mt-4">
              <div className="max-w-[85%] bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 shadow-md">
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Nhận Phác Đồ Cá Nhân Hóa</h3>
                <p className="text-muted mb-4">Để lại thông tin để cháu gửi chi tiết Phương pháp Mỏ Neo 3 Nhịp Thở qua email cho bác ạ.</p>
                <div className="space-y-3">
                  <input type="text" placeholder="Tên của bác là..." className="w-full px-4 py-3 rounded-xl border border-amber-200 text-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  <input type="email" placeholder="Email của bác..." className="w-full px-4 py-3 rounded-xl border border-amber-200 text-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  <a href="/#pricing" className="btn-primary w-full block text-center py-4 text-xl mt-2 rounded-xl">Nhận Phác Đồ Ngay</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-cream-300 p-4 pb-[env(safe-area-inset-bottom,16px)]">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Bác gõ câu trả lời vào đây nhé..."
            className="flex-1 resize-none rounded-2xl border-2 border-cream-300 bg-gray-50 px-5 py-4 text-lg md:text-xl focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-colors max-h-32"
            rows={1}
            disabled={streaming}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            className="flex-shrink-0 h-14 w-14 rounded-full bg-sage flex items-center justify-center text-white disabled:opacity-50 hover:bg-forest transition-colors shadow-md"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-muted mt-3">Trợ lý AI phân tích và đưa ra lời khuyên độc quyền từ Phương Pháp Tâm Trí Bình An.</p>
      </footer>
    </div>
  )
}
