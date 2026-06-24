'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface FavoriteButtonProps {
  productId: string;
  isFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => Promise<void>;
}

export function FavoriteButton({
  productId,
  isFavorite = false,
  onToggle,
}: FavoriteButtonProps) {
  const t = useTranslations('Favourite');
  const [favorite, setFavorite] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading || !onToggle) return;

    setIsLoading(true);
    try {
      await onToggle(!favorite);
      setFavorite(!favorite);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={favorite ? t('remove_from_favorite') : t('add_to_favorite')}
      className={`p-2 rounded-full transition-colors ${
        favorite
          ? 'bg-red-100 text-red-500'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      } disabled:opacity-50`}
    >
      <Heart className="size-5" fill={favorite ? 'currentColor' : 'none'} />
    </button>
  );
}
