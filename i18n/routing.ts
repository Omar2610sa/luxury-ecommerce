import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  pathPrefix: '/',
});

export type Locale = (typeof routing.locales)[number];
