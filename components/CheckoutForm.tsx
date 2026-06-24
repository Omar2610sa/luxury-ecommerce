'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  isLoading?: boolean;
}

interface CheckoutData {
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash_on_delivery';
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const t = useTranslations('Checkout');
  const commonT = useTranslations('Common');
  const [paymentMethod, setPaymentMethod] = useState<CheckoutData['paymentMethod']>('credit_card');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      shippingAddress: formData.get('shippingAddress') as string,
      billingAddress: formData.get('billingAddress') as string,
      paymentMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">{t('shipping_address')}</h2>
        <textarea
          name="shippingAddress"
          placeholder={t('shipping_address')}
          className="w-full border rounded p-3"
          rows={3}
          required
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">{t('billing_address')}</h2>
        <textarea
          name="billingAddress"
          placeholder={t('billing_address')}
          className="w-full border rounded p-3"
          rows={3}
          required
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">{t('payment_method')}</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={() => setPaymentMethod('credit_card')}
            />
            {t('credit_card')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bank_transfer"
              checked={paymentMethod === 'bank_transfer'}
              onChange={() => setPaymentMethod('bank_transfer')}
            />
            {t('bank_transfer')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cash_on_delivery"
              checked={paymentMethod === 'cash_on_delivery'}
              onChange={() => setPaymentMethod('cash_on_delivery')}
            />
            {t('cash_on_delivery')}
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded font-medium disabled:opacity-50"
      >
        {isLoading ? commonT('loading') : t('confirm_order')}
      </button>
    </form>
  );
}
