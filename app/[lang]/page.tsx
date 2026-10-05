import Banner from "@/features/home/components/Banner/Banner";
import ForYouSection from "@/features/home/components/ForYou/ForYou";
import Hero from "@/features/home/components/Hero/Hero";
import NewEditions from "@/features/home/components/NewEditions/NewEditions";
import SecondSlider from "@/sections/SecondSlider/SecondSlider";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { HomePageProps } from "@/features/home/types";
import { getHomeData } from "@/features/home/services/home.service";




export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Home' })
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function Home({
  params,
}: HomePageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Home' });
  const { data: home_website } = await getHomeData();
  return (
    <div>
      <Hero slider={home_website?.slider ?? []} shopNowText={t('hero_button')} />
      <SecondSlider secondSlider={home_website?.main_categories ?? []} />
      <NewEditions
        products={home_website?.for_you ?? []}
        title={t('forYou')}
      />
      {/* <FlashOffers /> */}
      <Banner banner={home_website?.middle_slider ?? ''} />
      <ForYouSection
        title={t('best_sellers')}
        products={home_website?.best_seller ?? []}
      />
      <Banner banner={home_website?.footer_slider ?? ''} />
    </div>
  );
}
