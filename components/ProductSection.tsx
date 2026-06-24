'use client';

import { useTranslations } from 'next-intl';

interface ProductSectionProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    inStock: boolean;
    colors?: string[];
    sizes?: string[];
  };
  onAddToCart: () => void;
}

export function ProductSection({ product, onAddToCart }: ProductSectionProps) {
  const t = useTranslations('Product');

  return (
    <div className="product-section space-y-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <p className="text-gray-600">{product.description}</p>

      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold">{product.price} ر.س</span>
        <span className={`px-3 py-1 rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {product.inStock ? t('in_stock') : t('out_of_stock')}
        </span>
      </div>

      {product.colors && (
        <div className="space-y-2">
          <label className="block font-medium">{t('color')}</label>
          <div className="flex gap-2">
            {product.colors.map(color => (
              <button key={color} className="w-10 h-10 rounded border" title={color}>
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes && (
        <div className="space-y-2">
          <label className="block font-medium">{t('size')}</label>
          <select className="w-full border rounded p-2">
            <option>{t('size')}</option>
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={onAddToCart}
        disabled={!product.inStock}
        className="w-full bg-primary text-white py-3 rounded font-medium disabled:opacity-50"
      >
        {t('add_to_cart')}
      </button>
    </div>
  );
}
