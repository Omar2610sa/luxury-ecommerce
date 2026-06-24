'use client';

import { useTranslations } from 'next-intl';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export function CartSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}: CartSummaryProps) {
  const t = useTranslations('Cart');

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">{t('empty_cart')}</p>
        <a href="/" className="text-primary font-medium">
          {t('continue_shopping')}
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded space-y-4">
      <h2 className="text-xl font-bold">{t('title')}</h2>

      <div className="space-y-2 border-b pb-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title} x {item.quantity}</span>
            <span>{item.price * item.quantity} ر.س</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{t('subtotal')}</span>
          <span>{subtotal} ر.س</span>
        </div>
        <div className="flex justify-between">
          <span>{t('shipping')}</span>
          <span>{shipping} ر.س</span>
        </div>
        <div className="flex justify-between">
          <span>{t('tax')}</span>
          <span>{tax} ر.س</span>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between font-bold text-lg">
        <span>{t('total')}</span>
        <span>{total} ر.س</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-3 rounded font-medium"
      >
        {t('checkout')}
      </button>
    </div>
  );
}
