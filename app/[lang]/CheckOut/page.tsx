import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Address, CartData } from "@/interfaces/interfaces";
import CheckoutClient from "@/sections/CheckoutClient/CheckoutClient";
import { serverApi } from "@/services/serverApi";
import { getTranslations } from 'next-intl/server';

interface CheckoutPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: CheckoutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Checkout' });

  return {
    title: `${t('title')} | الفخامة`,
  };
}

export default async function page({
  params,
}: CheckoutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Checkout' });
  const { data: addresses } = await serverApi<{ data: Address[] }>(`address`);
  const { data: cart } = await serverApi<CartData>("cart");

  return (
    <div className="container flex flex-col gap-8">
      <BreadCrumb secondLink={t('confirm_order')} thirdLink={t('payment_method')} />
      <CheckoutClient cart={cart} Address={addresses} />
    </div>
  );
}
