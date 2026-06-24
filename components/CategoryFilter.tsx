'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CategoryFilterProps {
  onFilterChange: (filters: FilterData) => void;
}

interface FilterData {
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price_low' | 'price_high' | 'popular';
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const t = useTranslations('Category');
  const [filters, setFilters] = useState<FilterData>({
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
  });

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: FilterData['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-gray-50 p-6 rounded space-y-6">
      <div>
        <h3 className="font-bold mb-4">{t('filter')}</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm mb-2">
              السعر من: {filters.minPrice} ر.س
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">
              السعر إلى: {filters.maxPrice} ر.س
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">{t('sort')}</h3>
        <div className="space-y-2">
          {[
            { value: 'newest', label: 'الأحدث' },
            { value: 'price_low', label: 'السعر: من الأقل إلى الأعلى' },
            { value: 'price_high', label: 'السعر: من الأعلى إلى الأقل' },
            { value: 'popular', label: 'الأكثر شهرة' },
          ].map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={() => handleSortChange(option.value as FilterData['sortBy'])}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
