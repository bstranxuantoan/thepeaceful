import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, tier } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Tự sinh mã đơn hàng tạm thời (định dạng DHxxxxxx)
    const orderId = `DH${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`
    
    // Giả định mức giá theo tier (đơn vị: VND hoặc USD tùy thiết lập)
    let amount = 149700 // Ví dụ: 149,700đ
    if (tier === 'pro') amount = 299000
    if (tier === 'vip') amount = 499000

    console.log('[Lead Captured]', { name, email, phone, tier, orderId, ts: new Date().toISOString() })

    // Lưu vào cơ sở dữ liệu Supabase nếu có cấu hình biến môi trường
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabaseAdmin = getSupabaseAdmin()
        const { data, error } = await supabaseAdmin
          .from('leads')
          .insert([
            {
              order_id: orderId,
              name,
              phone: phone || '',
              email,
              product_name: `Peaceful Mind Method - Tier ${tier || 'Standard'}`,
              amount: amount,
              status: 'pending'
            }
          ])
          .select()

        if (error) {
          console.error('[Supabase Save Error]:', error.message)
        } else {
          console.log('[Supabase Saved Successfully]:', data)
        }
      } catch (dbError: any) {
        console.error('[Supabase Connection Error]:', dbError.message)
      }
    } else {
      console.log('💡 Supabase chưa được cấu hình biến môi trường. Bỏ qua ghi DB.')
    }

    // TODO: Wire to Resend / email provider via biz-email-setup skill
    
    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    console.error('[API Lead Error]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

