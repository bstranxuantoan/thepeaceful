export default function CheckoutLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-md p-4 sm:p-6 flex flex-col justify-center bg-[#FDF8F0] font-sans">
      <div className="rounded-3xl bg-white p-6 shadow-xl border border-cream-300 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-sage/30 border-t-sage rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-serif font-bold text-forest">Loading Checkout...</h2>
        <p className="text-sm text-gray-500 mt-2">Đang tạo mã QR thanh toán...</p>
      </div>
    </main>
  );
}
