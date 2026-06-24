'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ProfileFormProps {
  initialData?: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  onSubmit: (data: ProfileData) => Promise<void>;
}

interface ProfileData {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const t = useTranslations('Profile');
  const commonT = useTranslations('Common');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(
    initialData || {
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-2">{t('email')}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-2">{t('phone')}</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-2">{t('address')}</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">{t('city')}</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{t('country')}</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">{t('postal_code')}</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded font-medium disabled:opacity-50"
      >
        {isLoading ? commonT('loading') : t('save_changes')}
      </button>
    </form>
  );
}
