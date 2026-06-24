import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { CartData } from "@/interfaces/interfaces";
import CartDetails from "@/sections/CartDetails/CartDetails";
import CartProcess from "@/sections/CartProcess/CartProcess";
import { serverApi } from "@/services/serverApi";
import { getTranslations } from 'next-intl/server';

interface CartPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: CartPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Cart' });

  return {
    title: `${t('title')} | الفخامة`,
  };
}

export default async function page({
  params,
}: CartPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Cart' });
  const { data: cart } = await serverApi<CartData>("cart");

  return (
    <div className="container flex flex-col gap-8">
      <BreadCrumb thirdLink={t('title')} />
      <div className="grid md:grid-cols-2 gap-8 ">
        <CartDetails cart={cart} />
        <CartProcess cart={cart} />
      </div>
    </div>
  );
}
