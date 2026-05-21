'use client'

// Floating chatbot widget — bottom-right corner, responsive 3 breakpoints.
// Mobile (≤640px): fullscreen overlay when open.
// Tablet (641-1023px): 380px panel anchored bottom-right.
// Desktop (≥1024px): 400×600px panel anchored bottom-right.
// Brand: The Peaceful Mind Method — sage green palette.

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTED_QUESTIONS = [
  'How does the 3-Breath Anchor work?',
  'Will this help me sleep better?',
  "What's included in the program?",
  'Is there a money-back guarantee?',
]

const WELCOME =
  "Hi! I'm the Peaceful Mind Method assistant 🌿 I'm here to answer any questions about the program. How can I help you today?"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streaming])

  useEffect(() => {
    if (open && window.matchMedia('(max-width: 640px)').matches) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  async function send(text: string) {
    if (!text.trim() || streaming) return
    setError(null)
    const userMsg: Msg = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errBody.error || `HTTP ${res.status}`)
      }
      if (!res.body) throw new Error('No response body')

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
          } catch { /* skip malformed SSE chunks */ }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
      setMessages((m) =>
        m[m.length - 1]?.role === 'assistant' && !m[m.length - 1].content ? m.slice(0, -1) : m,
      )
    } finally {
      setStreaming(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  // Sage green color tokens (matches brand palette)
  const sageBg = '#5A7A5C'
  const sageDark = '#3D5C3F'

  return (
    <>
      {/* Bubble trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open support chat"
          id="chatbot-bubble"
          className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 lg:h-16 lg:w-16"
          style={{
            backgroundColor: sageBg,
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.28.93 4.36 2.5 6L3 21l4.4-1.42c1.4.65 2.97 1.02 4.6 1.02 5.52 0 10-4.04 10-9S17.52 2 12 2z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-white shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[70vh] sm:w-[380px] sm:rounded-2xl sm:border sm:border-gray-200 lg:h-[600px] lg:w-[400px]"
          role="dialog"
          aria-label="Peaceful Mind support chat"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white sm:rounded-t-2xl"
            style={{ backgroundColor: sageBg }}
          >
            <div>
              <div className="font-semibold font-sans">Peaceful Mind Assistant</div>
              <div className="text-xs opacity-80">Replies in seconds · Powered by AI</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 transition hover:opacity-80 active:scale-95"
              id="chatbot-close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4">
            {messages.length === 0 && (
              <>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-gray-800 shadow-sm leading-relaxed">
                  {WELCOME}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border px-3 py-1 text-xs transition hover:opacity-80 active:scale-95 bg-white cursor-pointer"
                      style={{ borderColor: sageBg, color: sageBg }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  m.role === 'user'
                    ? 'ml-auto rounded-tr-sm text-white whitespace-pre-wrap'
                    : 'rounded-tl-sm bg-white text-gray-800 chatbot-md'
                }`}
                style={m.role === 'user' ? { backgroundColor: sageBg } : {}}
              >
                {m.content ? (
                  m.role === 'assistant' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: (props) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: sageBg }}
                            className="underline underline-offset-2"
                          />
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )
                ) : streaming && i === messages.length - 1 ? (
                  <TypingDots color={sageBg} />
                ) : (
                  ''
                )}
              </div>
            ))}

            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                {error}. Please try again in a moment.
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="border-t border-gray-200 bg-white px-3 py-2"
            style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                rows={1}
                disabled={streaming}
                id="chatbot-input"
                className="max-h-32 flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors"
                style={{ '--tw-ring-color': sageBg } as React.CSSProperties}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                id="chatbot-send"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 active:scale-95 cursor-pointer"
                style={{ backgroundColor: input.trim() && !streaming ? sageBg : undefined }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function TypingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex gap-1" aria-label="Assistant is typing">
      {['-0.3s', '-0.15s', '0s'].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ backgroundColor: color, animationDelay: delay }}
        />
      ))}
    </span>
  )
}
