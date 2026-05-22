// app/checkout/[orderId]/BankDetails.tsx — Client component
//
// Hiển thị thông tin chuyển khoản kèm tính năng copy nhanh bằng click.
// Tăng trải nghiệm người dùng tối đa.

'use client';

import { useState } from 'react';

type Props = {
  bank: string;
  accountNumber: string;
  accountName: string;
  amountStr: string;
  amountRaw: number;
  orderId: string;
};

export function BankDetails({ bank, accountNumber, accountName, amountStr, amountRaw, orderId }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="mb-6 space-y-3 rounded-2xl bg-gray-50 p-5 text-sm border border-gray-100">
      {/* Ngân hàng */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <span className="text-gray-500">Bank</span>
        <span className="font-semibold text-gray-900">{bank}</span>
      </div>

      {/* Số tài khoản */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <span className="text-gray-500">Account Number</span>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-gray-900">{accountNumber}</span>
          <button
            onClick={() => handleCopy(accountNumber, 'accountNumber')}
            className="text-xs text-sage hover:text-sage-600 font-medium px-2 py-0.5 rounded bg-sage-50 hover:bg-sage-100 transition-colors"
          >
            {copiedField === 'accountNumber' ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Tên tài khoản */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <span className="text-gray-500">Account Name</span>
        <span className="font-semibold text-gray-950 uppercase">{accountName}</span>
      </div>

      {/* Số tiền */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <span className="text-gray-500">Amount</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{amountStr}</span>
          <button
            onClick={() => handleCopy(String(amountRaw), 'amount')}
            className="text-xs text-sage hover:text-sage-600 font-medium px-2 py-0.5 rounded bg-sage-50 hover:bg-sage-100 transition-colors"
          >
            {copiedField === 'amount' ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Nội dung bắt buộc */}
      <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
        <div className="flex items-center justify-between">
          <span className="text-amber-800 font-medium text-xs">Transfer Content (Required)</span>
          <button
            onClick={() => handleCopy(orderId, 'orderId')}
            className="text-xs text-amber-700 hover:text-amber-800 font-semibold px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 transition-colors"
          >
            {copiedField === 'orderId' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="text-center py-1.5 font-mono text-2xl font-black text-amber-600 tracking-wider">
          {orderId}
        </div>
      </div>
    </div>
  );
}
