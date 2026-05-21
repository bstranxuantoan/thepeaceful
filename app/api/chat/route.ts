// app/api/chat/route.ts — Proxy to OpenRouter with streaming
// API key stays server-side only — never exposed to the client.

import { systemPrompt } from '@/lib/chatbot-knowledge'

// Switch model here:
// 'google/gemini-2.0-flash-001'      — fast + cheap (default, stable)
// 'google/gemini-2.5-flash-preview'  — latest Gemini Flash
// 'anthropic/claude-sonnet-4.6'      — higher quality
const MODEL = 'google/gemini-2.0-flash-001'

type Msg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'OPENROUTER_API_KEY not set in .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let messages: Msg[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('empty messages')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid messages payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const trimmed = messages.slice(-20)

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      'X-Title': 'Peaceful Mind Method Chatbot',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...trimmed],
      stream: true,
      temperature: 0.7,
      max_tokens: 600,
    }),
  })

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => 'Unknown OpenRouter error')
    return new Response(
      JSON.stringify({ error: `OpenRouter error: ${upstream.status} ${errText}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
