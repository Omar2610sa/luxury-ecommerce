import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Product } from "@/interfaces/interfaces";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";
import ForYouSection from "@/features/home/components/ForYou/ForYou";
import { getProductData } from "@/features/products/services/products.service";
import { ProductPageProps } from "@/features/products/types";
import { getTranslations } from 'next-intl/server';
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: ProductPageProps) {
  const { lang} = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  return {
    title: `${t('title')} |  Yumeii`,
    description: t('description'),
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Product' });

  const { data: product } = await getProductData(id);
  if (!product) {
  notFound();
}

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
