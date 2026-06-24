import NoFav from "@/components/NoFav/NoFav";
import ShopCard from "@/components/ShopCard/ShopCard";
import { Favorite, Product } from "@/interfaces/interfaces";
import { serverApi } from "@/services/serverApi";
import { getTranslations } from 'next-intl/server';

interface FavouritePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: FavouritePageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Favourite' });

  return {
    title: `${t('title')} | الفخامة`,
  };
}

export default async function page({
  params,
}: FavouritePageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Favourite' });
  const { data: fave } = await serverApi<{ data: Favorite[] }>("get_fave_products");

  return (
    <div className="container flex flex-col gap-8">
      <div className="flex items-center gap-3 text-2xl">
        <p>{t('title')}</p>
        <span className="text-gray-400">
          ({fave?.length || 0})
        </span>
      </div>
      {fave?.length === 0 && <NoFav />}

      {fave && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
          {fave?.map((ele, index) => {
            return (
              <div key={index}>
                <ShopCard product={ele as unknown as Product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
