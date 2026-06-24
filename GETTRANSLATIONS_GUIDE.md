# Server Component Translation Guide - getTranslations()

This guide shows how to use `getTranslations()` in **server components** with the pattern `const t = await getTranslations()`.

## Basic Pattern

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyPage({ params }) {
  const { lang } = await params;

  // Get translations for a namespace
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('add_to_cart')}</button>
    </div>
  );
}
```

## Multiple Namespaces

Use multiple translation objects for different namespaces:

```tsx
export default async function CheckoutPage({ params }) {
  const { lang } = await params;

  const tCheckout = await getTranslations({ locale: lang, namespace: 'Checkout' });
  const tCart = await getTranslations({ locale: lang, namespace: 'Cart' });
  const tCommon = await getTranslations({ locale: lang, namespace: 'Common' });

  return (
    <div>
      <h1>{tCheckout('title')}</h1>
      <span>{tCart('total')}</span>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

## Using with Metadata

Translate page metadata (title, description):

```tsx
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return {
    title: `${t('title')} | متجرنا`,
    description: t('description'),
  };
}

export default async function ProductPage({ params }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return <div>{/* ... */}</div>;
}
```

## Available Namespaces

| Namespace | Use Case | Keys |
|-----------|----------|------|
| **Nav** | Navigation | home, products, about, contact |
| **Auth** | Authentication | login, register, logout, email, password |
| **Home** | Homepage | title, subtitle, featured_products, view_all |
| **Product** | Product pages | title, description, price, in_stock, add_to_cart, size, color |
| **Category** | Category listing | filter, sort, no_results, items_found |
| **Cart** | Shopping cart | empty_cart, checkout, total, subtotal, shipping, tax |
| **Checkout** | Order checkout | confirm_order, payment_method, shipping_address, credit_card |
| **Profile** | User profile | edit_profile, my_orders, email, phone, address |
| **Favourite** | Favorites | empty_favorite, add_to_favorite, remove_from_favorite |
| **Common** | Shared UI | loading, error, success, save, cancel, delete, edit |
| **Header** | Header component | contact_email, contact_phone |
| **Footer** | Footer component | about_us, contact_us, privacy_policy, terms_conditions |

## Example Page Components

### Product Page
```tsx
import { getTranslations } from 'next-intl/server';

export default async function ProductPage({ params }) {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('add_to_cart')}</button>
      <span>{t('in_stock')}</span>
    </div>
  );
}
```

### Category Page
```tsx
export default async function CategoryPage({ params }) {
  const { lang } = await params;
  const tCategory = await getTranslations({ locale: lang, namespace: 'Category' });
  const tProduct = await getTranslations({ locale: lang, namespace: 'Product' });

  return (
    <div>
      <h1>{tCategory('title')}</h1>
      <button>{tCategory('filter')}</button>
      <button>{tProduct('add_to_cart')}</button>
    </div>
  );
}
```

### Checkout Page
```tsx
export default async function CheckoutPage({ params }) {
  const { lang } = await params;
  
  const tCheckout = await getTranslations({ locale: lang, namespace: 'Checkout' });
  const tCart = await getTranslations({ locale: lang, namespace: 'Cart' });
  const tCommon = await getTranslations({ locale: lang, namespace: 'Common' });

  return (
    <form>
      <h1>{tCheckout('title')}</h1>
      <input placeholder={tCheckout('first_name')} />
      <input placeholder={tCheckout('email')} />
      
      <div>
        <p>{tCart('total')}</p>
      </div>
      
      <button>{tCheckout('confirm_order')}</button>
      <button>{tCommon('cancel')}</button>
    </form>
  );
}
```

### Cart Page
```tsx
export default async function CartPage({ params }) {
  const { lang } = await params;
  
  const tCart = await getTranslations({ locale: lang, namespace: 'Cart' });
  const tCommon = await getTranslations({ locale: lang, namespace: 'Common' });

  return (
    <div>
      <h1>{tCart('title')}</h1>
      
      {items.length === 0 ? (
        <>
          <p>{tCart('empty_cart')}</p>
          <a href="/">{tCart('continue_shopping')}</a>
        </>
      ) : (
        <>
          <p>{tCart('total')}: {total}</p>
          <button>{tCart('checkout')}</button>
        </>
      )}
    </div>
  );
}
```

### Profile Page
```tsx
export default async function ProfilePage({ params }) {
  const { lang } = await params;
  
  const tProfile = await getTranslations({ locale: lang, namespace: 'Profile' });
  const tCommon = await getTranslations({ locale: lang, namespace: 'Common' });

  return (
    <div>
      <h1>{tProfile('title')}</h1>
      
      <form>
        <label>{tProfile('email')}</label>
        <input />
        
        <label>{tProfile('phone')}</label>
        <input />
        
        <button>{tProfile('save_changes')}</button>
      </form>

      <div>
        <h2>{tProfile('my_orders')}</h2>
        {/* Order list */}
      </div>

      <button className="text-red-600">{tProfile('logout')}</button>
    </div>
  );
}
```

## Key Points

1. **Always await getTranslations()** - It's an async function
2. **Pass locale from params** - Extract `lang` from `params` after awaiting it
3. **Use namespace parameter** - Organize translations by feature/page
4. **Single responsibility** - Each namespace has related keys
5. **Use descriptive keys** - `add_to_cart` not `btn1`
6. **Consistent naming** - Same terminology across namespaces when possible

## Common Translation Keys by Context

**Buttons:**
- `add_to_cart`, `checkout`, `save`, `cancel`, `submit`

**Messages:**
- `in_stock`, `out_of_stock`, `loading`, `error`, `success`

**Forms:**
- `email`, `password`, `phone`, `address`, `city`, `country`

**Navigation:**
- `home`, `products`, `about`, `contact`, `my_orders`

**Money:**
- `price`, `total`, `subtotal`, `shipping`, `tax`, `discount`

## Locale Detection

The locale is automatically detected from the URL:
- `/ar/...` → locale is `'ar'` (Arabic)
- `/en/...` → locale is `'en'` (English)

Always extract it from params:
```tsx
const { lang } = await params;
const t = await getTranslations({ locale: lang, namespace: 'Product' });
```

---

**See example implementations in:**
- `app/[lang]/product/[id]/page-example.tsx`
- `app/[lang]/cart/page-example.tsx`
- `app/[lang]/CheckOut/page-example.tsx`
- `app/[lang]/categories/[id]/page-example.tsx`
- `app/[lang]/profile/page-example.tsx`
