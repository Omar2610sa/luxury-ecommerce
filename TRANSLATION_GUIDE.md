# i18n Translation Guide

This guide shows how to use translations in your Next.js 16 + next-intl project.

## File Structure

```
i18n/
├── routing.ts          # Locale configuration
└── request.ts          # Message loader

messages/
├── ar.json            # Arabic translations
└── en.json            # English translations

components/
├── LanguageSwitcher.tsx    # Language switcher component
├── ProductSection.tsx       # Product page translations
├── CartSummary.tsx         # Cart translations
├── CheckoutForm.tsx        # Checkout translations
├── ProfileForm.tsx         # Profile translations
├── CategoryFilter.tsx       # Category/filter translations
└── FavoriteButton.tsx       # Favorites translations

app/[lang]/
├── layout.tsx          # Root layout with i18n provider
├── page.tsx           # Home page
├── product/[id]/      # Product detail page
├── categories/[id]/   # Category page
├── cart/              # Shopping cart page
├── CheckOut/          # Checkout page
├── profile/           # Profile/account page
├── favourite/         # Favorites page
└── slider/[id]/       # Slider/collection page
```

## Usage Patterns

### 1. Server Components (getTranslations)

Use `getTranslations()` in **server components** to fetch translations at build time.

```tsx
// app/[lang]/page.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Home' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function HomePage() {
  const t = await getTranslations('Home');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('hero_button')}</button>
    </main>
  );
}
```

### 2. Client Components (useTranslations)

Use `useTranslations()` in **client components** for interactive translations.

```tsx
// components/ProductSection.tsx
'use client';

import { useTranslations } from 'next-intl';

export function ProductSection({ product }) {
  const t = useTranslations('Product');

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <button>{t('add_to_cart')}</button>
      <span>{product.inStock ? t('in_stock') : t('out_of_stock')}</span>
    </div>
  );
}
```

### 3. Using Multiple Namespaces

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const tProduct = useTranslations('Product');
  const tCommon = useTranslations('Common');

  return (
    <div>
      <button>{tProduct('add_to_cart')}</button>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

## Adding New Translations

### Step 1: Add keys to JSON files

**messages/ar.json:**
```json
{
  "MyFeature": {
    "title": "عنوان ميزتي",
    "description": "وصف ميزتي"
  }
}
```

**messages/en.json:**
```json
{
  "MyFeature": {
    "title": "My Feature Title",
    "description": "My Feature Description"
  }
}
```

### Step 2: Use in component

```tsx
const t = useTranslations('MyFeature');

return (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </div>
);
```

## URL Structure

The app automatically handles locale prefixes in URLs:

- `/ar/...` → Arabic (RTL)
- `/en/...` → English (LTR)
- `/` → Redirects to `/ar` (default locale)

## Language Switcher

The `<LanguageSwitcher />` component is available in the Header and switches between languages.

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function MyComponent() {
  return <LanguageSwitcher />;
}
```

## Current Translation Namespaces

- **Nav** - Navigation items
- **Auth** - Login/Register/Logout
- **Home** - Homepage content
- **Product** - Product page and details
- **Category** - Category listing and filtering
- **Cart** - Shopping cart
- **Checkout** - Order checkout
- **Profile** - User profile
- **Favourite** - Favorites/wishlist
- **Common** - Common UI elements (Save, Cancel, Loading, etc.)

## Best Practices

1. **Group related translations** - Use namespaces to organize translations by feature
2. **Use descriptive keys** - `add_to_cart` is better than `btn1`
3. **Keep translations consistent** - Use same terminology across the app
4. **Test both languages** - Always test in Arabic and English
5. **Handle plurals** - Use separate keys for singular/plural if needed
6. **Translate metadata** - Title, description, OG tags should be translated

## Dynamic Content

If you need to translate dynamic content, pass it as an argument:

```tsx
const t = useTranslations('Product');
const message = t('quantity', { count: 5 });
// en: "Quantity: 5"
// ar: "الكمية: 5"
```

Add this to messages:
```json
{
  "Product": {
    "quantity": "Quantity: {count}"
  }
}
```

## Common Issues

### "useTranslations must be used in a Client Component"
- Add `'use client'` at the top of the file

### Missing namespace
- Add the namespace to both ar.json and en.json

### Locale not detected
- Ensure your routes are under `app/[lang]/`
- Check middleware.ts is properly configured

## Next Steps

1. Import the provided translation components in your pages
2. Replace hardcoded strings with `t('key')` calls
3. Add new translation keys as you build features
4. Test language switching in the Header
5. Verify RTL/LTR styling works correctly

For more info, visit: https://next-intl.dev/docs
