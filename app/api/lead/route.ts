import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, tier } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // TODO: Wire to Resend / email provider via biz-email-setup skill
    // TODO: Wire to Vercel KV via biz-setup-sepay-payment skill
    console.log('[Lead Captured]', { name, email, tier, ts: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
