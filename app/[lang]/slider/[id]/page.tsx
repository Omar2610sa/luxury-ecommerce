import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import NoInfo from "@/components/NoInfo/NoInfo";
import ShopCard from "@/components/ShopCard/ShopCard";
import { Product } from "@/interfaces/interfaces";
import { getTranslations } from 'next-intl/server';
import { getSliderData } from "@/features/slider/services/sliders.service";
import { Props } from "@/features/slider/types";


export default async function page({ params }: Props) {
  const { lang, id } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'SLider' });
  const { data: slider } = await getSliderData(id);

  const products = Array.isArray(slider?.product_details)
    ? slider?.product_details ?? []
    : slider?.product_details
      ? [slider.product_details]
      : [];

  const hasProducts = products.length > 0;

  return (
    <div className="container flex flex-col gap-8">
      <BreadCrumb secondLink={t('breadCumb_link')} thirdLink={slider?.name ?? ""} />
      {hasProducts ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
          {products.map((product, index) => {
            return (
              <ShopCard product={product as unknown as Product} key={index} />
            );
          })}
        </div>
      ) : (
        <NoInfo title={t('no_results')} />
      )}
    </div>
  );
}
