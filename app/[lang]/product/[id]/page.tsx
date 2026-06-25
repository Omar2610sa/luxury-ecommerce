import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Product, ProductData } from "@/interfaces/interfaces";
import ProductInfo from "@/sections/Product/ProductInfo";
import ForYouSection from "@/sections/ForYou/ForYou";
import { serverApi } from "@/services/serverApi";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return {
    title: `${t('title')} | الفخامة`,
    description: t('description'),
  };
}

export default async function Page({ params }: Props) {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  const { data: product } = await serverApi<{ data: ProductData }>(
    `web_product/${id}`
  );

  return (
    <div className="container flex flex-col gap-10">
      <BreadCrumb thirdLink={product.title} />
      <ProductInfo product={product as unknown as Product} />
      <ForYouSection
        title={t('recommended')}
        products={product?.recommended ?? []}
      />

          <ForYouSection
            title={t('also_may_like')}
            products={product?.also_may_like ?? []}
          />
    </div>
  );
}
