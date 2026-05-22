import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Kiểm tra các biến môi trường cần thiết
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Cảnh báo: Thiếu biến môi trường NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY trong file .env.local'
  )
}

/**
 * Supabase client sử dụng Anon Key công khai.
 * Thích hợp để sử dụng ở cả Client-side (Browser) và Server-side cho các truy vấn thông thường chịu ảnh hưởng bởi RLS (Row Level Security).
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

/**
 * Hàm khởi tạo Supabase client sử dụng Service Role Key (chỉ chạy ở Server-side).
 * Bỏ qua chính sách RLS (Row Level Security).
 * Dùng cho các tác vụ quản trị như ghi nhận lead, cập nhật trạng thái đơn hàng từ Webhook, hoặc truy vấn trên Admin Dashboard.
 */
export const getSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('❌ Lỗi bảo mật: Không được gọi getSupabaseAdmin() ở phía Client-side (Browser)!')
  }
  
  if (!supabaseServiceKey) {
    throw new Error('❌ Thiếu biến môi trường SUPABASE_SERVICE_ROLE_KEY trong file .env.local')
  }

  return createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
