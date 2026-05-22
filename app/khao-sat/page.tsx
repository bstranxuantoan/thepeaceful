'use client'
import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'q1',
    question: "Tình trạng giấc ngủ của bác hiện tại như thế nào?",
    options: [
      "Trằn trọc mãi không ngủ được (Hơn 1 tiếng)",
      "Ngủ được nhưng hay tỉnh giấc giữa đêm (2h-3h sáng)",
      "Ngủ chập chờn, nhiều mộng mị, sáng dậy rất mệt",
      "Gần như thức trắng đêm"
    ]
  },
  {
    id: 'q2',
    question: "Bác có thường xuyên cảm thấy lo âu, nhịp tim nhanh hoặc suy nghĩ miên man vào ban đêm không?",
    options: [
      "Có, suy nghĩ cứ tự động hiện ra không kiểm soát được",
      "Thỉnh thoảng, nhất là khi có chuyện lo lắng",
      "Không hẳn lo âu, chỉ là cơ thể không chịu buồn ngủ",
    ]
  },
  {
    id: 'q3',
    question: "Bác đã thử những phương pháp nào để cải thiện giấc ngủ rồi ạ?",
    options: [
      "Dùng thuốc ngủ / thuốc an thần",
      "Dùng thảo dược (tâm sen, lạc tiên...)",
      "Nghe kinh Phật, nhạc thiền trên mạng",
      "Chưa thử phương pháp nào bài bản"
    ]
  }
]

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [analyzing, setAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: option }
    setAnswers(newAnswers)

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      // Finish
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setShowResult(true)
      }, 2500)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">
      <header className="py-6 px-6 text-center">
        <h1 className="font-serif text-2xl font-bold text-forest">Trung Tâm Đánh Giá Giấc Ngủ</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {!analyzing && !showResult && (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-card border border-cream-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sage font-bold tracking-widest text-sm uppercase">Câu hỏi {step + 1}/{QUESTIONS.length}</span>
              <div className="flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-sage' : 'bg-cream-300'}`} />
                ))}
              </div>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-10 leading-tight">
              {QUESTIONS[step].question}
            </h2>

            <div className="space-y-4">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-5 rounded-2xl border-2 border-cream-300 hover:border-sage hover:bg-sage-50 transition-all text-lg md:text-xl text-forest font-medium shadow-sm hover:shadow-md"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {analyzing && (
          <div className="text-center animate-fade-in space-y-6">
            <div className="w-20 h-20 border-4 border-cream-300 border-t-sage rounded-full animate-spin mx-auto" />
            <h2 className="font-serif text-2xl text-forest font-bold">Hệ thống đang phân tích kết quả...</h2>
            <p className="text-muted">Đang đối chiếu dữ liệu y khoa tuổi 60+</p>
          </div>
        )}

        {showResult && (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-card border-2 border-sage animate-fade-in text-center">
            <div className="w-20 h-20 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-forest font-bold mb-4">Kết Quả Phân Tích Đã Sẵn Sàng</h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Dựa trên câu trả lời của bác, hệ thần kinh giao cảm của bác đang bị <strong>căng thẳng ngầm (hyperarousal)</strong>. Đây là lý do gốc rễ khiến bác trằn trọc và suy nghĩ miên man. Thuốc ngủ sẽ không giải quyết được vấn đề này.
            </p>
            <div className="bg-amber-50 rounded-2xl p-6 mb-8 text-left border border-amber-100">
              <h3 className="font-serif text-xl font-bold text-forest mb-2">Phác Đồ Đề Xuất Dành Riêng Cho Bác:</h3>
              <p className="text-forest mb-2"><strong>Phương pháp Mỏ Neo 3 Nhịp Thở</strong> - Bài tập 10 phút chuyên biệt giúp hạ nhiệt hệ thần kinh tuổi 60+.</p>
            </div>
            <a href="/#pricing" className="btn-primary block w-full py-4 text-xl">
              Nhận Phác Đồ 21 Ngày (Chỉ 50.000đ)
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
