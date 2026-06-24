import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';

export const dinNextArabic = localFont({
  src: [
    {
      path: "../../public/fonts/DINNextLTArabic-Regular-3.ttf",
    },
  ],
  variable: "--font-din-next-arabic",
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang?: string  }>;
}) {
  const { lang = 'ar' } = await params;

  if (!routing.locales.includes(lang as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={lang}
      className={cn("h-full", "antialiased", dinNextArabic.variable)}
      dir={direction}
    >
      <body className={` ${dinNextArabic.variable}`}>
        <NextIntlClientProvider messages={messages} locale={lang}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
