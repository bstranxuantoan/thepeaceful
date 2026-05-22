import Image from 'next/image'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-card border-2 border-sage text-center animate-fade-in">
        <div className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-4">
          Thanh Toán Thành Công!
        </h1>
        <p className="text-xl text-muted mb-8">
          Cảm ơn bác đã đăng ký Phương Pháp Tâm Trí Bình An. Toàn bộ sách và 21 video hướng dẫn đã được gửi vào Email của bác.
        </p>

        <div className="bg-sage-50 rounded-2xl p-6 mb-8 text-left border border-sage-100">
          <h2 className="font-serif text-xl font-bold text-forest mb-3 flex items-center gap-2">
            <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            QUYỀN LỢI ĐẶC QUYỀN (MỚI)
          </h2>
          <p className="text-forest mb-4">
            Bác đã được mở khóa quyền truy cập vào <strong>Trợ Lý Giấc Ngủ AI Cá Nhân</strong>. Trợ lý sẽ đồng hành, nhắc nhở và giải đáp mọi thắc mắc của bác trong suốt 21 ngày thực hành.
          </p>
        </div>

        <a href="/coaching" className="btn-primary block w-full py-4 text-xl shadow-lg shadow-sage/30 hover:scale-[1.02] transition-transform">
          Truy Cập Trợ Lý AI Ngay Bây Giờ
        </a>
        
        <p className="text-muted text-sm mt-6">
          Nếu chưa thấy email, bác vui lòng kiểm tra hộp thư rác (Spam) hoặc liên hệ đội ngũ hỗ trợ.
        </p>
      </div>
    </div>
  )
}
